import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import laravel from 'laravel-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      laravel({
          input: ['resources/js/app.css', 'resources/js/main.tsx'],
          refresh: true,
      }),
      preact(),
  ],
})
