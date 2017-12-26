<template>
    <div @selectstart="forbidSelect" class="jifeng2">
        <div class="layout">
            <side-nav></side-nav>
            <right-slider></right-slider>
        </div>
        <modal-widget v-for="widget of widgetList" :key="widget.title" :msg="widget" :id="'modal-'+widget.name"></modal-widget>
        <back-drop></back-drop>
        <context-menu></context-menu>
    </div>
</template>

<script>
import SideNav from './components/layouts/sidenav/sidenav.vue';
import RightSlider from './components/layouts/rightslider/rightslider.vue';
import ModalWidget from './components/commons/modalwidget.vue';
import ContextMenu from './components/commons/contextmenu.vue';
import BackDrop from './components/commons/backdrop.vue';
import { mapState, mapMutations } from 'vuex';
import DragDrop from 'lib/dragDrop';
import { getParent } from 'lib/utils';
import Clipboard from 'clipboard';
import 'amazeui/dist/css/amazeui.min.css';

// 剪贴板对象
var clipboard = null;

export default {
    name: 'app',
    components: {
        SideNav, RightSlider, ModalWidget,
        ContextMenu, BackDrop
    },
    computed: {
        ...mapState([
            'widgetList', 'menuList', 'copyValue', 'platform'
        ]),
    },
    methods: {
        ...mapMutations([
            'hideMenu'
        ]),
        ...mapMutations('request', ['changeTipScrollTop']),
        // 初始化 contextmenu 的功能
        initContextmenuEvent() {
            var menu = this.menuList,
                ctx = this,
                array = [
                    {
                        className: 'copy',
                        method() {
                            clipboard = new Clipboard('.' + this.className, {
                                text(trigger) {
                                    return ctx.copyValue;
                                }
                            });
                            // TODO: 复制成功后的提示
                            clipboard.on('success', function(event) {
                                // console.info('Action:', event.action);
                                // console.info('Text:', event.text);
                                // console.info('Trigger:', event.trigger);
                                ctx.hideMenu();
                                event.clearSelection();
                            });
                            clipboard.on('error', function(event) {
                                console.error('Action:', event.action);
                                console.error('Trigger:', event.trigger);
                            });
                        }
                    }
                ];

            array = array.filter(obj => menu.some(item => item.className.indexOf(obj.className) !== -1));
            array.forEach(obj => { obj.method(); });
        },
        mousewheelListener({ target, wheelDelta, detail }) {
            var delta = wheelDelta || detail * -40;
            // 阻止滑动表格冒泡
            if (getParent(target, '.table-widget')) {
                event.preventDefault();
            }

            // info-tips 自定义自定义滚动条
            var tipsRef, tipsWrapper;
            if (tipsRef = getParent(target, '.tips-dropdown-ref')) {
                tipsWrapper = tipsRef.firstElementChild;
                minTop = tipsRef.offsetHeight + 1 - tipsWrapper.offsetHeight;
                prev = parseInt(tipsWrapper.style.top);
                next = (prev || 0) + delta / 2;
                if (minTop < 0) {
                    this.changeTipScrollTop(next >= 0 ? 0 : next < minTop ? minTop : next);
                } else if (prev < 0 && delta > 0) {
                    this.changeTipScrollTop(next > 0 ? 0 : next);
                }
            }

            // juice-content 自定义滚动条
            var slideWrapper, juiceContent, minTop, prev, next;
            if (juiceContent = getParent(target, '.juice-content')) {
                slideWrapper = juiceContent.firstElementChild;
                minTop = juiceContent.offsetHeight - slideWrapper.offsetHeight;
                prev = parseInt(slideWrapper.style.top);
                next = (prev || 0) + delta / 2;
                if (minTop < 0) {
                    setTop(slideWrapper, next >= 0 ? 0 : next < minTop ? minTop : next);
                } else if (prev < 0 && delta > 0) {
                    setTop(slideWrapper, next > 0 ? 0 : next);
                }
            }

            function setTop(elem, top) {
                elem.style.top = top + 'px';
            }
        },
        forbidContextmenu(event) {
            event.preventDefault();
        },
        hideContext(event) {
            !getParent(event.target, '.contextmenu') && this.hideMenu();
        },
        // 禁止选择文本
        forbidSelect(event) {
            event.preventDefault();
        }
    },
    mounted() {
        this.initContextmenuEvent();
        document.addEventListener('mousedown', this.hideContext, false);
        document.addEventListener('mousewheel', this.mousewheelListener, false);
        document.addEventListener('DOMMouseScroll', this.mousewheelListener, false);
        document.addEventListener('contextmenu', this.forbidContextmenu, false);
        DragDrop.enable();
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.hideContext, false);
        document.removeEventListener('mousewheel', this.mousewheelListener, false);
        document.removeEventListener('DOMMouseScroll', this.mousewheelListener, false);
        document.removeEventListener('contextmenu', this.forbidContextmenu, false);
        // 删除 clipboard 事件
        clipboard && clipboard.destroy();
        DragDrop.disable();
    },
}
</script>

<style lang="less">
@keyframes pop-appear {
    0% {
        opacity: 0;
        transform: scale(.8) rotateX(-40deg)
    }
    50% {
        opacity: 1
    }
    70% {
        transform: scale(1.05) rotateX(0)
    }
    100% {
        transform: scale(1) rotateX(0)
    }
}

html,
body,
.jifeng2 {
    height: 100%;
    user-select: none;
    .layout {
        height: 100%;
    }
}

body {
    background: url('./bg.jpg') no-repeat top center fixed;
    background-size: cover;
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", "微软雅黑", "宋体"; // overflow: hidden;
}

ul {
    list-style-type: none;
    padding: 0;
}

input,
select {
    outline: none;
}

.clearfix {
    overflow: hidden;
    _zoom: 1;
}

.tool-tip {
    &::after {
        content: '';
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #252d3b;
        width: 0;
        height: 0;
        display: block;
    }

    position: absolute;
    padding: 0 15px;
    border-radius: 0 4px 4px 0;
    color: #fff;
    background-color: #252d3b;
    height: 48px;
    top: 0;
    left: -40px;
    opacity: 0;
    transition: left .35s cubic-bezier(0.175,
    0.885,
    0.320,
    1.15),
    opacity .35s;
    font-size: 13px;
    pointer-events: none;
}

// 初始化页面的 loading
.loading {
    background-color: #fff;
    text-align: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
