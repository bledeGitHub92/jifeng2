<template>
    <div class="juice-body">
        <div class="title am-g">
            <div class="menuname am-u-sm-8 am-u-md-9 am-u-lg-3 am-vertical-align">
                <div class="am-vertical-align-middle">
                    <span class="am-icon-location-arrow"></span>
                    <h2>实时概况</h2>
                </div>
            </div>
            <div class="gretting am-u-lg-7 am-hide-md-down">
                <div class="am-vertical-align">
                    <div class="am-vertical-align-middle">
                        <span class="am-icon-info-circle"></span>
                        <span>Welcome back, Administrator.</span>
                    </div>
                </div>
            </div>

            <filter-button></filter-button>
            
        </div>
        <div class="breadcrumb am-vertical-align">
            <ul class="am-vertical-align-middle">
                <li>
                    <span class="am-icon-location-arrow"></span>
                </li>
                <li>统计</li>
                <li>
                    <span class="am-icon-angle-right"></span>
                </li>
                <li>实时概况</li>
            </ul>
        </div>

        <router-view></router-view>

        <widget-list></widget-list>
    </div>
</template>

<script>
import FilterButton from './JuiceBody/FilterButton.vue';
import WidgetList from './JuiceBody/WidgetList.vue';

export default {
    name: 'JuiceBody',
    components: {
        FilterButton, WidgetList
    },
}
</script>

<style lang="less" scoped>
.juice-body {
    &::before {
        content: ' ';
        display: table;
        position: absolute;
        top: 0px;
        left: 0px;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 0px 10px;
        transform: rotate(-90deg);
        border-width: 0px 42px 42px 0px;
        border-style: solid;
        border-color: rgb(255, 255, 255) rgba(0, 0, 0, 0.1);
    }

    height: 100%;
    padding-bottom: 160px;
    position: relative;
    color: #9ea7b3;
    overflow: hidden;
    background: linear-gradient(135deg, transparent 30px, rgb(245, 245, 245) 30px);

    .title {
        border-bottom: 1px solid rgb(221, 221, 221);

        .menuname {
            height: 60px;
            padding-left: 60px;

            &>div {
                white-space: nowrap;
                font-size: 0;

                span:first-child {
                    margin-right: 10px;
                    font-size: 18px;
                }

                h2 {
                    margin: 0;
                    display: inline-block;
                    font-size: 18px;
                    font-weight: normal;
                }
            }
        }

        .gretting {
            &::before {
                content: ' ';
                display: inline-block;
                position: absolute;
                left: 0;
                height: 60px;
                vertical-align: middle;
                border-right: 1px dashed #ccc;
            }

            &>div {
                height: 60px;
                display: inline-block;

                &>div {
                    font-size: 0;
                }
            }

            span {
                font-size: 1.3rem;
            }

            span:first-child {
                color: #3bb4f2;
                margin-right: .6rem;
            }
        }
    }

    .breadcrumb {
        height: 50px;
        padding: 0 30px;
        border-bottom: 1px solid #ddd;
        background-color: #f0f0f0;

        ul {
            margin: 0;
            font-size: 0;

            li:first-child {
                padding: 0;
            }

            li {
                display: inline-block;
                font-size: 1.3rem;
                padding-left: 10px;
            }
        }
    }
}
</style>
