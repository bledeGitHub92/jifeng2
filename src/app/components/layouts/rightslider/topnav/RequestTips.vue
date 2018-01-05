<template>
    <ul @click="toggleTip" @mousedown.stop @mouseenter="clearTipTimer" class="info-tips">
        <li>
            <a class="am-icon-history am-icon-sm"></a>
            <span class="am-badge am-badge-danger am-round">{{tipQueue.length}}</span>
            <transition>
                <div v-show="tipState" class="tips-dropdown-wrapper am-radius">
                    <ul class="dropdown-title">
                        <li @click.stop="setMark('tip')" :class="{active:mark==='tip'}">{{emitter}}</li>
                        <li @click.stop="setMark('record')" :class="{active:mark==='record'}">可点击</li>
                    </ul>
                    <div class="tips-dropdown-ref">
                        <transition name="tip">
                            <scroll-wrapper v-show="mark==='tip'" height="99">
                                <template scope="props">
                                    <tip-list :top="props.top" :list="tipQueue"></tip-list>
                                </template>
                            </scroll-wrapper>
                        </transition>
                        <transition name="record">
                            <scroll-wrapper v-show="mark==='record'" height="99">
                                <template scope="props">
                                    <tip-list :top="props.top" :list="recordableQueue"></tip-list>
                                </template>
                            </scroll-wrapper>
                        </transition>
                    </div>
                    <div :style="{width:tipCounter+'%'}" class="count-down am-radius"></div>
                </div>
            </transition>
        </li>
    </ul>
</template>

<script>
import ScrollWrapper from '../../../commons/ScrollWrapper.vue';
import TipList from './RequestTips/TipList.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'RequestTips',
    components: {
        ScrollWrapper, TipList
    },
    computed: {
        ...mapState('request', ['mark', 'tipState', 'tipCounter', 'tipQueue', 'recordableQueue', 'tipScrollTop']),
        ...mapGetters('request', ['latestRequest']),
        emitter() {
            return this.latestRequest.emitter;
        },
    },
    methods: {
        ...mapMutations('dialog', ['changeBackdrop', 'changeEventDialog']),
        ...mapMutations('request', ['setMark', 'toggleTip', 'clearTipTimer']),
    }
}
</script>

<style lang="less" scoped>
.tip-enter,
.tip-leave-to {
    opacity: 0;
    transform: rotateY(-180deg);
}

.tip-enter-active,
.tip-leave-active {
    transition: all .3s;
    position: absolute;
    width: 100%;
}

.record-enter,
.record-leave-to {
    opacity: 0;
    transform: rotateY(180deg);
}

.record-enter-active,
.record-leave-active {
    transition: all .3s;
    position: absolute;
    width: 100%;
}

.v-enter,
.v-leave-to {
    transform: translateY(10px);
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: all .3s;
}

.info-tips {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;

    &>li {
        position: relative;
        top: 0;
        left: 0;
        float: left;
        height: 100%;
        line-height: 40px;
        width: 50%;
        text-align: center;
        cursor: pointer;

        .tips-dropdown-wrapper {
            cursor: default;
            position: absolute;
            top: 50px;
            left: 0;
            background-color: #fff;
            z-index: 1;
            width: 200px;
            box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
            padding: 10px 0;

            &::before {
                position: absolute;
                top: -10px;
                left: 10px;
                content: ' ';
                display: block;
                border-bottom: 10px solid #fff;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                z-index: 1;
            }
            .dropdown-title {
                padding-left: 30px;
                padding-right: 20px;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                margin-bottom: 10px;
                li {
                    float: left;
                    width: 50%;
                    color: #aaa;
                    cursor: pointer;
                    &.active {
                        color: #fff;
                        border-radius: 3px;
                        background-color: #0e90d2;
                    }
                }
            }

            .tips-dropdown-ref {
                position: relative;
                left: 0;
                top: 0;
                height: 99px;
                overflow: hidden;

                .tips-dropdown {
                    margin-top: 0;
                    transition: top .3s;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;

                    li {
                        transition: all .3s;
                        line-height: normal;
                        height: 40px;
                        color: #333;
                        padding: 0 20px;
                        padding-left: 30px;
                        border-bottom: 1px dashed #ddd;
                        background-clip: padding-box;
                        cursor: pointer;
                        &:hover {
                            background-color: #f5f5f5;
                        }
                        &:last-child {
                            border: 0;
                        }

                        div {
                            width: 100%;
                            font-size: 14px;
                        }
                    }
                }
            }

            .count-down {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 3px;
                width: 100%;
                background-color: #0e90d2;
            }
        }

        &>span {
            position: absolute;
            top: 0px;
            left: 6px;
        }

        a {
            color: #fff;
            display: inline-block;
            width: 100%;
        }
    }
}
</style>
