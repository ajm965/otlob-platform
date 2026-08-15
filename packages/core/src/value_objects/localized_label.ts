import { BaseValueObject } from '../base/base_value_object';

/** Generic AR/EN label pair for catalog and similar content. */
export class LocalizedLabel extends BaseValueObject {
  private constructor(
    public readonly ar: string,
    public readonly en: string,
  ) {
    super();
  }

  public static create(ar: string, en: string): LocalizedLabel {
    if (ar.trim().length === 0 || en.trim().length === 0) {
      throw new Error('LocalizedLabel requires ar and en');
    }
    return new LocalizedLabel(ar.trim(), en.trim());
  }

  protected get equalityComponents(): readonly unknown[] {
    return [this.ar, this.en];
  }
}
