import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import summary from '../components/views/summary.vue';
import report from '../components/views/report.vue';
import players from '../components/views/players.vue';
import add from '../components/views/add.vue';

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