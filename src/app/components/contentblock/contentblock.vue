<template>
    <div class="content-block">
        <slot name="topnav"></slot>
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    name: 'contentblock'
}
</script>

<style lang="less" scoped>
.content-block {
    margin-left: 260px;
    min-height: 1680px;
}
</style>
