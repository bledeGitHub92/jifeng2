function Chart(chart) {
    this.chart = chart;
    this.data = [];
    this.timer = 0;
}

Chart.prototype = {
    constructor: Chart,
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
        this.data = [];
        this.chart.clear();
    },
    update() {
        this.chart.changeData(this.data);
    }
}

export default Chart;