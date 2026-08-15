import { UniqueId } from '@otlob/core';

export class CategoryId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): CategoryId {
    return new CategoryId(value);
  }
}
