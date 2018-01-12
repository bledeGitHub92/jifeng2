import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
// modules
import viewStates from './modules/viewStates';
import request from './modules/request';
import contextmenu from './modules/contextmenu';
import players from './modules/players';
import dialog from './modules/dialog';
import widget from './modules/widget';
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
            viewStates, request, contextmenu, players, dialog, widget
        },
        state: {
            platform, channel, server,
            //socket
            socket,
            // sidenav
            defaultMenuList,
            // 使用中的筛选方式
            currFilter: 'platform',
            // 筛选集合
            checkedFilter: [],
        },
        getters: {
            // 当前路由
            currView(state, getters) {
                return state.route.path.slice(1);
            },
        },
        mutations: {
            // 修改筛选方式
            updateCurrFilter(state, name) {
                state.currFilter = name;
            },
            // 设置筛选集合
            setCheckedFilter(state, filter) {
                state.checkedFilter = filter;
            },
        },
        actions: {
            closeDialog({ state, commit }, isEsc) {
                if (isEsc) {
                    if (state.dialog.backdropState) {
                        commit('dialog/changeBackdrop', 'hide');
                    } else if (state.widget.widgetList.length) {
                        commit('widget/clearWidgetList');
                    } else if (state.request.tipState) {
                        commit('request/hideTip');
                    }
                }
            },
        }
    });
}

export default initStore();