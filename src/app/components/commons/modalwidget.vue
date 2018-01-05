<template>
    <div class="modal-widget">
        <div class="modal-header">
            <span>{{msg.alias}}</span>
            <span @click="closeWidget" class="am-icon-times" title="Esc"></span>
        </div>
        <div class="modal-body clearfix">
            <component :is="'PlayerModal'"></component>
        </div>
        <div class="modal-footer"></div>
    </div>
</template>

<script>
import PlayerModal from './modalwidget/playermodal.vue';
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'ModalWidget',
    components: {
        PlayerModal
    },
    props: {
        msg: {
            type: Object,
            required: true,
            validator(value) {
                return typeof value.alias === 'string';
            }
        }
    },
    computed: {
        ...mapState('widget', ['widgetList']),
    },
    methods: {
        ...mapMutations('widget', ['toggleWidget']),
        closeWidget(event) {
            var title = event.target.previousElementSibling.textContent;

            this.toggleWidget(this.widgetList.find(
                widget => widget.alias === title
            ));
        }
    }

}
</script>

<style lang="less" scoped>
.modal-widget {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    position: fixed;
    left: 0px;
    top: 0px;
    min-width: 400px;
    max-width: 400px; // min-height: 400px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 6px 6px 2px -2px rgba(14,144,210, .4);

    .modal-header {
        background-color: #f7f7f7;
        user-select: none;
        height: 40px;
        line-height: 20px;
        border-bottom: 1px solid #ddd;
        padding: 10px 15px;
        cursor: all-scroll;

        span {
            float: left;
            color: #333;
            font-size: 14px;
        }

        span:last-child {
            color: #bbb;
            &:hover {
                color: #db4437;
            }
            cursor: pointer;
            float: right;
        }
    }
}
</style>
