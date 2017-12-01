import Vue from 'vue';
import Vuex from 'vuex';
import defaultMenuList from './sidenav/defaultMenuList';
import io from 'socket.io-client';
import charts from './charts';
import Request from '../lib/Request';

Vue.use(Vuex);

var socket = io();

// 获取用户权限
function getPower() {
    return new Promise(resolve => {
        socket.on('get power', power => {
            socket.off('get power');
            resolve(power);
        });
    });
}

async function initStore() {
    var { platform, channel, server } = await getPower();
    return new Vuex.Store({
        state: {
            platform, channel, server,
            //socket
            socket,
            // 单选 | 多选
            selectedMode: 'normal',
            // contextmenu
            copyValue: '',
            menuLeft: 0,
            menuTop: 0,
            menuState: false,
            menuList: [
                { text: '复制', className: ['copy'] },
                {
                    text: '操作', className: '',
                    detail: [
                        { text: '发送邮件', className: 'sendMail' },
                        { text: '黑白名单', className: 'bwList' },
                        { text: '添加任务', className: 'addQuest' },
                        { text: '设置任务状态', className: 'setQuest' },
                    ],
                },
                {
                    text: '查询', className: '',
                    detail: [
                        { text: '道具', className: 'queryItem' },
                        { text: '计数器', className: 'queryCounter' },
                        { text: '任务', className: 'queryQuest' },
                        { text: '关卡', className: 'queryScene' },
                        { text: '事件', className: 'queryEvent' },
                    ]
                },
            ],
            // event-dialog
            enabledEventDialog: '',
            // sidenav
            defaultMenuList,
            contentBlockMarginLeft: 260,
            // backdrop
            backdropState: false,
            // modal-widget list
            widgetList: [],
            // 选中玩家列表
            selectedPlayers: [],
            // panel-tab
            tabName: 'online',
            // graph loading
            graphLoading: false,
            timestamp: 0,
            // chart
            chart: null,
            // 消息队列
            tipState: '',
            // 消息计时器百分比
            tipCounter: '100',
            // 消息计时器 timer
            tipTimer: 0,
            // 消息队列
            tipQueue: []
        },
        getters: {
            addIcons(state) {
            }
        },
        mutations: {
            // 显示 contextmenu
            showMenu(state) {
                state.menuState = true;
            },
            // 隐藏 contextmenu
            hideMenu(state) {
                state.menuState = false;
            },
            // 定位 contextMenu
            setMenuLocation(state, { left, top }) {
                state.menuLeft = left;
                state.menuTop = top;
            },
            // 切换导航栏
            toggleSidenav(state) {
                const { contentBlockMarginLeft } = state;
                state.contentBlockMarginLeft = contentBlockMarginLeft === 260 ? 50 : 260;
            },
            // 改变背景层
            changeBackdrop(state, payload) {
                if (payload === 'show') {
                    state.backdropState = true;
                }
                if (payload === 'hide') {
                    state.backdropState = false;
                }
            },
            // 切换 modal-widget
            toggleWidget(state, widget) {
                var index = state.widgetList.indexOf(widget);
                if (index !== -1) {
                    state.widgetList.splice(index, 1);
                } else {
                    state.widgetList.push(widget);
                }
            },
            // 清空 modal-widget
            clearWidgetList(state) {
                state.widgetList = [];
            },
            // 添加玩家
            addPlayer(state, player) {
                // 避免重复添加
                if (!state.selectedPlayers.includes(player)) {
                    state.selectedPlayers.push(player);
                }
            },
            // 删除玩家
            removePlayer(state, player) {
                var index = state.selectedPlayers.indexOf(player);

                index > -1 && state.selectedPlayers.splice(index, 1);
            },
            // 清空玩家列表
            clearPlayer(state) {
                state.selectedPlayers = [];
            },
            // 更新 copyValue
            updateCopyValue(state, value) {
                state.copyValue = value
            },
            // 改变 enabledEventDialog
            changeEventDialog(state, dialogName) {
                dialogName = typeof dialogName === 'string' ? dialogName : '';
                state.enabledEventDialog = dialogName;
            },
            // 更新选择模式
            changeSelectedMode(state, mode) {
                state.selectedMode = mode;
            },
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
            // 刷新 timestamp
            refreshTimestamp(state, timestamp) {
                state.timestamp = timestamp;
            },
            // 初始化 chart
            initChart(state, { type, alias }) {
                state.chart = charts[type](alias);
            },
            // 销毁 chart
            destroyChart(state) {
                state.chart && state.chart.destroy();
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
                    state.tipCounter = Math.max(0, (1 - (+new Date() - start) / 3000)) * 100;
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
            createRequest(state, request) {
                state.tipQueue.unshift(request);
            }
        },
        actions: {
            // 清空玩家列表，添加玩家
            togglePlayer({ state, commit }, player) {
                var players = state.selectedPlayers,
                    isSamePlayer = players.includes(player),
                    isMultiple = players.length > 1;

                isSamePlayer ? commit('removePlayer', player) : commit('addPlayer', player);
            },
            closeDialog({ state, commit }, isEsc) {
                if (isEsc) {
                    if (state.backdropState) {
                        commit('changeBackdrop', 'hide');
                    } else if (state.widgetList.length) {
                        commit('clearWidgetList');
                    }
                }
            },
            // socket emit
            socketEmit({ state, commit }, { type, timestamp, request }) {
                var alias = ({
                    online: '玩家', device: '设备',
                    newplayer: '玩家', income: '收入'
                })[state.tabName];

                commit('createRequest', request)
                commit('clearTipTimer');
                commit('showTipShortly')
                commit('showGraphLoading');
                commit('refreshTimestamp', timestamp);
                commit('destroyChart');
                commit('initChart', { type, alias });
                state.socket.emit(`start ${state.tabName}`);
            }
        }
    });
}

export default initStore();