export type GCMType = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';

/**
 * Converts a key byte length to the corresponding AES-GCM type.
 *
 * @param {number} keyByteLength - The length of the key in bytes.
 * @returns {GCMType} The corresponding AES-GCM type.
 * @throws {Error} If the key byte length is invalid.
 */
export const keyByteLengthToGCMType = (keyByteLength: number): GCMType => {
  switch (keyByteLength) {
    case 16:
      return 'aes-128-gcm';
    case 24:
      return 'aes-192-gcm';
    case 32:
      return 'aes-256-gcm';
    default:
      throw new Error('Invalid key byte length');
  }
};
