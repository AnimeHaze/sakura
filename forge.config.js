const fsp = require('node:fs/promises')
const path = require('node:path')
const meta = require('./package.json')

/**
 * @param {string} folder
 * @param {string} [exclude]
 */
async function cleanupEmptyFolders (folder, exclude) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!(await fsp.stat(folder)).isDirectory()) return

  const folderName = path.basename(folder)
  if (exclude && exclude.includes(folderName)) {
    return
  }

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  let files = await fsp.readdir(folder)

  if (files.length > 0) {
    await Promise.all(files.map(file => cleanupEmptyFolders(path.join(folder, file), exclude)))
    // Re-evaluate files; after deleting subfolders we may have an empty parent
    // folder now.
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    files = await fsp.readdir(folder)
  }

  if (files.length === 0) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await fsp.rmdir(folder)
  }
}

module.exports = {
  hooks: {
    postPackage: async function (forgeConfig, options) {
      if (!(options.outputPaths instanceof Array)) {
        return
      }

      const [outputDir] = options.outputPaths

      // Remove useless locales
      const localesDir = path.join(outputDir, 'locales')
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      const files = await fsp.readdir(localesDir)

      for (const file of files) {
        if (path.parse(file).name !== 'en-US') {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          await fsp.unlink(path.join(localesDir, file))
        }
      }
    }
  },
  packagerConfig: {
    asar: true,
    executableName: meta.productName,
    icon: path.resolve(__dirname, 'assets', 'logo', 'logo'),
    prune: true,
    afterPrune: [async (buildPath, electronVersion, platform, arch, callback) => {
      // Remove empty dirs after prune
      await cleanupEmptyFolders(path.join(buildPath, 'node_modules'))

      // Cleanup package.json
      const packageDotJson = path.join(buildPath, 'package.json')
      const json = await fsp.readFile(packageDotJson, 'utf8')
      const content = JSON.parse(json)
      const allowedKeys = [
        'name', 'productName', 'version', 'description', 'main',
        'keywords', 'homepage', 'bugs', 'author', 'license'
      ]

      const result = Object.fromEntries(
        Object.entries(content)
          .filter(([key]) => allowedKeys.includes(key))
      )

      await fsp.writeFile(packageDotJson, JSON.stringify(result, null, 2))
    }],
    ignore: [
      '.commitlintrc.js',
      '.editorconfig',
      '.env.development',
      '.env.example',
      '.env.production',
      '.eslintrc.js',
      '.git',
      '.gitignore',
      '.husky',
      '.idea',
      '.yarn',
      '.yarnrc.yml',
      'assets',
      'forge.config.js',
      'jsconfig.json',
      'package-lock.json',
      'pnpm-lock.yaml',
      'src',
      'vite.preload-notify.config.mjs',
      'vite.preload.config.mjs',
      'vite.renderer-notify.config.mjs',
      'vite.renderer.config.mjs',
      'node_modules/fastify/test'
      // eslint-disable-next-line security/detect-non-literal-regexp
    ].map(x => new RegExp('^/' + x))
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-deb',
    //   config: {
    //     options: {
    //       bin: meta.productName, // https://github.com/electron-userland/electron-installer-debian/issues/175#issuecomment-1558131497,
    //       name: meta.productName,
    //       homepage: meta.homepage,
    //       maintainer: meta.author.name,
    //       description: meta.description,
    //       section: 'video',
    //       categories: ['AudioVideo'],
    //       icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png')
    //     }
    //   }
    // },
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   config: {}
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: [/*'darwin', 'windows',*/ 'linux']
    },
    // {
    //   name: '@electron-forge/maker-snap',
    //   config: {
    //     icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png'),
    //     features: {
    //       audio: true,
    //       webgl: true
    //     },
    //     version: meta.version,
    //     base: 'core18',
    //     grade: 'stable',
    //     issues: meta.bugs.url,
    //     summary: meta.description,
    //     description: meta.description
    //   }
    // },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {
    //     categories: ['AudioVideo'],
    //     compressionLevel: 9
    //   }
    // },
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     overwrite: true,
    //     iconSize: 1024,
    //     format: 'ULFO'
    //   }
    // },
    // {
    //   name: '@electron-forge/maker-flatpak',
    //   config: {
    //     options: {
    //       categories: ['AudioVideo'],
    //       id: 'org.animehaze.sakura'
    //     }
    //   }
    // },
    // {
    //   name: '@electron-forge/maker-pkg',
    //   config: {}
    // },
    // {
    //   name: '@reforged/maker-appimage',
    //   config: {
    //     options: {
    //       name: meta.productName,
    //       bin: meta.productName,
    //       productName: meta.productName,
    //       genericName: meta.productName,
    //       icon: path.resolve(__dirname, 'assets', 'logo', 'logo.png'),
    //       AppImageKitRelease: 'continuous',
    //       flagsFile: 'true'
    //     }
    //   }
    // }
  ],
  plugins: [
    // {
    //   name: '@electron-forge/plugin-electronegativity',
    //   config: {
    //     isSarif: true,
    //     input: path.resolve(__dirname, '/src')
    //   }
    // },
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
