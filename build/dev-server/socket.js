const delta = require('./socket/delta');
const online = require('./socket/online');
const device = require('./socket/device');
const newplayer = require('./socket/newplayer');
const income = require('./socket/income');

module.exports = function (io) {
    io.on('connection', socket => {
        var timer1, timer2, timer3, timer4, timer5;

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