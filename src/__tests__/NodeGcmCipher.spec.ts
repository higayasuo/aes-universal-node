import { describe, it, expect } from 'vitest';
import { NodeGcmCipher } from '../NodeGcmCipher';
import { nodeRandomBytes } from '../nodeRrandomBytes';
import { Enc } from 'aes-universal';

// Test vectors for AES-128, AES-192, and AES-256
const cek128 = nodeRandomBytes(16); // 16 bytes = 128 bits
const cek192 = nodeRandomBytes(24); // 24 bytes = 192 bits
const cek256 = nodeRandomBytes(32); // 32 bytes = 256 bits
//const iv = new Uint8Array(12).fill(4); // 12 bytes is standard for GCM
const plaintext = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
const aad = new Uint8Array([9, 8, 7, 6]);

const keyConfigs = [
  { cek: cek128, keyBits: 128, enc: 'A128GCM' as Enc },
  { cek: cek192, keyBits: 192, enc: 'A192GCM' as Enc },
  { cek: cek256, keyBits: 256, enc: 'A256GCM' as Enc },
];

describe('NodeGcmCipher', () => {
  const cipher = new NodeGcmCipher(nodeRandomBytes);
  const { encrypt, decrypt, encryptInternal, decryptInternal } = cipher;

  it.each(keyConfigs)(
    'should encrypt and decrypt correctly',
    async ({ enc, cek }) => {
      const { ciphertext, tag, iv } = await encrypt({
        enc,
        cek,
        plaintext,
        aad,
      });
      expect(ciphertext.length).toBeGreaterThan(0);
      expect(tag.length).toBe(16);
      expect(iv.length).toBe(12);

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
    async ({ cek }) => {
      const iv = cipher.generateIv();
      const { ciphertext, tag } = await encryptInternal({
        encRawKey: cek,
        iv,
        plaintext,
        aad,
      });
      expect(ciphertext.length).toBeGreaterThan(0);
      expect(tag.length).toBe(16);

      const decrypted = await decryptInternal({
        encRawKey: cek,
        iv,
        ciphertext,
        tag,
        aad,
      });
      expect(decrypted).toEqual(plaintext);
    },
  );
});
