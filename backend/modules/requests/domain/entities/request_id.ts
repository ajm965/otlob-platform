import { UniqueId } from '@otlob/core';

export class RequestId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): RequestId {
    return new RequestId(value);
  }
}
