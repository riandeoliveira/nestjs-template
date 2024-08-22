export class CurrentUserIdProvider {
  private id: string | null;

  public get(): string | null {
    return this.id;
  }

  public set(id: string): void {
    this.id = id;
  }

  public clear(): void {
    this.id = null;
  }
}
