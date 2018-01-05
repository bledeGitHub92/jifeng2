class Chart {
    constructor(chart) {
        this.chart = chart;
        this.data = [];
        this.timer = 0;
    }

    init() {
        var chart = this.chart;
        // 初始化 chart
        chart.source([], {
            time: {
                type: 'time',
                tickCount: 6,
                mask: 'yyyy-mm-dd hh:MM:ss'
            },
            amount: {
                type: 'linear'
            },
        });
        chart.axis('time', { title: null });
        chart.axis('amount', { title: null });
        chart.line().position('time*amount').size(2);
        chart.render();
    }

    reset() {
        clearTimeout(this.timer);
        this.data = [];
        this.chart.clear();
    }

    update() {
        this.chart.changeData(this.data);
    }
}

export default Chart;