<template>
    <div class="widget-list am-vertical-align">
        <ul @click="showWidget" class="thumbnail-list am-vertical-align-middle am-btn-group">
            <li
                v-for="widget of widgets" :key="widget.name"
                :title="widget.alias"
                :class="[{'active':widgetList.includes(widget)}, 'thumbnail-item am-icon-qq am-icon-sm am-btn']">
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { stackCounter } from 'lib/utils';

export default {
    name: 'WidgetList',
    data() {
        return {
            widgets: [
                { alias: '玩家', name: 'player' },
            ],
        }
    },
    computed: {
        ...mapState('widget', ['widgetList']),
    },
    mounted() {
        // keydown 句柄
        document.addEventListener('keydown', this.shortcut, false);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.shortcut, false);
    },
    methods: {
        ...mapMutations('widget', ['toggleWidget']),
        ...mapActions(['closeDialog']),
        showWidget({ target }) {
            var title = target.title,
                length = this.widgetList.length,
                widget = null;

            this.toggleWidget(this.widgets.find(
                widget => widget.alias === title
            ));
            this.$nextTick(() => {
                widget = initWidgetPos(length, this.widgetList);
                if (widget) { initWidgetStack(widget, stackCounter.increase()); }
            });
        },
        shortcut({ keyCode, altKey }) {
            // 快捷键打开弹窗
            popupOfShortcutKey.call(this);
            // 按 Esc 关闭弹窗
            this.closeDialog(keyCode === 27);

            function popupOfShortcutKey() {
                var index = [49].indexOf(keyCode),
                    length = this.widgetList.length,
                    widget = null;

                if (altKey && index !== -1) {
                    this.toggleWidget(this.widgets[index]);
                    this.$nextTick(() => {
                        widget = initWidgetPos(length, this.widgetList);
                        if (widget) { initWidgetStack(widget, stackCounter.increase()); }
                    });
                }
            }
        },
    }
}
// 初始化 widget 的位置
function initWidgetPos(length, list) {
    if (list.length > length) {
        length = list.length;

        var widgets = document.querySelectorAll('.modal-widget'),
            currElem = widgets[length - 1],
            coord = localStorage.getItem(currElem.id);

        if (coord) {
            coord = JSON.parse(coord);
            currElem.style.cssText = `top:${coord.top}px;left:${coord.left}px`;
        } else if (length > 1) {
            var prevElem = widgets[length - 2],
                currTop = prevElem.offsetTop + 40,
                currLeft = prevElem.offsetLeft + 20,
                docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight),
                docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);

            if (currTop + currElem.offsetHeight >= docHeight || currLeft + currElem.offsetWidth >= docWidth) {
                currLeft = currTop = 0;
            }

            currElem.style.cssText = `top:${currTop}px;left:${currLeft}px`;
        }
        return currElem;
    }
}
// 初始化 widget 的层叠顺序
function initWidgetStack(widget, counter) {
    widget.style.zIndex = counter;
}
</script>

<style lang="less" scoped>
.widget-list {
    margin-left: 260px;
    @media (max-width: 640px) {
        margin-left: 50px;
    }
    height: 50px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    background: #f7f7f7;
    border-top: 1px solid #ddd;
    transition: margin .1s;

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
</style>