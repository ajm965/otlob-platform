import type { CursorPagination, Page, SortOptions } from '@otlob/core';
import { LocalizedLabel } from '@otlob/core';
import {
  Service,
  ServiceId,
  ServiceStatus,
  type IServiceRepository,
  type ServiceFilter,
} from '../../domain';

export const MOCK_SERVICE_IDS = {
  pipeRepair: 'pipe-repair',
  outletRepair: 'outlet-repair',
  acGasRefill: 'ac-gas-refill',
  inactive: 'inactive-service',
} as const;

export function createMockServices(): readonly Service[] {
  return [
    Service.create(ServiceId.from(MOCK_SERVICE_IDS.pipeRepair), {
      categoryId: 'plumbing',
      name: LocalizedLabel.create('إصلاح أنابيب', 'Pipe repair'),
      status: ServiceStatus.Active,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Service.create(ServiceId.from(MOCK_SERVICE_IDS.outletRepair), {
      categoryId: 'electrical',
      name: LocalizedLabel.create('إصلاح فيش كهرباء', 'Outlet repair'),
      status: ServiceStatus.Active,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Service.create(ServiceId.from(MOCK_SERVICE_IDS.acGasRefill), {
      categoryId: 'ac',
      name: LocalizedLabel.create('تعبئة غاز التكييف', 'AC Gas Refill'),
      status: ServiceStatus.Active,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    Service.create(ServiceId.from(MOCK_SERVICE_IDS.inactive), {
      categoryId: 'ac',
      name: LocalizedLabel.create('خدمة غير نشطة', 'Inactive service'),
      status: ServiceStatus.Inactive,
      marketId: 'sa',
      countryCode: 'SA',
    }),
  ];
}

export class InMemoryServiceRepository implements IServiceRepository {
  private readonly items = new Map<string, Service>();

  public constructor(seed: readonly Service[] = []) {
    for (const service of seed) {
      this.items.set(service.id.value, service);
    }
  }

  public async create(entity: Service): Promise<Service> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async update(entity: Service): Promise<Service> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async delete(id: ServiceId): Promise<void> {
    this.items.delete(id.value);
  }

  public async findById(id: ServiceId): Promise<Service | null> {
    return this.items.get(id.value) ?? null;
  }

  public async exists(id: ServiceId): Promise<boolean> {
    return this.items.has(id.value);
  }

  public async findAll(filter?: ServiceFilter, sort?: SortOptions): Promise<readonly Service[]> {
    void sort;
    return [...this.items.values()].filter((service) => matchesService(service, filter));
  }

  public async search(query: string, filter?: ServiceFilter, sort?: SortOptions): Promise<readonly Service[]> {
    const needle = query.trim().toLowerCase();
    return (await this.findAll(filter, sort)).filter(
      (service) => service.name.ar.toLowerCase().includes(needle) || service.name.en.toLowerCase().includes(needle),
    );
  }

  public async count(filter?: ServiceFilter): Promise<number> {
    return (await this.findAll(filter)).length;
  }

  public async paginate(
    pagination: CursorPagination,
    filter?: ServiceFilter,
    sort?: SortOptions,
  ): Promise<Page<Service>> {
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

export function createSeededServiceRepository(): InMemoryServiceRepository {
  return new InMemoryServiceRepository(createMockServices());
}

function matchesService(service: Service, filter?: ServiceFilter): boolean {
  if (filter?.statuses && !filter.statuses.includes(service.status)) {
    return false;
  }
  if (filter?.marketId && service.marketId !== filter.marketId) {
    return false;
  }
  if (filter?.countryCode && service.countryCode !== filter.countryCode) {
    return false;
  }
  if (filter?.categoryId && service.categoryId !== filter.categoryId) {
    return false;
  }
  return true;
}

function startIndex<T>(items: readonly T[], cursor: string | null, idOf: (item: T) => string): number {
  if (cursor === null || cursor.length === 0) {
    return 0;
  }
  const index = items.findIndex((item) => idOf(item) === cursor);
  return index === -1 ? items.length : index + 1;
}
