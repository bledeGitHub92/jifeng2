import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import summary from '../pages/summary.vue';
import online from '../pages/online.vue';
import players from '../pages/players.vue';

const routes = [
    { path: '/summary', component: summary },
    { path: '/online', component: online },
    { path: '/players', component: players },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;