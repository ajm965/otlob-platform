import type { NextFunction, Request, Response } from 'express';
import type { Logger } from '../../infrastructure/logging/logger';
import { asPlatformRequest } from '../platform_request';

export function loggingMiddleware(baseLogger: Logger) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const startedAt = Date.now();
    const platformReq = asPlatformRequest(req);
    const requestLogger = baseLogger.withContext({
      requestId: platformReq.requestId,
      module: 'http',
      httpMethod: req.method,
      path: req.path,
    });
    platformReq.logger = requestLogger;
    requestLogger.info('request_started', {
      action: 'http_request',
    });
    res.on('finish', () => {
      const level = res.statusCode >= 500 ? 'error' : 'info';
      requestLogger[level]('request_completed', {
        action: 'http_request',
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt,
      });
    });
    next();
  };
}
