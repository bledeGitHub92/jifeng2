<template>
    <div class="juice-content">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'JuiceContent'
}
</script>

<style lang="less" scoped>
.juice-content {
    padding: 0 25px;
}
</style>
