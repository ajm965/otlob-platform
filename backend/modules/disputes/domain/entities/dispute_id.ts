import { UniqueId } from '@otlob/core';

export class DisputeId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): DisputeId {
    return new DisputeId(value);
  }
}
