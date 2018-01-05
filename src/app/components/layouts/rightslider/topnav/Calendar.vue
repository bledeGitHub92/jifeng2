<template>
    <div class="topnav-left am-vertical-align am-u-sm-6 am-u-md-6 am-u-lg-5">
        <div class="am-vertical-align-middle">
            <ul class="am-hide-md-down calendar">
                <li class="icon am-icon-calendar"></li>
                <li>{{calendar.date}}</li>
            </ul>
            <ul class="digital-clock">
                <li class="icon am-icon-clock-o"></li>
                <li>{{calendar.hour}}</li>
                <li>:</li>
                <li>{{calendar.minute}}</li>
                <li>:</li>
                <li>{{calendar.second}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'calendar',
    data() {
        return {
            calendar: this.getDate(),
        }
    },
    methods: {
        getDate() {
            var date = new Date(),
                year = date.getFullYear(),
                month = (date.getMonth() + 1).toString().padStart(2, 0),
                day = date.getDate().toString().padStart(2, 0),
                week = date.getDay(),
                hour = date.getHours().toString().padStart(2, 0),
                minute = date.getMinutes().toString().padStart(2, 0),
                second = date.getSeconds().toString().padStart(2, 0),
                weekMap = [, '一', '二', '三', '四', '五', '六', '天'];

            var times = {
                date: year + ' / ' + month + ' / ' + day + '，星期' + weekMap[week],
                hour, minute, second
            };

            this.calendar = times;
            this.$nextTick(() => {
                setTimeout(this.getDate, 500);
            });

            return times;
        },
    }
}
</script>

<style lang="less" scoped>
.topnav-left {
    height: 40px;
    text-align: center;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);

    &>div {
        font-size: 0;
    }

    ul {
        margin: 0;
        font-size: 13px;
        display: inline-block;

        li.icon {
            margin-right: 5px;
        }

        li {
            display: inline;
        }
    }

    .calendar {
        border-right: 1px solid rgba(0, 0, 0, 0.4);
        box-shadow: 1px 0 0 rgba(255, 255, 255, 0.1);
        padding-right: 15px;
        margin-right: 15px;
    }
}
</style>
