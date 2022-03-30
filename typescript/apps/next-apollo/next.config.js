/* eslint-disable */
const path = require('path')
const UnoCSS = require('@unocss/webpack').default
const { presetUno, presetAttributify } = require('unocss')

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.plugins.push(UnoCSS({
      include: [/\.tsx/],
      exclude: [/node_modules/],
      presets: [presetUno(), presetAttributify({ nonValuedAttribute: false })]
    }))
    return config
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
}
