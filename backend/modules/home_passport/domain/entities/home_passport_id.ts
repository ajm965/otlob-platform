import { UniqueId } from '@otlob/core';

export class HomePassportId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): HomePassportId {
    return new HomePassportId(value);
  }
}
