<template>
    <div class="event-dialog am-vertical-align-middle">
        <div class="event-dialog-head">
            <h4>标题</h4>
            <i class="am-icon-times"></i>
        </div>
        <div class="event-dialog-body">
            <div class="target am-icon-user"> 龙傲天</div>
            <hr>
            <operate-player>
                <send-mail></send-mail>
            </operate-player>
            <!-- <query-detail>

                </query-detail> -->
        </div>
    </div>
</template>

<script>
import sendMail from './operate/sendmail.vue';
import operatePlayer from './operate/operateplayer.vue';
import queryDetail from './query/querydetail.vue';


export default {
    name: 'event-dialog',
    components: {
        operatePlayer, queryDetail,
        sendMail
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
