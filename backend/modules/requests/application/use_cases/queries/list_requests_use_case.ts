import type { CursorPageResponseDto } from '@otlob/core';
import { RequestFailure, RequestStatus, type IRequestRepository } from '../../../domain';
import type { FindPendingRequestsQueryDto, RequestResponse } from '../../dto';
import { toRequestResponse } from '../../mappers/request_mapper';
import type { IListRequestsUseCase } from './i_list_requests_use_case';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export class ListRequestsUseCase implements IListRequestsUseCase {
  public constructor(private readonly requestRepository: IRequestRepository) {}

  public async execute(input: FindPendingRequestsQueryDto): Promise<CursorPageResponseDto<RequestResponse>> {
    const page = await this.requestRepository.paginate(
      {
        cursor: input.cursor ?? null,
        pageSize: normalizePageSize(input.pageSize),
      },
      {
        statuses: parseStatus(input.status),
        marketId: input.marketId,
        countryCode: input.countryCode,
        customerId: input.customerId,
      },
    );
    return {
      items: page.items.map(toRequestResponse),
      nextCursor: page.pageInfo.nextCursor,
      hasMore: page.pageInfo.hasMore,
    };
  }
}

function parseStatus(status: string | undefined): RequestStatus[] | undefined {
  if (status === undefined || status.trim().length === 0) {
    return undefined;
  }
  const value = status.trim();
  const allowed = Object.values(RequestStatus) as string[];
  if (!allowed.includes(value)) {
    throw new RequestFailure('validation_failed', 'Invalid enum value', {
      fields: [{ field: 'status', code: 'invalid_enum' }],
    });
  }
  return [value as RequestStatus];
}

function normalizePageSize(pageSize: number | undefined): number {
  if (pageSize === undefined || pageSize < 1) {
    return DEFAULT_PAGE_SIZE;
  }
  return Math.min(pageSize, MAX_PAGE_SIZE);
}
