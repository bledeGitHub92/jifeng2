const { mock } = require('mockjs');

module.exports = function (io, socket) {
    return new Promise(resolve => {
        var timer;

        socket.on('start device', () => {
            clearInterval(timer);
            socket.emit('start device', initData());
            timer = setInterval(() => {
                socket.emit('start device', mock({
                    device: [{
                        time: +new Date,
                        'amount|666-888': 0
                    }]
                }));
            }, 5000);

            resolve(timer);
        });

        socket.on('end device', () => {
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
                    'device|121': [
                        { 'amount|666-888': 0 }
                    ]
                });

            data.device.forEach((item, index) => {
                item.time = times[index];
            });

            return data;
        }
    });
};