const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const paths = require('./paths')

const getCopyAssetPlugin = (env) => {
  return new CopyPlugin({
    patterns: [
      { from: path.join(paths.ROOT, 'i18n', 'locales'), to: path.join(paths.DIST, env, 'locales') }
    ]
  })
}

module.exports = {
  getCopyAssetPlugin
}
