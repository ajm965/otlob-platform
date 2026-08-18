import {
  type AppEnvironment,
  type LogLevel,
  type ProcessEnvironment,
  readEnvironmentName,
  readFirebaseProjectId,
  readLogLevel,
} from './environment';

export type { AppEnvironment, LogLevel };

export interface AppConfig {
  readonly environment: AppEnvironment;
  readonly serviceName: string;
  readonly serviceVersion: string;
  readonly apiVersion: string;
  readonly logLevel: LogLevel;
  readonly firebaseProjectId: string;
  readonly functionRegion: string;
}

export function loadAppConfig(env: ProcessEnvironment): AppConfig {
  return {
    environment: readEnvironmentName(env),
    serviceName: env.OTLB_SERVICE_NAME?.trim() || 'otlob-platform-api',
    serviceVersion: env.OTLB_SERVICE_VERSION?.trim() || '0.1.0',
    apiVersion: 'v1',
    logLevel: readLogLevel(env),
    firebaseProjectId: readFirebaseProjectId(env),
    functionRegion: env.OTLB_FUNCTION_REGION?.trim() || 'europe-west1',
  };
}
