var fs = require('fs');
var base = require('./webpack.base');
var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var bundleConfig = require('../dist/bundle-config.json');

var extractCSS = new ExtractPlugin({ filename: 'styles/[name].static.[contenthash:8].css', allChunks: true });
var extractLESS = new ExtractPlugin({ filename: 'styles/[name].app.[contenthash:8].css', allChunks: true });
var extractCSSofVue = new ExtractPlugin({ filename: 'styles/[name].static.[contenthash:8].css', allChunks: true });
var extractLESSofVue = new ExtractPlugin({ filename: 'styles/[name].app.[contenthash:8].css', allChunks: true });



module.exports = merge(base, {
    // devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),    // 输出路径，须使用绝对路径
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',    // 输出文件名
        chunkFilename: 'scripts/[name].[chunkhash:8].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: extractCSS.extract({
                use: [{ loader: 'css-loader', options: { minimize: true } }],
                fallback: 'style-loader',
            })
        }, {
            test: /\.less$/,
            include: path.resolve(__dirname, '../src'),
            use: extractLESS.extract({
                use: [{ loader: 'css-loader', options: { minimize: true } }, 'postcss-loader', 'less-loader'],
                fallback: 'style-loader'
            })
        }, {
            test: /\.vue$/,
            include: path.resolve(__dirname, '../src'),
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractCSSofVue.extract({
                            use: [{ loader: 'css-loader', options: { minimize: true } }],
                            fallback: 'vue-style-loader'
                        }),
                        less: extractLESSofVue.extract({
                            use: [{ loader: 'css-loader', options: { minimize: true } }, 'postcss-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            }]
        }]
    },
    plugins: [
        extractLESS, extractCSS,
        extractCSSofVue, extractLESSofVue,
        new CleanPlugin(['dist'], {
            verbose: true,
            root: path.resolve(__dirname, '../'),
            exclude: ['dlls', 'manifests', 'bundle-config.json']
        }),
        new HtmlPlugin(Object.assign({
            chunks: ['runtime', 'app'],
            filename: 'app.html',
            template: './src/app/app.html',
        }, getVendor(['vue', 'vendor']))), // 配置第三方依赖),
        ...setReferencePlugin(), // 设置 webpack.DllReferencePlugin
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_debugger: true,
        //         drop_console: true
        //     }
        // })
    ]
});

function setReferencePlugin() {
    var root = './dist/manifests'
    var files = fs.readdirSync(root);

    return files.map(path => {
        return new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: root + '/' + path
        })
    });
}

function getVendor(vendors) {
    var ret = {
        runtime: `/dlls/${bundleConfig.runtime.js}`
    };

    vendors.forEach(name => {
        ret[name] = `/dlls/${bundleConfig[name].js}`
    });

    return ret;
}