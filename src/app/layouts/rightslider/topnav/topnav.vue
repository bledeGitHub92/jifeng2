<template>
    <div class="topnav am-vertical-align">
        <div class="am-vertical-align-middle am-g am-g-collapse">
            <ul @click="toggleTip" @mousedown.stop @mouseenter="clearTipTimer" class="info-tips">
                <li>
                    <a class="am-icon-history am-icon-sm"></a>
                    <span class="am-badge am-badge-danger am-round">{{tipQueue.length}}</span>
                    <div v-show="tipState" class="tips-dropdown-wrapper am-radius">
                        <div class="tips-dropdown-ref">
                            <ul class="tips-dropdown am-radius" :style="{top:tipScrollTop+'px'}">
                                <li v-for="request of tipQueue" :key="request.detail" class="am-vertical-align" :title="request.emitter">
                                    <div class="am-vertical-align-middle">
                                        <span :class="['am-fl',request.state==='pending'?'am-text-secondary':request.state==='success'?'am-text-success':'am-text-warning']">{{request.detail}}</span>
                                        <span :class="['am-fr','am-badge','am-round',request.state==='pending'?'am-badge-secondary':request.state==='success'?'am-badge-success':'am-badge-warning']">{{request.state==='pending'?'请求中':request.state==='success'?'成功':'失败'}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div :style="{width:tipCounter+'%'}" class="count-down am-radius"></div>
                    </div>
                </li>
            </ul>
            <div class="topnav-left am-vertical-align am-u-sm-6 am-u-md-6 am-u-lg-5">
                <div class="am-vertical-align-middle">
                    <ul class="am-hide-md-down calendar">
                        <li class="icon am-icon-calendar"></li>
                        <li>{{calendar.date}}</li>
                    </ul>
                    <ul class="digital-clock">
                        <li class="icon am-icon-clock-o"></li>
                        <li>{{calendar.hour}}</li>
                        <li>:</li>
                        <li>{{calendar.minute}}</li>
                        <li>:</li>
                        <li>{{calendar.second}}</li>
                    </ul>
                </div>
            </div>
            <div class="topnav-right am-vertical-align am-u-sm-6 am-u-md-6 am-u-lg-7">
                <ul class="am-verical-align-middle">
                    <li class="am-hide-md-down">
                        <span class="am-icon-user"></span>
                        <span class="username">Hi, Administrator</span>
                        <span class="cert"></span>
                    </li>
                    <li class="am-show-md-down">icon</li>
                    <li class="toggle-aside am-icon-th-list"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'TopNav',
    data() {
        return {
            calendar: this.getDate(),
        }
    },
    props: {
        queueState: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState('request', ['tipState', 'tipCounter', 'tipQueue', 'tipScrollTop'])
    },
    methods: {
        ...mapMutations('request', ['toggleTip', 'clearTipTimer']),
        getDate() {
            var date = new Date(),
                year = date.getFullYear(),
                month = (date.getMonth() + 1).toString().padStart(2, 0),
                day = date.getDate().toString().padStart(2, 0),
                week = date.getDay(),
                hour = date.getHours().toString().padStart(2, 0),
                minute = date.getMinutes().toString().padStart(2, 0),
                second = date.getSeconds().toString().padStart(2, 0),
                weekMap = [, '一', '二', '三', '四', '五', '六', '天'];

            var times = {
                date: year + ' / ' + month + ' / ' + day + '，星期' + weekMap[week],
                hour, minute, second
            };

            this.calendar = times;
            this.$nextTick(() => {
                setTimeout(this.getDate, 500);
            });

            return times;
        },
    }
}
</script>

<style lang="less" scoped>
.topnav {
    color: #fff;
    height: 75px;

    &>div {
        width: 100%;
        padding-left: 45px;
        position: relative;
        top: 0;
        left: 0;
    }

    ul {
        font-size: 1.3rem;
        margin: 0;
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
                animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
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
                    left: 10px; // transform: translateX(-50%);
                    content: ' ';
                    display: block;
                    border-bottom: 10px solid #fff;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    z-index: 1;
                }

                .tips-dropdown-ref {
                    position: relative;
                    left: 0;
                    top: 0;
                    height: 119px;
                    overflow: hidden;

                    .tips-dropdown {
                        transition: top .3s;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;

                        li {
                            animation: pop-appear 0.3s cubic-bezier(0.8, 0.02, 0.45, 0.91) forwards;
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

    .topnav-left {
        height: 40px;
        text-align: center;
        border-radius: 30px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);

        &>div {
            font-size: 0;
        }

        ul {
            display: inline-block;

            li.icon {
                margin-right: 5px;
            }

            li {
                display: inline;
            }
        }

        .calendar {
            border-right: 1px solid rgba(0, 0, 0, 0.4);
            box-shadow: 1px 0 0 rgba(255, 255, 255, 0.1);
            padding-right: 15px;
            margin-right: 15px;
        }
    }

    .topnav-right {
        height: 40px;
        display: inline-block;

        &>ul {
            width: 100%;
            font-size: 0;
            text-align: right;
            display: inline-block;

            .toggle-aside {
                font-size: 1.8rem;
            }

            li {
                cursor: pointer;
                padding: 0 15px;
                font-size: 13px;
                vertical-align: middle;
                display: inline-block;

                .username {
                    margin: 0 2px;
                }

                .cert {
                    width: 0;
                    height: 0;
                    display: inline-block;
                    vertical-align: middle;
                    border-top: 4px solid;
                    border-right: 4px solid transparent;
                    border-left: 4px solid transparent;
                }
            }
        }
    }
}
</style>