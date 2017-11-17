<template>
    <h3 class="panel-tabs">
        <a v-for="(value,key) of tabs" :key="key" :class="{active:tabName===key}" @click="$emit('changeTab', key)">{{value}}</a>
    </h3>
</template>

<script>
export default {
    name: 'PanelTab',
    props: {
        tabs: {
            type: Object,
            required: true
        },
        tabName: {
            type: String,
            required: true
        }
    },
    methods: {
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
            background-image: linear-gradient(to bottom, #f3f3f3, #fff);
        }

        &.active {
            color: #0e90d2;
            border-bottom: 3px solid #0e90d2;
            background-image: linear-gradient(to bottom, #f3f3f3, #fff);
        }
    }
}
</style>
