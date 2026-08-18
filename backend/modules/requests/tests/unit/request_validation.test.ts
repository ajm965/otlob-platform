import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CreateRequestUseCase } from '../../application/use_cases/commands/create_request_use_case';
import { GetRequestUseCase } from '../../application/use_cases/queries/get_request_use_case';
import { ListRequestsUseCase } from '../../application/use_cases/queries/list_requests_use_case';
import { RequestFailure, RequestId } from '../../domain';
import {
  createSeededRequestRepository,
  MOCK_CUSTOMER_IDS,
} from '../../infrastructure/repositories/in_memory_request_repository';

function seededUseCases() {
  const repository = createSeededRequestRepository();
  return {
    create: new CreateRequestUseCase(repository),
    get: new GetRequestUseCase(repository),
    list: new ListRequestsUseCase(repository),
  };
}

test('create requires serviceId and description', async () => {
  const { create } = seededUseCases();
  await assert.rejects(
    () =>
      create.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        serviceId: '  ',
        description: 'A leak',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) =>
      error instanceof RequestFailure &&
      error.code === 'validation_failed' &&
      Array.isArray(error.details.fields) &&
      (error.details.fields as Array<{ field: string; code: string }>)[0]?.field === 'serviceId',
  );
  await assert.rejects(
    () =>
      create.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        serviceId: 'pipe-repair',
        description: '',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'validation_failed',
  );
});

test('create requires both preferred times when one is provided', async () => {
  const { create } = seededUseCases();
  await assert.rejects(
    () =>
      create.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        serviceId: 'pipe-repair',
        description: 'A leak',
        preferredTimeStart: '2026-08-20T08:00:00.000Z',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'validation_failed',
  );
});

test('create rejects an inverted preferred window', async () => {
  const { create } = seededUseCases();
  await assert.rejects(
    () =>
      create.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        serviceId: 'pipe-repair',
        description: 'A leak',
        preferredTimeStart: '2026-08-20T12:00:00.000Z',
        preferredTimeEnd: '2026-08-20T08:00:00.000Z',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'validation_failed',
  );
});

test('create rejects invalid ISO-8601 preferred times', async () => {
  const { create } = seededUseCases();
  await assert.rejects(
    () =>
      create.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        serviceId: 'pipe-repair',
        description: 'A leak',
        preferredTimeStart: 'not-a-date',
        preferredTimeEnd: '2026-08-20T12:00:00.000Z',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'validation_failed',
  );
});

test('list rejects an undocumented request status enum', async () => {
  const { list } = seededUseCases();
  await assert.rejects(
    () =>
      list.execute({
        customerId: MOCK_CUSTOMER_IDS.offline,
        status: 'pending',
        marketId: 'sa',
        countryCode: 'SA',
      }),
    (error: unknown) =>
      error instanceof RequestFailure &&
      error.code === 'validation_failed' &&
      Array.isArray(error.details.fields) &&
      (error.details.fields as Array<{ code: string }>)[0]?.code === 'invalid_enum',
  );
});

test('get requires requestId', async () => {
  const { get } = seededUseCases();
  await assert.rejects(
    () => get.execute({ id: '   ' }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'validation_failed',
  );
});

test('create rejects documented-but-unmapped fields without persisting', async () => {
  const repository = createSeededRequestRepository();
  const create = new CreateRequestUseCase(repository);
  const unsupported: Array<{ field: string; input: Record<string, unknown> }> = [
    { field: 'title', input: { title: 'A title' } },
    { field: 'addressId', input: { addressId: 'addr-1' } },
    { field: 'budgetMinHalalas', input: { budgetMinHalalas: 1000 } },
    { field: 'budgetMaxHalalas', input: { budgetMaxHalalas: 5000 } },
    { field: 'mediaUrls', input: { mediaUrls: [] } },
  ];

  for (const testCase of unsupported) {
    await assert.rejects(
      () =>
        create.execute({
          customerId: MOCK_CUSTOMER_IDS.offline,
          serviceId: 'pipe-repair',
          description: 'A leak',
          marketId: 'sa',
          countryCode: 'SA',
          ...testCase.input,
        }),
      (error: unknown) =>
        error instanceof RequestFailure &&
        error.code === 'validation_failed' &&
        Array.isArray(error.details.fields) &&
        (error.details.fields as Array<{ field: string }>)[0]?.field === testCase.field,
    );
  }

  assert.equal(await repository.count(), 3);
  assert.equal(await repository.findById(RequestId.from('req-004')), null);
});
