import express, { type Express } from 'express';
import type { AppConfig } from '../config/app_config';
import { Container } from '../di/container';
import { tokens } from '../di/tokens';
import type { Logger } from '../infrastructure/logging/logger';
import { errorHandlerMiddleware } from './middleware/error_handler_middleware';
import { loggingMiddleware } from './middleware/logging_middleware';
import { notFoundMiddleware } from './middleware/not_found_middleware';
import { requestIdMiddleware } from './middleware/request_id_middleware';
import { registerAuthRoutes } from './routes/auth_routes';
import { registerHealthRoute } from './routes/health_route';
import { registerVersionRoute } from './routes/version_route';

export function createHttpApp(container: Container): Express {
  const config = container.resolve<AppConfig>(tokens.config);
  const logger = container.resolve<Logger>(tokens.logger);
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.use(requestIdMiddleware);
  app.use(express.json({ limit: '1mb' }));
  app.use(loggingMiddleware(logger));

  registerHealthRoute(app, config);
  registerVersionRoute(app, config);
  registerAuthRoutes(app);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware(logger));

  return app;
}
