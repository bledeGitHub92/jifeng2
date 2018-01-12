import ajax from 'lib/ajax';
import Request from 'lib/Request';
import sidenavMap from '../sidenav/defaultMenuList';

export default {
    namespaced: true,
    state: {
        mark: 'tip',
        // graph loading
        graphLoading: '',
        // 消息队列
        tipState: false,
        // 消息计时器百分比
        tipCounter: '100',
        // 消息计时器 timer
        tipTimer: 0,
        // 消息队列
        tipQueue: [],
        // 有记录的消息队列
        recordableQueue: [],
    },
    getters: {
        latestRequest(state) {
            return state.tipQueue[0] || { emitter: '' };
        },
        // 当前路由对应的 -> 中文名
        emitter(state, getters, rootState, rootGetters) {
            var emitter = `/${rootGetters.currView}`;

            for (let i = 0, iMax = sidenavMap.length; i < iMax; i++) {
                let main = sidenavMap[i].lists;
                for (let n = 0, nMax = main.length; n < nMax; n++) {
                    let sub = main[n]
                    if (sub.url === emitter) {
                        return emitter = sub.name;
                    }
                }
            }
        }
    },
    mutations: {
        setMark(state, mark) {
            state.mark = mark;
        },
        // 显示 graphLoading
        showGraphLoading(state, loader) {
            state.graphLoading = loader;
        },
        // 隐藏 graphLoading
        hideGraphLoading(state) {
            state.graphLoading = '';
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
        // 往可记录的消息队列添加消息对象
        createRecord(state, request) {
            state.recordableQueue.unshift(request);
        },
        // 删除第一条消息
        shiftRequest(state) {
            state.tipQueue.shift();
        },
        // 删除可记录队列的第一条消息
        shiftRecord(state) {
            state.recordableQueue.shift();
        },
    },
    actions: {
        // socket
        socket({ rootState }, socketName) {
            if (typeof socketName === 'string') {
                rootState.socket.emit(`start ${socketName}`);
            } else {
                socketName.forEach(name => void rootState.socket.emit(`start ${name}`));
            }
        },
        // ajax
        ajax({ rootState }, url) {
            console.log(url);
        },
        sendMsg({ getters, commit, dispatch }, { mode, eventName, detail, loader = '', recordable }) {
            dispatch(mode, eventName);
            commit('showTip');
            commit('clearTipTimer');
            commit('showGraphLoading', loader);
            if (recordable) {
                commit('setMark', 'record');
                commit('createRecord', new Request({ emitter: getters.emitter, detail, recordable }));
            } else {
                commit('setMark', 'tip');
                commit('createRequest', new Request({ emitter: getters.emitter, detail }));
            }
        },
    }
}