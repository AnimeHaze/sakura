import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config
export default defineConfig({
  root: path.join(__dirname, 'src', 'renderer', 'main-window'),
  plugins: [vue({
    template: {
      compilerOptions: {
        // treat all components starting with `my-lit` as custom elements
        isCustomElement: tag => {
          if (tag.startsWith('media-')) return true

          return ['track'].includes(tag)
        }
      }
    }
  })],
  resolve: {
    alias: [
      { find: 'vue' , replacement: 'vue/dist/vue.esm-bundler.js' },
      { find: '@', replacement: fileURLToPath(new URL('./src/renderer/main-window', import.meta.url)) },
      { find: '@assets', replacement: fileURLToPath(new URL('./assets', import.meta.url)) },
      { find: '@enums', replacement: fileURLToPath(new URL('./src/enums', import.meta.url)) },
    ]
  },
  build: {
    rollupOptions: {
      input: {
        main_window: path.resolve(__dirname,  'src', 'renderer', 'main-window', 'index.html')
      },
    },
  }
});
