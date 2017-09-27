<template>
    <div :class="{'hide':navbarState}" class="sidenav">
        <div class="logo">
            <h1>Juice Game</h1>
            <span @click="toggleNavbar" class="am-icon-th-list"></span>
        </div>
        <div :class="{'am-hide':navbarState}" class="search-show">
            <input type="text" placeholder="search Menu...">
        </div>
        <div :class="{'am-hide':!navbarState}" class="search-hide">
            <input type="text" placeholder="search Menu...">
        </div>
        <div class="router">
            <ul :class='ulMarginClass'>
                <li>
                    <a href="#">
                        <span>widget menu</span>
                        <i class="am-icon-gear"></i>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="am-icon-pie-chart"></i>
                        <span>Summary</span>
                        <h4 class="am-icon-plus"></h4>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>


export default {
    name: 'sidenav',
    data() {
        return {
            navbarState: false,
        };
    },
    computed: {
        // ul 外边距
        ulMarginClass() {
            return {
                'collapse': this.navbarState
            }
        }
    },
    methods: {
        toggleNavbar() {
            this.navbarState = !this.navbarState;
        }
    }
}
</script>

<style lang="less" scoped>
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
        position: relative;
        height: 65px;
        left: 0;
        top: 0;

        h1 {
            color: #fff;
            margin: 0;
            padding-left: 19px;
            font-size: 30px;
            height: 65px;
            line-height: 65px;
        }

        span {

            &:hover {
                background: none repeat scroll 0 0 rgba(0, 0, 0, 0.8);
            }

            position: absolute;
            right: 10px;
            top: 18px;
            color: rgba(255, 255, 255, 0.8);
            border-radius: 3px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            background: none repeat scroll 0 0 rgba(0, 0, 0, 0.3);
            text-align: center;
            cursor: pointer;
            user-select: none;
        }
    }

    .search-show {
        padding: 0 10px;
        input {
            &:focus {
                outline: none;
            }
            width: 100%;
            border-radius: 4px;
            border: none;
            background: rgba(0, 0, 0, 0.1);
            padding: 10px 15px 10px 60px;
            font-size: 1.35rem;
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
                width: 200px;
                padding-left: 50px;
                padding-top: 9px;
                color: #252D3B;
                cursor: auto;
                box-shadow: none !important;
                background: #fff;
                outline: none;
            }
            cursor: pointer;
            display: block;
            padding: 9px 10px 14px;
            font-size: 1.35rem;
            width: 50px;
            transition: all .1s;
            border: none;
            background: rgba(0, 0, 0, 0.3);
        }
    }

    .router {
        ul {
            &.collapse {
                margin: 0;
            }
            background: rgba(0, 0, 0, 0.1);
            margin: 10px;
            li {
                font-size: 2rem;
                a {
                    &:hover {
                        &::after {
                            border-bottom: 6px solid #fff;
                            border-left: 8px solid transparent;
                            border-right: 8px solid transparent;
                            width: 0;
                            height: 0;
                            position: absolute;
                            top: 19px;
                            left: -6px;
                            content: '';
                            display: block;
                            transform: rotate(90deg);
                        }
                        background-color: rgba(0, 0, 0, 0.2);
                        border-left: 2px solid #fff;
                        padding-left: 28px;
                        position: relative;
                    }
                    color: #fff;
                    display: block;
                    font-size: 1.3rem;
                    line-height: 25px;
                    padding: 10px 10px 10px 30px;

                    i {
                        font-size: 1.8rem;
                        line-height: 1.1;
                        font-style: normal;
                        position: relative;
                        left: -5px;
                        top: 0px;
                        width: 20px;
                    }

                    span {
                        font-size: 1.3rem;
                        display: inline-block;
                        float: none;
                        position: relative;
                        left: 10px;
                    }

                    h4 {
                        display: inline-block;
                        float: right;
                        font-size: 1.3rem;
                        margin: 0;
                        width: 18px;
                        height: 18px;
                        text-align: center;
                    }
                }
                &:first-child {
                    a {
                        &:hover {
                            &::after {
                                border: none;
                            }
                            background-color: transparent;
                            border: none;
                            padding-left: 0px;
                            position: static;
                        }

                        cursor: default;
                        padding: 5px 10px 5px 0;

                        span {
                            position: relative;
                            left: 10px;
                            top: 0px;
                            display: inline-block;
                            background-color: rgba(0, 0, 0, 0.2);
                            border-radius: 20px;
                            padding: 0 11px;
                            height: 22px;
                            ;
                            line-height: 20px;
                        }

                        i {
                            float: right;
                            margin-right: -12px;
                        }
                    }
                }
            }
        }
    }
}
</style>