import assert from 'node:assert/strict';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import { test } from 'node:test';
import {
  CreateRequestUseCase,
  GetRequestUseCase,
  GetServiceUseCase,
  ListCategorysUseCase,
  ListRequestsUseCase,
  ListServicesUseCase,
  MOCK_REQUEST_IDS,
  createSeededCategoryRepository,
  createSeededRequestRepository,
  createSeededServiceRepository,
} from '@otlob/backend';
import { loadAppConfig } from '../../config/app_config';
import { Container } from '../../di/container';
import { tokens } from '../../di/tokens';
import { createHttpApp } from '../app';
import { StructuredLogger } from '../../infrastructure/logging/structured_logger';

function createRequestApp() {
  const config = loadAppConfig({ FIREBASE_PROJECT_ID: 'otlob-test', OTLB_ENV: 'development' });
  const container = new Container();
  const requestRepository = createSeededRequestRepository();
  container.register(tokens.config, config);
  container.register(tokens.logger, new StructuredLogger(config));
  container.register(tokens.listCategoriesUseCase, new ListCategorysUseCase(createSeededCategoryRepository()));
  container.register(tokens.listServicesUseCase, new ListServicesUseCase(createSeededServiceRepository()));
  container.register(tokens.getServiceUseCase, new GetServiceUseCase(createSeededServiceRepository()));
  container.register(tokens.createRequestUseCase, new CreateRequestUseCase(requestRepository));
  container.register(tokens.getRequestUseCase, new GetRequestUseCase(requestRepository));
  container.register(tokens.listRequestsUseCase, new ListRequestsUseCase(requestRepository));
  return createHttpApp(container);
}

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server = http.createServer(createRequestApp());
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test('POST /v1/requests creates a deterministic draft from supported fields only', async () => {
  await withServer(async (baseUrl) => {
    const created = await fetch(`${baseUrl}/v1/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        serviceId: 'pipe-repair',
        description: 'Kitchen leak',
        preferredTimeStart: '2026-08-20T08:00:00.000Z',
        preferredTimeEnd: '2026-08-20T12:00:00.000Z',
      }),
    });
    assert.equal(created.status, 201);
    const createdBody = (await created.json()) as { data: { id: string; status: string; description: string } };
    assert.equal(createdBody.data.id, 'req-004');
    assert.equal(createdBody.data.status, 'draft');
    assert.equal(createdBody.data.description, 'Kitchen leak');

    const loaded = await fetch(`${baseUrl}/v1/requests/req-004`);
    assert.equal(loaded.status, 200);
    const loadedBody = (await loaded.json()) as { data: { id: string } };
    assert.equal(loadedBody.data.id, 'req-004');
  });
});

test('POST /v1/requests rejects documented-but-unmapped fields and does not persist', async () => {
  await withServer(async (baseUrl) => {
    const cases: Array<{ body: Record<string, unknown>; field: string }> = [
      { field: 'title', body: { serviceId: 'pipe-repair', description: 'Kitchen leak', title: 'A title' } },
      { field: 'addressId', body: { serviceId: 'pipe-repair', description: 'Kitchen leak', addressId: 'addr-1' } },
      {
        field: 'budgetMinHalalas',
        body: { serviceId: 'pipe-repair', description: 'Kitchen leak', budgetMinHalalas: 1000 },
      },
      {
        field: 'budgetMaxHalalas',
        body: { serviceId: 'pipe-repair', description: 'Kitchen leak', budgetMaxHalalas: 5000 },
      },
      { field: 'mediaUrls', body: { serviceId: 'pipe-repair', description: 'Kitchen leak', mediaUrls: [] } },
    ];

    for (const testCase of cases) {
      const response = await fetch(`${baseUrl}/v1/requests`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(testCase.body),
      });
      assert.equal(response.status, 400, testCase.field);
      const body = (await response.json()) as {
        error: { code: string; details: { fields: Array<{ field: string }> } };
      };
      assert.equal(body.error.code, 'validation_failed', testCase.field);
      assert.equal(body.error.details.fields[0]?.field, testCase.field);
    }

    const listed = await fetch(`${baseUrl}/v1/requests`);
    assert.equal(listed.status, 200);
    const listedBody = (await listed.json()) as { data: { items: Array<{ id: string }> } };
    assert.deepEqual(
      listedBody.data.items.map((item) => item.id),
      [MOCK_REQUEST_IDS.draftMine, MOCK_REQUEST_IDS.openMine],
    );

    const created = await fetch(`${baseUrl}/v1/requests/req-004`);
    assert.equal(created.status, 404);
  });
});

test('GET /v1/requests lists only the offline customer requests', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/requests`);
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      data: { items: Array<{ id: string; customerId: string }>; nextPageToken: string | null };
    };
    assert.equal(body.data.items.length, 2);
    assert.deepEqual(
      body.data.items.map((item) => item.id),
      [MOCK_REQUEST_IDS.draftMine, MOCK_REQUEST_IDS.openMine],
    );
    assert.ok(body.data.items.every((item) => item.customerId === 'offline-customer'));
    assert.equal(body.data.nextPageToken, null);
  });
});

test('GET /v1/requests?status=draft filters and undocumented routes stay unregistered', async () => {
  await withServer(async (baseUrl) => {
    const drafts = await fetch(`${baseUrl}/v1/requests?status=draft`);
    assert.equal(drafts.status, 200);
    const draftsBody = (await drafts.json()) as { data: { items: Array<{ id: string }> } };
    assert.equal(draftsBody.data.items.length, 1);
    assert.equal(draftsBody.data.items[0]?.id, MOCK_REQUEST_IDS.draftMine);

    const invalid = await fetch(`${baseUrl}/v1/requests?status=pending`);
    assert.equal(invalid.status, 400);
    const invalidBody = (await invalid.json()) as { error: { code: string } };
    assert.equal(invalidBody.error.code, 'validation_failed');

    const publish = await fetch(`${baseUrl}/v1/requests/${MOCK_REQUEST_IDS.draftMine}/publish`, { method: 'POST' });
    assert.equal(publish.status, 404);

    const nearby = await fetch(`${baseUrl}/v1/provider/requests/nearby`);
    assert.equal(nearby.status, 404);
  });
});

test('GET /requests/:id returns 404 for unknown ids and documented path is registered', async () => {
  await withServer(async (baseUrl) => {
    const missing = await fetch(`${baseUrl}/requests/missing-request`);
    assert.equal(missing.status, 404);
    const body = (await missing.json()) as { error: { code: string } };
    assert.equal(body.error.code, 'not_found');

    const listed = await fetch(`${baseUrl}/requests`);
    assert.equal(listed.status, 200);
  });
});

test('POST /v1/requests without serviceId returns validation_failed', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/requests`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ description: 'No service' }),
    });
    assert.equal(response.status, 400);
    const body = (await response.json()) as { error: { code: string } };
    assert.equal(body.error.code, 'validation_failed');
  });
});
