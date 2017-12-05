import Vue from 'vue';
import app from './app.vue';
import initStore from './store/store';
import router from './router/router';
import { sync } from 'vuex-router-sync';
import G2 from 'g2';

G2.track(false);

window.addEventListener('load', () => {
    initStore.then(store => {
        document.body.removeChild(document.querySelector('.loading'));
        sync(store, router);

        new Vue({
            el: 'app',
            store,
            router,
            components: {
                app
            }
        });
    });
}, false);