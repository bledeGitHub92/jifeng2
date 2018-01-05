<template>
    <ul @mousedown="fireEvent" @contextmenu="forbidMenu" v-show="menuState" :style="location" class="contextmenu">
        <li v-for="item of menuList" :key="item.text" :class="[{'am-icon-caret-right':!!item.detail}, ...item.className]">
            {{item.text}}
            <ul v-if="item.detail" class="submenu">
                <li v-for="submenu of item.detail" :key="submenu.text" :class="submenu.className">
                    <a :class="{'am-icon-bolt':multiple&&menuStyle(submenu.className)}">{{submenu.text}}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import operate from './contextmenu/operate';
import query from './contextmenu/query';

export default {
    name: 'ContextMenu',
    data() {
        return {
            fns: {
                ...operate,
                ...query
            },
        }
    },
    computed: {
        ...mapState('contextmenu', [
            'menuLeft', 'menuTop', 'menuState',
            'menuList', 'selectedMode'
        ]),
        location() {
            return {
                left: this.menuLeft + 'px',
                top: this.menuTop + 'px'
            }
        },
        multiple() {
            return this.selectedMode === 'multiple';
        },
    },
    methods: {
        ...mapMutations('dialog', ['changeBackdrop', 'changeEventDialog']),
        ...mapMutations('contextmenu', ['hideMenu']),
        forbidMenu(event) {
            event.preventDefault();
        },
        fireEvent({ target, button }) {
            var fns = this.fns,
                methodName = target.parentNode.className,
                getDialogName = null;

            if (button === 0) {
                if (getDialogName = fns[methodName]) {
                    this.hideMenu();
                    this.changeBackdrop('show');
                    this.changeEventDialog(getDialogName());
                }
            }
        },
        menuStyle(className) {
            return ['sendMail', 'bwList', 'addQuest', 'setQuest'].includes(className)
        },
    }

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

        li {
            padding: 0;
            position: relative;
            left: 0;
            top: 0;

            a {
                display: inline-block;
                width: 100%;
                padding-left: 30px;
                color: #333;
                &::before {
                    position: absolute;
                    top: 50%;
                    left: 15px;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }

    &>li {
        &:hover .submenu {
            display: block;
        }
        position: relative;
        top: 0;
        left: 0;
    }
    &>li::before {
        line-height: 24px;
        margin-right: 10px;
        float: right;
    }

    li {
        &:hover {
            background-color: #e5e5e5;
        }
        width: 100%;
        height: 24px;
        line-height: 24px;
        padding-left: 30px;
        cursor: default;
    }
}
</style>