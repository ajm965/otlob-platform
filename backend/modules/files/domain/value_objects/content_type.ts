import { BaseValueObject } from '@otlob/core';

export class ContentType extends BaseValueObject {
  private constructor(public readonly value: string) {
    super();
  }

  public static create(value: string): ContentType {
    const normalized = value.trim().toLowerCase();
    if (!normalized.includes('/')) {
      throw new Error('ContentType must be a MIME type');
    }
    return new ContentType(normalized);
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.value];
  }
}
