const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.js');    // webpack 开发环境配置

const app = express();
const compiler = webpack(config);

app.use(require('connect-history-api-fallback')({
    rewrites: [
        { from: /\/(summary|online|charts|dashboard|mail|form|table)/, to: '/app.html' },
    ]
}));

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.listen(8888, function () {
    console.log('Example app listenning on port 8888!\n');
});