import Vue from 'vue';
import app from './app.vue';
import store from './store/store';
import router from './router/router';
import { sync } from 'vuex-router-sync';

sync(store, router);

const boostrap = new Vue({
    el: 'app',
    store,
    router,
    components: {
        app
    }
});