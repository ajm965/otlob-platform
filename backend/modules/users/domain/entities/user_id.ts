import { UniqueId } from '@otlob/core';

export class UserId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): UserId {
    return new UserId(value);
  }
}
