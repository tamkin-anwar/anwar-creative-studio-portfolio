import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolvePath('./index.html'),
        now: resolvePath('./now/index.html'),
        colophon: resolvePath('./colophon/index.html'),
        about: resolvePath('./about/index.html'),
        contact: resolvePath('./contact/index.html'),
        privacy: resolvePath('./privacy/index.html'),
        terms: resolvePath('./terms/index.html'),
        notFound: resolvePath('./404.html'),
      },
    },
  },
})
