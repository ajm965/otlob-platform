export class CatalogQueryFailure extends Error {
  public constructor(
    public readonly code: string,
    message: string,
    public readonly details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = 'CatalogQueryFailure';
  }
}
