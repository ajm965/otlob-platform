import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../http_error';

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next();
    return;
  }
  next(
    new HttpError(404, 'not_found', 'The requested path was not found.', {
      method: req.method,
      path: req.path,
    }),
  );
}
