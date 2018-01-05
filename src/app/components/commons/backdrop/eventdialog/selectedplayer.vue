<template>
    <div class="selected-player">
        <div class="player-container clearfix">
            <span @click.stop="deletePlayer(player)" v-for="player of selectedPlayers" :key="player.id" :title="player.name+'\n'+player.id" class="am-icon-user">
                {{player.name}}
            </span>
        </div>
        <p class="selected-counter clearfix">
            <span class="am-fr">选中 {{selectedPlayerNumber}} 人</span>
        </p>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'SelectedPlayer',
    computed: {
        ...mapState('players', ['selectedPlayers']),
        selectedPlayerNumber() {
            return this.selectedPlayers.length;
        }
    },
    methods: {
        ...mapMutations('players', ['removePlayer']),
        ...mapMutations('dialog', ['changeBackdrop']),
        deletePlayer(player) {
            this.removePlayer(player);
            if (this.selectedPlayerNumber === 0) {
                this.changeBackdrop('hide');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.selected-player {
    padding: 20px 0;
}
.selected-counter {
    margin: 0;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 6px 20px;
    margin-top: 20px;
}

.player-container {
    padding: 0 20px;
    padding-bottom: 1px;
    max-height: 100px;
    overflow: auto;
    span {
        float: left;
        padding: 4px 0;
        padding-right: 10px;
        width: 25%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        position: relative;
        top: 0;
        left: 0;
        &:hover {
            color: #0e90d2;
        }
        &:active {
            top: 1px;
        }
    }
}
</style>
