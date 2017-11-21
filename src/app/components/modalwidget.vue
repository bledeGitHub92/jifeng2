<template>
    <!-- TODO: 位置记忆  -->
    <div class="modal-widget">
        <div class="modal-header">
            <span>{{msg.title}}</span>
            <span @click="closeWidget" class="am-icon-times" title="Esc"></span>
        </div>
        <div class="modal-body clearfix">
            <div class="modal-search">
                <slot name="search"></slot>
            </div>
            <div class="modal-content">
                <slot :name="msg.title"></slot>
            </div>
        </div>
        <div class="modal-footer"></div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'ModalWidget',
    props: {
        msg: {
            type: Object,
            required:true,
            validator(value) {
                return typeof value.title === 'string';
            }
        }
    },
    computed: {
        ...mapState(['widgetList']),
    },
    methods: {
        ...mapMutations(['toggleWidget']),
        closeWidget(event) {
            var title = event.target.previousElementSibling.textContent;

            this.toggleWidget(this.widgetList.filter(
                widget => widget.title === title
            )[0]);
        }
    }

}
</script>

<style lang="less" scoped>
.modal-widget {
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;
    position: absolute;
    left: 0px;
    top: 0px;
    min-width: 400px;
    max-width: 400px; // min-height: 400px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    box-shadow: 6px 6px 2px -2px rgba(0, 0, 0, .4);

    .modal-header {
        background-color: #f7f7f7;
        user-select: none;
        height: 40px;
        line-height: 20px;
        border-bottom: 1px solid #e5e5e5;
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

    .modal-body {
        padding: 20px;

        .modal-search {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ddd;
            margin-bottom: 20px;
        } // .modal-content {
        //     overflow: auto;
        // }
    }
}
</style>
