import Vue from 'vue';
import app from './app.vue';
import store from './store/store';

const boostrap = new Vue({
    el: 'app',
    store,
    components: {
        app
    }
});