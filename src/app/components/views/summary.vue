<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel v-for="panel of panels" :key="panel.name" v-bind="panel" @toggleChart="toggleChart" @toggleTab="toggleTab" @getServerData="updateChart">
            <g2-chart v-show="panel.chartState" v-bind="panel" @getChart="getChart"></g2-chart>
        </juice-panel>
    </juice-content>
</template>

<script>
import Chart from '../../lib/Chart';
import StatInfoBar from '../commons/statinfobar.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import JuiceContent from '../commons/juicecontent.vue';
import JuicePanel from '../commons/juicepanel.vue';
import G2Chart from '../commons/g2chart.vue';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, G2Chart, StatInfoBar
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters('request', ['latestRequest']),
        ...mapGetters('viewStates', ['viewState', 'computedSocketEvents']),
        panels() {
            return this.viewState.panels;
        },
    },
    methods: {
        ...mapActions('request', ['sendMsg']),
        ...mapActions('viewStates', ['setChart']),
        // 从 g2-chart 获取 chart
        getChart({ name, chart }) {
            var chart = new Chart(chart);

            this.setChart({ name, chart });
            chart.init();
            this.sendMsg({ mode: 'socket', eventName: this.computedSocketEvents, detail: '实时概况', loader: 'all' });
        },
        // 切换图表
        toggleTab(name) {
            var panel = this.getPanel(name),
                chart = panel.chart;

            chart.reset();
            chart.init();
            this.sendMsg({ mode: 'socket', eventName: panel.active, detail: panel.tabs[panel.active], loader: name });
            this.openChart(name);
        },
        // 更新图表
        updateChart({ name, data }) {
            var chart = this.getPanel(name).chart,
                rest = 1000 - (+new Date() - this.latestRequest.created);

            chart.timer = setTimeout(() => {
                this.latestRequest.success();
                chart.data.push(...data);
                chart.update();
            }, rest > 0 ? rest : 0);
        },
        // 显示 chart
        openChart(name) {
            this.getPanel(name).chartState = true;
        },
        // 切换 chart
        toggleChart(name) {
            var panel = this.getPanel(name);

            panel.chartState = !panel.chartState;
        },
        // 定位 panel
        getPanel(name) {
            return this.panels.find(panel => panel.name === name);
        },
    },
    mounted() {
    }
}
</script>

<style lang="less" scoped>

</style>