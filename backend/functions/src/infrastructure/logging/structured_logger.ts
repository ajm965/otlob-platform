import type { AppConfig, LogLevel } from '../../config/app_config';
import { LOG_LEVEL_RANK, type LogContext, type Logger } from './logger';

interface LogRecord {
  readonly timestamp: string;
  readonly severity: LogLevel;
  readonly message: string;
  readonly service: string;
  readonly environment: string;
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

export class StructuredLogger implements Logger {
  public constructor(
    private readonly config: AppConfig,
    private readonly baseContext: LogContext = {},
  ) {}

  public debug(message: string, context?: LogContext): void {
    this.write('debug', message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.write('info', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.write('warn', message, context);
  }

  public error(message: string, context?: LogContext): void {
    this.write('error', message, context);
  }

  public critical(message: string, context?: LogContext): void {
    this.write('critical', message, context);
  }

  public withContext(context: LogContext): Logger {
    return new StructuredLogger(this.config, { ...this.baseContext, ...context });
  }

  private write(severity: LogLevel, message: string, context?: LogContext): void {
    if (LOG_LEVEL_RANK[severity] < LOG_LEVEL_RANK[this.config.logLevel]) {
      return;
    }
    const merged = { ...this.baseContext, ...context };
    const record: LogRecord = {
      timestamp: new Date().toISOString(),
      severity,
      message,
      service: this.config.serviceName,
      environment: this.config.environment,
      requestId: merged.requestId,
      module: merged.module,
      action: merged.action,
      durationMs: merged.durationMs,
      errorCode: merged.errorCode,
      statusCode: merged.statusCode,
      httpMethod: merged.httpMethod,
      path: merged.path,
      stack: merged.stack,
    };
    const line = JSON.stringify(record);
    if (severity === 'error' || severity === 'critical') {
      process.stderr.write(`${line}\n`);
      return;
    }
    process.stdout.write(`${line}\n`);
  }
}
