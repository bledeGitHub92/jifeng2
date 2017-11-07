<template>
    <ul @mousedown="fireEvent" @contextmenu="forbidMenu" v-show="menuState" :style="location" class="contextmenu">
        <li v-for="item of menuList" :key="item.text" :class="[{'am-icon-caret-right':!!item.detail}, ...item.className]">
            {{item.text}}
            <ul v-if="item.detail" class="submenu">
                <li v-for="submenu of item.detail" :key="submenu.text" :class="submenu.className">{{submenu.text}}</li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import operate from './operate';
import query from './query';

export default {
    name: 'contextmenu',
    data() {
        return {
            methods: {
                ...operate,
                ...query
            }
        }
    },
    computed: {
        ...mapState([
            'menuLeft', 'menuTop',
            'menuState', 'menuList'
        ]),
        location() {
            return {
                left: this.menuLeft + 'px',
                top: this.menuTop + 'px'
            }
        }
    },
    methods: {
        ...mapMutations([
            'changeBackdrop', 'hideMenu'
        ]),
        forbidMenu(event) {
            event.preventDefault();
        },
        fireEvent(event) {
            var target = event.target,
                methods = this.methods,
                methodName = target.className,
                method = null;

            if (method = methods[methodName]) {
                this.hideMenu();
                this.changeBackdrop('show');
            }
        }
    },

}
</script>

<style lang="less" scoped>
.contextmenu {
    z-index: 99999;
    position: absolute;
    left: 0;
    top: 0;
    user-select: none;
    color: #333;
    margin: 0;
    width: 140px;
    background-color: #fff;
    font-size: 13px;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 2px -1px rgba(0, 0, 0, 0.4);

    .submenu {
        width: 140px;
        background-color: #fff;
        border: 1px solid #ddd;
        margin: 0;
        position: absolute;
        top: 0;
        right: -136px;
        display: none;
        box-shadow: 4px 4px 2px -1px rgba(0, 0, 0, 0.4);
    }

    &>li {
        &:hover .submenu {
            display: block;
        }
        position: relative;
        top: 0;
        left: 0;
    }


    li {
        &:hover {
            background-color: #e5e5e5;
        }
        &::before {
            line-height: 24px;
            margin-right: 10px;
            float: right;
        }
        width: 100%;
        height: 24px;
        line-height: 24px;
        padding-left: 30px;
        cursor: default;
    }
}
</style>