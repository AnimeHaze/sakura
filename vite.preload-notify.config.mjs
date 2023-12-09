import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: [
      { find: '@enums', replacement: fileURLToPath(new URL('./src/enums', import.meta.url)) }
    ]
  }
})
