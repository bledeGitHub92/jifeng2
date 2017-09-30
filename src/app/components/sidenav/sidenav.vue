<template>
    <div :class="{'hide':navbarState}" class="sidenav">
        <div class="logo am-g am-g-collapse">
            <div class="am-u-sm-8 am-vertical-align">
                <h1 class="am-vertical-align-middle">Juice Game</h1>
            </div>
            <div class="toggle-menu am-u-sm-4 am-hide-sm-only am-vertical-align am-text-right">
                <span @click="toggleSidenav" class="am-vertical-align-middle am-icon-bars"></span>
            </div>
        </div>
        <div :class="{'am-hide-sm-only':!navbarState}" class="search-show">
            <input type="text" placeholder="search Menu...">
        </div>
        <div :class="{'am-show-sm-only':!navbarState}" class="search-hide">
            <input type="text" placeholder="search Menu...">
        </div>
        <div class="menu">
            <ul :style='ulMargin'>
                <li :class="{'am-hide-sm-only': !navbarState}" class="menu-title">
                    <span>Widget Menu</span>
                    <i @click="toggleMenuItem" :class="{'am-icon-spin':true}" class="gear-switch am-icon-gear"></i>
                </li>
                <li class="menu-list" :class="{'close':menuListState}">
                    <ul>
                        <li class="menu-item active">
                            <a href="#">
                                <i :class="{'am-icon-sm': navbarState, 'am-fr': navbarState}" class="item-icon am-icon-pie-chart"></i>
                                <span :class="{'am-hide-sm-only': !navbarState}">Summary</span>
                                <!-- <h4 :class="{'am-hide-sm-only': !navbarState}" class="am-icon-plus am-fr"></h4>  -->
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="#">
                                <i :class="{'am-icon-sm': navbarState, 'am-fr': navbarState}" class="item-icon am-icon-area-chart"></i>
                                <span :class="{'am-hide-sm-only': !navbarState}">Element</span>
                                <!-- <h4 :class="{'am-hide-sm-only': !navbarState}" class="am-icon-plus am-fr"></h4>  -->
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="#">
                                <i :class="{'am-icon-sm': navbarState, 'am-fr': navbarState}" class="item-icon am-icon-search"></i>
                                <span :class="{'am-hide-sm-only': !navbarState}">Charts</span>
                                <!-- <h4 :class="{'am-hide-sm-only': !navbarState}" class="am-icon-plus am-fr"></h4>  -->
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'sidenav',
    data() {
        return {
            menuListState: false,
        }
    },
    computed: {
        ...mapState([
            'contentBlockMarginLeft'
        ]),
        navbarState() {
            return this.contentBlockMarginLeft === 50;
        },
        // ul 外边距
        ulMargin() {
            return {
                'margin': this.navbarState ? 0 : '10px'
            }
        }
    },
    methods: {
        ...mapMutations([
            'toggleSidenav'
        ]),
        toggleMenuItem() {
            this.menuListState = !this.menuListState;
        }
    }
}
</script>

<style lang="less" scoped>
@media only screen and (max-width: 640px) {
    .sidenav {
        left: -210px !important;
    }

    .menu {
        &>ul {
            margin: 0 !important;
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

    position: absolute;
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
        z-index: 99;
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
                    &.active {
                        color: #3bb4f2;
                    }

                    position: absolute;
                    top: 0;
                    right: 5px;
                    font-size: 1.8rem;
                    cursor: pointer;
                }
            }

            .menu-list {
                overflow: hidden;
                transform: translate(0, 0);
                transition: max-height .3s;
                max-height: 100%;
                height: 100%;

                &.close {
                    height: 0;
                }

                &>ul {
                    margin: 0;
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

                            transition: background-color .3s;
                            background-color: rgba(0, 0, 0, 0.2);
                            border-left: 2px solid #fff;
                            padding-left: 28px;
                            position: relative;
                        }
                    }

                    a {
                        &:hover {
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

                            transition: background-color .3s;
                            background-color: rgba(0, 0, 0, 0.2);
                            border-left: 2px solid #fff;
                            padding-left: 28px;
                            position: relative;
                        }

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