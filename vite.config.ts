import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

/**
 * Vite configuration for building both ESM and CJS outputs, with type declarations.
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    dts({
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ExpoAesUniversalNode',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['expo-aes-universal'],
    },
  },
});
