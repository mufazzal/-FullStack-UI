'use strict'
// const path = require('path');
const { STAGE } = require('./_mode')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const paths = require('./paths')
const path = require('path')
const { getCopyAssetPlugin, getCopyExpressServer, installProdDependenciesOnly } = require('./plugin')

const webpackBaseConfig = require('./webpack.base.config')
const webpackBaseStageConfig = webpackBaseConfig(STAGE)

const bundleAnalyzerPluginInst = new BundleAnalyzerPlugin({
  reportFilename: path.join(paths.REPORTS, 'webpack-bundle-analysis/index.html'),
  reportTitle: 'Webpack Bundle Analysis',
  analyzerMode: 'static'
})

const webpackStageConfig = {
  ...webpackBaseStageConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    ...webpackBaseStageConfig.plugins,
    bundleAnalyzerPluginInst,
    getCopyAssetPlugin(STAGE),
    getCopyExpressServer(STAGE),
    installProdDependenciesOnly(STAGE)
  ]
}
module.exports = webpackStageConfig
