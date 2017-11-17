<template>
    <div :style="position" class="jifeng2">
        <side-nav></side-nav>
        <right-slider>
            <top-nav slot="topnav"></top-nav>
            <juice-body slot="juice-body"></juice-body>
        </right-slider>
        <modal-widget v-for="widget of widgetList" :key="widget.title" :msg="widget">
            <div slot="search">
                <form action="">
                    <juice-select></juice-select>
                    <input type="text" size="12" placeholder="角色信息" />
                    <button style="float:right" type="button">查询</button>
                </form>
            </div>
            <juice-table slot="玩家"></juice-table>
        </modal-widget>
        <back-drop>
            <event-dialog></event-dialog>
        </back-drop>
        <context-menu></context-menu>
    </div>
</template>

<script>
import SideNav from './layouts/sidenav/sidenav.vue';
import RightSlider from './layouts/rightslider/rightslider.vue';
import TopNav from './layouts/rightslider/topnav/topnav.vue';
import JuiceBody from './layouts/rightslider/juicebody/juicebody.vue';
import ModalWidget from './components/modalwidget.vue';
import JuiceTable from './components/juicetable.vue';
import JuiceSelect from './components/juiceselect.vue';
import ContextMenu from './components/contextmenu.vue';
import BackDrop from './components/backdrop.vue';
import EventDialog from './components/eventdialog.vue';
import { mapState, mapMutations } from 'vuex';
import DragDrop from './lib/dragDrop';
import { getParent } from './lib/utils';
import Clipboard from 'clipboard';
import 'amazeui/dist/css/amazeui.min.css';

// 剪贴板对象
var clipboard = null;

export default {
    name: 'app',
    components: {
        SideNav, RightSlider, TopNav,
        JuiceBody, ModalWidget, JuiceTable,
        JuiceSelect, ContextMenu, BackDrop,
        EventDialog
    },
    computed: {
        ...mapState([
            'siteTranslate', 'widgetList',
            'menuList', 'copyValue'
        ]),
        position() {
            return { transform: `translate(${this.siteTranslate}px)` };
        }
    },
    methods: {
        ...mapMutations([
            'changeBackdrop', 'hideMenu'
        ]),
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
        forbidMouseWheel(event) {
            if (getParent(event.target, '.table-widget')) {
                event.preventDefault();
            }
        },
        forbidContextmenu(event) {
            event.preventDefault();
        },
        hideContext(event) {
            !getParent(event.target, '.contextmenu') && this.hideMenu();
        }
    },
    mounted() {
        this.initContextmenuEvent();
        document.addEventListener('mousedown', this.hideContext, false);
        document.addEventListener('mousewheel', this.forbidMouseWheel, false);
        document.addEventListener('DOMMouseScroll', this.forbidMouseWheel, false);
        // document.addEventListener('contextmenu', this.forbidContextmenu, false);
        DragDrop.enable();
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.hideContext, false);
        document.removeEventListener('mousewheel', this.forbidMouseWheel, false);
        document.removeEventListener('DOMMouseScroll', this.forbidMouseWheel, false);
        // document.removeEventListener('contextmenu', this.forbidContextmenu, false);
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
}

body {
    background: url('./bg.jpg') no-repeat top center fixed;
    background-size: cover;
    overflow-x: hidden;
    font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", "微软雅黑", "宋体";
}

ul {
    list-style-type: none;
    padding: 0;
}

input,
select {
    outline: none;
}

.jifeng2 {
    transition: transform .2s;
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
</style>
