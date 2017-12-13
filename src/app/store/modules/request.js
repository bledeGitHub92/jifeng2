export default {
    namespaced: true,
    state: {
        // panel-tab
        tabName: 'online',
        // graph loading
        graphLoading: false,
        // 消息队列
        tipState: false,
        // 消息计时器百分比
        tipCounter: '100',
        // 消息计时器 timer
        tipTimer: 0,
        // 消息队列
        tipQueue: [],
        // 消息队列 top
        tipScrollTop: 0
    },
    getters: {},
    mutations: {
        // 改变 panel-tab
        changePanelTab(state, tabName) {
            state.tabName = tabName;
        },
        // 显示 graphLoading
        showGraphLoading(state) {
            state.graphLoading = true;
        },
        // 隐藏 graphLoading
        hideGraphLoading(state) {
            state.graphLoading = false;
        },
        // 切换 tip
        toggleTip(state) {
            state.tipState = !state.tipState;
        },
        showTipShortly(state) {
            var start = +new Date,
                remain, percent;
            state.tipState = true;
            state.tipTimer = setInterval(() => {
                state.tipCounter = Math.max(0, (1 - (+new Date() - start) / 6000)) * 100;
                if (state.tipCounter === 0) {
                    clearInterval(state.tipTimer);
                    state.tipState = false;
                }
            }, 20);
        },
        clearTipTimer(state) {
            state.tipCounter = 0;
            clearInterval(state.tipTimer);
        },
        // 开启 tip
        showTip(state) {
            state.tipState = true
        },
        // 关闭 tip
        hideTip(state) {
            state.tipState = false;
        },
        // 往消息队列添加消息对象
        createRequest(state, request) {
            state.tipQueue.unshift(request);
        },
        // 删除第一条消息
        shiftRequest(state) {
            state.tipQueue.shift();
        },
        // 重置消息队列滚动条的位置
        changeTipScrollTop(state, top = 0) {
            state.tipScrollTop = top;
        },
    },
    actions: {
        // socket
        socket({ state, rootState, commit }, tabName) {
            rootState.socket.emit(`start ${tabName}`);
        },
        sendMsg({ state, rootState, commit, dispatch }, { mode, payload, request }) {
            dispatch(mode, payload);
            commit('showTip');
            commit('clearTipTimer');
            commit('changeTipScrollTop');
            commit('createRequest', request);
        }
    }
}