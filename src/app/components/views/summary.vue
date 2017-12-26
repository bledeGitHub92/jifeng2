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
import Request from 'lib/Request';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import JuiceContent from '../commons/juicecontent.vue';
import JuicePanel from '../commons/juicepanel.vue';
import StatInfoBar from '../commons/statinfobar.vue';
import G2Chart from '../commons/g2chart.vue';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, StatInfoBar,
        G2Chart
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters('request', ['latestRequest']),
        ...mapGetters('viewStates', ['viewState']),
        panels() {
            return this.viewState.panels;
        },
    },
    methods: {
        ...mapActions('request', ['sendMsg']),
        ...mapActions('viewStates', ['setChart']),
        // 从 g2-chart 获取 chart
        getChart({ name, chart }) {
            var chart = new Chart(chart),
                panel = this.getPanel(name),
                activeTabKey = panel.active,
                activeTabValue = panel.tabs[activeTabKey];

            this.setChart({ name, chart });

            chart.init(activeTabValue);

            this.sendMsg({ mode: 'socket', eventName: activeTabKey, request: { emitter: '实时概况', detail: activeTabValue } });
        },
        // 切换图表
        toggleTab(name) {
            var panel = this.getPanel(name),
                chart = panel.chart,
                activeTabKey = panel.active,
                activeTabValue = panel.tabs[activeTabKey];

            chart.reset();
            chart.init(activeTabValue);

            this.sendMsg({ mode: 'socket', eventName: panel.active, request: { emitter: '实时概况', detail: panel.tabs[panel.active] } });

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
        // console.log(this.panels);
    },
    beforeDestroy() {
        // this.charts.dynamic.reset();
    }
}
</script>

<style lang="less" scoped>

</style>