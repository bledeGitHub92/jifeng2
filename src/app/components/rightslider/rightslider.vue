<template>
    <div :style="marginLeft" class="right-slider">
        <slot name="topnav"></slot>
        <slot name="juice-body"></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'right-slider',
    computed: {
        ...mapState([
            'contentBlockMarginLeft'
        ]),
        marginLeft() {
            return { marginLeft: this.contentBlockMarginLeft + 'px' };
        }
    }
}
</script>

<style lang="less" scoped>
@media only screen and (max-width: 640px) {
    .right-slider {
        margin-left: 50px !important;
    }
}

.right-slider {
    height: 100%;
    padding-bottom: 75px;
    margin-left: 260px;
    transition: margin .1s;
}
</style>