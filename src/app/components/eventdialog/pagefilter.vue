<template>
    <div @click="toggleItem" class="page-filter">
        <div class="filter-header clearfix">
            <div class="filter-options am-fl am-btn-group">
                <button v-for="btn of btns" :class="['am-btn','am-radius',btn.value===currentView?'am-btn-primary':'am-btn.default']" type="button" :key="btn.value">{{btn.text}}</button>
            </div>
            <div class="filter-search am-fr">
                <input v-model="keyword" ref="keyword" type="text" placeholder="搜索">
            </div>
        </div>
        <div class="filter-body">
            <ul class="filter-action clearfix">
                <li class="invert">反选</li>
                <li class="all">全选</li>
            </ul>
            <ul class="option-list clearfix">
                <li v-for="item of currentList" :class="checked.includes(item.text)?['checked','am-icon-check']:''" :title="item.text" :key="item.text">{{item.text}}</li>
            </ul>
        </div>
        <div class="filter-footer clearfix">
            <button class="am-btn am-btn-primary am-radius confim">确定</button>
            <button class="am-btn am-btn-default am-radius cancel">取消</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PageFilter',
    data() {
        return {
            keyword: '',
            currentView: 'platform',
            backup: [],
            checked: [],
            platform: [
                { text: '越狱' },
                { text: '安卓' },
                { text: '乐游' },
                { text: 'IOS正版' },
                { text: '大麦BT' },
                { text: 'C游BT' },
                { text: '新马' },
                { text: '韩服' },
                { text: '185sy' },
            ],
            channel: [
                { text: '至趣' },
                { text: '妖火' },
                { text: '掌游' },
                { text: '圈圈' },
                { text: '墨仙' },
                { text: '汉风' },
                { text: '果盘' },
                { text: '悦动' },
            ],
            server: [
                { text: '越狱1服' },
                { text: '越狱2服' },
                { text: '越狱3服' },
                { text: '越狱4服' },
                { text: '越狱5服' },
                { text: '越狱6服' },
                { text: '安卓1服' },
                { text: '安卓2服' },
                { text: '安卓3服' },
                { text: '安卓4服' },
                { text: '安卓5服' },
                { text: '安卓6服' },
                { text: '苹果1服' },
                { text: '苹果2服' },
                { text: '苹果3服' },
                { text: '苹果4服' },
                { text: '苹果5服' },
                { text: '苹果6服' },
            ],
            btns: [
                { text: '平台', value: 'platform' },
                { text: '渠道', value: 'channel' },
                { text: '区服', value: 'server' },
            ],
        }
    },
    computed: {
        ...mapState(['backdropState']),
        currentList() {
            this.backup = this[this.currentView];
            return this.backup.filter(({ text }) => text.indexOf(this.keyword) !== -1);
        }
    },
    watch: {
        backdropState(state) {
            state && this.$refs.keyword.focus();
        }
    },
    methods: {
        toggleItem({ target }) {
            var checked = this.checked,
                text = target.textContent,
                index = checked.indexOf(text),
                isBtn = target.nodeName.toLowerCase() === 'button',
                action = target.className,
                cat;

            if (target.parentNode.className.indexOf('option-list') !== -1) cat = 'checked';
            if (isBtn && ['平台', '渠道', '区服'].includes(text)) cat = 'btn';
            if (['invert', 'all'].includes(action)) cat = 'invert';

            switch (cat) {
                // 列表选择
                case 'checked':
                    if (index !== -1) checked.splice(index, 1);
                    else checked.push(text);
                    break;
                // 平台-渠道-区服
                case 'btn':
                    this.$refs.keyword.focus();
                    this.keyword = '';
                    this.checked = [];
                    this.currentView = [
                        { text: '平台', id: 'platform' },
                        { text: '渠道', id: 'channel' },
                        { text: '区服', id: 'server' },
                    ].filter(item => item.text === text)[0].id;
                    break;
                // 全选-反选
                case 'invert':
                    var obj = {
                        all(list) {
                            return list;
                        },
                        invert(list) {
                            return list.filter(item => !checked.some(checked => checked === item));
                        }
                    };
                    this.checked = obj[action].call(this, this.currentList.map(item => item.text));
                    break;
            }
        },
    },
    mounted() {
        this.$refs.keyword.focus();
    },
}
</script>

<style lang="less" scoped>
.page-filter {

    .filter-header {
        padding: 12px 20px;
        border-bottom: 1px solid #ddd;
        .filter-options {
            vertical-align: text-bottom;
            button {
                height: 32px;
                font-size: 14px;
            }
        }

        .filter-search {
            input {
                padding: 2px 10px;
                width: 100px;
                height: 28px;
                margin-top: 2px;
                font-size: 14px;
            }
        }
    }

    .filter-body {
        .filter-action {
            background-color: #f0f0f0;
            border-bottom: 1px solid #ddd;
            margin: 0;
            padding: 6px 20px;

            .all:active,
            .invert:active {
                top: 1px;
            }

            li {
                position: relative;
                top: 0;
                left: 0;
                float: right;
                cursor: pointer;
                margin-left: 10px;

                &:hover {
                    color: #0e90d2;
                }
            }
        }
        .option-list {
            margin: 0;
            height: 200px;
            overflow: auto;

            li {
                position: relative;
                top: 0;
                left: 0;
                float: left;
                width: 100/3%;
                height: 34px;
                line-height: 34px;
                text-align: left;
                padding-left: 36px;
                padding-right: 26px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;

                &::before {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 14px;
                }

                &:hover {
                    background-color: #0e90d2;
                    color: #fff;
                }

                &.checked {
                    background-color: #fff;
                    color: #0e90d2;
                }
            }
        }
    }

    .filter-footer {
        padding: 10px 20px;
        background-color: #f7f7f7;
        border-top: 1px solid #ddd;
        button {
            margin-left: 10px;
            float: right;
            font-size: 14px;
        }
    }
}
</style>
