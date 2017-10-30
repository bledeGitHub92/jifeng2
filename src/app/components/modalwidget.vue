<template>
    <div class="modal-widget">
        <div class="modal-header">
            <span>{{msg.title}}</span>
            <span @click="closeWidget" class="am-icon-times"></span>
        </div>
        <div class="modal-body clearfix">
            <div class="modal-filter">
                <slot name="filter"></slot>
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
import { getElem } from '../lib/utils';

export default {
    name: 'modal-widget',
    props: ['msg'],
    computed: {
        ...mapState(['widgetList']),
    },
    methods: {
        ...mapMutations(['toggleWidget']),
        closeWidget(e) {
            var title = e.target.previousElementSibling.textContent;

            this.toggleWidget(this.widgetList.filter(
                widget => widget.title === title
            )[0]);
        }
    }

}
</script>

<style lang="less" scoped>
.modal-widget {
    position: absolute;
    left: 0px;
    top: 0px;
    min-width: 400px;
    max-width: 400px;
    // min-height: 400px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    box-shadow: 6px 6px 2px rgba(0, 0, 0, .5);

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

        .modal-filter {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ddd;
            margin-bottom: 20px;
        }

        // .modal-content {
        //     overflow: auto;
        // }
    }
}
</style>
