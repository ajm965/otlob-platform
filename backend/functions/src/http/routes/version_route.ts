import type { Express, Request, Response } from 'express';
import type { AppConfig } from '../../config/app_config';
import { successEnvelope } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

export function registerVersionRoute(app: Express, config: AppConfig): void {
  app.get('/v1/version', (req: Request, res: Response): void => {
    asPlatformRequest(req).logger.debug('version_ok', { action: 'version' });
    res.status(200).json(
      successEnvelope({
        name: config.serviceName,
        version: config.serviceVersion,
        apiVersion: config.apiVersion,
        environment: config.environment,
      }),
    );
  });
}
