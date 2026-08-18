import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toRequestResponse } from '../../application/mappers/request_mapper';
import {
  createMockRequests,
  MOCK_REQUEST_IDS,
} from '../../infrastructure/repositories/in_memory_request_repository';

test('maps request domain fields to the customer request response DTO', () => {
  const openMine = createMockRequests().find((request) => request.id.value === MOCK_REQUEST_IDS.openMine);
  assert.ok(openMine);
  assert.deepEqual(toRequestResponse(openMine), {
    id: 'req-002',
    marketId: 'sa',
    countryCode: 'SA',
    customerId: 'offline-customer',
    serviceId: 'ac-gas-refill',
    status: 'open',
    description: 'AC needs gas refill',
    location: { latitude: 24.7136, longitude: 46.6753 },
    preferredTimeStart: '2026-08-20T08:00:00.000Z',
    preferredTimeEnd: '2026-08-20T12:00:00.000Z',
    acceptedOfferId: null,
    bookingId: null,
  });
});

test('maps null location and preferred window', () => {
  const draft = createMockRequests().find((request) => request.id.value === MOCK_REQUEST_IDS.draftMine);
  assert.ok(draft);
  const mapped = toRequestResponse(draft);
  assert.equal(mapped.location, null);
  assert.equal(mapped.preferredTimeStart, null);
  assert.equal(mapped.preferredTimeEnd, null);
  assert.equal(mapped.status, 'draft');
});
