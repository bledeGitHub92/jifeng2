<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel @toggleChart="toggleChart" :chart-state="chartState">
            <panel-tab slot="tabs" v-bind="panelTab" @toggleTab="toggleTab"></panel-tab>
            <g2-chart v-show="chartState" v-bind="panelTab" @getChart="getChart"></g2-chart>
        </juice-panel>
    </juice-content>
</template>

<script>
import JuiceContent from '../components/juicecontent.vue'
import JuicePanel from '../components/juicepanel.vue';
import PanelTab from '../components/juicepanel/paneltab.vue';
import StatInfoBar from '../components/statinfobar.vue';
import G2Chart from '../components/g2chart.vue';
import { mapState, mapMutations, mapActions } from 'vuex';
import Request from '../lib/Request';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, StatInfoBar,
        PanelTab, G2Chart
    },
    data() {
        return {
            panelTab: {
                name: 'dynamic',
                active: 'online',
                tabs: {
                    online: '实时在线',
                    device: '设备激活',
                    newplayer: '新增玩家',
                    income: '收入金额'
                }
            },
            chartState: true,
            charts: {
                dynamic: {
                    chart: null,
                    timer: 0,
                    init(yAlias) {
                        var chart = this.chart;
                        // 初始化 chart
                        chart.source([], {
                            time: {
                                alias: '时间',
                                type: 'time',
                                tickCount: 6,
                                mask: 'yyyy-mm-dd hh:MM:ss'
                            },
                            amount: {
                                alias: yAlias,
                                type: 'linear'
                            },
                        });
                        chart.line().position('time*amount').size(2);
                        chart.render();
                    },
                    reset() {
                        clearTimeout(this.timer);
                        this.chart.clear();
                    },
                    update(data) {
                        this.chart.changeData(data);
                    }
                }
            }
        }
    },
    computed: {
        ...mapState(['socket']),
        currTab() {
            return this.panelTab.active;
        }
    },
    methods: {
        ...mapMutations('request', ['showGraphLoading', 'hideGraphLoading']),
        ...mapActions('request', ['sendMsg']),
        // 从 g2-chart 获取 chart
        getChart({ name, chart }) {
            this.charts[name].chart = chart;
            this.charts[name].init(this.panelTab.tabs[this.currTab]);
            this.toggleSocket(this.charts[name]);
        },
        // 切换 socket 事件
        toggleSocket(chart) {
            var socket = this.socket,
                tabName = this.currTab,
                request = new Request({ emitter: '实时概况', detail: this.panelTab.tabs[tabName] }),
                data = [];

            // 更新 chart
            function updateChart(res) {
                var list = res[tabName],
                    rest = 1000 - (+new Date() - request.start);

                data.push(...list);
                chart.timer = setTimeout(() => {
                    request.success();
                    chart.update(data);
                }, rest > 0 ? rest : 0);
            }
            // 切换 socket 事件
            this.socket.off(`start ${tabName}`);
            this.socket.on(`start ${tabName}`, updateChart);
            // 发送 socket 事件
            this.sendMsg({ mode: 'socket', payload: tabName, request });
        },
        // 切换图表
        toggleTab({ name, prev, next }) {
            if (next !== prev) {
                var chart = this.charts[name];
                this.socket.emit(`end ${prev}`);
                this.panelTab.active = next;
                chart.reset();
                chart.init(this.panelTab.tabs[next]);
                this.toggleSocket(chart);
            }
            this.chartState = true;
        },
        toggleChart() {
            this.chartState = !this.chartState;
        },
    },
    beforeDestroy() {
        var socket = this.socket;
        var tabName = this.currTab;

        socket.off(`start ${tabName}`);
        socket.emit(`end ${tabName}`);
        this.charts.dynamic.reset();
    }
}
</script>

<style lang="less" scoped>

</style>