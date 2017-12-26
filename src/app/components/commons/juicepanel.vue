<template>
    <div class="panel-wrapper">
        <div class="panel">
            <div class="panel-title">
                <h3 class="panel-tabs">
                    <a v-for="(value,key) of tabs" :key="key" :class="{active:active===key}" @click="changeTab(key)">{{value}}</a>
                </h3>
                <div class="tool am-fr">
                    <a @click="$emit('toggleChart', name)" :class="['am-icon-sm', chartState?'am-icon-angle-up':'am-icon-angle-down active']"></a>
                </div>
            </div>
            <div class="panel-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'JuicePanel',
    props: {
        chartState: {
            type: Boolean,
            required: true
        },
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
    computed: {
        ...mapState(['socket']),
        socketEvents() {
            return Object.keys(this.tabs);
        }
    },
    methods: {
        ...mapActions('viewStates', ['updateTab']),
        changeTab(key) {
            var currTab = this.active;
            if (key !== currTab) {
                var name = this.name;

                this.socket.emit(`end ${currTab}`);
                this.updateTab({ name, next: key });
                this.$emit('toggleTab', name);
            }
        },
        // 初始化 tabs 事件监听
        initTabs() {
            this.socketEvents.forEach(name => {
                this.socket.on(`start ${name}`, res => {
                    this.$emit('getServerData', { name: this.name, data: res[this.active] });
                });
            });
        },
        // 销毁 tabs 事件监听
        destroyTabs() {
            this.socketEvents.forEach(name => {
                this.socket.off(`start ${name}`);
            });
        },
    },
    mounted() {
        this.initTabs();
    },
    beforeDestroy() {
        this.destroyTabs();
    }
}
</script>

<style lang="less" scoped>
.panel-wrapper {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    margin: 30px 5px 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    .panel {
        background: rgb(255, 255, 255);
        border-radius: 3px;
        .panel-title {
            height: 46px;
            border-bottom: 1px solid #e4e4e4;
            background-color: #f7f7f7;
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
            .tool {
                a {
                    display: inline-block;
                    width: 45px;
                    height: 45px;
                    line-height: 45px;
                    vertical-align: middle;
                    text-align: center;
                    border-left: 1px solid #e4e4e4;
                    cursor: pointer;

                    &:hover {
                        background-color: #fff;
                    }
                    &.active {
                        background-color: #fff;
                    }
                }
            }
        }
        .panel-body {
            font-size: 13px;
            padding: 15px;
        }
    }
}
</style>
