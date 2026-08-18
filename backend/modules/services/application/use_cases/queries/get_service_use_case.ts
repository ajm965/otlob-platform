import type { EntityIdDto } from '@otlob/core';
import { CatalogQueryFailure, ServiceId, type IServiceRepository } from '../../../domain';
import type { ServiceResponse } from '../../dto';
import { toServiceResponse } from '../../mappers/service_mapper';
import type { IGetServiceUseCase } from './i_get_service_use_case';

export class GetServiceUseCase implements IGetServiceUseCase {
  public constructor(private readonly serviceRepository: IServiceRepository) {}

  public async execute(input: EntityIdDto): Promise<ServiceResponse> {
    const id = input.id.trim();
    if (id.length === 0) {
      throw new CatalogQueryFailure('validation_failed', 'Required field missing', {
        fields: [{ field: 'serviceId', code: 'required' }],
      });
    }
    const service = await this.serviceRepository.findById(ServiceId.from(id));
    if (service === null) {
      throw new CatalogQueryFailure('not_found', 'The requested path was not found.', {
        serviceId: id,
      });
    }
    return toServiceResponse(service);
  }
}
