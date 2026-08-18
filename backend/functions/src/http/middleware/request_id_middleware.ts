import { randomUUID } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';
import { REQUEST_ID_HEADER } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

const REQUEST_ID_PATTERN = /^[\w.-]{8,128}$/;

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  const headerValue = headerToString(req.headers[REQUEST_ID_HEADER]);
  const requestId = headerValue && REQUEST_ID_PATTERN.test(headerValue) ? headerValue : `req_${randomUUID()}`;
  asPlatformRequest(req).requestId = requestId;
  res.setHeader(REQUEST_ID_HEADER, requestId);
  next();
}

function headerToString(value: string | string[] | undefined): string | undefined {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0].trim();
  }
  return undefined;
}
