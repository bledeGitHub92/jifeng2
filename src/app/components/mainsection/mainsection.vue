<template>
    <div class="main-section">
        <div class="title am-g">
            <div class="menuname am-u-sm-8 am-u-md-9 am-u-lg-3 am-vertical-align">
                <div class="am-vertical-align-middle">
                    <span class="am-icon-paper-plane"></span>
                    <h2>SUMMARY</h2>
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
            <div class="widget am-u-sm-4 am-u-md-3 am-u-lg-2">
                <div class="am-vertical-align">
                    <div class="am-vertical-align-middle">
                        Widget
                    </div>
                </div>
            </div>
        </div>
        <div class="breadcrumb am-vertical-align">
            <ul class="am-vertical-align-middle">
                <li>
                    <span class="am-icon-home"></span>
                </li>
                <li>
                    <span class="am-icon-angle-right"></span>
                </li>
                <li>UI Element</li>
                <li>
                    <span class="am-icon-angle-right"></span>
                </li>
                <li>Element</li>
            </ul>
        </div>
        <div class="panel-wrapper am-g am-g-collapse">
            <div class="am-u-sm-12">
                <div class="panel">
                    <div class="panel-title am-vertical-align">
                        <div class="am-vertical-align-middle">
                            <h6 class="am-fl">Panel</h6>
                            <div class="tool am-fr">
                                <span class="am-icon-table"></span>
                                <span class="am-icon-bar-chart"></span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        Content goes here.
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
export default {
    name: 'main-section',
}
</script>

<style lang="less" scoped>
.main-section {
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

    min-height: 100%;
    padding-bottom: 105px;
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
                    margin-right: .6rem;
                    font-size: 2rem;
                }

                h2 {
                    margin: 0;
                    display: inline-block;
                    font-size: 2rem;
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

        .widget {
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
                    // font-size: 0;
                }
            }
        }
    }

    .breadcrumb {
        height: 50px;
        padding: 0 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        background: none 0px 0px repeat scroll rgba(0, 0, 0, 0.02);

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

    .panel-wrapper {
        padding: 0 30px;

        .panel {
            background: rgb(255, 255, 255);
            border-radius: .3rem;

            .panel-title {
                font-size: 0;
                height: 50px;
                margin: 30px auto 0px;
                border-bottom: 1px dotted rgb(221, 221, 221);
                padding: 0 15px;

                &>div {
                    width: 100%;
                }

                h6 {
                    margin: 0;
                    font-size: 1.4rem;
                    font-weight: normal;
                }
            }

            .tool {
                font-size: 0;

                span:first-child {
                    margin-right: 1rem;
                }
                span {
                    font-size: 1.4rem;
                    cursor: pointer;
                }
            }

            .panel-body {
                font-size: 1.3rem;
                padding: 15px;
            }
        }
    }

    .footer {
        bottom: 0px;
        height: 50px;
        left: 0px;
        position: absolute;
        width: 100%;
        background: #f8f8f8;
        border-top: 1px solid #ddd;
    }
}
</style>
