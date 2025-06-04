export type GCMType = 'aes-128-gcm' | 'aes-192-gcm' | 'aes-256-gcm';

/**
 * Converts a key bit length to the corresponding AES-GCM cipher type.
 *
 * @param keyBitLength - The length of the key in bits. Must be one of: 128, 192, or 256.
 * @returns The corresponding AES-GCM cipher type as a string literal.
 * @throws {Error} When the key bit length is not 128, 192, or 256.
 * @example
 * const cipherType = keyBitLengthToGCMType(128); // 'aes-128-gcm'
 */
export const keyBitLengthToGCMType = (keyBitLength: number): GCMType => {
  switch (keyBitLength) {
    case 128:
      return 'aes-128-gcm';
    case 192:
      return 'aes-192-gcm';
    case 256:
      return 'aes-256-gcm';
    default:
      throw new Error(`Invalid key bit length: ${keyBitLength}`);
  }
};
