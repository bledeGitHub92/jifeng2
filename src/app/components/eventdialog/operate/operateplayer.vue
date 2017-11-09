<template>
    <div class="operate-player">
        <slot></slot>
        <hr>
        <p>
            <button class="am-btn am-btn-primary" type="button">确认</button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'OperatePlayer',

}
</script>

<style lang="less" scoped>
button {
    width: 100%;
}
</style>
