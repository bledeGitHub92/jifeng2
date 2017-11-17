const { mock } = require('mockjs');

module.exports = function (io, socket) {
    return new Promise(resolve => {
        var timer;
        
        socket.on('start delta', () => {
            socket.emit('start delta', initData());
            timer = setInterval(() => {
                socket.emit('start delta', mock({
                    'delta|10': [/\d{1,2}/]
                }));
            }, 3000);
            resolve(timer);
        });

        socket.on('end delta', () => {
            clearInterval(timer);
        });

        function initData() {
            var titles = ['设备激活（含重复安装）', '总活跃', '付费玩家', '今日收入', '游戏次数', '新增玩家', '老玩家', '付费次数', '累积收入', '平均游戏时长'],
                data = mock({
                    'realtime|10': [
                        {
                            'data|0-9': 0,
                            'delta|6-66': 0,
                            'detail|3': [/\d{4,5}/]
                        },
                    ],
                });

            data.realtime.forEach((item, index) => {
                item.title = titles[index];
            });

            return data;
        }
    });
};