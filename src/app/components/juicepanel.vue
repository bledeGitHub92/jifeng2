<template>
    <div class="panel-wrapper">
        <div class="panel">
            <div class="panel-title">
                <slot name="tabs"></slot>
                <div class="tool am-fr">
                    <a class="am-icon-angle-up am-icon-sm"></a>
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
}
</script>

<style lang="less" scoped>
.panel-wrapper {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    margin: 30px 5px 0px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

    .panel {
        background: rgb(255, 255, 255);
        border-radius: 3px;

        .panel-title {
            height: 46px;
            border-bottom: 1px solid #e4e4e4;
            background-image: linear-gradient(to bottom, #f7f7f7, #eaeaea);
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
                    background-image: linear-gradient(to bottom, #f3f3f3, #fff);
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
