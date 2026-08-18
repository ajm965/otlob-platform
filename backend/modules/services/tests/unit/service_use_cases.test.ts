import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CatalogQueryFailure } from '../../domain';
import { GetServiceUseCase } from '../../application/use_cases/queries/get_service_use_case';
import { ListServicesUseCase } from '../../application/use_cases/queries/list_services_use_case';
import { createSeededServiceRepository, MOCK_SERVICE_IDS } from '../../infrastructure/repositories/in_memory_service_repository';

test('list services honors categoryId and activeOnly', async () => {
  const useCase = new ListServicesUseCase(createSeededServiceRepository());
  const acActive = await useCase.execute({ categoryId: 'ac', activeOnly: true });
  assert.equal(acActive.items.length, 1);
  assert.equal(acActive.items[0]?.id, MOCK_SERVICE_IDS.acGasRefill);
});

test('get service returns a deterministic item and not_found for unknown ids', async () => {
  const useCase = new GetServiceUseCase(createSeededServiceRepository());
  const found = await useCase.execute({ id: MOCK_SERVICE_IDS.acGasRefill });
  assert.equal(found.nameEn, 'AC Gas Refill');
  await assert.rejects(
    () => useCase.execute({ id: 'missing-service' }),
    (error: unknown) => error instanceof CatalogQueryFailure && error.code === 'not_found',
  );
});
