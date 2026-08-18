import assert from 'node:assert/strict';
import http from 'node:http';
import { AddressInfo } from 'node:net';
import { test } from 'node:test';
import {
  createSeededCategoryRepository,
  createSeededServiceRepository,
  GetServiceUseCase,
  ListCategorysUseCase,
  ListServicesUseCase,
} from '@otlob/backend';
import { loadAppConfig } from '../../config/app_config';
import { Container } from '../../di/container';
import { tokens } from '../../di/tokens';
import { createHttpApp } from '../app';
import { StructuredLogger } from '../../infrastructure/logging/structured_logger';

function createCatalogApp() {
  const config = loadAppConfig({ FIREBASE_PROJECT_ID: 'otlob-test', OTLB_ENV: 'development' });
  const container = new Container();
  container.register(tokens.config, config);
  container.register(tokens.logger, new StructuredLogger(config));
  container.register(tokens.listCategoriesUseCase, new ListCategorysUseCase(createSeededCategoryRepository()));
  container.register(tokens.listServicesUseCase, new ListServicesUseCase(createSeededServiceRepository()));
  container.register(tokens.getServiceUseCase, new GetServiceUseCase(createSeededServiceRepository()));
  return createHttpApp(container);
}

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const server = http.createServer(createCatalogApp());
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test('GET /v1/categories returns the deterministic catalog envelope', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/categories?activeOnly=true`);
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      data: { items: Array<{ id: string; nameEn: string; isActive: boolean }>; nextPageToken: string | null };
    };
    assert.equal(body.data.items.length, 3);
    assert.equal(body.data.items[0]?.nameEn, 'Plumbing');
    assert.ok(body.data.items.every((item) => item.isActive));
    assert.equal(body.data.nextPageToken, null);
  });
});

test('GET /v1/services filters by categoryId and GET service returns one item', async () => {
  await withServer(async (baseUrl) => {
    const list = await fetch(`${baseUrl}/v1/services?categoryId=ac&activeOnly=true`);
    assert.equal(list.status, 200);
    const listBody = (await list.json()) as { data: { items: Array<{ id: string }> } };
    assert.equal(listBody.data.items.length, 1);
    assert.equal(listBody.data.items[0]?.id, 'ac-gas-refill');

    const one = await fetch(`${baseUrl}/v1/services/ac-gas-refill`);
    assert.equal(one.status, 200);
    const oneBody = (await one.json()) as { data: { nameEn: string; categoryId: string } };
    assert.equal(oneBody.data.nameEn, 'AC Gas Refill');
    assert.equal(oneBody.data.categoryId, 'ac');
  });
});

test('GET /v1/services/:id returns 404 for unknown services', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/services/missing-service`);
    assert.equal(response.status, 404);
    const body = (await response.json()) as { error: { code: string } };
    assert.equal(body.error.code, 'not_found');
  });
});

test('documented /categories path is registered', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/categories`);
    assert.equal(response.status, 200);
  });
});
