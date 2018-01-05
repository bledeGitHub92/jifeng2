<template>
    <div class="right-slider">
        <top-nav></top-nav>
        <juice-body :widgets="widgets" :filter-detail-state="filterDetailState"></juice-body>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import TopNav from './rightslider/topnav.vue';
import JuiceBody from './rightslider/juicebody.vue';
import { stackCounter } from 'lib/utils';

export default {
    name: 'RightSlider',
    components: {
        TopNav, JuiceBody
    },
    data() {
        return {
            // widget 列表
            widgets: [
                { alias: '玩家', name: 'player', },
                { alias: '邮件', name: 'mail', },
                { alias: '公告', name: 'announcement', },
                { alias: '图表', name: 'grpah', },
            ],
            // filter detail
            filterDetailState: false,
        }
    },
    computed: {
        ...mapState('widget', ['widgetList']),
    },
    mounted() {
        // keydown 句柄
        document.addEventListener('keydown', this.keydownListener, false);
        // keyup 句柄
        document.addEventListener('keyup', this.keyupListener, false);
        // mousedown 句柄
        document.addEventListener('mousedown', this.mousedownListener, false);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydownListener, false);
        document.removeEventListener('keyup', this.keyupListener, false);
        document.removeEventListener('mousedown', this.mousedownListener, false);
    },
    methods: {
        ...mapMutations('widget', ['toggleWidget']),
        ...mapMutations('request', ['hideTip']),
        ...mapActions(['closeDialog']),
        mousedownListener() {
            // -- TopNav --
            // 关闭 tips
            // this.hideTip();
        },
        keydownListener({ keyCode, altKey }) {
            // -- JuiceBody --
            // 快捷键打开弹窗
            popupOfShortcutKey.call(this);
            // 显示筛选细节
            showFilterDetail.call(this);
            // 按 Esc 关闭弹窗
            this.closeDialog(keyCode === 27);

            function showFilterDetail() {
                if (keyCode === 192) this.filterDetailState = true;
            }

            function popupOfShortcutKey() {
                var index = [49, 50, 51, 52].indexOf(keyCode),
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
        keyupListener({ keyCode }) {
            hideFilterDetail.call(this);
            function hideFilterDetail() {
                if (keyCode === 192) this.filterDetailState = false;
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
.right-slider {
    height: 100%;
    padding-bottom: 75px;
    margin-left: 260px;
    @media (max-width: 640px) {
        margin-left: 50px;
    }
    transition: margin .1s;
}
</style>