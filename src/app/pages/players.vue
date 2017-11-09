<template>
    <juice-panel @toolbar="getIndex" :title="title" :act-btn="actBtn">
        <player-list></player-list>
    </juice-panel>
</template>

<script>
import JuicePanel from '../components/juicepanel.vue';
import PlayerList from '../components/playerlist.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'players',
    components: {
        JuicePanel, PlayerList
    },
    data() {
        return {
            title: '批量操作',
            actBtn: [
                { icon: 'am-icon-trash', title: '清空' },
                { icon: 'am-icon-wrench', title: '操作' },
            ]
        }
    },
    methods: {
        ...mapMutations([
            'clearPlayer'
        ]),
        getIndex(index) {
            if (index === 0 && confirm('确定清空玩家列表吗？')) {
                this.clearPlayer();
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
