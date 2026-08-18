import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ListCategorysUseCase } from '../../application/use_cases/queries/list_categorys_use_case';
import { createSeededCategoryRepository, MOCK_CATEGORY_IDS } from '../../infrastructure/repositories/in_memory_category_repository';

test('list categories returns sortOrder-ordered items and honors activeOnly', async () => {
  const useCase = new ListCategorysUseCase(createSeededCategoryRepository());
  const all = await useCase.execute({});
  assert.equal(all.items.length, 4);
  assert.equal(all.items[0]?.id, MOCK_CATEGORY_IDS.plumbing);
  assert.equal(all.hasMore, false);

  const active = await useCase.execute({ activeOnly: true });
  assert.equal(active.items.length, 3);
  assert.ok(active.items.every((item) => item.isActive));
});
