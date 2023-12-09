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
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'src/main/main.js',
            config: 'vite.main.config.mjs'
          },
          {
            entry: 'src/renderer/main-window/preload.js',
            config: 'vite.preload.config.mjs'
          },
          {
            entry: 'src/renderer/notify-window/preload-notify.js',
            config: 'vite.preload-notify.config.mjs'
          }
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs'
          },
          {
            name: 'notify_window',
            config: 'vite.renderer-notify.config.mjs'
          }
        ]
      }
    }
  ]
}
