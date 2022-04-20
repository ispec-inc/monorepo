const path = require('path')
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  webpack: (config) => {
    config.plugins.push(UnoCSS())
    return config
  },
}
