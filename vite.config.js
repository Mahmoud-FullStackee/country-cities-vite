import { defineConfig } from 'vite';

export default defineConfig({
  base: '/country-cities-vite',
  // server: {
  //   hmr: false,
  // },
  build: {
    rollupOptions: {
      input: {
        index: './index.html', // Main index.html
        'example-1': './example-1.html',
        'example-2': './example-2.html',
        'example-3': './example-3.html',
        'example-4': './example-4.html',
        'example-5': './example-5.html',
      },
    },
  },
});
