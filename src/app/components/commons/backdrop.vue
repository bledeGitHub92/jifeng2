<template>
    <transition>
        <div @click="hideBackdrop" v-show="backdropState" class="backdrop am-vertical-align">
            <event-dialog></event-dialog>
        </div>
    </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getParent } from 'lib/utils';
import EventDialog from './backdrop/eventdialog.vue';

export default {
    components: {
        EventDialog
    },
    name: 'BackDrop',
    computed: {
        ...mapState('dialog', ['backdropState'])
    },
    methods: {
        ...mapMutations('dialog', ['changeBackdrop']),
        hideBackdrop(event) {
            var target = event.target;
            if (!getParent(target, '.event-dialog')) {
                this.changeBackdrop('hide');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity .3s;
}

.blur,
.backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, .7);
    text-align: center;
    z-index: 999999999;
    overflow: auto;
}
</style>
