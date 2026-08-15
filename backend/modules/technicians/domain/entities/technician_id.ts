import { UniqueId } from '@otlob/core';

export class TechnicianId extends UniqueId {
  private constructor(value: string) {
    super(value);
  }

  public static from(value: string): TechnicianId {
    return new TechnicianId(value);
  }
}
