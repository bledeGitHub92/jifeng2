<template>
    <div id="c1">

    </div>
</template>

<script>
import G2, { Chart } from 'g2';
import { mapState } from 'vuex';
import ajax from '../lib/ajax';

G2.track(false);

export default {
    name: 'GChart',
    computed: {
        ...mapState(['socket'])
    },
    methods: {
        initGraph() {
            ajax.get('/v2/online', 'online')
                .then(data => {
                    this.drawGraph(data);
                    // var socket = this.socket;
                    // socket.on('start online', ({ online }) => {
                    //     online = { ...online, date: '2017-11-16' }
                    //     if (data.length > 100) {
                    //         data.shift();
                    //     }
                    //     data.push(online);
                    //     chart.changeData(data);
                    // });
                    // socket.emit('start online');
                });
        },
        drawGraph(data) {
            data.forEach(item => {
                item.date = '2017-11-16'
            });
            console.log(data);
            var chart = new Chart({
                id: 'c1',
                forceFit: true,
                height: 450
            });
            chart.source(data, {
                time: {
                    alias: '时间',
                    type: 'cat',
                    tickCount: 13
                    // mask: 'hh:ss'
                },
                player: {
                    alias: '玩家',
                    type: 'linear'
                },
                date: {
                    alias: '日期',
                    type: 'cat'
                }
            });
            chart.legend({
                position: 'top', // 设置图例的显示位置
                spacingX: 20, // 图例项之间的水平间距
                marker: 'square',
                dy: -10
            });
            chart.line().position('time*player').color('date').size(2);
            chart.render();
        },
    },
    mounted() {
        this.initGraph();
    },
    beforeDestroy() {
        this.socket.emit('end online');
    }
}
</script>

<style lang="less" scoped>

</style>
