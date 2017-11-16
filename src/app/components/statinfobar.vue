<template>
    <div class="stat-info-bar">
        <ul class="realtime-info">
            <li v-for="(col,colIndex) of statInfo" :key="colIndex">
                <div @mouseenter="showDetail(colIndex)" @mouseleave="hideDetail(colIndex)" class="realtime-content">
                    <h3>{{col.title}}</h3>
                    <p>
                        <span class="realtime-data">{{col.data}}</span>
                        <span class="realtime-delta">+{{col.delta}}</span>
                    </p>
                    <div v-show="detailState[colIndex]" class="realtime-detail">
                        <p>
                            <span class="realtime-date">昨日</span>
                            <span class="realtime-past-data">
                                <span>：</span>
                                {{col.detail[0]}}
                            </span>
                            <span :class="['realtime-month-on-month', col.data-col.detail[0]>0?'am-icon-level-up':'am-icon-level-down',col.data-col.detail[0]>0?'up':'down']">
                                {{Math.abs(((col.data-col.detail[0])/col.detail[0]*100).toFixed(2))}} %
                            </span>
                        </p>
                        <p>
                            <span class="realtime-date">7日前</span>
                            <span class="realtime-past-data">
                                <span>：</span>
                                {{col.detail[1]}}
                            </span>
                            <span :class="['realtime-month-on-month', col.data-col.detail[1]>0?'am-icon-level-up':'am-icon-level-down',col.data-col.detail[1]>0?'up':'down']">
                                {{Math.abs(((col.data-col.detail[1])/col.detail[1]*100).toFixed(2))}} %
                            </span>
                        </p>
                        <p>
                            <span class="realtime-date">30日前</span>
                            <span class="realtime-past-data">
                                <span>：</span>
                                {{col.detail[2]}}
                            </span>
                            <span :class="['realtime-month-on-month', col.data-col.detail[2]>0?'am-icon-level-up':'am-icon-level-down',col.data-col.detail[2]>0?'up':'down']">
                                {{Math.abs(((col.data-col.detail[2])/col.detail[2]*100).toFixed(2))}} %
                            </span>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ajax from '../lib/ajax';
import { mapState } from 'vuex';

export default {
    name: 'StatInfoBar',
    data() {
        return {
            statInfo: [
                {
                    title: "设备激活（含重复安装）",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "总活跃",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "付费玩家",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "今日收入",
                    data: 8888,
                    delta: 888,
                    detail: [8888, 8888, 8888]
                },
                {
                    title: "游戏次数",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "新增玩家",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "老玩家",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "付费次数",
                    data: 0,
                    delta: 100,
                    detail: [666, 666, 666]
                },
                {
                    title: "累计收入",
                    data: 88888,
                    delta: 888,
                    detail: [8888, 8888, 8888]
                },
                {
                    title: "平均每次游戏时长",
                    data: 666,
                    delta: 66,
                    detail: [66, 66, 66]
                }
            ],
            detailState: []
        }
    },
    computed: {
        ...mapState(['socket'])
    },
    methods: {
        showDetail(index) {
            this.detailState.length = index;
            this.detailState.splice(index, 1, true);
        },
        hideDetail(index) {
            this.detailState.splice(index, 1, false);
        }
    },
    mounted() {
        ajax.get('/v2/realtime', 'realtime')
            .then(data => {
                var socket = this.socket;
                this.statInfo = data;
                socket.on('start delta', ({ delta }) => {
                    this.statInfo.forEach(
                        (item, index) => {
                            // TODO: 数字增加动画
                            item.data = parseInt(item.data) + parseInt(delta[index]);
                            item.delta = delta[index];
                        }
                    );
                });
                socket.emit('start delta');
            });
    },
    beforeDestroy() {
        this.socket.emit('end delta');
    }
}
</script>

<style lang="less" scoped>
.stat-info-bar {
    animation: pop-appear 0.3s cubic-bezier(0.8, 0.02, 0.45, 0.91) forwards;
    margin-top: 30px;
    font-size: 14px;
    color: #333;

    .realtime-info {
        margin: 0;
        line-height: normal;

        p {
            margin: 0;
        }

        li {
            display: inline-block;
            width: 20%;
            padding: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;

            .realtime-content {
                border-radius: 3px;
                position: relative;
                top: 0;
                left: 0;
                padding: 10px 20px;
                background-color: #fff;
                box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
            }

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .realtime-detail {
                &::before {
                    content: ' ';
                    position: absolute;
                    bottom: -8px;
                    left: 20px;
                    border-top: 8px solid rgba(0, 0, 0, .9);
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    width: 0;
                    height: 0;
                    display: block;
                }

                animation: pop-appear 0.3s cubic-bezier(0.8, 0.02, 0.45, 0.91) forwards;
                pointer-events: none;
                position: absolute;
                max-width: 260px;
                width: 100%;
                padding: 10px 20px;
                background-color: rgba(0, 0, 0, .9);
                border-radius: 3px;
                left: 0;
                top: -100%;

                p {
                    .realtime-date {
                        color: darken(#fff, 15%);
                        text-align: justify;
                        text-align-last: justify;
                        width: 50px;
                        float: left;
                    }

                    .realtime-past-data {
                        color: #fff;
                        float: left;
                        text-align: right;

                        span {
                            margin-right: 4px;
                            color: darken(#fff, 15%);
                        }
                    }

                    .realtime-month-on-month {
                        float: right;
                        &.up {
                            color: #dd514c;
                        }
                        &.down {
                            color: #00b240;
                        }
                    }
                }
            }

            h3 {
                margin: 0;
                font-weight: normal;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .realtime-data {
                font-size: 30px;
                color: #0e90d2;
            }

            .realtime-delta {
                color: #dd514c;
                margin-left: 10px;
            }
        }
    }
}

@media screen and (max-width:1300px) {
    .stat-info-bar {
        .realtime-info {
            &>li {
                width: 50%;
            }
        }
    }
}

@media screen and (max-width:700px) {
    .stat-info-bar {
        .realtime-info {
            &>li {
                width: 100%;
            }
        }
    }
}
</style>
