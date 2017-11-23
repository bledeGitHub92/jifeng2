<template>
    <form name="sendmail" action="#">
        <selected-player></selected-player>
        <hr>
        <p>
            <input type="text" placeholder="邮件类型">
        </p>
        <p>
            <input type="text" placeholder="邮件标题">
        </p>
        <p>
            <input type="text" placeholder="邮件内容">
        </p>
        <p class="clearfix">
            <button class="am-btn am-radius am-btn-primary am-fr" type="button">确认</button>
        </p>
    </form>
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
form {
    padding: 20px;
    padding-bottom: 0;
}

p {
    color: #666;
}

label {
    font-weight: normal;
    margin: 0;
}

input {
    border: 1px solid #ddd;
    width: 100%;
    padding: 10px;
    padding-left: 38px;
    padding-right: 50px;
}
</style>
