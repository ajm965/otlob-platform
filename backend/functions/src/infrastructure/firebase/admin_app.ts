import { type App, getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { AppConfig } from '../../config/app_config';

export function initializeFirebaseAdmin(config: AppConfig): App {
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp({
    projectId: config.firebaseProjectId,
  });
}
