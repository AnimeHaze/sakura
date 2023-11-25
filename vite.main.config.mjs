import { defineConfig } from 'vite'
import createExternal from 'vite-plugin-external'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    createExternal({
      externals: {
        bufferutil: 'bufferutil'
      }
    }),
  ],
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext']
  }
})
