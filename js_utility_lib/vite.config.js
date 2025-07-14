import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  base: './', // Use relative paths for deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable source maps for production
    minify: 'terser', // Better minification
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        // Better caching with content hashes
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Performance optimizations
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
    open: true,
    host: true, // Allow external connections
  },
  preview: {
    port: 3000,
    host: true,
  },
  define: {
    // Make environment variables available at build time
    __API_NINJAS_KEY__: JSON.stringify(process.env.API_NINJAS_KEY || ''),
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['prismjs']
  }
});
