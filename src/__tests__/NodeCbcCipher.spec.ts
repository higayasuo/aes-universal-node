import { describe, it, expect } from 'vitest';
import { NodeCbcCipher } from '../NodeCbcCipher';
import { RandomBytes } from 'aes-universal';
import crypto from 'crypto';

const randomBytes: RandomBytes = (size = 32): Uint8Array => {
  return new Uint8Array(crypto.randomBytes(size));
};

// Test vectors for AES-128, AES-192, and AES-256
const key128 = new Uint8Array(16).fill(1); // 16 bytes = 128 bits
const key192 = new Uint8Array(24).fill(2); // 24 bytes = 192 bits
const key256 = new Uint8Array(32).fill(3); // 32 bytes = 256 bits
const iv = new Uint8Array(16).fill(4);
const plaintext = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
const macKey = new Uint8Array(16).fill(5);
const macData = new Uint8Array([9, 8, 7, 6, 5, 4, 3, 2]);

const keyConfigs = [
  { key: key128, keyBits: 128 },
  { key: key192, keyBits: 192 },
  { key: key256, keyBits: 256 },
];

describe('NodeCbcCipher', () => {
  const cipher = new NodeCbcCipher(randomBytes);

  it.each(keyConfigs)(
    'should encrypt and decrypt correctly with AES-$keyBits',
    async ({ key }) => {
      const ciphertext = await cipher.encryptInternal({
        encRawKey: key,
        iv,
        plaintext,
      });
      expect(ciphertext).toBeInstanceOf(Uint8Array);
      expect(ciphertext.length).toBeGreaterThan(0);

      const decrypted = await cipher.decryptInternal({
        encRawKey: key,
        iv,
        ciphertext,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );

  it.each(keyConfigs)(
    'should generate a tag of correct length for AES-$keyBits',
    async ({ keyBits }) => {
      const tag = await cipher.generateTag({
        macRawKey: macKey,
        macData,
        keyBits,
      });
      expect(tag).toBeInstanceOf(Uint8Array);
      expect(tag.length).toBe(keyBits / 8);
    },
  );
});
