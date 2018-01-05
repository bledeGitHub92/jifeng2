<template>
    <div class="event-dialog am-vertical-align-middle">
        <div class="event-dialog-header">
            <h4>标题</h4>
            <i class="am-icon-times"></i>
        </div>
        <div class="event-dialog-body">
            <keep-alive>
                <component :is="enabledEventDialog"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import SendMail from './eventdialog/operate/sendmail.vue';
import QueryItem from './eventdialog/query/queryItem.vue';
import PageFilter from './eventdialog/pagefilter.vue';
import { mapState } from 'vuex';

export default {
    name: 'EventDialog',
    components: {
        SendMail, QueryItem, PageFilter
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState('dialog', ['enabledEventDialog']),
    },
}
</script>

<style lang="less" scoped>
.event-dialog {
    user-select: none;
    text-align: left;
    display: inline-block;
    border: 1px solid #C8CCD3;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
    width: 400px;
    background-color: #fff;
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;

    .event-dialog-header {
        position: relative;
        top: 0;
        left: 0;
        padding: 7px;
        padding-left: 20px;
        border-bottom: 1px solid #ddd;
        background-color: #f7f7f7;

        h4 {
            margin: 0;
            text-align: left;
            font-size: 16px;
            font-weight: normal;
            color: #020202;
        }
        i {
            &:hover {
                color: #db4437;
            }
            cursor: pointer;
            position: absolute;
            text-align: center;
            color: #bbb;
            width: 26px;
            height: 26px;
            top: 50%;
            margin-top: -14px;
            right: 12px;
        }
    }

    .event-dialog-body {
        font-size: 14px;
    }
}
</style>
