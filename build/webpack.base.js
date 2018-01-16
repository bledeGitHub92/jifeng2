var path = require('path');

module.exports = {
    entry: {
        app: './src/app/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),    // 输出路径，须使用绝对路径
        filename: '[name].bundle.js'    // 输出文件名
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(png|jpg|gif|otf|eot|svg|ttf|woff|woff2)([?]?.*)$/,
            use: [{
                loader: 'url-loader',
                query: {
                    name: 'file/[name].[ext]',
                    limit: '8192',
                }
            }]
        }]
    },
    plugins: [],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'lib': path.resolve(__dirname, '../src/app/lib')
        }
    },
};