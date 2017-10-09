import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Summary from '../pages/summary.vue';
import Online from '../pages/online.vue';

const routes = [
    { path: '/summary', component: Summary },
    { path: '/online', component: Online },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;