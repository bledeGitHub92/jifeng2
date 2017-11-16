<template>
    <div class="juice-body">
        <div class="title am-g">
            <div class="menuname am-u-sm-8 am-u-md-9 am-u-lg-3 am-vertical-align">
                <div class="am-vertical-align-middle">
                    <span class="am-icon-location-arrow"></span>
                    <h2>实时概况</h2>
                </div>
            </div>
            <div class="gretting am-u-lg-7 am-hide-md-down">
                <div class="am-vertical-align">
                    <div class="am-vertical-align-middle">
                        <span class="am-icon-info-circle"></span>
                        <span>Welcome back, Administrator.</span>
                    </div>
                </div>
            </div>
            <div class="widget am-u-sm-4 am-u-md-3 am-u-lg-2">
                <div class="am-vertical-align">
                    <div class="am-vertical-align-middle">
                        <button class="am-btn am-btn-primary am-icon-filter" style="width:100%;"> 筛 选</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="breadcrumb am-vertical-align">
            <ul class="am-vertical-align-middle">
                <li>
                    <span class="am-icon-location-arrow"></span>
                </li>
                <li>统计</li>
                <li>
                    <span class="am-icon-angle-right"></span>
                </li>
                <li>实时概况</li>
            </ul>
        </div>
        <!-- juice-panel  -->
        <router-view></router-view>
        <div class="footer am-vertical-align">
            <ul @click="popup" class="thumbnail-list am-vertical-align-middle am-btn-group">
                <li v-for="widget of widgets" :title="widget.title" :class="{'active':widgetList.includes(widget)}" :key="widget.title" class="thumbnail-item am-icon-qq am-icon-sm am-btn"></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { stackCounter } from '../../../lib/utils';

export default {
    name: 'JuiceBody',
    data() {
        return {
            // widget 列表
            widgets: [
                { title: '玩家' },
                { title: '邮件' },
                { title: '公告' },
                { title: '图表' },
            ],
        }
    },
    computed: {
        ...mapState(['widgetList'])
    },
    mounted() {
        // 打开 widget 快捷键
        document.addEventListener('keydown', this.documentKeydownListener, false);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.documentKeydownListener, false);
    },
    methods: {
        ...mapMutations([
            'toggleWidget', 'clearWidgetList'
        ]),
        // TODO: 按 esc 关闭 evet-dialog
        documentKeydownListener(event) {
            popupOfShortcutKey.call(this, event);
            this.clearWidgetList(event.keyCode);

            function popupOfShortcutKey(event) {
                var index = [49, 50, 51, 52].indexOf(event.keyCode),
                    length = this.widgetList.length,
                    widget = null;

                if (event.altKey && index !== -1) {
                    this.toggleWidget(this.widgets[index]);
                    this.$nextTick(() => {
                        widget = initWidgetPos(length, this.widgetList);
                        if (widget) { initWidgetStack(widget, stackCounter.increase()); }
                    });
                }
            }
        },
        popup(event) {
            var title = event.target.title,
                length = this.widgetList.length,
                widget = null;

            this.toggleWidget(this.widgets.filter(
                widget => widget.title === title
            )[0]);
            this.$nextTick(() => {
                widget = initWidgetPos(length, this.widgetList);
                if (widget) { initWidgetStack(widget, stackCounter.increase()); }
            });
        },
    },
}

// 初始化 widget 的位置
function initWidgetPos(length, list) {
    if (list.length > length) {
        length = list.length;
        if (length > 1) {
            var widgets = document.querySelectorAll('.modal-widget'),
                prevElem = widgets[length - 2],
                currElem = widgets[length - 1],
                currTop = prevElem.offsetTop + 40,
                currLeft = prevElem.offsetLeft + 20,
                docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight),
                docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);

            if (currTop + currElem.offsetHeight >= docHeight || currLeft + currElem.offsetWidth >= docWidth) {
                currLeft = currTop = 0;
            }

            currElem.style.cssText = `top:${currTop}px;left:${currLeft}px`;
            return currElem;
        }
    }
}
// 初始化 widget 的层叠顺序
function initWidgetStack(widget, counter) {
    widget.style.zIndex = counter;
}
</script>

<style lang="less" scoped>
.juice-body {
    &::before {
        content: ' ';
        display: table;
        position: absolute;
        top: 0px;
        left: 0px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 0px 10px;
        transform: rotate(-90deg);
        border-width: 0px 42px 42px 0px;
        border-style: solid;
        border-color: rgb(255, 255, 255) rgba(0, 0, 0, 0.1);
    }

    min-height: 100%;
    padding-bottom: 105px;
    position: relative;
    color: #9ea7b3;
    overflow: hidden;
    background: linear-gradient(135deg, transparent 30px, rgb(245, 245, 245) 30px);

    .title {
        border-bottom: 1px solid rgb(221, 221, 221);

        .menuname {
            height: 60px;
            padding-left: 60px;

            &>div {
                white-space: nowrap;
                font-size: 0;

                span:first-child {
                    margin-right: 10px;
                    font-size: 18px;
                }

                h2 {
                    margin: 0;
                    display: inline-block;
                    font-size: 18px;
                    font-weight: normal;
                }
            }
        }

        .gretting {
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
                display: inline-block;

                &>div {
                    font-size: 0;
                }
            }

            span {
                font-size: 1.3rem;
            }

            span:first-child {
                color: #3bb4f2;
                margin-right: .6rem;
            }
        }

        .widget {
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
                     // font-size: 0;
                    width: 100%;
                    
                    button {
                        width: 100%;
                        border-radius: 3px;
                        font-size: 14px;
                        padding: 10px;
                    }
                }
            }
        }
    }

    .breadcrumb {
        height: 50px;
        padding: 0 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        background: none 0px 0px repeat scroll rgba(0, 0, 0, 0.02);

        ul {
            margin: 0;
            font-size: 0;

            li:first-child {
                padding: 0;
            }

            li {
                display: inline-block;
                font-size: 1.3rem;
                padding-left: 10px;
            }
        }
    }

    .footer {
        bottom: 0px;
        height: 50px;
        left: 0px;
        position: absolute;
        width: 100%;
        background: #f8f8f8;
        border-top: 1px solid #ddd;

        .thumbnail-list {
            margin: 0;

            .thumbnail-item {
                &.active {
                    box-shadow: inset 0 3px 5px rgba(0, 0, 0, .15);
                }
                cursor: pointer;
            }
        }
    }
}
</style>
