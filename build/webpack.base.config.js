/*eslint-disable */
const path = require('path');
const paths = require('./paths');
const { PROD, DEV, STAGE } = require('./_mode')
const { babelLoader, cssLoader, scssLoader, otherLoaders } = require('./loaders')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ProgressPlugin, ContextReplacementPlugin, DefinePlugin } = require('webpack')
// const CompressionPlugin = require("compression-webpack-plugin");

const progressPluginInst = new ProgressPlugin({
    activeModules: true,
    entries: true,
    modules: true,
    handler(percentage, message, ...args) {
        // console.info(percentage, message, ...args);
        console.info(`${(percentage * 100).toFixed()}% ${message}`, ...args);

    },
    profile: false,
    dependencies: true,
    percentBy: null,
});

const htmlWebpackPluginInst = new HtmlWebpackPlugin({
    template: './assets/index.html'
})

module.exports = (env) => {
    const isDevServer = env === DEV
    const isMiniCssPlugin = env === PROD

    const definePluginInst = new DefinePlugin({
        __STAGE__: JSON.stringify(env),
        __IS_NODE_PRODUCTION__: JSON.stringify(process.env.NODE_ENV === "production"),
        __VERSION__: JSON.stringify('1.0.0 ????'),
        __BUILD__: JSON.stringify(isDevServer ? 'local' : '????TBD????' )
    });


    return {
        entry: {
            main: path.join(paths.SRC, 'index.tsx')
        },
        output: {
            path: path.join(paths.DIST, env),
            filename: '[name]-bundle.js',
            publicPath: isDevServer ? '/' : '/public/'
        },

        module: {
            rules: [
                babelLoader(isDevServer),
                cssLoader(isMiniCssPlugin),
                scssLoader(isMiniCssPlugin),
                ...otherLoaders
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '@modals': path.resolve(paths.SRC, "interfaces"),
                '@modules': path.resolve(paths.SRC, "modules"),
                '@utils': path.resolve(paths.SRC, "utils"),
                '@srcRoot': path.resolve(paths.SRC),
                '@comp': path.resolve(paths.SRC, "commonComponent")
            }
        },
        plugins: [
            progressPluginInst,
            new CleanWebpackPlugin(),
            htmlWebpackPluginInst,
            new ContextReplacementPlugin(/moment[/\\]locale$/, /en|it/),
            definePluginInst
            // new CompressionPlugin()
        ].filter(Boolean),
        optimization: {
            runtimeChunk: 'single',
            minimizer: [],
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        reuseExistingChunk: true,
                    }
                }
            }
        },
    }
}