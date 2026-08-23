declare module "bun:test" {
  export interface TestContext {}
  export function describe(name: string, fn: () => void): void;
  export function it(name: string, fn: () => void | Promise<void>): void;
  export function expect<T>(value: T): {
    toBe(expected: unknown): void;
    toBeDefined(): void;
    toBeNull(): void;
    toContain(substring: string): void;
    toEqual(expected: unknown): void;
    toHaveLength(length: number): void;
  };
}