const delta = require('./socket/delta');
const online = require('./socket/online');
const device = require('./socket/device');
const newplayer = require('./socket/newplayer');
const income = require('./socket/income');

module.exports = function (io) {
    io.on('connection', socket => {
        var timer1, timer2, timer3, timer4, timer5;

        socket.emit('get power', {
            platform: [
                { text: '越狱' },
                { text: '安卓' },
                { text: '乐游' },
                { text: 'IOS正版' },
                { text: '大麦BT' },
                { text: 'C游BT' },
                { text: '新马' },
                { text: '韩服' },
                { text: '185sy' },
            ],
            channel: [
                { text: '至趣' },
                { text: '妖火' },
                { text: '掌游' },
                { text: '圈圈' },
                { text: '墨仙' },
                { text: '汉风' },
                { text: '果盘' },
                { text: '悦动' },
            ],
            server: [
                { text: '越狱1服' },
                { text: '越狱2服' },
                { text: '越狱3服' },
                { text: '越狱4服' },
                { text: '越狱5服' },
                { text: '越狱6服' },
                { text: '安卓1服' },
                { text: '安卓2服' },
                { text: '安卓3服' },
                { text: '安卓4服' },
                { text: '安卓5服' },
                { text: '安卓6服' },
                { text: '苹果1服' },
                { text: '苹果2服' },
                { text: '苹果3服' },
                { text: '苹果4服' },
                { text: '苹果5服' },
                { text: '苹果6服' },
            ]
        });

        // start delta
        delta(io, socket).then(timer => {
            timer1 = timer;
        });

        // start online
        online(io, socket).then(timer => {
            timer2 = timer;
        });

        // start device
        device(io, socket).then(timer => {
            timer3 = timer;
        });

        // start newplayer
        newplayer(io, socket).then(timer => {
            timer4 = timer;
        });

        // start income
        income(io, socket).then(timer => {
            timer5 = timer;
        });

        socket.on('disconnect', () => {
            clearInterval(timer1);
            clearInterval(timer2);
            clearInterval(timer3);
            clearInterval(timer4);
            clearInterval(timer5);
        });
    });
};