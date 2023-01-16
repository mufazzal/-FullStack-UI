'use strict'
const paths = require('./paths')
const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { PROD } = require('./_mode')
const webpackBaseConfig = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { getCopyAssetPlugin } = require('./plugin')

const webpackBaseProdConfig = webpackBaseConfig(PROD)

const optimizeCssAssetsPluginInstance = new OptimizeCssAssetsPlugin({
  cssProcessorOptions: {
    map: {
      inline: false,
      annotation: true
    }
  }
})

const terserPluginInstance = new TerserPlugin({
  // Use multi-process parallel running to improve the build speed
  // Default number of concurrent runs: os.cpus().length - 1
  parallel: true
})

const bundleAnalyzerPluginInst = new BundleAnalyzerPlugin({
  reportFilename: path.join(paths.REPORTS, 'webpack-bundle-analysis/index.html'),
  reportTitle: 'Webpack Bundle Analysis',
  analyzerMode: 'static'
})
const miniCssExtractPluginInstance = new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css' })

const webpackProdConfig = {
  ...webpackBaseProdConfig,
  mode: 'production',
  optimization: {
    ...webpackBaseProdConfig.optimization,
    minimizer: [
      ...webpackBaseProdConfig.optimization.minimizer,
      optimizeCssAssetsPluginInstance,
      terserPluginInstance
    ]
  },
  plugins: [
    ...webpackBaseProdConfig.plugins,
    miniCssExtractPluginInstance,
    bundleAnalyzerPluginInst,
    getCopyAssetPlugin(PROD)
  ]
}

module.exports = webpackProdConfig
