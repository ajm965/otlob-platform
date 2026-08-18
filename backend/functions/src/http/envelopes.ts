export const REQUEST_ID_HEADER = 'x-request-id';

export interface SuccessEnvelope<T> {
  readonly data: T;
}

export interface ErrorEnvelope {
  readonly error: {
    readonly code: string;
    readonly message: string;
    readonly details: Record<string, unknown>;
    readonly requestId: string;
  };
}

export function successEnvelope<T>(data: T): SuccessEnvelope<T> {
  return { data };
}

export function errorEnvelope(
  code: string,
  message: string,
  requestId: string,
  details: Record<string, unknown> = {},
): ErrorEnvelope {
  return {
    error: {
      code,
      message,
      details,
      requestId,
    },
  };
}
