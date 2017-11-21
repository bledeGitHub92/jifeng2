<template>
    <div class="chart-loading am-vertical-align">
        <div class="am-vertical-align-middle">
            <p>
                <span class="am-icon-spinner am-icon-pulse am-icon-md"></span>
            </p>
            <p>
                正在加载，请稍候...
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChartLoading'
}
</script>

<style lang="less" scoped>
.chart-loading {
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
    }

    span {
        display: inline-block;
        color: #0e90d2;
    }
}
</style>
