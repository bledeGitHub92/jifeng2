<template>
    <div>
        <p v-show="selectedPlayerNumber>12" class="selected-counter clearfix">
            <span class="am-fr">{{selectedPlayerNumber}} 人</span>
        </p>
        <div class="selected-player-container clearfix">
            <span @click.stop="deletePlayer(player)" v-for="player of selectedPlayers" :key="player.id" :title="player.name+'\n'+player.id" class="selected-player am-icon-user">
                {{player.name}}
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'SelectedPlayer',
    computed: {
        ...mapState([
            'selectedPlayers'
        ]),
        selectedPlayerNumber() {
            return this.selectedPlayers.length;
        }
    },
    methods: {
        ...mapMutations([
            'removePlayer', 'changeBackdrop'
        ]),
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
.selected-counter {
    margin-bottom: 10px;
}

.selected-player-container {
    max-height: 100px;
    overflow: auto;
    padding-bottom: 1px;
    .selected-player {
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
