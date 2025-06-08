# aes-universal-node

Node.js implementation of aes-universal.

## Installation

```bash
npm install aes-universal-node
```

## Peer Dependencies

This package requires the following peer dependencies:

- `aes-universal`: The base package providing abstract cipher implementations

## Random Bytes Generation

`nodeRandomBytes` provides cryptographically secure random bytes generation using Node.js's crypto module:

```ts
import { nodeRandomBytes } from 'aes-universal-node';

// Generate 32 random bytes (default size)
const randomBytes = nodeRandomBytes();

// Generate custom size of random bytes
const customRandomBytes = nodeRandomBytes(64);
```

This function implements the `RandomBytes` interface from `aes-universal` and is used internally by the cipher implementations.

## AES Encryption

`NodeAesCipher` provides a unified interface for AES encryption in both CBC and GCM modes. It supports all standard key lengths (128, 192, and 256 bits).

### Key Lengths and Modes

The following encryption modes are supported:

#### CBC Mode

- A128CBC-HS256: 32 bytes CEK (16 bytes for encryption + 16 bytes for MAC)
- A192CBC-HS384: 48 bytes CEK (24 bytes for encryption + 24 bytes for MAC)
- A256CBC-HS512: 64 bytes CEK (32 bytes for encryption + 32 bytes for MAC)

#### GCM Mode

- A128GCM: 16 bytes CEK
- A192GCM: 24 bytes CEK
- A256GCM: 32 bytes CEK

### Usage Example

```ts
import { NodeAesCipher, nodeRandomBytes } from 'aes-universal-node';
import { Enc } from 'aes-universal';

// Create cipher instance
const cipher = new NodeAesCipher(nodeRandomBytes);

// Define encryption modes
const A128CBC_HS256 = 'A128CBC-HS256' as Enc;
const A128GCM = 'A128GCM' as Enc;

// Define plaintext and AAD
const plaintext = new Uint8Array([1, 2, 3, 4]);
const aad = new Uint8Array([5, 6, 7, 8]);

// Generate CEK for A128CBC-HS256
const cek128Cbc = await cipher.generateCek(A128CBC_HS256);
const {
  ciphertext: cbcCiphertext,
  tag: cbcTag,
  iv: cbcIv,
} = await cipher.encrypt({
  enc: A128CBC_HS256,
  cek: cek128Cbc,
  plaintext,
  aad,
});

const cbcDecrypted = await cipher.decrypt({
  enc: A128CBC_HS256,
  cek: cek128Cbc,
  ciphertext: cbcCiphertext,
  tag: cbcTag,
  iv: cbcIv,
  aad,
});

// Generate CEK for A128GCM
const cek128Gcm = await cipher.generateCek(A128GCM);
const {
  ciphertext: gcmCiphertext,
  tag: gcmTag,
  iv: gcmIv,
} = await cipher.encrypt({
  enc: A128GCM,
  cek: cek128Gcm,
  plaintext,
  aad,
});

const gcmDecrypted = await cipher.decrypt({
  enc: A128GCM,
  cek: cek128Gcm,
  ciphertext: gcmCiphertext,
  tag: gcmTag,
  iv: gcmIv,
  aad,
});

expect(cbcDecrypted).toEqual(plaintext);
expect(gcmDecrypted).toEqual(plaintext);
```

### Features

- Supports all standard AES key lengths (128, 192, 256 bits)
- Implements both CBC and GCM modes
- Uses Node.js native crypto module for optimal performance
- Provides authenticated encryption
- Supports Additional Authenticated Data (AAD) for GCM mode
- Includes comprehensive test suite
