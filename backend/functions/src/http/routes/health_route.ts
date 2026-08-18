import type { Express, Request, Response } from 'express';
import type { AppConfig } from '../../config/app_config';
import { successEnvelope } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

export function registerHealthRoute(app: Express, config: AppConfig): void {
  const handler = (req: Request, res: Response): void => {
    asPlatformRequest(req).logger.debug('health_ok', { action: 'health' });
    res.status(200).json(
      successEnvelope({
        status: 'ok',
        version: config.serviceVersion,
      }),
    );
  };
  app.get('/health', handler);
  app.get('/v1/health', handler);
}
