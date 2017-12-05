<template>
    <div :id="name" class="g2-chart">
        <chart-loading v-show="graphLoading"></chart-loading>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ChartLoading from '../components/chart/chartloading.vue';
import { Chart } from 'g2';

export default {
    name: 'DynamicChart',
    components: {
        ChartLoading
    },
    data() {
        return {
            loadingTimer: 0,
            chart: null
        }
    },
    props: {
        tabs: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('request', ['graphLoading'])
    },
    methods: {
        createChart() {
            var chart = new Chart({
                id: this.name,
                forceFit: true,
                height: 450
            });
            this.$emit('getChart', {
                name: this.name,
                chart,
            });
        }
    },
    mounted() {
        this.createChart();
    },
}
</script>

<style lang="less" scoped>
.g2-chart {
    min-height: 455px;
    position: relative;
    top: 0;
    left: 0;
}
</style>
