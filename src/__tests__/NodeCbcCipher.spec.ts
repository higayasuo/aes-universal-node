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
  { cek: cek128, keyBitLength: 128, enc: 'A128CBC-HS256' as Enc },
  { cek: cek192, keyBitLength: 192, enc: 'A192CBC-HS384' as Enc },
  { cek: cek256, keyBitLength: 256, enc: 'A256CBC-HS512' as Enc },
];

describe('NodeCbcCipher', () => {
  const cipher = new NodeCbcCipher(nodeRandomBytes);
  const { encrypt, decrypt, encryptInternal, decryptInternal } = cipher;

  it.each(keyConfigs)(
    'should encrypt and decrypt correctly',
    async ({ enc, cek, keyBitLength }) => {
      const { ciphertext, tag, iv } = await encrypt({
        enc,
        cek,
        plaintext,
        aad,
      });
      expect(ciphertext.length).toBeGreaterThan(0);
      expect(tag.length).toBe(keyBitLength / 8);
      expect(iv.length).toBe(16);

      const decrypted = await decrypt({
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
    async ({ cek, keyBitLength }) => {
      const { encRawKey } = divideCek({
        cek,
        keyBitLength,
      });
      const iv = cipher.generateIv();
      const ciphertext = await encryptInternal({
        encRawKey,
        iv,
        plaintext,
      });
      expect(ciphertext.length).toBeGreaterThan(0);

      const decrypted = await decryptInternal({
        encRawKey,
        iv,
        ciphertext,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );
});
