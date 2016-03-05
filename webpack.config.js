var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/modules/index.js',
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
            warnings: true
        }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
                query: {
                    presets: ["react", "es2015", "react-hmre"]
                }
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass',
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.html/,
                loader: 'html'
            }
        ]
    }
};
