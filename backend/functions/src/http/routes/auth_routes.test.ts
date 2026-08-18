import assert from 'node:assert/strict';
import http from 'node:http';
import { test } from 'node:test';
import express from 'express';
import { AddressInfo } from 'node:net';
import { requestIdMiddleware } from '../middleware/request_id_middleware';
import { registerAuthRoutes } from './auth_routes';

async function withServer(run: (baseUrl: string) => Promise<void>): Promise<void> {
  const app = express();
  app.use(requestIdMiddleware);
  registerAuthRoutes(app);
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address() as AddressInfo;
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
}

test('documented authentication routes are registered and return 501 envelope', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/v1/auth/me`);
    assert.equal(response.status, 501);
    const body = (await response.json()) as { error: { code: string; requestId: string } };
    assert.equal(body.error.code, 'not_implemented');
    assert.ok(body.error.requestId.length > 0);
    assert.ok(response.headers.get('x-request-id'));
  });
});

test('POST /auth/bootstrap is registered as documented', async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/auth/bootstrap`, { method: 'POST' });
    assert.equal(response.status, 501);
  });
});
