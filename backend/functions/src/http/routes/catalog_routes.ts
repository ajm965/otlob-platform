import type { NextFunction, Request, Response } from 'express';
import type { Express } from 'express';
import type { IListCategorysUseCase } from '@otlob/backend';
import type { IGetServiceUseCase, IListServicesUseCase } from '@otlob/backend';
import { successEnvelope } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

export interface CatalogRouteDependencies {
  readonly listCategories: IListCategorysUseCase;
  readonly listServices: IListServicesUseCase;
  readonly getService: IGetServiceUseCase;
}

export function registerCatalogRoutes(app: Express, deps: CatalogRouteDependencies): void {
  const listCategories = handle(async (req, res) => {
    const result = await deps.listCategories.execute({
      activeOnly: req.query.activeOnly === 'true',
      cursor: queryString(req.query.pageToken),
      pageSize: queryNumber(req.query.pageSize),
    });
    sendList(res, result.items, result.nextCursor);
  });

  const listServices = handle(async (req, res) => {
    const result = await deps.listServices.execute({
      activeOnly: req.query.activeOnly === 'true',
      categoryId: queryString(req.query.categoryId),
      cursor: queryString(req.query.pageToken),
      pageSize: queryNumber(req.query.pageSize),
    });
    sendList(res, result.items, result.nextCursor);
  });

  const getService = handle(async (req, res) => {
    const service = await deps.getService.execute({ id: String(req.params.serviceId ?? '') });
    res.status(200).json(successEnvelope(service));
  });

  app.get('/categories', listCategories);
  app.get('/v1/categories', listCategories);
  app.get('/services', listServices);
  app.get('/v1/services', listServices);
  app.get('/services/:serviceId', getService);
  app.get('/v1/services/:serviceId', getService);
}

function sendList<T>(res: Response, items: readonly T[], nextCursor: string | null): void {
  res.status(200).json(
    successEnvelope({
      items,
      nextPageToken: nextCursor,
    }),
  );
}

function handle(
  fn: (req: Request, res: Response) => Promise<void>,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    asPlatformRequest(req);
    void fn(req, res).catch(next);
  };
}

function queryString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function queryNumber(value: unknown): number | undefined {
  if (typeof value !== 'string' || value.length === 0) {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
