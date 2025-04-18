## 2024-04-18 v0.1.2

- Fixed incorrect file extensions in Vite build output
  - Changed `index.js` to `index.mjs` for ESM format

## 2025-04-16 v0.1.1

- Initial release
- Added `NodeCbcCipher` class for AES-CBC encryption/decryption using Node.js crypto module
- Added `NodeGcmCipher` class for AES-GCM encryption/decryption using Node.js crypto module
- Added support for AES-128, AES-192, and AES-256 in both CBC and GCM modes
- Added Vitest tests for both ciphers in `src/__tests__`
- Added comprehensive documentation in README.md
