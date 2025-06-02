import { RandomBytes } from 'aes-universal';
import crypto from 'crypto';

/**
 * Generates cryptographically secure random bytes using Node.js crypto module.
 *
 * @param {number} [size=32] - The number of bytes to generate. Defaults to 32.
 * @returns {Uint8Array} - A Uint8Array containing the generated random bytes.
 */
export const nodeRandomBytes: RandomBytes = (size = 32): Uint8Array => {
  return new Uint8Array(crypto.randomBytes(size));
};
