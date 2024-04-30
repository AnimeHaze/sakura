import { defineConfig } from 'vite'
import createExternal from 'vite-plugin-external'
import { fileURLToPath, URL } from "url"
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [
    createExternal({
      externals: {
        bufferutil: 'bufferutil'
      }
    })
  ],
  build: {
    commonjsOptions: {
      // For webtorrent
      dynamicRequireTargets: ['node_modules/default-gateway/*.js']
    }
  },
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    alias: [
      { find: '@enums', replacement: fileURLToPath(new URL('./src/enums', import.meta.url)) }
    ]
  }
})
