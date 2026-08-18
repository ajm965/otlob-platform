import {
  createSeededCategoryRepository,
  createSeededServiceRepository,
  GetServiceUseCase,
  ListCategorysUseCase,
  ListServicesUseCase,
} from '@otlob/backend';
import { loadAppConfig, type AppConfig } from './config/app_config';
import { Container } from './di/container';
import { tokens } from './di/tokens';
import { initializeFirebaseAdmin } from './infrastructure/firebase/admin_app';
import type { Logger } from './infrastructure/logging/logger';
import { StructuredLogger } from './infrastructure/logging/structured_logger';

export interface CompositionRoot {
  readonly container: Container;
  readonly config: AppConfig;
}

export function createCompositionRoot(env: NodeJS.ProcessEnv = process.env): CompositionRoot {
  const config = loadAppConfig(env);
  const logger: Logger = new StructuredLogger(config);
  const firebaseApp = initializeFirebaseAdmin(config);

  const categoryRepository = createSeededCategoryRepository();
  const serviceRepository = createSeededServiceRepository();

  const container = new Container();
  container.register(tokens.config, config);
  container.register(tokens.logger, logger);
  container.register(tokens.firebaseApp, firebaseApp);
  container.register(tokens.listCategoriesUseCase, new ListCategorysUseCase(categoryRepository));
  container.register(tokens.listServicesUseCase, new ListServicesUseCase(serviceRepository));
  container.register(tokens.getServiceUseCase, new GetServiceUseCase(serviceRepository));

  logger.info('platform_bootstrapped', {
    module: 'platform',
    action: 'bootstrap',
  });

  return { container, config };
}
