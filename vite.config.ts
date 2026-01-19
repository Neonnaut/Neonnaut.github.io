// vite.config.ts
import { defineConfig } from 'vite'
import banner from 'vite-plugin-banner'
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  build: {
    minify: 'terser',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      output: {
        manualChunks: () => null
      }
    }
  },
  plugins: [
    banner(`Program: ${pkg.name} -- version: ${pkg.version} -- license: ${pkg.license} -- author: ${pkg.author}`)
  ]
})