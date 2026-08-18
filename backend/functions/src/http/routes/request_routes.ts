import type { NextFunction, Request, Response } from 'express';
import type { Express } from 'express';
import type { ICreateRequestUseCase, IGetRequestUseCase, IListRequestsUseCase } from '@otlob/backend';
import { MOCK_CUSTOMER_IDS } from '@otlob/backend';
import { successEnvelope } from '../envelopes';
import { asPlatformRequest } from '../platform_request';

const KSA_MARKET_ID = 'sa';
const KSA_COUNTRY_CODE = 'SA';

export interface RequestRouteDependencies {
  readonly createRequest: ICreateRequestUseCase;
  readonly getRequest: IGetRequestUseCase;
  readonly listRequests: IListRequestsUseCase;
}

export function registerRequestRoutes(app: Express, deps: RequestRouteDependencies): void {
  const createRequest = handle(async (req, res) => {
    const body = asRecord(req.body);
    const created = await deps.createRequest.execute({
      customerId: MOCK_CUSTOMER_IDS.offline,
      serviceId: asString(body.serviceId),
      description: asString(body.description),
      preferredTimeStart: asOptionalIso(body.preferredTimeStart),
      preferredTimeEnd: asOptionalIso(body.preferredTimeEnd),
      title: optionalBodyField(body, 'title'),
      addressId: optionalBodyField(body, 'addressId'),
      budgetMinHalalas: optionalBodyField(body, 'budgetMinHalalas'),
      budgetMaxHalalas: optionalBodyField(body, 'budgetMaxHalalas'),
      mediaUrls: optionalBodyField(body, 'mediaUrls'),
      marketId: KSA_MARKET_ID,
      countryCode: KSA_COUNTRY_CODE,
    });
    res.status(201).json(successEnvelope(created));
  });

  const listRequests = handle(async (req, res) => {
    const result = await deps.listRequests.execute({
      customerId: MOCK_CUSTOMER_IDS.offline,
      status: queryString(req.query.status),
      cursor: queryString(req.query.pageToken),
      pageSize: queryNumber(req.query.pageSize),
      marketId: KSA_MARKET_ID,
      countryCode: KSA_COUNTRY_CODE,
    });
    sendList(res, result.items, result.nextCursor);
  });

  const getRequest = handle(async (req, res) => {
    const request = await deps.getRequest.execute({ id: String(req.params.requestId ?? '') });
    res.status(200).json(successEnvelope(request));
  });

  app.post('/requests', createRequest);
  app.post('/v1/requests', createRequest);
  app.get('/requests', listRequests);
  app.get('/v1/requests', listRequests);
  app.get('/requests/:requestId', getRequest);
  app.get('/v1/requests/:requestId', getRequest);
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

function asRecord(value: unknown): Record<string, unknown> {
  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function optionalBodyField(body: Record<string, unknown>, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(body, key) ? body[key] : undefined;
}

function asOptionalIso(value: unknown): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return typeof value === 'string' ? value : undefined;
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
