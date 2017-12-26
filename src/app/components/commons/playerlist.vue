<template>
    <div class="selected-player clearfix">
        <ul class="player-list" @click="remove">
            <li v-for="list of selectedPlayers" :key="list.id">
                <div class="player">
                    <i class="am-icon-user"></i>
                    <span>{{list.name}}</span>
                </div>
                <i class="am-icon-times"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { getParent } from 'lib/utils';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'PlayerList',
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['selectedPlayers']),
    },
    methods: {
        ...mapMutations([
            'removePlayer'
        ]),
        // 删除角色
        remove(event) {
            var target = event.target,
                ul = getParent(target, 'ul'),
                li = getParent(target, 'li'),
                index = Array.from(ul.children).indexOf(li),
                player = this.selectedPlayers[index];

            if (target.className === 'am-icon-times') {
                this.removePlayer(player);
            }
        },
    }
}
</script>

<style lang="less" scoped>
ul {
    margin: 0;
}

.selected-player {
    position: relative;
    top: 0;
    left: 0;
}

.player-list {
    margin: 0;
    li {
        &:hover {
            border: 2px solid #389CFF;

            .player {
                border: 1px solid transparent;
            }
        }

        position: relative;
        left: 0;
        top: 0;
        display: inline-block;
        margin: 0 15px 20px 0;
        border: 2px solid transparent;
        border-radius: 3px;
        cursor: default;

        &>i {
            &:hover {
                color: #db4437;
            }
            position: absolute;
            top: 0;
            right: 0;
            font-size: 14px;
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
            color: #bbb;
            cursor: pointer;
        }

        .player {
            border-radius: 3px;
            width: 146px;
            height: 46px;
            line-height: 44px;
            border: 1px solid #D5D7DF;
            padding: 0 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            box-shadow: 2px 2px 2px 0 rgba(15, 32, 65, .06);

            i {
                color: #389CFF;
                margin-right: 5px;
            }

            span {
                color: #020202;
            }
        }
    }
}

</style>
