/**
 * Equality-by-value foundation for value objects.
 */
export abstract class BaseValueObject {
  protected abstract get equalityComponents(): readonly unknown[];

  public equals(other: BaseValueObject | null | undefined): boolean {
    if (other == null) {
      return false;
    }
    if (this.constructor !== other.constructor) {
      return false;
    }
    const a = this.equalityComponents;
    const b = other.equalityComponents;
    if (a.length !== b.length) {
      return false;
    }
    return a.every((component, index) => Object.is(component, b[index]));
  }
}
