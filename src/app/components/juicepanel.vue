<template>
    <div class="panel-wrapper">
        <div class="panel">
            <div class="panel-title">
                <slot name="tabs"></slot>
                <div class="tool am-fr">
                    <a @click="$emit('toggleChart')" :class="['am-icon-sm', chartState?'am-icon-angle-up':'am-icon-angle-down active']"></a>
                </div>
            </div>
            <div class="panel-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JuicePanel',
    props: {
        chartState: {
            type: Boolean,
            required:true
        }
    }
}
</script>

<style lang="less" scoped>
.panel-wrapper {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    margin: 30px 5px 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

    .panel {
        background: rgb(255, 255, 255);
        border-radius: 3px;

        .panel-title {
            height: 46px;
            border-bottom: 1px solid #e4e4e4;
            background-color: #f7f7f7;
        }

        .tool {
            a {
                display: inline-block;
                width: 45px;
                height: 45px;
                line-height: 45px;
                vertical-align: middle;
                text-align: center;
                border-left: 1px solid #e4e4e4;
                cursor: pointer;

                &:hover {
                    background-color: #fff;
                }
                &.active {
                    background-color: #fff;
                }
            }
        }

        .panel-body {
            font-size: 13px;
            padding: 15px;
        }
    }
}
</style>
