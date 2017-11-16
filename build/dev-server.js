const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webpack = require('webpack');
const config = require('./webpack.dev.js');    // webpack 开发环境配置
const compiler = webpack(config);
const router = require('./router');
const { mock } = require('mockjs');

// mock
app.use('/v2', router);

// redirect
app.use(require('connect-history-api-fallback')({
    rewrites: [
        { from: /\/(summary|online|charts|dashboard|mail|form|table|time-line|players)/, to: '/app.html' },
    ]
}));

// hot-reload
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));
app.use(require("webpack-hot-middleware")(compiler));

// web socket
io.on('connection', socket => {
    var timer1, timer2;

    socket.on('start delta', () => {
        timer1 = setInterval(() => {
            io.emit('start delta', mock({
                'delta|10': [/\d{1,2}/]
            }));
        }, 1000);
    });
    socket.on('end delta', () => {
        clearInterval(timer1);
    });

    socket.on('start online', () => {
        timer2 = setInterval(() => {
            io.emit('start online', mock({
                online: {
                    time: +new Date,
                    player: /\d{4}/
                }
            }));
        }, 1000);
    });

    socket.on('end online', () => {
        clearInterval(timer2);
    });

    socket.on('disconnect', () => {
        clearInterval(timer1);
        clearInterval(timer2);
    });
});

http.listen(8888, () => {
    console.log('Example app listenning on port 8888!\n');
});