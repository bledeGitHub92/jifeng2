import G2, { Chart } from 'g2';

G2.track(false);

export default {
    summary(alias) {
        var chart = new Chart({
            id: 'dynamic-chart',
            forceFit: true,
            height: 450
        })

        chart.source([], {
            time: {
                alias: '时间',
                type: 'time',
                tickCount: 6,
                mask: 'yyyy-mm-dd hh:MM:ss'
            },
            amount: {
                alias,
                type: 'linear'
            },
        });
        chart.line().position('time*amount').size(2);
        chart.render();
        return chart;
    }
}