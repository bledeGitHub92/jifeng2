<template>
    <div class="event-dialog am-vertical-align-middle">
        <div class="event-dialog-head">
            <h4>标题</h4>
            <i class="am-icon-times"></i>
        </div>
        <div class="event-dialog-body">
            <div class="target am-icon-user"> 龙傲天</div>
            <hr>
            <operate-player v-if="operateDialogList.indexOf(enabledEventDialog)!==-1">
                <keep-alive>
                    <component :is="enabledEventDialog"></component>
                </keep-alive>   
            </operate-player>
            <query-detail v-if="queryDialogList.indexOf(enabledEventDialog)!==-1">
                <!-- <component :is="enabledEventDialog"></component> -->
            </query-detail>
        </div>
    </div>
</template>

<script>
import OperatePlayer from './operate/operateplayer.vue';
import SendMail from './operate/sendmail.vue';
import QueryDetail from './query/querydetail.vue';
import QueryItem from './query/queryItem.vue';
import { mapState } from 'vuex';

export default {
    name: 'EventDialog',
    components: {
        OperatePlayer, SendMail,
        QueryDetail, QueryItem
    },
    data() {
        return {
            currentView: 'sendMail',
            operateDialogList: ['sendMail'],
            queryDialogList: ['queryItem']
        }
    },
    computed: {
        ...mapState([
            'enabledEventDialog'
        ]),
    }
}
</script>

<style lang="less" scoped>
.event-dialog {
    text-align: left;
    display: inline-block;
    border: 1px solid #C8CCD3;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .2);
    width: 400px;
    background-color: #fff;
    animation: pop-appear .3s cubic-bezier(.8, .02, .45, .91) forwards;

    .event-dialog-head {
        position: relative;
        top: 0;
        left: 0;
        padding: 12px;
        padding-left: 20px;
        border-bottom: 1px solid #E9EAEB;
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
        padding: 10px 30px;
        font-size: 14px;
    }
}
</style>
