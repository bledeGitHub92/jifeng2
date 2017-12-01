<template>
    <div id="dynamic-chart">
        <chart-loading v-show="graphLoading"></chart-loading>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import ChartLoading from '../components/chart/chartloading.vue';
import Request from '../lib/Request';

export default {
    name: 'DynamicChart',
    components: {
        ChartLoading
    },
    data() {
        return {
            loadingTimer: 0,
        }
    },
    computed: {
        ...mapState(['socket', 'tabName', 'chart', 'graphLoading', 'timestamp'])
    },
    watch: {
        tabName(fresh, stale) {
            this.socket.emit(`end ${stale}`);
            this.setListener();
        }
    },
    methods: {
        ...mapMutations(['hideGraphLoading', 'refreshChart']),
        ...mapActions(['socketEmit']),
        setListener() {
            var socket = this.socket,
                tabName = this.tabName,
                request = new Request({ emitter: '实时概况', detail: tabName }),
                data = [];

            clearTimeout(this.loadingTimer);

            socket.off(`start ${tabName}`);
            socket.on(`start ${tabName}`, result => {
                var chart = this.chart,
                    list = result[tabName],
                    rest = 1000 - (+new Date() - this.timestamp);

                if (list.length === 1) {
                    data.push(...result[tabName])
                } else {
                    setTimeout(() => {
                        request.success();
                    }, 1000);
                    data = list;
                }

                if (rest > 0) {
                    this.loadingTimer = setTimeout(() => {
                        // 隐藏 graph loading
                        this.hideGraphLoading();
                        chart.changeData(data);
                    }, rest);
                } else {
                    chart.changeData(data);
                }
            });
            this.socketEmit({ type: 'summary', timestamp: +new Date, request });
        },
    },
    mounted() {
        this.setListener();
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
