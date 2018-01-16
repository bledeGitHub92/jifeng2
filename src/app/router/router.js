import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/summary', component: resolve => {
        require.ensure([], () => void resolve(require('../components/views/summary.vue')), 'summary');
    }},
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;