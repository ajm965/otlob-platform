import { CategoryStatus } from '../../domain';
import type { Category } from '../../domain';
import type { CategoryResponse } from '../dto';

export function toCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id.value,
    marketId: category.marketId,
    countryCode: category.countryCode,
    nameAr: category.name.ar,
    nameEn: category.name.en,
    isActive: category.status === CategoryStatus.Active,
    sortOrder: category.sortOrder,
  };
}
