import { describe, it, expect } from 'vitest';
import { nodeRandomBytes } from '../nodeRrandomBytes';

describe('nodeRandomBytes', () => {
  it('should return a Uint8Array of default size (32 bytes)', () => {
    const result = nodeRandomBytes();
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBe(32);
  });

  it('should return a Uint8Array of specified size', () => {
    const sizes = [16, 24, 32, 48, 64];
    sizes.forEach((size) => {
      const result = nodeRandomBytes(size);
      expect(result).toBeInstanceOf(Uint8Array);
      expect(result.length).toBe(size);
    });
  });

  it('should generate different random values on each call', () => {
    const result1 = nodeRandomBytes();
    const result2 = nodeRandomBytes();
    expect(result1).not.toEqual(result2);
  });
});
