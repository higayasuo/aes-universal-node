# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2024-04-18

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
