var router = require('express').Router();
var { mock } = require('mockjs');

router.route('/realtime')
    .get((req, res, next) => {
        res.send(mock({
            realtime: [
                {
                    title: "设备激活（含重复安装）",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "总活跃",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "付费玩家",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "今日收入",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "游戏次数",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "新增玩家",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "老玩家",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "付费次数",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "累计收入",
                    'data|0-9': 0,
                    'delta|6-66': 0,
                    'detail|3': [/\d{4,5}/]
                },
                {
                    title: "平均每次游戏时长",
                    'data|10-60': 0,
                    'delta|5-10': 0,
                    'detail|3': [/\d{4,5}/]
                }
            ],
        }));
    });

router.route('/online')
    .get((req, res, next) => {
        var now = +new Date,
            past = +new Date(now - 600000),
            times = (function () {
                var ret = [];
                for (; past <= now; past+=5000) {
                    ret.push(past);
                }
                return ret;
            })(),
            data = mock({
                'online|120': [
                    { 'player|666-888': 0 }
                ]
            });
            
        data.online.forEach((item, index) => {
            item.time = times[index];
        });

        res.send(data);
    });

module.exports = router;