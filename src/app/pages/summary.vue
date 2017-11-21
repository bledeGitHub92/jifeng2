<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel @toggleChart="toggleChart" :chartState="chartState">
            <panel-tab slot="tabs" v-bind="panelTab" @changeTab="changeTab"></panel-tab>
            <dynamic-chart v-show="chartState" :tabName="panelTab.tabName"></dynamic-chart>
        </juice-panel>
    </juice-content>
</template>

<script>
import JuiceContent from '../components/juicecontent.vue'
import JuicePanel from '../components/juicepanel.vue';
import PanelTab from '../components/juicepanel/paneltab.vue';
import StatInfoBar from '../components/statinfobar.vue';
import DynamicChart from '../components/dynamicchart.vue';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, StatInfoBar,
        PanelTab, DynamicChart
    },
    data() {
        return {
            panelTab: {
                tabs: {
                    online: '实时在线',
                    device: '设备激活',
                    newplayer: '新增玩家',
                    income: '收入金额'
                },
                tabName: 'online'
            },
            chartState: true
        }
    },
    methods: {
        changeTab(name) {
            this.panelTab.tabName = name;
            this.chartState = true;
        },
        toggleChart() {
            this.chartState = !this.chartState;
        }
    },
}
</script>

<style lang="less" scoped>

</style>