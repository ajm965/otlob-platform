import type { CursorPagination, Page, SortOptions } from '@otlob/core';
import { LocalizedLabel } from '@otlob/core';
import {
  Category,
  CategoryId,
  CategoryStatus,
  type CategoryFilter,
  type ICategoryRepository,
} from '../../domain';

export const MOCK_CATEGORY_IDS = {
  plumbing: 'plumbing',
  electrical: 'electrical',
  ac: 'ac',
  inactive: 'inactive-demo',
} as const;

export function createMockCategories(): readonly Category[] {
  return [
    Category.create(CategoryId.from(MOCK_CATEGORY_IDS.plumbing), {
      name: LocalizedLabel.create('سباكة', 'Plumbing'),
      status: CategoryStatus.Active,
      sortOrder: 1,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Category.create(CategoryId.from(MOCK_CATEGORY_IDS.electrical), {
      name: LocalizedLabel.create('كهرباء', 'Electrical'),
      status: CategoryStatus.Active,
      sortOrder: 2,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Category.create(CategoryId.from(MOCK_CATEGORY_IDS.ac), {
      name: LocalizedLabel.create('تكييف', 'AC'),
      status: CategoryStatus.Active,
      sortOrder: 3,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Category.create(CategoryId.from(MOCK_CATEGORY_IDS.inactive), {
      name: LocalizedLabel.create('غير نشط', 'Inactive'),
      status: CategoryStatus.Inactive,
      sortOrder: 99,
      marketId: 'sa',
      countryCode: 'SA',
    }),
  ];
}

export class InMemoryCategoryRepository implements ICategoryRepository {
  private readonly items = new Map<string, Category>();

  public constructor(seed: readonly Category[] = []) {
    for (const category of seed) {
      this.items.set(category.id.value, category);
    }
  }

  public async create(entity: Category): Promise<Category> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async update(entity: Category): Promise<Category> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async delete(id: CategoryId): Promise<void> {
    this.items.delete(id.value);
  }

  public async findById(id: CategoryId): Promise<Category | null> {
    return this.items.get(id.value) ?? null;
  }

  public async exists(id: CategoryId): Promise<boolean> {
    return this.items.has(id.value);
  }

  public async findAll(filter?: CategoryFilter, sort?: SortOptions): Promise<readonly Category[]> {
    const matched = [...this.items.values()].filter((category) => matchesCategory(category, filter));
    return sortCategories(matched, sort);
  }

  public async search(
    query: string,
    filter?: CategoryFilter,
    sort?: SortOptions,
  ): Promise<readonly Category[]> {
    const needle = query.trim().toLowerCase();
    const matched = (await this.findAll(filter, sort)).filter(
      (category) =>
        category.name.ar.toLowerCase().includes(needle) || category.name.en.toLowerCase().includes(needle),
    );
    return matched;
  }

  public async count(filter?: CategoryFilter): Promise<number> {
    return (await this.findAll(filter)).length;
  }

  public async paginate(
    pagination: CursorPagination,
    filter?: CategoryFilter,
    sort?: SortOptions,
  ): Promise<Page<Category>> {
    const all = await this.findAll(filter, sort);
    const start = startIndex(all, pagination.cursor, (item) => item.id.value);
    const items = all.slice(start, start + pagination.pageSize);
    const end = start + items.length;
    const hasMore = end < all.length;
    return {
      items,
      pageInfo: {
        nextCursor: hasMore ? items[items.length - 1]?.id.value ?? null : null,
        hasMore,
      },
    };
  }
}

export function createSeededCategoryRepository(): InMemoryCategoryRepository {
  return new InMemoryCategoryRepository(createMockCategories());
}

function matchesCategory(category: Category, filter?: CategoryFilter): boolean {
  if (filter?.statuses && !filter.statuses.includes(category.status)) {
    return false;
  }
  if (filter?.marketId && category.marketId !== filter.marketId) {
    return false;
  }
  if (filter?.countryCode && category.countryCode !== filter.countryCode) {
    return false;
  }
  return true;
}

function sortCategories(items: readonly Category[], sort?: SortOptions): readonly Category[] {
  if (sort?.field !== 'sortOrder') {
    return items;
  }
  const direction = sort.direction === 'desc' ? -1 : 1;
  return [...items].sort((left, right) => (left.sortOrder - right.sortOrder) * direction);
}

function startIndex<T>(items: readonly T[], cursor: string | null, idOf: (item: T) => string): number {
  if (cursor === null || cursor.length === 0) {
    return 0;
  }
  const index = items.findIndex((item) => idOf(item) === cursor);
  return index === -1 ? items.length : index + 1;
}
