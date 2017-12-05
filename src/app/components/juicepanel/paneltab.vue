<template>
    <h3 class="panel-tabs">
        <a v-for="(value,key) of tabs" :key="key" :class="{active:active===key}" @click="changeTab(key)">{{value}}</a>
    </h3>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'PanelTab',
    props: {
        name: {
            type: String,
            required: true
        },
        tabs: {
            type: Object,
            required: true
        },
        active: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapMutations('request', ['changePanelTab']),
        changeTab(key) {
            this.$emit('toggleTab', { name: this.name, prev: this.active, next: key });
        }
    }
}
</script>

<style lang="less" scoped>
.panel-tabs {
    margin: 0;
    font-size: 15px;
    font-weight: normal;

    a {
        display: block;
        float: left;
        height: 45px;
        line-height: 45px;
        padding: 0 20px;
        border-right: 1px solid #e4e4e4;
        color: #9ea7b3;
        cursor: pointer;

        &:hover {
            border-bottom: none;
            color: #0e90d2;
            background-color: #fff;
        }

        &.active {
            color: #0e90d2;
            border-bottom: 2px solid #0e90d2;
            background-color: #fff;
        }
    }
}
</style>
