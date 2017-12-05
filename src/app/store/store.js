import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
import request from './modules/request';
import defaultMenuList from './sidenav/defaultMenuList';

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
        modules: {
            request
        },
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
                    } else if (state.request.tipState) {
                        commit('request/hideTip');
                    }
                }
            },
        }
    });
}

export default initStore();