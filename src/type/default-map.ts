export class DefaultMap<T> {
  private internal: Map<string, T>;
  private readonly defaultFactory: () => T;

  constructor(
    defaultFactory: () => T,
    entries?: readonly (readonly [string, T])[] | undefined
  ) {
    this.defaultFactory = defaultFactory;
    this.internal = new Map(entries ?? []);
  }

  get(key: string): T {
    if (!this.internal.has(key)) {
      const defaultValue = this.defaultFactory();
      this.internal.set(key, defaultValue);
      return defaultValue;
    }
    return this.internal.get(key)!;
  }

  set(key: string, value: T): this {
    this.internal.set(key, value);
    return this;
  }

  has(key: string): boolean {
    return this.internal.has(key);
  }

  delete(key: string): boolean {
    return this.internal.delete(key);
  }

  clear(): void {
    this.internal.clear();
  }

  keys(): IterableIterator<string> {
    return this.internal.keys();
  }

  values(): IterableIterator<T> {
    return this.internal.values();
  }

  entries(): IterableIterator<[string, T]> {
    return this.internal.entries();
  }

  forEach(
    callbackfn: (value: T, key: string, map: Map<string, T>) => void
  ): void {
    this.internal.forEach(callbackfn);
  }

  get size(): number {
    return this.internal.size;
  }
}
