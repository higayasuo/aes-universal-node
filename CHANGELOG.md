# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.8] - 2025-06-08

### Added

- Added `NodeAesCipher` class that combines both CBC and GCM cipher implementations
  - Provides a unified interface for AES encryption/decryption
  - Supports all key lengths (128, 192, 256 bits) in both CBC and GCM modes
  - Includes comprehensive test suite in `__tests__/NodeAesCipher.spec.ts`

## [0.1.7] - 2025-06-04

### Changed

- Renamed `keyByteLengthToGCMType.ts` to `keyBitLengthToGCMType.ts`
- Updated `NodeGcmCipher.ts` to use `keyBitLengthToGCMType`

## [0.1.6] - 2025-06-02

### Added

- Exported `nodeRandomBytes` from the main index file

## [0.1.5] - 2025-06-02

### Added

- Added `nodeRandomBytes.ts` for generating cryptographically secure random bytes using Node.js crypto module
  - Implements the `RandomBytes` interface from `aes-universal`
  - Provides a default size of 32 bytes
  - Uses Node.js native `crypto.randomBytes` for secure random number generation

## [0.1.4] - 2025-05-19

### Changed

- Updated cipher constructors to use `RandomBytes` function instead of `CryptoModule`
  - Changed from `new NodeCbcCipher(cryptoModule)` to `new NodeCbcCipher(randomBytes)`
  - Changed from `new NodeGcmCipher(cryptoModule)` to `new NodeGcmCipher(randomBytes)`

## [0.1.2] - 2025-05-18

### Fixed

- Fixed incorrect file extensions in Vite build output
  - Changed `index.js` to `index.mjs` for ESM format

## [0.1.1] - 2025-04-16

### Added

- Initial release
- Added `NodeCbcCipher` class for AES-CBC encryption/decryption using Node.js crypto module
- Added `NodeGcmCipher` class for AES-GCM encryption/decryption using Node.js crypto module
- Added support for AES-128, AES-192, and AES-256 in both CBC and GCM modes
- Added Vitest tests for both ciphers in `src/__tests__`
- Added comprehensive documentation in README.md
