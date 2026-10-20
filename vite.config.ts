import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { globSync } from 'glob'
import { defineConfig } from 'vite'
import fullReload from 'vite-plugin-full-reload'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    fullReload('./src/**'),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    rolldownOptions: {
      input: {
        main: 'index.html',
        ...Object.fromEntries(globSync('demo/**/*.html').map((file, i) => [`demo${i}`, file])),
      },
    },
  },
})
