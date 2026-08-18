import { DateRange } from '@otlob/core';
import { RequestFailure, RequestId, RequestStatus, ServiceRequest, type IRequestRepository } from '../../../domain';
import type { CreateRequestRequest, RequestResponse } from '../../dto';
import { toRequestResponse } from '../../mappers/request_mapper';
import type { ICreateRequestUseCase } from './i_create_request_use_case';

export class CreateRequestUseCase implements ICreateRequestUseCase {
  public constructor(private readonly requestRepository: IRequestRepository) {}

  public async execute(input: CreateRequestRequest): Promise<RequestResponse> {
    rejectUnsupportedCreateFields(input);
    const customerId = requiredText(input.customerId, 'customerId');
    const serviceId = requiredText(input.serviceId, 'serviceId');
    const description = requiredText(input.description, 'description');
    const marketId = requiredText(input.marketId, 'marketId');
    const countryCode = requiredText(input.countryCode, 'countryCode');
    const preferredWindow = parsePreferredWindow(input.preferredTimeStart, input.preferredTimeEnd);
    const id = await this.nextRequestId(input.id);

    const created = await this.requestRepository.create(
      ServiceRequest.create(id, {
        customerId,
        serviceId,
        status: RequestStatus.Draft,
        description,
        location: null,
        preferredWindow,
        acceptedOfferId: null,
        bookingId: null,
        marketId,
        countryCode,
      }),
    );
    return toRequestResponse(created);
  }

  private async nextRequestId(explicitId: string | undefined): Promise<RequestId> {
    if (explicitId !== undefined && explicitId.trim().length > 0) {
      return RequestId.from(explicitId.trim());
    }
    const next = (await this.requestRepository.count()) + 1;
    return RequestId.from(`req-${String(next).padStart(3, '0')}`);
  }
}

const UNSUPPORTED_CREATE_FIELDS = [
  'title',
  'addressId',
  'budgetMinHalalas',
  'budgetMaxHalalas',
  'mediaUrls',
] as const;

function rejectUnsupportedCreateFields(input: CreateRequestRequest): void {
  const fields = UNSUPPORTED_CREATE_FIELDS.filter((field) => input[field] !== undefined).map((field) => ({
    field,
  }));
  if (fields.length > 0) {
    throw new RequestFailure('validation_failed', 'Unsupported field', { fields });
  }
}

function requiredText(value: string | undefined, field: string): string {
  const trimmed = value?.trim() ?? '';
  if (trimmed.length === 0) {
    throw new RequestFailure('validation_failed', 'Required field missing', {
      fields: [{ field, code: 'required' }],
    });
  }
  return trimmed;
}

function parsePreferredWindow(start?: string | null, end?: string | null): DateRange | null {
  const startText = nullableText(start);
  const endText = nullableText(end);
  if (startText === null && endText === null) {
    return null;
  }
  if (startText === null) {
    throw new RequestFailure('validation_failed', 'Required field missing', {
      fields: [{ field: 'preferredTimeStart', code: 'required' }],
    });
  }
  if (endText === null) {
    throw new RequestFailure('validation_failed', 'Required field missing', {
      fields: [{ field: 'preferredTimeEnd', code: 'required' }],
    });
  }
  const startDate = parseIso(startText, 'preferredTimeStart');
  const endDate = parseIso(endText, 'preferredTimeEnd');
  try {
    return DateRange.create(startDate, endDate);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid preferred time window';
    throw new RequestFailure('validation_failed', message, {
      fields: [{ field: 'preferredTimeEnd', code: 'too_low' }],
    });
  }
}

function parseIso(value: string, field: string): Date {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new RequestFailure('validation_failed', 'Invalid ISO-8601 datetime', { field });
  }
  return parsed;
}

function nullableText(value: string | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}
