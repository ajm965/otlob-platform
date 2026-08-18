import { onRequest } from 'firebase-functions/v2/https';
import { createCompositionRoot } from './composition_root';
import { createHttpApp } from './http/app';

const root = createCompositionRoot();
const app = createHttpApp(root.container);

export const api = onRequest(
  {
    region: root.config.functionRegion,
    cors: true,
    invoker: 'public',
    memory: '256MiB',
    timeoutSeconds: 60,
  },
  app,
);
