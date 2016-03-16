var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractScss = new ExtractTextPlugin('../styles/[name].css');
var extractLess = new ExtractTextPlugin('../styles/[name].css');
var wp_build_platform = process.env.WP_BUILD_PLATFORM;
if (!wp_build_platform) {
    console.error('please specify environment variable WP_BUILD_PLATFORM');
    return;
}
module.exports = {
    entry: {
        index: './src/modules/index.js',
        'agent_detail': './src/modules/agent_detail.js'
    },
    output: {
        hash: true,
        path: 'dist/'+wp_build_platform+'/js',
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
        }),
        extractScss,
        extractLess
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
                loader: extractScss.extract(['css', 'sass']),
            },
            {
                test: /\.less/,
                loader: extractScss.extract(['css', 'less']),
            }
        ]
    }
};
