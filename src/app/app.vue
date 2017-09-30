<template>
    <div :style="position" class="jifeng2">
        <side-nav></side-nav>
        <right-slider>
            <top-nav slot="topnav"></top-nav>
            <main-section slot="main-section"></main-section>
        </right-slider>
    </div>
</template>

<script>
import rightSlider from './components/rightslider/rightslider.vue';
import mainSection from './components/mainSection/mainSection.vue';
import sideNav from './components/sidenav/sidenav.vue';
import topNav from './components/topnav/topnav.vue';
import { mapState } from 'vuex';
import 'amazeui/dist/css/amazeui.min.css';

export default {
    name: 'app',
    components: {
        rightSlider, sideNav, topNav,
        mainSection
    },
    computed: {
        ...mapState([
            'siteTranslate'
        ]),
        position() {
            return { transform: `translate(${this.siteTranslate}px)` };
        }
    },
}
</script>

<style lang="less">
html,
body,
.jifeng2 {
    height: 100%;
}

body {
    background: url('./bg.jpg') repeat;
}

ul {
    list-style-type: none;
    padding: 0;
}

.jifeng2 {
    transition: transform .2s;
}
</style>
