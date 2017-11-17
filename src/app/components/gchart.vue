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
    data() {
        return {
            chart: null
        }
    },
    props: {
        tabName: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState(['socket'])
    },
    watch: {
        tabName(fresh, stale) {
            var { alias, field } = this.getChart(fresh);
            this.socket.emit(`end ${stale}`);
            this.chart.destroy();
            this.initGraph(alias, field);
        }
    },
    methods: {
        initGraph(alias, field) {
            var chart = drawGraph(this, alias),
                socket = this.socket,
                data = [];

            socket.off(`start ${this.tabName}`);
            socket.on(`start ${this.tabName}`, result => {
                data.push(...result[field]);
                chart.changeData(data);
            });
            socket.emit(`start ${this.tabName}`);

            function drawGraph(ctx, alias) {
                var data = [], chart;
                ctx.chart = chart = new Chart({
                    id: 'c1',
                    forceFit: true,
                    height: 450
                });

                chart.source(data, {
                    time: {
                        alias: '时间',
                        type: 'time',
                        tickCount: 6,
                        mask: 'yyyy-mm-dd hh:MM:ss'
                    },
                    amount: {
                        alias: alias,
                        type: 'linear'
                    },
                });

                chart.line().position('time*amount').size(2);

                chart.render();

                return chart;
            }
        },
        getChart(chartName) {
            var fns = {
                online: { alias: '玩家', field: 'online' },
                device: { alias: '设备', field: 'device' }
            };

            return fns[chartName];
        }
    },
    mounted() {
        var { alias, field } = this.getChart(this.tabName);
        this.initGraph(alias, field);
    },
    beforeDestroy() {
        var socket = this.socket;
        var tabName = this.tabName;

        socket.off(`start ${tabName}`);
        socket.emit(`end ${tabName}`);
    }
}
</script>

<style lang="less" scoped>

</style>
