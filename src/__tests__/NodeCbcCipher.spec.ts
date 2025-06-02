import { describe, it, expect } from 'vitest';
import { NodeCbcCipher } from '../NodeCbcCipher';
import { nodeRandomBytes } from '../nodeRrandomBytes';
import { Enc, divideCek } from 'aes-universal';

const cek128 = nodeRandomBytes(32);
const cek192 = nodeRandomBytes(48);
const cek256 = nodeRandomBytes(64);
const plaintext = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
const aad = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);

const keyConfigs = [
  { cek: cek128, keyBits: 128, enc: 'A128CBC-HS256' as Enc },
  { cek: cek192, keyBits: 192, enc: 'A192CBC-HS384' as Enc },
  { cek: cek256, keyBits: 256, enc: 'A256CBC-HS512' as Enc },
];

describe('NodeCbcCipher', () => {
  const cipher = new NodeCbcCipher(nodeRandomBytes);

  it.each(keyConfigs)(
    'should encrypt and decrypt correctly',
    async ({ enc, cek, keyBits }) => {
      const { ciphertext, tag, iv } = await cipher.encrypt({
        enc,
        cek,
        plaintext,
        aad,
      });
      expect(ciphertext.length).toBeGreaterThan(0);
      expect(tag.length).toBe(keyBits / 8);
      expect(iv.length).toBe(16);

      const decrypted = await cipher.decrypt({
        enc,
        cek,
        ciphertext,
        tag,
        iv,
        aad,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );

  it.each(keyConfigs)(
    'should encryptInternal and decryptInternal correctly',
    async ({ cek, keyBits }) => {
      const { encRawKey } = divideCek({
        cek,
        keyBytes: keyBits / 8,
      });
      const iv = cipher.generateIv();
      const ciphertext = await cipher.encryptInternal({
        encRawKey,
        iv,
        plaintext,
      });
      expect(ciphertext.length).toBeGreaterThan(0);

      const decrypted = await cipher.decryptInternal({
        encRawKey,
        iv,
        ciphertext,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );
});
