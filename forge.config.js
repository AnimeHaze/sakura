const path = require('node:path')
const meta = require('./package.json')

module.exports = {
  packagerConfig: {
    executableName: meta.productName,
    icon: path.resolve(__dirname, 'assets', 'logo', 'logo')
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          bin: meta.productName, // https://github.com/electron-userland/electron-installer-debian/issues/175#issuecomment-1558131497,
          name: meta.productName,
          homepage: meta.homepage,
          maintainer: meta.author.name,
          description: meta.description,
          section: 'video',
          categories: ['AudioVideo'],
          icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png')
        }
      }
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux', 'windows']
    },
    {
      name: '@electron-forge/maker-snap',
      config: {
        icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png'),
        features: {
          audio: true,
          webgl: true
        },
        version: meta.version,
        base: 'core18',
        grade: 'stable',
        issues: meta.bugs.url,
        summary: meta.description,
        description: meta.description
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        categories: ['AudioVideo'],
        compressionLevel: 9
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        overwrite: true,
        iconSize: 1024,
        format: 'ULFO'
      }
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          categories: ['AudioVideo'],
          id: 'org.animehaze.sakura'
        }
      }
    },
    {
      name: '@electron-forge/maker-pkg',
      config: {}
    },
    {
      name: '@reforged/maker-appimage',
      config: {
        options: {
          name: meta.productName,
          bin: meta.productName,
          productName: meta.productName,
          genericName: meta.productName,
          icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png'),
          AppImageKitRelease: 'continuous',
          flagsFile: 'true'
        }
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-electronegativity',
      config: {
        isSarif: true
      }
    },
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        devContentSecurityPolicy: 'default-src * self blob: data: gap:; style-src * self \'unsafe-inline\' blob: data: gap:; script-src * \'self\' \'unsafe-eval\' \'unsafe-inline\' blob: data: gap:; object-src * \'self\' blob: data: gap:; img-src * self \'unsafe-inline\' blob: data: gap:; connect-src self * \'unsafe-inline\' blob: data: gap:; frame-src * self blob: data: gap:;',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/renderer/index.html',
              js: './src/renderer/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/renderer/preload.js'
              }
            }
          ]
        }
      }
    }
  ]
}
