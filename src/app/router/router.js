import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import summary from '../components/views/summary.vue';

const routes = [
    { path: '/summary', component: summary },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;