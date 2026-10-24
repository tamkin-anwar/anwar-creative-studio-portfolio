import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Build-time server bundle for prerendering; never deployed.
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
  },
})
