import { DateRange, GeoPoint, type CursorPagination, type Page, type SortOptions } from '@otlob/core';
import {
  RequestId,
  RequestStatus,
  ServiceRequest,
  type IRequestRepository,
  type ServiceRequestFilter,
} from '../../domain';

export const MOCK_CUSTOMER_IDS = {
  offline: 'offline-customer',
  other: 'other-customer',
} as const;

export const MOCK_REQUEST_IDS = {
  draftMine: 'req-001',
  openMine: 'req-002',
  openOther: 'req-003',
} as const;

export function createMockRequests(): readonly ServiceRequest[] {
  return [
    ServiceRequest.create(RequestId.from(MOCK_REQUEST_IDS.draftMine), {
      customerId: MOCK_CUSTOMER_IDS.offline,
      serviceId: 'pipe-repair',
      status: RequestStatus.Draft,
      description: 'Leaking kitchen pipe',
      location: null,
      preferredWindow: null,
      acceptedOfferId: null,
      bookingId: null,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    ServiceRequest.create(RequestId.from(MOCK_REQUEST_IDS.openMine), {
      customerId: MOCK_CUSTOMER_IDS.offline,
      serviceId: 'ac-gas-refill',
      status: RequestStatus.Open,
      description: 'AC needs gas refill',
      location: GeoPoint.create(24.7136, 46.6753),
      preferredWindow: DateRange.create(
        new Date('2026-08-20T08:00:00.000Z'),
        new Date('2026-08-20T12:00:00.000Z'),
      ),
      acceptedOfferId: null,
      bookingId: null,
      marketId: 'sa',
      countryCode: 'SA',
    }),
    ServiceRequest.create(RequestId.from(MOCK_REQUEST_IDS.openOther), {
      customerId: MOCK_CUSTOMER_IDS.other,
      serviceId: 'outlet-repair',
      status: RequestStatus.Open,
      description: 'Outlet sparking',
      location: null,
      preferredWindow: null,
      acceptedOfferId: null,
      bookingId: null,
      marketId: 'sa',
      countryCode: 'SA',
    }),
  ];
}

export class InMemoryRequestRepository implements IRequestRepository {
  private readonly items = new Map<string, ServiceRequest>();

  public constructor(seed: readonly ServiceRequest[] = []) {
    for (const request of seed) {
      this.items.set(request.id.value, request);
    }
  }

  public async create(entity: ServiceRequest): Promise<ServiceRequest> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async update(entity: ServiceRequest): Promise<ServiceRequest> {
    this.items.set(entity.id.value, entity);
    return entity;
  }

  public async delete(id: RequestId): Promise<void> {
    this.items.delete(id.value);
  }

  public async findById(id: RequestId): Promise<ServiceRequest | null> {
    return this.items.get(id.value) ?? null;
  }

  public async exists(id: RequestId): Promise<boolean> {
    return this.items.has(id.value);
  }

  public async findAll(filter?: ServiceRequestFilter, sort?: SortOptions): Promise<readonly ServiceRequest[]> {
    void sort;
    return [...this.items.values()].filter((request) => matchesRequest(request, filter));
  }

  public async search(
    query: string,
    filter?: ServiceRequestFilter,
    sort?: SortOptions,
  ): Promise<readonly ServiceRequest[]> {
    const needle = query.trim().toLowerCase();
    return (await this.findAll(filter, sort)).filter((request) => request.description.toLowerCase().includes(needle));
  }

  public async count(filter?: ServiceRequestFilter): Promise<number> {
    return (await this.findAll(filter)).length;
  }

  public async paginate(
    pagination: CursorPagination,
    filter?: ServiceRequestFilter,
    sort?: SortOptions,
  ): Promise<Page<ServiceRequest>> {
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

export function createSeededRequestRepository(): InMemoryRequestRepository {
  return new InMemoryRequestRepository(createMockRequests());
}

function matchesRequest(request: ServiceRequest, filter?: ServiceRequestFilter): boolean {
  if (filter?.statuses && !filter.statuses.includes(request.status)) {
    return false;
  }
  if (filter?.marketId && request.marketId !== filter.marketId) {
    return false;
  }
  if (filter?.countryCode && request.countryCode !== filter.countryCode) {
    return false;
  }
  if (filter?.customerId && request.customerId !== filter.customerId) {
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
