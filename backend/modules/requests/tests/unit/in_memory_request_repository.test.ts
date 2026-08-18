import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RequestStatus } from '../../domain';
import {
  createSeededRequestRepository,
  MOCK_CUSTOMER_IDS,
  MOCK_REQUEST_IDS,
} from '../../infrastructure/repositories/in_memory_request_repository';

test('seeded request repository filters by customerId and status', async () => {
  const repository = createSeededRequestRepository();
  const mine = await repository.findAll({ customerId: MOCK_CUSTOMER_IDS.offline });
  assert.equal(mine.length, 2);
  assert.deepEqual(
    mine.map((request) => request.id.value),
    [MOCK_REQUEST_IDS.draftMine, MOCK_REQUEST_IDS.openMine],
  );

  const mineDrafts = await repository.findAll({
    customerId: MOCK_CUSTOMER_IDS.offline,
    statuses: [RequestStatus.Draft],
  });
  assert.equal(mineDrafts.length, 1);
  assert.equal(mineDrafts[0]?.id.value, MOCK_REQUEST_IDS.draftMine);
});

test('paginate returns a deterministic cursor over seeded ids', async () => {
  const repository = createSeededRequestRepository();
  const first = await repository.paginate({ cursor: null, pageSize: 1 }, { customerId: MOCK_CUSTOMER_IDS.offline });
  assert.equal(first.items.length, 1);
  assert.equal(first.items[0]?.id.value, MOCK_REQUEST_IDS.draftMine);
  assert.equal(first.pageInfo.nextCursor, MOCK_REQUEST_IDS.draftMine);
  assert.equal(first.pageInfo.hasMore, true);

  const second = await repository.paginate(
    { cursor: first.pageInfo.nextCursor, pageSize: 1 },
    { customerId: MOCK_CUSTOMER_IDS.offline },
  );
  assert.equal(second.items[0]?.id.value, MOCK_REQUEST_IDS.openMine);
  assert.equal(second.pageInfo.hasMore, false);
});
