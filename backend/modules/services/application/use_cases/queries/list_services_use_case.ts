import type { CursorPageResponseDto } from '@otlob/core';
import { ServiceStatus, type IServiceRepository } from '../../../domain';
import type { SearchServicesQueryDto, ServiceResponse } from '../../dto';
import { toServiceResponse } from '../../mappers/service_mapper';
import type { IListServicesUseCase } from './i_list_services_use_case';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export class ListServicesUseCase implements IListServicesUseCase {
  public constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(input: SearchServicesQueryDto): Promise<CursorPageResponseDto<ServiceResponse>> {
    const page = await this.serviceRepository.paginate(
      {
        cursor: input.cursor ?? null,
        pageSize: normalizePageSize(input.pageSize),
      },
      {
        statuses: input.activeOnly === true ? [ServiceStatus.Active] : undefined,
        marketId: input.marketId,
        countryCode: input.countryCode,
        categoryId: input.categoryId,
      },
    );
    return {
      items: page.items.map(toServiceResponse),
      nextCursor: page.pageInfo.nextCursor,
      hasMore: page.pageInfo.hasMore,
    };
  }
}

function normalizePageSize(pageSize: number | undefined): number {
  if (pageSize === undefined || pageSize < 1) {
    return DEFAULT_PAGE_SIZE;
  }
  return Math.min(pageSize, MAX_PAGE_SIZE);
}
