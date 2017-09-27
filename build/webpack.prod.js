var base = require('./webpack.base');
var webpack = require('webpack');
var merge = require('webpack-merge');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = merge(base, {
    devtool: 'source-map',
    output: {
        path: '',    // 输出路径，须使用绝对路径
        filename: '[name].[contenthash:8].js'    // 输出文件名
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanPlugin(['dist']),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});