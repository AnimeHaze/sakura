import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config
export default defineConfig({
  root: path.join(__dirname, 'src', 'renderer', 'notify-window'),
  plugins: [vue()],
  resolve: {
    alias: [
      { find: 'vue' , replacement: 'vue/dist/vue.esm-bundler.js' },
      { find: '@notify', replacement: fileURLToPath(new URL('./src/renderer/notify-window', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./assets', import.meta.url)) },
      { find: '@enums', replacement: fileURLToPath(new URL('./src/enums', import.meta.url)) },
    ],
  },
  build: {
    rollupOptions: {
      input: path.join(__dirname, 'src', 'renderer', 'notify-window', 'notify-index.html')
    }
  },
});
