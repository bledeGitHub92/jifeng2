import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // sidenav
        contentBlockMarginLeft: 260,
        // topnav
        siteTranslate: 0
    },
    mutations: {
        toggleSidenav(state) {
            const { contentBlockMarginLeft } = state;
            state.contentBlockMarginLeft = contentBlockMarginLeft === 260 ? 50 : 260;
        },
        toggleSite(state) {
            const { siteTranslate } = state;
            state.siteTranslate = siteTranslate === -250 ? 0 : -250;
        }
    },
    actions: {
    }
});

export default store;