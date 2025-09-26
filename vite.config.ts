import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [restart({ restart: ['../public/**'] }), react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: true,
    open: true,
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
  },
})
