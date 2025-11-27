import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [restart(), react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: true,
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(globSync('demo/**/*.html').map((file, i) => [`demo${i}`, file])),
      },
    },
  },
})
