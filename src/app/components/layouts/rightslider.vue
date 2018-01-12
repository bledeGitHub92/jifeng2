<template>
    <div class="right-slider">
        <top-nav></top-nav>
        <juice-body></juice-body>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TopNav from './rightslider/topnav.vue';
import JuiceBody from './rightslider/juicebody.vue';
import { stackCounter } from 'lib/utils';

export default {
    name: 'RightSlider',
    components: {
        TopNav, JuiceBody
    },
}
</script>

<style lang="less" scoped>
.right-slider {
    height: 100%;
    padding-bottom: 75px;
    margin-left: 260px;
    @media (max-width: 640px) {
        margin-left: 50px;
    }
    transition: margin .1s;
}
</style>