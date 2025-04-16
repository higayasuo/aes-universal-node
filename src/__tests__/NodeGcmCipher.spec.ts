import { describe, it, expect, beforeAll } from 'vitest';
import { NodeGcmCipher } from '../NodeGcmCipher';
import { CryptoModule } from 'expo-crypto-universal';

/**
 * Minimal mock for CryptoModule, as NodeGcmCipher only passes it to the parent constructor.
 */
const mockCryptoModule: CryptoModule = {} as CryptoModule;

// Test vectors for AES-128, AES-192, and AES-256
const key128 = new Uint8Array(16).fill(1); // 16 bytes = 128 bits
const key192 = new Uint8Array(24).fill(2); // 24 bytes = 192 bits
const key256 = new Uint8Array(32).fill(3); // 32 bytes = 256 bits
const iv = new Uint8Array(12).fill(4); // 12 bytes is standard for GCM
const plaintext = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
const aad = new Uint8Array([9, 8, 7, 6]);

const keyConfigs = [
  { key: key128, keyBits: 128 },
  { key: key192, keyBits: 192 },
  { key: key256, keyBits: 256 },
];

describe('NodeGcmCipher', () => {
  let cipher: NodeGcmCipher;

  beforeAll(() => {
    cipher = new NodeGcmCipher(mockCryptoModule);
  });

  it.each(keyConfigs)(
    'should encrypt and decrypt correctly with AES-$keyBits',
    async ({ key }) => {
      const { ciphertext, tag } = await cipher.encryptInternal({
        encRawKey: key,
        iv,
        plaintext,
        aad,
      });
      expect(ciphertext).toBeInstanceOf(Uint8Array);
      expect(tag).toBeInstanceOf(Uint8Array);
      expect(ciphertext.length).toBeGreaterThan(0);
      expect(tag.length).toBeGreaterThan(0);

      const decrypted = await cipher.decryptInternal({
        encRawKey: key,
        iv,
        ciphertext,
        tag,
        aad,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );
});
