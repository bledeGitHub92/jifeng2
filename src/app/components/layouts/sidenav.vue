<template>
    <div class="sidenav">
        <div class="logo am-g am-g-collapse">
            <div class="am-u-sm-8 am-vertical-align">
                <h1 class="am-vertical-align-middle">Juice Game</h1>
            </div>
        </div>
        <div class="search-show am-hide-sm-only">
            <input type="text" placeholder="search Menu...">
        </div>
        <div class="search-hide am-show-sm-only">
            <input type="text" placeholder="search Menu...">
        </div>
        <div class="menu">
            <ul v-for="item in defaultMenuList" :key="item.name">
                <li :class="{'active':item.lists.some(list => list.url===route.path)&&!folderState.includes(item.name)}" class="menu-title am-hide-sm-only">
                    <span>{{item.name}}</span>
                    <i @click="toggleMenuItem" class="gear-switch am-icon-gear"></i>
                </li>
                <li class="menu-list">
                    <ul>
                        <li @mouseenter="showtooltip" @mouseleave="hidetooltip" v-for="list in item.lists" :key="list.name" :class="{'active':route.path===list.url}" class="menu-item">
                            <router-link :to="list.url">
                                <i :class="['item-icon', list.icon]"></i>
                                <span class="am-hide-sm-only">{{list.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import Animate from 'lib/animate';
import { showTip, hideTip } from 'lib/tooltip';

var animate = new Animate();

export default {
    name: 'SideNav',
    data() {
        return {
            folder: null,
            folderState: '',
            running: false
        }
    },
    computed: {
        ...mapState([
            'route',
            'defaultMenuList',
        ]),
    },
    watch: {
        folderState(menu, pre) {
            var folder = this.folder,
                preFolder;

            if (menu) {
                this.folder = folder = getFolder(menu);
            }

            if (pre && menu) {
                preFolder = getFolder(pre);
            }

            animate.start(folder, 'height', 300).then(() => {
                if (preFolder) {
                    animate.start(preFolder, 'height', 300).then(() => { this.running = false; })
                } else { this.running = false; }
            });

            function getFolder(menuName) {
                return Array.from(document.querySelectorAll('.menu-title'))
                    .find(li => li.firstChild.textContent === menuName).nextElementSibling.firstChild;
            }
        }
    },
    mounted() {
        this.defaultMenuList.forEach(menu => {
            menu.lists.forEach(list => {
                if (list.url === this.route.path) {
                    this.folderState = menu.name;
                }
            });
        });
    },
    methods: {
        toggleMenuItem(e) {
            var menuName = e.target.previousElementSibling.textContent;

            if (this.running) { return false; }

            this.running = true;

            if (this.folderState) {
                if (this.folderState === menuName) {
                    this.folderState = '';
                } else {
                    this.folderState = menuName;
                }
            } else {
                this.folderState = menuName;
            }
        },
        showtooltip(e) {
            if (e.currentTarget.getBoundingClientRect().width === 260) {
                var text = e.currentTarget.lastChild.textContent;
                showTip(e.currentTarget, text);
            }
        },
        hidetooltip(e) {
            if (e.currentTarget.getBoundingClientRect().width === 260) {
                // console.log(e.currentTarget);
                hideTip(e.currentTarget);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@media (max-width: 640px) {
    .sidenav {
        left: -210px !important;
    }

    .menu {
        &>ul {
            margin: 0 !important;
        }
    }

    .menu-list {
        &>ul {
            display: block !important;
        }
    }

    .menu-item {
        .item-icon {
            &::before {
                font-size: 150%;
                vertical-align: -10%;
            }

            float: right;
        }
    }
}

.sidenav {
    &.hide {
        left: -210px;
    }

    position: fixed;
    left: 0;
    top: 0;
    transition: left .1s;
    width: 260px;
    color: rgba(255, 255, 255, 0.8);

    .logo {
        padding: 0 10px;

        &>div {
            font-size: 0;
            height: 75px;
            display: inline-block;

            h1 {
                color: #fff;
                margin: 0;
                font-size: 3rem;
            }

            span {
                &:hover {
                    background: rgba(0, 0, 0, 0.8);
                }

                cursor: pointer;
                width: 30px;
                height: 30px;
                line-height: 30px;
                border-radius: 3px;
                color: rgba(255, 255, 255, 0.8);
                background: rgba(0, 0, 0, 0.3);
                text-align: center;
                user-select: none;
            }
        }
    }

    .search-show {
        padding: 0 10px;
        display: none;

        input {
            &:focus {
                outline: none;
            }
            width: 100%;
            border-radius: 4px;
            border: none;
            background: rgba(0, 0, 0, 0.1);
            padding: 10px 15px 10px 60px;
            font-size: 1.3rem;
        }
    }

    .search-hide {
        position: relative;
        display: inline-block;
        top: 0;
        left: 210px;

        input {
            &:hover {
                background-color: #252D3B;
            }
            &:focus {
                cursor: auto;
                width: 200px;
                padding-left: 50px;
                padding-top: 9px;
                border: 1px solid #ddd;
                color: #252D3B;
                box-shadow: none !important;
                background: #fff;
                outline: none;
            }

            cursor: pointer;
            border: 1px solid transparent;
            display: block;
            padding: 9px 10px 14px;
            font-size: 1.3rem;
            width: 50px;
            transition: all .1s;
            background: rgba(0, 0, 0, 0.3);
        }
    }

    .menu {
        color: #fff;

        &>ul {
            margin: 10px;
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
            background: rgba(0, 0, 0, 0.1);

            li.menu-title {
                &.active {
                    background-color: rgba(0, 0, 0, 0.15);
                }

                transition: background-color .3s;
                display: none;
                position: relative;
                left: 0;
                top: 0;
                padding: 6px 5px 6px 15px;
                font-size: 0;
                box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);

                span {
                    font-size: 1.4rem;
                    padding: 0 10px;
                    display: inline-block;
                    border-radius: 20px;
                    background-color: rgba(0, 0, 0, 0.2);
                }

                .gear-switch {
                    position: absolute;
                    top: 0;
                    right: 5px;
                    font-size: 1.8rem;
                    cursor: pointer;
                }
            }

            .menu-list {
                &>ul {
                    margin: 0;
                    overflow: hidden;
                    display: none;
                }

                li.menu-item {
                    font-size: 0;

                    &.active {
                        a {
                            &::after {
                                content: '';
                                display: block;
                                position: absolute;
                                top: 50%;
                                left: 0px;
                                width: 0;
                                height: 0;
                                border-left: 6px solid #fff;
                                border-top: 8px solid transparent;
                                border-bottom: 8px solid transparent;
                                transform: translate(0, -50%);
                            }

                            background-color: rgba(0, 0, 0, 0.2);
                            border-left: 2px solid #fff;
                            padding-left: 28px;
                            position: relative;
                        }
                    }

                    a {
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.2);
                            position: relative;
                        }

                        transition: background-color .3s;
                        color: #fff;
                        width: 100%;
                        display: inline-block;
                        font-size: 0;
                        padding: 10px 10px 10px 30px;

                        i {
                            font-size: 1.4rem;
                            line-height: 2.4rem;
                            margin-right: 5px;
                        }

                        span {
                            display: inline-block;
                            font-size: 1.4rem;
                            margin-left: 10px;
                            line-height: 2.4rem;
                            display: none;
                        }

                        h4 {
                            display: none;
                            font-size: 1.4rem;
                            margin: 0;
                            width: 2.4rem;
                            height: 2.4rem;
                            line-height: 2.4rem;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>