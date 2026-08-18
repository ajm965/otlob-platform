import { ServiceStatus } from '../../domain';
import type { Service } from '../../domain';
import type { ServiceResponse } from '../dto';

export function toServiceResponse(service: Service): ServiceResponse {
  return {
    id: service.id.value,
    marketId: service.marketId,
    countryCode: service.countryCode,
    categoryId: service.categoryId,
    nameAr: service.name.ar,
    nameEn: service.name.en,
    isActive: service.status === ServiceStatus.Active,
  };
}
