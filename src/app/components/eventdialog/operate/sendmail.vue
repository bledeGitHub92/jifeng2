<template>
    <form name="sendmail" action="#">
        <p>
            <input type="text" placeholder="邮件类型">
        </p>
        <p>
            <input type="text" placeholder="邮件标题">
        </p>
        <p>
            <input type="text" placeholder="邮件内容">
        </p>
    </form>
</template>

<script>
export default {
    name: 'send-mail',

}
</script>

<style lang="less" scoped>
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
