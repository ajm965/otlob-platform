/**
 * Minimal composition container. Instances are registered at bootstrap.
 * Future modules resolve ports through tokens — never via service locators in domain.
 */
export class Container {
  private readonly instances = new Map<symbol, unknown>();

  public register<T>(token: symbol, instance: T): void {
    this.instances.set(token, instance);
  }

  public resolve<T>(token: symbol): T {
    if (!this.instances.has(token)) {
      throw new Error(`Dependency not registered: ${token.description ?? String(token)}`);
    }
    return this.instances.get(token) as T;
  }
}
