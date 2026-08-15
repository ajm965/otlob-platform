import { UniqueId } from '@otlob/core';

export class ReviewId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): ReviewId {
    return new ReviewId(value);
  }
}
