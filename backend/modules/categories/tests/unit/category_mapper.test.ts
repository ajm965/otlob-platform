import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toCategoryResponse } from '../../application/mappers/category_mapper';
import { createMockCategories, MOCK_CATEGORY_IDS } from '../../infrastructure/repositories/in_memory_category_repository';

test('maps category domain fields to the catalog response DTO', () => {
  const plumbing = createMockCategories().find((category) => category.id.value === MOCK_CATEGORY_IDS.plumbing);
  assert.ok(plumbing);
  assert.deepEqual(toCategoryResponse(plumbing), {
    id: 'plumbing',
    marketId: 'sa',
    countryCode: 'SA',
    nameAr: 'سباكة',
    nameEn: 'Plumbing',
    isActive: true,
    sortOrder: 1,
  });
});
