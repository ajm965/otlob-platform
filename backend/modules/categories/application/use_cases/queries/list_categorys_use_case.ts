import type { CursorPageResponseDto } from '@otlob/core';
import { CategoryStatus, type ICategoryRepository } from '../../../domain';
import type { CategoryResponse, SearchCategoriesQueryDto } from '../../dto';
import { toCategoryResponse } from '../../mappers/category_mapper';
import type { IListCategorysUseCase } from './i_list_categorys_use_case';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export class ListCategorysUseCase implements IListCategorysUseCase {
  public constructor(private readonly categoryRepository: ICategoryRepository) {}

  public async execute(input: SearchCategoriesQueryDto): Promise<CursorPageResponseDto<CategoryResponse>> {
    const page = await this.categoryRepository.paginate(
      {
        cursor: input.cursor ?? null,
        pageSize: normalizePageSize(input.pageSize),
      },
      {
        statuses: input.activeOnly === true ? [CategoryStatus.Active] : undefined,
        marketId: input.marketId,
        countryCode: input.countryCode,
      },
      { field: 'sortOrder', direction: 'asc' },
    );
    return {
      items: page.items.map(toCategoryResponse),
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
