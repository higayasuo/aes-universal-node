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
      name: 'expo-aes-universal-node',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['crypto', 'expo-aes-universal'],
    },
  },
});
