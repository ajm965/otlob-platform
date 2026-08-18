import { Phone } from '@otlob/core';
import { AuthenticationFailure } from '../../domain';

export function parsePhone(value: string): Phone {
  try {
    return Phone.create(value);
  } catch {
    throw new AuthenticationFailure('validation_failed', 'Invalid phone/OTP format', {
      fields: [{ field: 'phone' }],
    });
  }
}

export function requireTrimmed(value: string | undefined, field: string): string {
  const trimmed = value?.trim() ?? '';
  if (trimmed.length === 0) {
    throw new AuthenticationFailure('validation_failed', 'Required field missing', {
      fields: [{ field, code: 'required' }],
    });
  }
  return trimmed;
}

export function requireLocale(value: string): 'ar' | 'en' {
  if (value === 'ar' || value === 'en') {
    return value;
  }
  throw new AuthenticationFailure('validation_failed', 'Unsupported value', {
    fields: [{ field: 'locale', code: 'invalid_enum' }],
  });
}

export function requirePrimaryRole(
  value: string,
): 'customer' | 'technician' | 'company_operator' {
  if (value === 'customer' || value === 'technician' || value === 'company_operator') {
    return value;
  }
  throw new AuthenticationFailure('validation_failed', 'Unsupported value', {
    fields: [{ field: 'primaryRole', code: 'invalid_enum' }],
  });
}
