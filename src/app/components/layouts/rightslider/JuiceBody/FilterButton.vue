<template>
    <div class="filter-button am-u-sm-4 am-u-md-3 am-u-lg-2">
        <div class="am-vertical-align">
            <div class="am-vertical-align-middle">
                <button @click="showFilter" class="am-btn am-btn-primary am-icon-filter" style="width:100%;"> 筛 选</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'FilterButton',
    methods: {
        ...mapMutations('dialog', ['changeBackdrop', 'changeEventDialog']),
        showFilter() {
            this.changeBackdrop('show');
            this.changeEventDialog('pageFilter');
        },
    },
}
</script>

<style lang="less" scoped>

.filter-button {
    &::before {
        content: ' ';
        display: inline-block;
        position: absolute;
        left: 0;
        height: 60px;
        vertical-align: middle;
        border-right: 1px dashed #ccc;
    }

    &>div {
        height: 60px;
        width: 100%;
        display: inline-block;

        &>div {
            width: 100%;

            button {
                width: 100%;
                border-radius: 3px;
                font-size: 14px;
                padding: 10px;
            }
        }

        .am-vertical-align-middle {
            position: relative;
            top: 0;
            left: 0;
        }
    }
}
</style>
