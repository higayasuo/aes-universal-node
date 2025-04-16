import { describe, it, expect } from 'vitest';
import { keyByteLengthToGCMType } from '../keyByteLengthToGCMType';

describe('keyByteLengthToGCMType', () => {
  it('should return aes-128-gcm for 16 bytes', () => {
    expect(keyByteLengthToGCMType(16)).toBe('aes-128-gcm');
  });

  it('should return aes-192-gcm for 24 bytes', () => {
    expect(keyByteLengthToGCMType(24)).toBe('aes-192-gcm');
  });

  it('should return aes-256-gcm for 32 bytes', () => {
    expect(keyByteLengthToGCMType(32)).toBe('aes-256-gcm');
  });

  it('should throw an error for invalid key byte length', () => {
    expect(() => keyByteLengthToGCMType(8)).toThrow('Invalid key byte length');
  });
});
