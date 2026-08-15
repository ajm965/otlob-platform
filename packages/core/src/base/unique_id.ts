/**
 * Opaque unique identifier. Framework-agnostic.
 */
export class UniqueId {
  public constructor(public readonly value: string) {
    if (value.trim().length === 0) {
      throw new Error('UniqueId value must be non-empty');
    }
  }

  public equals(other: UniqueId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
