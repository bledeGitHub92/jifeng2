export default {
    namespaced: true,
    state: {
        summary: {
            initSocketEvents: ['delta'],
            panels: [{
                name: 'dynamic',
                active: 'online',
                chartState: true,
                tabs: {
                    online: '实时在线',
                    device: '设备激活',
                    newplayer: '新增玩家',
                    income: '收入金额'
                },
                chart: null
            }]
        },
    },
    getters: {
        // 当前路由对应的 -> 局部 state
        viewState(state, getters, rootState, rootGetters) {
            return state[rootGetters.currView];
        },
        // 当前路由对应的 -> event 集合
        computedSocketEvents(state, { viewState }, rootState, rootGetters) {
            var panelsEvents = viewState.panels.map(panel => panel.active);
            return viewState.initSocketEvents.concat(panelsEvents);
        },
        // 当前路由对应的 -> chart 集合
        allCharts(state, { viewState }, rootState, rootGetters) {
            return viewState.panels.map(panels => panels.chart);
        },
        // 当前路由对应的 -> tabName 集合
        computedTabNames(state, { viewState }, rootState, rootGetters) {
            return viewState.panels.map(panel => panel.tabs[panel.active]);
        }
    },
    mutations: {
        // 初始化 当前路由对应的 -> 局部 state 的 chart
        setChart(state, { view, name, chart }) {
            view.panels.find(panel => panel.name === name).chart = chart;
        },
        // 重置 当前路由对应的 -> 局部 state 的 chart 的 data
        resetAllChart(state, { charts, yAlias }) {
            charts.forEach((chart, index) => {
                chart.reset();
                chart.init(yAlias[index]);
            });
        },
        // 改变 当前路由对应的 -> 局部 state 的 active
        updateTab(state, { view, name, next }) {
            view.panels.find(panel => panel.name === name).active = next;
        }
    },
    actions: {
        // 初始化 当前路由对应的 -> 局部 state 的 chart
        setChart({ getters, commit }, { name, chart }) {
            commit('setChart', { view: getters.viewState, name, chart });
        },
        // 重置 当前路由对应的 -> 局部 state 的 chart 的 data
        resetAllChart({ getters, commit }) {
            commit('resetAllChart', { charts: getters.allCharts, yAlias: getters.computedTabNames });
        },
        // 改变 当前路由对应的 -> 局部 state 的 active
        updateTab({ getters, commit }, { name, next }) {
            commit('updateTab', { view: getters.viewState, name, next });
        }
    }
}