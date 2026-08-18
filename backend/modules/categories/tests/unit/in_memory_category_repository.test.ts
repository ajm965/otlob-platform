import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CategoryStatus } from '../../domain';
import {
  createSeededCategoryRepository,
  MOCK_CATEGORY_IDS,
} from '../../infrastructure/repositories/in_memory_category_repository';

test('seeded category repository returns deterministic catalog data', async () => {
  const repository = createSeededCategoryRepository();
  const all = await repository.findAll();
  assert.equal(all.length, 4);
  assert.equal(all[0]?.id.value, MOCK_CATEGORY_IDS.plumbing);
  const active = await repository.findAll({ statuses: [CategoryStatus.Active] });
  assert.equal(active.length, 3);
});

test('category repository paginates with an opaque id cursor', async () => {
  const repository = createSeededCategoryRepository();
  const first = await repository.paginate(
    { cursor: null, pageSize: 2 },
    undefined,
    { field: 'sortOrder', direction: 'asc' },
  );
  assert.equal(first.items.length, 2);
  assert.equal(first.pageInfo.hasMore, true);
  const second = await repository.paginate(
    { cursor: first.pageInfo.nextCursor, pageSize: 2 },
    undefined,
    { field: 'sortOrder', direction: 'asc' },
  );
  assert.equal(second.items[0]?.id.value, MOCK_CATEGORY_IDS.ac);
});
