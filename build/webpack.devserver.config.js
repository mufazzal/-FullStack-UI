'use strict'
/*eslint-disable */
const paths = require('./paths');
const path = require('path');
const { PROD, DEV, STAGE } = require('./_mode')
const fs = require('fs')

const webpackBaseConfig = require('./webpack.base.config')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackBaseDevConfig = webpackBaseConfig(DEV)

const webpackDevConfig = {
    ...webpackBaseDevConfig,
    plugins: [...webpackBaseDevConfig.plugins, new ReactRefreshWebpackPlugin()],
    devServer: {
        static: './dist/dev',
        port: 3100,
        hot: true,
        proxy: {
            '/locales/*/*.json': {
                selfHandleResponse: true,
                bypass(req, resp) {
console.log('-----handling-----', req.path)
                    const [_match, lang, ns] = req.url.match(/locales\/([-\w]+)\/([-\w]+).json/)
                    const txPath = path.join(paths.i18n, 'locales', lang, ns+".json")
console.log('webpack.dev.server : local', lang, ns, txPath)
                    resp.header("Content-Type", "application/json")                    
                    fs.createReadStream(txPath).pipe(resp);
                },
            },
            '/api/**': {
                target: 'http://localhost:3010/',
                secure: false,
                changeOrigin: true,
                onProxyReq: (req) => {
                    console.log('webpack.dev.server', req.path, 'MOVED TO', '????')
                }
            }
        }
    },
    mode: 'development',
    devtool: 'inline-source-map',
}

module.exports = webpackDevConfig
