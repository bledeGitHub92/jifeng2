<template>
    <transition-group name="tips" tag="ul" :style="{top:`${top}px`}" class="tips-dropdown am-radius">
        <li v-for="request of list" :key="request.created" :title="request.emitter" class="am-vertical-align">
            <div class="am-vertical-align-middle">
                <span :class="['am-fl',request.state==='pending'?'am-text-secondary':request.state==='success'?'am-text-success':'am-text-warning']">{{request.detail}}</span>
                <span :class="['am-fr','am-badge','am-round',request.state==='pending'?'am-badge-secondary':request.state==='success'?'am-badge-success':'am-badge-warning']">{{request.state==='pending'?'请求中':request.state==='success'?'成功':'失败'}}</span>
            </div>
        </li>
    </transition-group>
</template>

<script>
export default {
    name: 'TipList',
    props: {
        list: { type: Array, required: true },
        top: { type: Number, required: true }
    }
}
</script>

<style lang="less" scoped>
.tips-dropdown {
    margin-top: 0;
    transition: top .3s;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    li {
        transition: all .3s;
        line-height: normal;
        height: 40px;
        color: #333;
        padding: 0 20px;
        padding-left: 30px;
        border-bottom: 1px dashed #ddd;
        background-clip: padding-box;
        cursor: pointer;
        &:hover {
            background-color: #f5f5f5;
        }
        &:last-child {
            border: 0;
        }

        div {
            width: 100%;
            font-size: 14px;
        }
    }
}

.tips-move {
    transition: transform .3s;
}
.tips-enter {
    opacity: 0;
    transform: translateX(-200px);
}
.tips-leave-to {
    opacity: 0;
    transform: translateX(200px);
}
.tips-leave-active {
    width: 100%;
    position: absolute;
}
</style>
