<template>
    <div>
        <side-nav></side-nav>
        <content-block>
            <top-nav slot="topnav"></top-nav>
        </content-block>
    </div>
</template>

<script>
import contentBlock from './components/contentblock/contentblock.vue';
import sideNav from './components/sidenav/sidenav.vue';
import topNav from './components/topnav/topnav.vue';
import 'amazeui/dist/css/amazeui.min.css';

export default {
    name: 'app',
    components: {
        contentBlock, sideNav, topNav
    }
}
</script>

<style lang="less">
body {
    background: url('./bg.jpg') repeat;
}

ul {
    list-style-type: none;
    padding: 0;
}
</style>
