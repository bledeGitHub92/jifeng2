<template>
    <div @click="hideBackdrop" v-show="backdropState" class="backdrop">
        <slot></slot>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'backdrop',
    computed: {
        ...mapState(['backdropState'])
    },
    methods: {
        ...mapMutations(['changeBackdrop']),
        hideBackdrop() {
            this.changeBackdrop('hide');
        }
    }
}
</script>

<style lang="less" scoped>

.backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);
}
</style>
