const rules = require('./webpack.rules')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            isCustomElement: tag => {
              return [
                'media-player', 'track',
                'media-outlet', 'media-poster',
                'media-community-skin'
              ].includes(tag)
            }
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      ...rules
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    },
    fallback: {
      child_process: false,
      crypto: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      os: false,
      path: false,
      stream: false,
      tls: false,
      tty: false,
      url: false,
      util: false,
      zlib: false
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
