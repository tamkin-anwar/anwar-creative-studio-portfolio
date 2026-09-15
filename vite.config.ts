import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
  base: '/anwar-creative-studio-portfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolvePath('./index.html'),
        now: resolvePath('./now/index.html'),
        colophon: resolvePath('./colophon/index.html'),
        notFound: resolvePath('./404.html'),
      },
    },
  },
})
