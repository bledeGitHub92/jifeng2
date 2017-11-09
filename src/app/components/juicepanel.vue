<template>
    <div class="panel-wrapper am-g am-g-collapse">
        <div class="am-u-sm-12">
            <div class="panel">
                <div class="panel-title am-vertical-align">
                    <div class="am-vertical-align-middle">
                        <h6 class="am-fl">{{title}}</h6>
                        <div class="tool am-fr">
                            <span @click="$emit('toolbar',index)" v-for="(btn,index) of actBtn" :key="btn.icon" :class="btn.icon" :title="btn.title"></span>
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
    name: 'JuicePanel',
    props: {
        title: {
            type: String,
            required: true
        },
        actBtn: {
            type: Array,
            required: true
        },
    }
}
</script>

<style lang="less" scoped>
.panel-wrapper {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    margin: 30px auto 0px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

    .panel {
        background: rgb(255, 255, 255);
        border-radius: 3px;

        .panel-title {
            font-size: 0;
            height: 50px;
            border-bottom: 1px dashed rgb(221, 221, 221);
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
