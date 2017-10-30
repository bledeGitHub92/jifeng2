<template>
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
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'juice-panel',
}
</script>

<style lang="less" scoped>
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
</style>
