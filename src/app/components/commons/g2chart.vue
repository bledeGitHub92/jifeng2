<template>
    <div :id="name" class="g2-chart">
        <chart-loading v-show="graphLoading"></chart-loading>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ChartLoading from './chart/chartloading.vue';
import { Chart } from 'g2';

export default {
    name: 'G2Chart',
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
            this.$emit('getChart', {
                name: this.name,
                chart: new Chart({ id: this.name, height: 450, forceFit: true })
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
    position: relative;
    top: 0;
    left: 0;
}
</style>
