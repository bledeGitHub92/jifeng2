<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel>
            <panel-tab slot="tabs" v-bind="panelTab" @changeTab="changeTab"></panel-tab>
            <g-chart :tabName="panelTab.tabName"></g-chart>
        </juice-panel>
    </juice-content>
</template>

<script>
import JuiceContent from '../components/juicecontent.vue'
import JuicePanel from '../components/juicepanel.vue';
import PanelTab from '../components/juicepanel/paneltab.vue';
import StatInfoBar from '../components/statinfobar.vue';
import GChart from '../components/gchart.vue';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, StatInfoBar,
        PanelTab, GChart
    },
    data() {
        return {
            panelTab: {
                tabs: {
                    online: '实时在线',
                    device: '设备激活',
                    newPlayer: '新增玩家',
                    income: '收入金额'
                },
                tabName: 'online'
            }
        }
    },
    methods: {
        changeTab(index) {
            this.panelTab.tabName = index;
        }
    },
}
</script>

<style lang="less" scoped>

</style>