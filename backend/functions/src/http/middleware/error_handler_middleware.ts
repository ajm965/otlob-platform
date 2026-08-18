import type { ErrorRequestHandler } from 'express';
import type { Logger } from '../../infrastructure/logging/logger';
import { errorEnvelope } from '../envelopes';
import { HttpError } from '../http_error';
import { asPlatformRequest } from '../platform_request';

interface MappedError {
  readonly statusCode: number;
  readonly code: string;
  readonly message: string;
  readonly details: Record<string, unknown>;
}

export function errorHandlerMiddleware(baseLogger: Logger): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      next(err);
      return;
    }

    const platformReq = asPlatformRequest(req);
    const requestId = platformReq.requestId ?? `req_missing`;
    const mapped = mapError(err);
    const logger = platformReq.logger ?? baseLogger;
    const logContext = {
      requestId,
      module: 'http' as const,
      action: 'http_error',
      errorCode: mapped.code,
      statusCode: mapped.statusCode,
      httpMethod: req.method,
      path: req.path,
      stack: mapped.statusCode >= 500 && err instanceof Error ? err.stack : undefined,
    };

    if (mapped.statusCode >= 500) {
      logger.error('request_failed', logContext);
    } else {
      logger.info('request_failed', logContext);
    }

    res.status(mapped.statusCode).json(
      errorEnvelope(mapped.code, mapped.message, requestId, mapped.details),
    );
  };
}

function mapError(err: unknown): MappedError {
  if (err instanceof HttpError) {
    return {
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details,
    };
  }
  if (isMalformedJson(err)) {
    return {
      statusCode: 400,
      code: 'validation_failed',
      message: 'Request body is not valid JSON.',
      details: {},
    };
  }
  return {
    statusCode: 500,
    code: 'internal_error',
    message: 'An unexpected error occurred.',
    details: {},
  };
}

function isMalformedJson(err: unknown): boolean {
  return err instanceof SyntaxError && 'body' in err;
}
