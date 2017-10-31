import Vue from 'vue';
import Vuex from 'vuex';
import defaultMenuList from './sidenav/defaultMenuList';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // sidenav
        defaultMenuList,
        contentBlockMarginLeft: 260,
        // topnav
        siteTranslate: 0,
        // backdrop
        backdropState: false,
        // modal-widget list
        widgetList: []
    },
    getters: {
        addIcons(state) {
        }
    },
    mutations: {
        // 切换导航栏
        toggleSidenav(state) {
            const { contentBlockMarginLeft } = state;
            state.contentBlockMarginLeft = contentBlockMarginLeft === 260 ? 50 : 260;
        },
        // 切换页面主体
        toggleSite(state) {
            const { siteTranslate } = state;
            state.siteTranslate = siteTranslate === -250 ? 0 : -250;
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
        clearWidgetList(state, keyCode) {
            if (keyCode === 27) {
                state.widgetList = [];
            }
        }
    },
    actions: {
    }
});

export default store;