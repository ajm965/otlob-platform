import type { Express, Request, Response } from 'express';
import { errorEnvelope } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

function sendNotImplemented(req: Request, res: Response): void {
  const requestId = asPlatformRequest(req).requestId ?? 'req_missing';
  res.status(501).json(
    errorEnvelope('not_implemented', 'This authentication endpoint is not implemented.', requestId),
  );
}

export function registerAuthRoutes(app: Express): void {
  app.post('/auth/bootstrap', sendNotImplemented);
  app.post('/v1/auth/bootstrap', sendNotImplemented);
  app.get('/auth/me', sendNotImplemented);
  app.get('/v1/auth/me', sendNotImplemented);
  app.patch('/auth/me', sendNotImplemented);
  app.patch('/v1/auth/me', sendNotImplemented);
  app.post('/auth/devices', sendNotImplemented);
  app.post('/v1/auth/devices', sendNotImplemented);
  app.delete('/auth/devices', sendNotImplemented);
  app.delete('/v1/auth/devices', sendNotImplemented);
}
