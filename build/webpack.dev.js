var path = require('path');
var webpack = require('webpack');
var base = require('./webpack.base');
var merge = require('webpack-merge');
var HtmlPlugin = require('html-webpack-plugin');

Object.keys(base.entry).forEach(function (name) {
    base.entry[name] = [
        'webpack-hot-middleware/client?timeout=2000&reload=true',
        'babel-polyfill'
    ].concat(base.entry[name]);
});

module.exports = merge(base, {
    devtool: 'inlnie-source-map',
    output: {
        path: '/',
        publicPath: '/',
        filename: '[name].dev.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: './src/app/app.html',
            filename: 'app.html',
            chunks: ['app']
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.vue$/,
            include: path.resolve(__dirname, '../src'),
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
                    },
                }
            }]
        }]
    },
});