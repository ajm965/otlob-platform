import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toServiceResponse } from '../../application/mappers/service_mapper';
import { createMockServices, MOCK_SERVICE_IDS } from '../../infrastructure/repositories/in_memory_service_repository';

test('maps service domain fields to the catalog response DTO', () => {
  const refill = createMockServices().find((service) => service.id.value === MOCK_SERVICE_IDS.acGasRefill);
  assert.ok(refill);
  assert.deepEqual(toServiceResponse(refill), {
    id: 'ac-gas-refill',
    marketId: 'sa',
    countryCode: 'SA',
    categoryId: 'ac',
    nameAr: 'تعبئة غاز التكييف',
    nameEn: 'AC Gas Refill',
    isActive: true,
  });
});
