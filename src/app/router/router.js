import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import summary from '../pages/summary.vue';
import report from '../pages/report.vue';
import players from '../pages/players.vue';
import add from '../pages/add.vue';

const routes = [
    { path: '/summary', component: summary },
    { path: '/report', component: report },
    { path: '/player/add', component: add },
    { path: '/players', component: players },
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;