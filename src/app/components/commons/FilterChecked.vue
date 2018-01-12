<template>
    <transition>
        <div v-show="filterDetailState" class="filter-checked">
            <h3 class="title">
                <span class="line"></span>
                <span class="text">筛 选 详 情</span>
                <span class="line"></span>
            </h3>
            <div class="content clearfix">
                <div class="v-col">
                    <div>筛选方式</div>
                    <div v-if="isNoFilter" class="light">无</div>
                    <div v-else class="light">{{filterName}}</div>
                </div>
                <div class="v-col">
                    <div>筛选列表</div>
                    <div class="filters-wrapper clearfix">
                        <span v-if="checkedFilter.length===0" class="divide light">无</span>
                        <span v-else v-for="text of checkedFilter" :key="text" :title="text" class="divide v-item light">{{text}}</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'FilterChecked',
    data() {
        return {
            filterDetailState: false
        }
    },
    computed: {
        ...mapState(['currFilter', 'checkedFilter']),
        filterName() {
            return { platform: '平台', channel: '渠道', server: '区服' }[this.currFilter];
        },
        isNoFilter() {
            return this.checkedFilter.length === 0;
        }
    },
    mounted() {
        // keydown 句柄
        document.addEventListener('keydown', this.keydownListener, false);
        // keyup 句柄
        document.addEventListener('keyup', this.keyupListener, false);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydownListener, false);
        document.removeEventListener('keyup', this.keyupListener, false);
    },
    methods: {
        keydownListener({ keyCode, altKey }) {
            // 显示筛选细节
            showFilterDetail.call(this);
            function showFilterDetail() {
                if (keyCode === 192) this.filterDetailState = true;
            }
        },
        keyupListener({ keyCode }) {
            hideFilterDetail.call(this);
            function hideFilterDetail() {
                if (keyCode === 192) this.filterDetailState = false;
            }
        },
    },
}
</script>

<style lang="less" scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translate(-50%, -80px) !important;
}

.v-enter-active,
.v-leave-active {
    transition: all .3s;
}

.filter-checked {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    z-index: 9;
    border-radius: 3px;
    color: #fff;
    font-size: 14px;
    background-color: rgba(0, 0, 0, .9);
    padding: 40px 80px;
    .title {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: normal;
        text-align: center;
        margin: 0;
        .line {
            flex-grow: 1;
            height: 1px;
            background-color: #e5e5e5;
            border-radius: 3px;
        }
        .text {
            margin: 0 20px;
        }
    }
    .content {
        padding-top: 40px;
        font-size: 16px;
        .v-col {
            width: 50%;
            float: left;
            .filters-wrapper {
                margin: 0 -3px;
                .v-item {
                    display: block;
                    float: left;
                    width: 25%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding: 0 3px;
                }
            }
            div:first-child {
                margin-bottom: 20px;
            }
        }
    }
}
.divide {
    padding: 0 3px;
}
.light {
    color: #0e9;
}
</style>