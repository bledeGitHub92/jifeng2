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

.tool-tip {
    &::after {
        content: '';
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        left: -8px;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-right: 8px solid #252d3b;
        width: 0;
        height: 0;
        display: block;
        z-index: -1;
    }

    position: absolute;
    padding: 0 15px;
    border-radius: 0 4px 4px 0;
    color: #fff;
    background-color: #252d3b;
    height: 48px;
    top: 0;
    left: -40px;
    opacity: 0;
    transition: left .35s cubic-bezier(0.175, 0.885, 0.320, 1.15), opacity .35s;
    font-size: 13px;
    pointer-events: none;
    z-index: 99999;
}
</style>
