import type { Request } from 'express';
import type { Logger } from '../infrastructure/logging/logger';

export interface PlatformRequest extends Request {
  requestId: string;
  logger: Logger;
}

export function asPlatformRequest(req: Request): PlatformRequest {
  return req as PlatformRequest;
}
