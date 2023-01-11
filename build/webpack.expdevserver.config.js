'use strict'
/*eslint-disable */
const paths = require('./paths');
const path = require('path');
const { PROD, DEV, STAGE } = require('./_mode')
const fs = require('fs')
const webpackBaseConfig = require('./webpack.base.config')
const webpackBaseDevConfig = webpackBaseConfig(DEV)
const { HotModuleReplacementPlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { getCopyAssetPlugin } = require('./plugin')

console.log('Running webpack config: webpack.expdevserver.config.js')

const webpackDevConfig = {
    ...webpackBaseDevConfig,
    entry: {
        main: [
            ...webpackBaseDevConfig.entry.main,
            'webpack-hot-middleware/client?timeout=2000&overlay=false',
        ]
    },
    output: {
        ...webpackBaseDevConfig.output,
        // path: path.join(paths.DIST, DEV, 'public'),
        // publicPath: '/public/'
    },
    plugins: [
        ...webpackBaseDevConfig.plugins,
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        getCopyAssetPlugin(DEV)
    ],
    mode: 'development',
    devtool: 'inline-source-map',
}

module.exports = webpackDevConfig
