import {
  AbstractCbcCipher,
  CbcDecryptInternalArgs,
  CbcEncryptInternalArgs,
  GenerateTagArgs,
  RandomBytes,
} from 'aes-universal';
import crypto from 'crypto';

/**
 * Node.js implementation of CBC cipher using crypto module
 */
export class NodeCbcCipher extends AbstractCbcCipher {
  /**
   * Creates a new NodeCbcCipher instance
   * @param randomBytes - Function to generate random bytes
   */
  constructor(randomBytes: RandomBytes) {
    super(randomBytes);
  }

  /**
   * Encrypts data using AES-CBC
   * @param encRawKey - Raw encryption key
   * @param iv - Initialization vector
   * @param plaintext - Data to encrypt
   * @returns Encrypted data as Uint8Array
   */
  async encryptInternal({
    encRawKey,
    iv,
    plaintext,
  }: CbcEncryptInternalArgs): Promise<Uint8Array> {
    const keyLength = encRawKey.length * 8;
    const nodeCipher = crypto.createCipheriv(
      `aes-${keyLength}-cbc`,
      encRawKey,
      iv,
    );
    const nodeResult = Buffer.concat([
      nodeCipher.update(plaintext),
      nodeCipher.final(),
    ]);

    return new Uint8Array(nodeResult);
  }

  /**
   * Decrypts data using AES-CBC
   * @param encRawKey - Raw encryption key
   * @param iv - Initialization vector
   * @param ciphertext - Data to decrypt
   * @returns Decrypted data as Uint8Array
   */
  async decryptInternal({
    encRawKey,
    iv,
    ciphertext,
  }: CbcDecryptInternalArgs): Promise<Uint8Array> {
    const keyLength = encRawKey.length * 8;
    const nodeDecipher = crypto.createDecipheriv(
      `aes-${keyLength}-cbc`,
      encRawKey,
      iv,
    );
    const nodeResult = Buffer.concat([
      nodeDecipher.update(ciphertext),
      nodeDecipher.final(),
    ]);

    return new Uint8Array(nodeResult);
  }

  /**
   * Generates an HMAC tag for message authentication
   * @param macRawKey - Raw key for HMAC
   * @param macData - Data to authenticate
   * @param keyBits - Key size in bits
   * @returns HMAC tag as Uint8Array
   */
  async generateTag({
    macRawKey,
    macData,
    keyBits,
  }: GenerateTagArgs): Promise<Uint8Array> {
    const hash = `sha${keyBits << 1}` as 'sha256' | 'sha384' | 'sha512';
    const hmac = crypto.createHmac(hash, macRawKey);
    hmac.update(macData);
    return new Uint8Array(hmac.digest()).slice(0, keyBits / 8);
  }
}
