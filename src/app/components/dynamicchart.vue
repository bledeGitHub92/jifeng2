<template>
    <div id="dynamic-chart">
        <chart-loading v-show="loadingState"></chart-loading>
    </div>
</template>

<script>
import G2, { Chart } from 'g2';
import { mapState } from 'vuex';
import ajax from '../lib/ajax';
import ChartLoading from '../components/chart/chartloading.vue';

G2.track(false);

export default {
    name: 'DynamicChart',
    components: {
        ChartLoading
    },
    data() {
        return {
            chart: null,
            loadingState: false,
            loadingTimer: 0
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
                timestamp = +new Date,
                tabName = this.tabName,
                socket = this.socket,
                data = [];

            clearTimeout(this.loadingTimer);
            // open loading
            this.loadingState = true;

            socket.off(`start ${tabName}`);
            socket.on(`start ${tabName}`, result => {
                data.push(...result[field]);

                if (!this.loadingState) {
                    chart.changeData(data);
                } else {
                    var rest = 1000 - (+new Date - timestamp);
                    if (rest > 0) {
                        this.loadingTimer = setTimeout(() => {
                            // close loading
                            this.loadingState = false;
                            chart.changeData(data);
                        }, rest);
                    } else {
                        chart.changeData(data);
                    }
                }
            });
            socket.emit(`start ${tabName}`);

            function drawGraph(ctx, alias) {
                var data = [], chart;
                ctx.chart = chart = new Chart({
                    id: 'dynamic-chart',
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
                device: { alias: '设备', field: 'device' },
                newplayer: { alias: '玩家', field: 'newplayer' },
                income: { alias: '收入', field: 'income' },
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
#dynamic-chart {
    min-height: 455px;
    position: relative;
    top: 0;
    left: 0;
}
</style>
