<template>
    <juice-content>
        <stat-info-bar></stat-info-bar>
        <juice-panel :title="title" :act-btn="actBtn">
        </juice-panel>
    </juice-content>
</template>

<script>
import JuiceContent from '../components/juicecontent.vue'
import JuicePanel from '../components/juicepanel.vue';
import StatInfoBar from '../components/statinfobar.vue';

export default {
    name: 'summary',
    components: {
        JuiceContent, JuicePanel, StatInfoBar
    },
    data() {
        return {
            title: '实时概况',
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