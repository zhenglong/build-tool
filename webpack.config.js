var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/modules/index.js',
        'agent_detail': './src/modules/agent_detail.js'
    },
    output: {
        path: 'dist',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                //include: __dirname + '/src',
                query: {
                    presets: ["react", "es2015", "react-hmre"],
                    babelrc: false
                }
            },
            {
                test: /\.scss/,
                loader: 'style!css!sass',
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.less/,
                loader: 'style!css!less',
                loaders: ['style', 'css', 'less']
            },
            {
                test: /\.html/,
                loader: 'html'
            }
        ]
    }
};
