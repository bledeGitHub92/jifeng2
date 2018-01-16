var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

const library = '[name]_library';

module.exports = {
    entry: {
        vue: ['vue', 'vuex', 'vue-router', 'vuex-router-sync'],
        vendor: ['g2', 'clipboard']
    },
    output: {
        library,
        filename: '[name].[chunkhash:8].dll.js',
        path: path.resolve(__dirname, '../dist/dlls')
    },
    plugins: [
        new webpack.DllPlugin({
            name: library,
            context: __dirname,
            path: path.join(__dirname, '../dist/manifests/[name].manifest.json')
        }),
        new AssetsPlugin({
            filename: 'bundle-config.json',
            path: path.resolve(__dirname, '../dist')
        }),
        new CleanPlugin(['dlls', 'manifests'], {
            verbose: true,
            root: path.resolve(__dirname, '../dist')
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.HashedModuleIdsPlugin(),
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
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js',
        }
    }
}