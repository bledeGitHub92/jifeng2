<template>
    <transition>
        <div v-show="isLoad" class="chart-loading am-vertical-align">
            <div class="am-vertical-align-middle">
                <p>
                    <span class="am-icon-spinner am-icon-pulse am-icon-md"></span>
                </p>
                <p>
                    正在加载，请稍候...
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ChartLoading',
    props: {
        isLoad: { type: Boolean, required: true }
    }
}
</script>

<style lang="less" scoped>
.v-enter, .v-leave-to {
    opacity: 0;
}
.v-enter-active,.v-leave-active {
    transition: opacity .3s;
}

.chart-loading {
    border-radius: 3px;
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;

    div {
        width: 100%;
    }

    p {
        text-align: center;
        color: #333;
        font-size: 13px;
        margin: 0;
        &:first-child {
            margin-bottom: 6px;
        }
    }

    span {
        display: inline-block;
        color: #0e90d2;
    }
}
</style>
