import { UniqueId } from '@otlob/core';

export class ServiceId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): ServiceId {
    return new ServiceId(value);
  }
}
