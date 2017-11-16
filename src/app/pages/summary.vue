<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel :act-btn="actBtn">
            <panel-tab slot="tabs" :tabs="tabs"></panel-tab>
            <g-chart></g-chart>
        </juice-panel>
    </juice-content>
</template>

<script>
import JuiceContent from '../components/juicecontent.vue'
import JuicePanel from '../components/juicepanel/juicepanel.vue';
import PanelTab from '../components/juicepanel/paneltab/paneltab.vue';
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
            tabs: ['实时在线', '设备激活', '新增玩家', '收入金额'],
            actBtn: [
                { icon: 'am-icon-bar-chart', title: '图表' },
                { icon: 'am-icon-table', title: '表格' },
            ]
        }
    },
}
</script>

<style lang="less" scoped>

</style>