import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'abc',
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    target: 'es2020',
    sourcemap: true,
    copyPublicDir: false,
  }
})
