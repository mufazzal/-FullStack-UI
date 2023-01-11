const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const babelLoader = (isDevServer) => ({
    test: /\.(js|jsx|tsx|ts)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            plugins: [
                isDevServer && require("react-refresh/babel"),
                // ['import', { libraryName: 'antd', style: true }, 'antd',]
            ].filter(Boolean)
        }
    },
})

const cssLoader = (isMiniCssPlugin) => ({
    test: /\.css$/i,
    use: [isMiniCssPlugin ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],  //style-loader
})

const scssLoader = (isMiniCssPlugin) => ({
    test: /\.(s(a|c)ss)$/,
    use: [isMiniCssPlugin ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],  //style-loader
})

const lessLoader = (isMiniCssPlugin) => ({
    test: /\.less$/i,
    use: [{
      loader: isMiniCssPlugin ? MiniCssExtractPlugin.loader : 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'less-loader',
      options: {
        lessOptions: { javascriptEnabled: true }
      }
    }]
  })
  
const otherLoaders = [
    {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [{
            loader: 'url-loader',
            options: { encoding: 'utf8', name: "public/[name]-[hash].[ext]" }
        }],
    },
    {
        test: /\.(svg|jpg|png)$/,
        use: [{
            loader: 'url-loader',
            options: {
                name: "public/[name]-[hash].[ext]",
                limit: 10000,
                fallback: "file-loader",

            }
        }],
    }    
]

module.exports = {
    babelLoader, cssLoader, scssLoader, otherLoaders, lessLoader
}