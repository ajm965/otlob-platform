import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ServiceStatus } from '../../domain';
import {
  createSeededServiceRepository,
  MOCK_SERVICE_IDS,
} from '../../infrastructure/repositories/in_memory_service_repository';

test('seeded service repository filters by categoryId and active status', async () => {
  const repository = createSeededServiceRepository();
  const acServices = await repository.findAll({ categoryId: 'ac' });
  assert.equal(acServices.length, 2);
  const activeAc = await repository.findAll({
    categoryId: 'ac',
    statuses: [ServiceStatus.Active],
  });
  assert.equal(activeAc.length, 1);
  assert.equal(activeAc[0]?.id.value, MOCK_SERVICE_IDS.acGasRefill);
});
