<template>
    <div @mousewheel="scrollHandler" @DOMMouseScroll="scrollHandler" class="scroll-wrapper" :style="{height:`${height}px`}">
        <slot :top="top"></slot>
    </div>
</template>

<script>
export default {
    name: 'ScrollWrapper',
    props: {
        height: { type: String, required: true }
    },
    data() {
        return {
            top: 0
        }
    },
    methods: {
        scrollHandler({ target, wheelDelta, detail }) {
            var delta = wheelDelta || detail * -40,
                ref = this.$el,
                wrapper = ref.firstElementChild,
                minTop = ref.offsetHeight + 1 - wrapper.offsetHeight,
                prev = parseInt(wrapper.style.top),
                next = (prev || 0) + delta / 2;

            if (minTop < 0) {
                this.top = next >= 0 ? 0 : next < minTop ? minTop : next;
            } else if (prev < 0 && delta > 0) {
                this.top = next > 0 ? 0 : next;
            }
            console.log(prev, next)
        }
    },
}
</script>

<style lang="less" scoped>
.scroll-wrapper {
}
</style>
