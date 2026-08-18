export type AppEnvironment = 'development' | 'staging' | 'production';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface ProcessEnvironment {
  readonly OTLB_ENV?: string;
  readonly NODE_ENV?: string;
  readonly OTLB_LOG_LEVEL?: string;
  readonly LOG_LEVEL?: string;
  readonly OTLB_SERVICE_NAME?: string;
  readonly OTLB_SERVICE_VERSION?: string;
  readonly OTLB_FUNCTION_REGION?: string;
  readonly FIREBASE_PROJECT_ID?: string;
  readonly GCLOUD_PROJECT?: string;
  readonly GCP_PROJECT?: string;
  readonly FIREBASE_CONFIG?: string;
}

const ENVIRONMENTS: readonly AppEnvironment[] = ['development', 'staging', 'production'];
const LOG_LEVELS: readonly LogLevel[] = ['debug', 'info', 'warn', 'error', 'critical'];

export function readEnvironmentName(env: ProcessEnvironment): AppEnvironment {
  const explicit = env.OTLB_ENV?.trim().toLowerCase();
  if (explicit && isAppEnvironment(explicit)) {
    return explicit;
  }
  if (env.NODE_ENV === 'production') {
    return 'production';
  }
  return 'development';
}

export function readLogLevel(env: ProcessEnvironment): LogLevel {
  const raw = (env.OTLB_LOG_LEVEL ?? env.LOG_LEVEL)?.trim().toLowerCase();
  if (raw && isLogLevel(raw)) {
    return raw;
  }
  return 'info';
}

export function readFirebaseProjectId(env: ProcessEnvironment): string {
  const direct = env.FIREBASE_PROJECT_ID?.trim() || env.GCLOUD_PROJECT?.trim() || env.GCP_PROJECT?.trim();
  if (direct) {
    return direct;
  }
  if (env.FIREBASE_CONFIG) {
    const projectId = parseFirebaseConfigProjectId(env.FIREBASE_CONFIG);
    if (projectId) {
      return projectId;
    }
  }
  throw new Error(
    'Firebase project id is required. Set FIREBASE_PROJECT_ID or run inside Cloud Functions.',
  );
}

function parseFirebaseConfigProjectId(raw: string): string | undefined {
  try {
    const parsed = JSON.parse(raw) as { projectId?: unknown };
    return typeof parsed.projectId === 'string' && parsed.projectId.trim().length > 0
      ? parsed.projectId.trim()
      : undefined;
  } catch {
    throw new Error('FIREBASE_CONFIG is not valid JSON.');
  }
}

function isAppEnvironment(value: string): value is AppEnvironment {
  return (ENVIRONMENTS as readonly string[]).includes(value);
}

function isLogLevel(value: string): value is LogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}
