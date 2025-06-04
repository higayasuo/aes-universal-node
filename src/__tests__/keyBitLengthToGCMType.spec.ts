import { describe, it, expect } from 'vitest';
import { keyBitLengthToGCMType } from '../keyBitLengthToGCMType';

describe('keyBitLengthToGCMType', () => {
  // Standard valid cases
  it('should return aes-128-gcm for 128 bits', () => {
    expect(keyBitLengthToGCMType(128)).toBe('aes-128-gcm');
  });

  it('should return aes-192-gcm for 192 bits', () => {
    expect(keyBitLengthToGCMType(192)).toBe('aes-192-gcm');
  });

  it('should return aes-256-gcm for 256 bits', () => {
    expect(keyBitLengthToGCMType(256)).toBe('aes-256-gcm');
  });

  it('should throw an error with the correct message for a specific value', () => {
    expect(() => keyBitLengthToGCMType(8)).toThrowError(
      new Error('Invalid key bit length: 8'),
    );
  });
});
