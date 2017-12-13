function Chart(chart, init) {
    this.chart = chart;
    this.init = init;
    this.timer = 0;
}

Chart.prototype = {
    constructor: Chart,
    reset() {
        clearTimeout(this.timer);
        this.chart.clear();
    },
    update(data) {
        this.chart.changeData(data);
    }
}

export default Chart;