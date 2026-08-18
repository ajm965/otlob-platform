import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CreateRequestUseCase } from '../../application/use_cases/commands/create_request_use_case';
import { GetRequestUseCase } from '../../application/use_cases/queries/get_request_use_case';
import { ListRequestsUseCase } from '../../application/use_cases/queries/list_requests_use_case';
import { RequestFailure } from '../../domain';
import {
  createSeededRequestRepository,
  MOCK_CUSTOMER_IDS,
  MOCK_REQUEST_IDS,
} from '../../infrastructure/repositories/in_memory_request_repository';

function seededUseCases() {
  const repository = createSeededRequestRepository();
  return {
    create: new CreateRequestUseCase(repository),
    get: new GetRequestUseCase(repository),
    list: new ListRequestsUseCase(repository),
  };
}

test('create request assigns a deterministic id and lands in draft', async () => {
  const { create, get } = seededUseCases();
  const created = await create.execute({
    customerId: MOCK_CUSTOMER_IDS.offline,
    serviceId: 'pipe-repair',
    description: 'New leak under sink',
    marketId: 'sa',
    countryCode: 'SA',
  });
  assert.equal(created.id, 'req-004');
  assert.equal(created.status, 'draft');
  assert.equal(created.customerId, MOCK_CUSTOMER_IDS.offline);
  assert.equal(created.location, null);

  const loaded = await get.execute({ id: 'req-004' });
  assert.equal(loaded.description, 'New leak under sink');
});

test('create request ids increment deterministically', async () => {
  const { create } = seededUseCases();
  const first = await create.execute({
    customerId: MOCK_CUSTOMER_IDS.offline,
    serviceId: 'pipe-repair',
    description: 'First',
    marketId: 'sa',
    countryCode: 'SA',
  });
  const second = await create.execute({
    customerId: MOCK_CUSTOMER_IDS.offline,
    serviceId: 'pipe-repair',
    description: 'Second',
    marketId: 'sa',
    countryCode: 'SA',
  });
  assert.equal(first.id, 'req-004');
  assert.equal(second.id, 'req-005');
});

test('list customer requests excludes other customers and can filter status', async () => {
  const { list } = seededUseCases();
  const mine = await list.execute({ customerId: MOCK_CUSTOMER_IDS.offline, marketId: 'sa', countryCode: 'SA' });
  assert.equal(mine.items.length, 2);
  assert.deepEqual(
    mine.items.map((item) => item.id),
    [MOCK_REQUEST_IDS.draftMine, MOCK_REQUEST_IDS.openMine],
  );
  assert.equal(mine.nextCursor, null);

  const drafts = await list.execute({
    customerId: MOCK_CUSTOMER_IDS.offline,
    status: 'draft',
    marketId: 'sa',
    countryCode: 'SA',
  });
  assert.equal(drafts.items.length, 1);
  assert.equal(drafts.items[0]?.id, MOCK_REQUEST_IDS.draftMine);
});

test('get request returns a deterministic item and not_found for unknown ids', async () => {
  const { get } = seededUseCases();
  const found = await get.execute({ id: MOCK_REQUEST_IDS.openMine });
  assert.equal(found.serviceId, 'ac-gas-refill');
  await assert.rejects(
    () => get.execute({ id: 'missing-request' }),
    (error: unknown) => error instanceof RequestFailure && error.code === 'not_found',
  );
});
