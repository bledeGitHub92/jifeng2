<template>
    <div @click="toggleItem" class="page-filter">
        <div class="filter-header clearfix">
            <div class="filter-options am-fl am-btn-group">
                <button v-for="btn of btns" :class="['am-btn','am-radius',btn.value===currentView?'am-btn-primary':'am-btn.default']" type="button" :key="btn.value">{{btn.text}}</button>
            </div>
            <div class="filter-search am-fr">
                <input v-model="keyword" ref="keyword" type="text" placeholder="搜索" v-focus>
            </div>
        </div>
        <div class="filter-body">
            <ul class="filter-action clearfix">
                <li :class="['invert',{'disabled':isAll}]">反选</li>
                <li :class="['all',{'active':isAll}]">全部</li>
            </ul>
            <ul class="option-list clearfix">
                <li v-for="item of currentList" :class="checked.includes(item.text)?['checked','am-icon-check']:''" :title="item.text" :key="item.text">{{item.text}}</li>
            </ul>
        </div>
        <div class="filter-footer clearfix">
            <button class="am-btn am-btn-primary am-radius confirm">确定</button>
            <button class="am-btn am-btn-default am-radius cancel">取消</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    name: 'PageFilter',
    data() {
        return {
            keyword: '',
            currentView: 'platform',
            backup: [],
            checked: [],
            btns: [
                { text: '平台', value: 'platform' },
                { text: '渠道', value: 'channel' },
                { text: '区服', value: 'server' },
            ],
        }
    },
    computed: {
        ...mapState('dialog', ['backdropState']),
        ...mapState(['platform', 'channel', 'server', 'socket']),
        ...mapGetters('viewStates', ['computedSocketEvents']),
        currentList() {
            this.backup = this[this.currentView];
            return this.backup.filter(({ text }) => text.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1);
        },
        isAll() {
            if (this.checked.length === this[this.currentView].length) {
                this.checked = [];
            }
            return this.checked.length === 0;
        }
    },
    watch: {
        backdropState(state) {
            state && this.$refs.keyword.focus();
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    methods: {
        ...mapMutations('dialog', ['changeBackdrop']),
        ...mapActions('request', ['sendMsg']),
        ...mapActions('viewStates', ['resetAllChart']),
        toggleItem({ target }) {
            var checked = this.checked,
                text = target.textContent,
                index = checked.indexOf(text),
                isBtn = target.nodeName.toLowerCase() === 'button',
                action = target.className,
                type;

            if (target.parentNode.className.indexOf('option-list') !== -1) type = 'check';
            if (isBtn && ['平台', '渠道', '区服'].includes(text)) type = 'type';
            if (['invert', 'all'].includes(action)) type = 'invert';
            if (action.indexOf('confirm') !== -1) type = 'confirm';
            if (action.indexOf('cancel') !== -1) type = 'cancel';

            switch (type) {
                // 列表选择
                case 'check':
                    if (index !== -1) checked.splice(index, 1);
                    else checked.push(text);
                    break;
                // 平台-渠道-区服
                case 'type':
                    this.$refs.keyword.focus();
                    this.keyword = '';
                    this.checked = [];
                    this.currentView = [
                        { text: '平台', id: 'platform' },
                        { text: '渠道', id: 'channel' },
                        { text: '区服', id: 'server' },
                    ].find(item => item.text === text).id;
                    break;
                // 全选-反选
                case 'invert':
                    var obj = {
                        all(list) {
                            return [];
                        },
                        invert(list) {
                            return list.filter(item => !checked.some(checked => checked === item));
                        }
                    };
                    this.checked = obj[action].call(this, this.currentList.map(item => item.text));
                    break;
                // 确定
                case 'confirm':
                    this.resetAllChart();
                    this.sendMsg({ mode: 'socket', eventName: this.computedSocketEvents, detail: '实时概况', loader: 'all' });
                    this.changeBackdrop('hide');
                    break;
                // 取消
                case 'cancel':
                    this.changeBackdrop('hide');
                    break;
            }
        },
    },
    mounted() {
        // this.$refs.keyword.focus();
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
            background-color: #f7f7f7;
            border-bottom: 1px solid #ddd;
            margin: 0;
            padding: 6px 20px;

            .all:active,
            .invert:active {
                top: 1px;
            }
            .all.active {
                color: #0e90d2;
                cursor: default;
                &:active {
                    top: 0;
                }
            }
            .invert.disabled {
                cursor: not-allowed;
                color: #666;
                text-decoration: line-through;
                &:active {
                    top: 0;
                }
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