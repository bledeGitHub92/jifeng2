<template>
    <div class="sendmail">
        <selected-player></selected-player>
        <form name="sendmail" action="#">
            <p>
                <input class="am-radius" type="text" placeholder="邮件类型">
            </p>
            <p>
                <input class="am-radius" type="text" placeholder="邮件标题">
            </p>
            <p>
                <input class="am-radius" type="text" placeholder="邮件内容">
            </p>
        </form>
        <div class="sendmail-footer clearfix">
            <button class="am-btn am-radius am-btn-primary am-fr" type="button">确认</button>
            <button class="am-btn am-radius am-btn-default am-fr" type="button">取消</button>
        </div>
    </div>
</template>

<script>
import SelectedPlayer from '../selectedplayer.vue';

export default {
    name: 'SendMail',
    components: {
        SelectedPlayer
    }
}
</script>

<style lang="less" scoped>
form[name="sendmail"] {
    padding: 0 20px;
}

.sendmail-footer {
    padding: 10px 20px;
    background-color: #f7f7f7;
    border-top: 1px solid #ddd;
    button {
        font-size: 14px;
        margin-left: 10px;
    }
}

p {
    color: #666;
}

label {
    font-weight: normal;
    margin: 0;
}

input {
    border: 1px solid #bbb;
    width: 100%;
    padding: 10px;
    padding-left: 38px;
    padding-right: 50px;

    &:focus {
        border-color: #0e90d2;
    }
}
</style>
