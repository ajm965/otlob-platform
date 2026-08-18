import type { EntityIdDto } from '@otlob/core';
import { RequestFailure, RequestId, type IRequestRepository } from '../../../domain';
import type { RequestResponse } from '../../dto';
import { toRequestResponse } from '../../mappers/request_mapper';
import type { IGetRequestUseCase } from './i_get_request_use_case';

export class GetRequestUseCase implements IGetRequestUseCase {
  public constructor(private readonly requestRepository: IRequestRepository) {}

  public async execute(input: EntityIdDto): Promise<RequestResponse> {
    const id = input.id.trim();
    if (id.length === 0) {
      throw new RequestFailure('validation_failed', 'Required field missing', {
        fields: [{ field: 'requestId', code: 'required' }],
      });
    }
    const request = await this.requestRepository.findById(RequestId.from(id));
    if (request === null) {
      throw new RequestFailure('not_found', 'The requested path was not found.', {
        requestId: id,
      });
    }
    return toRequestResponse(request);
  }
}
