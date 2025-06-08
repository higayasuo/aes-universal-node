import { AesCipher, RandomBytes } from 'aes-universal';
import { NodeCbcCipher } from './NodeCbcCipher';
import { NodeGcmCipher } from './NodeGcmCipher';

/**
 * Node.js implementation of the AES cipher using Node.js crypto module.
 *
 * This class extends the base AesCipher class and provides implementations
 * for both CBC and GCM modes using Node.js native crypto functionality.
 */
export class NodeAesCipher extends AesCipher<
  NodeCbcCipher,
  typeof NodeCbcCipher,
  NodeGcmCipher,
  typeof NodeGcmCipher
> {
  /**
   * Creates a new instance of NodeAesCipher.
   *
   * @param randomBytes - Function that generates cryptographically secure random bytes
   *                      Must implement the RandomBytes interface from aes-universal
   */
  constructor(randomBytes: RandomBytes) {
    super({
      cbc: NodeCbcCipher,
      gcm: NodeGcmCipher,
      randomBytes,
    });
  }
}
