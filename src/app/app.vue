<template>
    <div :style="position" class="jifeng2">
        <side-nav></side-nav>
        <right-slider>
            <top-nav slot="topnav"></top-nav>
            <juice-body slot="juice-body"></juice-body>
        </right-slider>
        <!-- <back-drop></back-drop>  -->
        <modal-widget v-for="widget of widgetList" :key="widget.title" :msg="widget">
            <div slot="filter">
                <form action="">
                    <juice-select></juice-select>
                    <input type="text" size="12" placeholder="角色信息" />
                    <button style="float:right" type="button">查询</button>
                </form>
            </div>
            <juice-table slot="玩家"></juice-table>
        </modal-widget>
    </div>
</template>

<script>
import sideNav from './components/sidenav/sidenav.vue';
import rightSlider from './components/rightslider/rightslider.vue';
import juiceBody from './components/rightslider/juicebody/juicebody.vue';
import topNav from './components/rightslider/topnav/topnav.vue';
import backDrop from './components/backdrop.vue';
import modalWidget from './components/modalwidget.vue';
import juiceTable from './components/juicetable.vue';
import juiceSelect from './components/juiceselect.vue';
import { mapState, mapMutations } from 'vuex';
import DragDrop from './lib/dragDrop';
import {getElem} from './lib/utils';
import 'amazeui/dist/css/amazeui.min.css';

export default {
    name: 'app',
    components: {
        rightSlider, sideNav, topNav,
        juiceBody, backDrop, modalWidget,
        juiceTable, juiceSelect
    },
    computed: {
        ...mapState([
            'siteTranslate', 'widgetList'
        ]),
        position() {
            return { transform: `translate(${this.siteTranslate}px)` };
        }
    },
    methods: {
        ...mapMutations(['changeBackdrop']),
        forbidMouseWheel(event) {
            if (getElem(event.target, 'table-widget')) {
                event.preventDefault();
            }
        },
        forbidContextmenu(event) {
            event.preventDefault();
        },
        shortcutKey(event) {
            if (event.altKey && [49, 50, 51].includes(event.keyCode)) {
                // this.changeBackdrop('show');
            }
        }
    },
    mounted() {
        document.addEventListener('keyup', this.shortcutKey, false);
        document.addEventListener('mousewheel', this.forbidMouseWheel, false);
        document.addEventListener('DOMMouseScroll', this.forbidMouseWheel, false);
        document.addEventListener('contextmenu', this.forbidContextmenu, false);
        DragDrop.enable();
    },
    beforeDestroy() {
        document.removeEventListener('keyup', this.shortcutKey, false);
        document.removeEventListener('mousewheel', this.forbidMouseWheel, false);
        document.removeEventListener('DOMMouseScroll', this.forbidMouseWheel, false);
        document.removeEventListener('contextmenu', this.forbidContextmenu, false);
        DragDrop.disable();
    },
}
</script>

<style lang="less">
html,
body,
.jifeng2 {
    height: 100%;
}

body {
    background: url('./bg.jpg') repeat;
}

ul {
    list-style-type: none;
    padding: 0;
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
