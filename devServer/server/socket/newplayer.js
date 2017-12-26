const { mock } = require('mockjs');

module.exports = function (io, socket) {
    return new Promise(resolve => {
        var timer;

        socket.on('start newplayer', () => {
            clearInterval(timer);
            socket.emit('start newplayer', initData());
            timer = setInterval(() => {
                socket.emit('start newplayer', mock({
                    newplayer: [{
                        time: +new Date,
                        'amount|666-888': 0
                    }]
                }));
            }, 5000);

            resolve(timer);
        });

        socket.on('end newplayer', () => {
            clearInterval(timer);
        });

        function initData() {
            var now = +new Date,
                past = +new Date(now - 600000),
                times = (function () {
                    var ret = [];
                    for (; past <= now; past += 5000) {
                        ret.push(past);
                    }
                    return ret;
                })(),
                data = mock({
                    'newplayer|121': [
                        { 'amount|666-888': 0 }
                    ]
                });

            data.newplayer.forEach((item, index) => {
                item.time = times[index];
            });

            return data;
        }
    });
};