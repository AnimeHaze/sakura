/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', 'src/renderer/**/*.vue'],
  future: {
    hoverOnlyWhenSupported: true
  },
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'media-brand': 'rgb(var(--media-brand) / <alpha-value>)',
        'media-focus': 'rgb(var(--media-focus) / <alpha-value>)'
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: [
    require('tailwindcss-animate'),
    require('vidstack/tailwind.cjs')({
      prefix: 'media',
      webComponents: true
    }),
    customVariants
  ]
}

function customVariants ({ addVariant, matchVariant }) {
  // Strict version of `.group` to help with nesting.
  matchVariant('parent-data', (value) => `.parent[data-${value}] > &`)

  addVariant('hocus', ['&:hover', '&:focus-visible'])
  addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &'])
}
