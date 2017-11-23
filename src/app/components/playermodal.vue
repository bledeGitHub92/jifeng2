<template>
    <div @mousedown="clearPlayer" class="player-modal">
        <div class="modal-search">
            <div>
                <form action="">
                    <juice-select></juice-select>
                    <input type="text" size="12" placeholder="角色信息" />
                    <button style="float:right" type="button">查询</button>
                </form>
            </div>
        </div>
        <juice-table></juice-table>
    </div>
</template>

<script>
import JuiceTable from './juicetable.vue';
import JuiceSelect from './juiceselect.vue';
import { mapMutations } from 'vuex';

export default {
    name: 'PlayerModal',
    components: {
        JuiceTable, JuiceSelect
    },
    methods: {
        ...mapMutations(['clearPlayer']),
    }
}
</script>

<style lang="less" scoped>
.player-modal {
    padding: 20px;
}

.modal-search {
    padding-bottom: 20px;
    border-bottom: 1px dashed #ddd;
    margin-bottom: 20px;
}
</style>
