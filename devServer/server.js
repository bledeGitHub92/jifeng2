const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webpack = require('webpack');
const config = require('../build/webpack.dev.js');    // webpack 开发环境配置
const compiler = webpack(config);
const router = require('./server/router');
const setSocket = require('./server/socket');

// mock
app.use('/v2', router);

// redirect
app.use(require('connect-history-api-fallback')({
    index: '/app.html',
    rewrites: [
        // { from: /\/(summary|report|dashboard|mail|form|table|time-line|player\/add)/, to: '/app.html' },
    ]
}));

// hot-reload
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));
app.use(require("webpack-hot-middleware")(compiler));

// web socket
setSocket(io);

http.listen(8888, () => void console.log('jifeng2 listenning on port 8888!\n'));