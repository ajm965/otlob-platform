import type { LogLevel } from '../../config/app_config';

export interface LogContext {
  readonly requestId?: string;
  readonly module?: string;
  readonly action?: string;
  readonly durationMs?: number;
  readonly errorCode?: string;
  readonly statusCode?: number;
  readonly httpMethod?: string;
  readonly path?: string;
  readonly stack?: string;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  critical(message: string, context?: LogContext): void;
  withContext(context: LogContext): Logger;
}

export const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  critical: 50,
};
