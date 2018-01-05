<template>
    <div class="topnav am-vertical-align">
        <div class="am-vertical-align-middle am-g am-g-collapse">
            <request-tips />
            <calendar />
            <div class="topnav-right am-vertical-align am-u-sm-6 am-u-md-6 am-u-lg-7">
                <ul class="am-verical-align-middle">
                    <li class="am-hide-md-down">
                        <span class="am-icon-user"></span>
                        <span class="username">Hi, Administrator</span>
                        <span class="cert"></span>
                    </li>
                    <li class="am-show-md-down">icon</li>
                    <li class="toggle-aside am-icon-th-list"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import RequestTips from './topnav/RequestTips.vue';
import Calendar from './topnav/Calendar.vue';

export default {
    name: 'TopNav',
    components: { RequestTips, Calendar },
}
</script>

<style lang="less" scoped>
.topnav {
    color: #fff;
    height: 75px;

    &>div {
        width: 100%;
        padding-left: 45px;
        position: relative;
        top: 0;
        left: 0;
    }

    ul {
        font-size: 1.3rem;
        margin: 0;
    }

    .topnav-right {
        height: 40px;
        display: inline-block;

        &>ul {
            width: 100%;
            font-size: 0;
            text-align: right;
            display: inline-block;

            .toggle-aside {
                font-size: 1.8rem;
            }

            li {
                cursor: pointer;
                padding: 0 15px;
                font-size: 13px;
                vertical-align: middle;
                display: inline-block;

                .username {
                    margin: 0 2px;
                }

                .cert {
                    width: 0;
                    height: 0;
                    display: inline-block;
                    vertical-align: middle;
                    border-top: 4px solid;
                    border-right: 4px solid transparent;
                    border-left: 4px solid transparent;
                }
            }
        }
    }
}
</style>