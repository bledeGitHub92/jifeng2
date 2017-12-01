<template>
    <div class="juice-content">
        <div class="slide-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'JuiceContent'
}
</script>

<style lang="less" scoped>
.juice-content {
    height: 100%;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;

    .slide-wrapper {
        transition: top .2s;
        padding: 30px 25px;
        padding-top: 0;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0
    }
}
</style>
