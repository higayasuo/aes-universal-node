import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/**
 * Vite configuration for building both ESM and CJS outputs, with type declarations.
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      external: ['crypto', 'aes-universal'],
    },
  },
});
