import {
  AbstractGcmCipher,
  GcmDecryptInternalParams,
  GcmEncryptInternalParams,
  GcmEncryptInternalResult,
  RandomBytes,
} from 'aes-universal';
import crypto from 'crypto';
import { keyBitLengthToGCMType } from './keyBitLengthToGCMType';

/**
 * Node.js implementation of GCM cipher using crypto module
 */
export class NodeGcmCipher extends AbstractGcmCipher {
  /**
   * Creates a new NodeGcmCipher instance
   * @param randomBytes - Function to generate random bytes
   */
  constructor(randomBytes: RandomBytes) {
    super(randomBytes);
  }

  /**
   * Encrypts data using AES-GCM
   * @param encRawKey - Raw encryption key
   * @param iv - Initialization vector
   * @param plaintext - Data to encrypt
   * @param aad - Additional authenticated data
   * @returns Object containing ciphertext and authentication tag
   */
  encryptInternal = async ({
    encRawKey,
    iv,
    plaintext,
    aad,
  }: GcmEncryptInternalParams): Promise<GcmEncryptInternalResult> => {
    const gcmType = keyBitLengthToGCMType(encRawKey.length << 3);
    const nodeCipher = crypto.createCipheriv(gcmType, encRawKey, iv);
    nodeCipher.setAAD(aad);
    const nodeResult = Buffer.concat([
      nodeCipher.update(plaintext),
      nodeCipher.final(),
    ]);
    const tag = nodeCipher.getAuthTag();
    return {
      ciphertext: new Uint8Array(nodeResult),
      tag: new Uint8Array(tag),
    };
  };

  /**
   * Decrypts data using AES-GCM
   * @param encRawKey - Raw encryption key
   * @param iv - Initialization vector
   * @param ciphertext - Data to decrypt
   * @param tag - Authentication tag
   * @param aad - Additional authenticated data
   * @returns Decrypted data as Uint8Array
   */
  decryptInternal = async ({
    encRawKey,
    iv,
    ciphertext,
    tag,
    aad,
  }: GcmDecryptInternalParams): Promise<Uint8Array> => {
    const gcmType = keyBitLengthToGCMType(encRawKey.length << 3);
    const nodeDecipher = crypto.createDecipheriv(gcmType, encRawKey, iv);
    nodeDecipher.setAAD(aad);
    nodeDecipher.setAuthTag(tag);
    const nodeResult = Buffer.concat([
      nodeDecipher.update(ciphertext),
      nodeDecipher.final(),
    ]);
    return new Uint8Array(nodeResult);
  };
}
