<template>
    <div class="table-wrapper">
        <div class="table-utils clearfix">
            <!-- TODO: 导出按钮样式调整  -->
            <input @keyup="tableFilter" type="text" placeholder="搜索..">
            <span style="float:right;">csv</span>
            <span style="float:right;">excel</span>
        </div>
        <table class="table-widget" @contextmenu="contextmenu" @mousewheel="swipeTable" @DOMMouseScroll="swipeTable" :style="{'left':leftOfTable+'px'}">
            <tr v-for="row of breakList[activePage]" :key="row.id">
                <td v-for="(col,key) of row" :key="key" :title="col">{{col}}</td>
            </tr>
        </table>
        <div @click="jump" class="pagination am-btn-group am-btn-group-xs">
            <!-- TODO: 分页方式 -->
            <span style="float:left;margin-right:10px;font-size:12px;color:#73879c;margin-top:5px;">
                {{activePage+1}} / {{breakList.length}}
            </span>
            <button type="button" class="am-btn am-icon-angle-left"></button>
            <button type="button" class="am-btn am-icon-angle-right"></button>
        </div>
        <ul v-show="stateOfContextmenu" :style="contextPos" class="contextmenu">
            <li class="copyBtn">复制</li>
        </ul>
    </div>
</template>

<script>
import { getElem } from '../lib/utils';
import list from './role.json';
import Clipboard from 'clipboard';

export default {
    name: 'juice-table',
    data() {
        return {
            list,
            leftOfTable: 0,
            activePage: 0,
            // contextmenu
            leftOfContextmenu: 0,
            topOfContextmenu: 0,
            stateOfContextmenu: false,
            copyValue: ''
        }
    },
    computed: {
        // context 的位置
        contextPos() {
            return {
                left: this.leftOfContextmenu + 'px',
                top: this.topOfContextmenu + 'px'
            };
        },
        // 分组后的表格
        breakList() {
            var ret = [],
                list = this.list,
                length = list.length,
                i = 0, step = 5;

            while (i <= length) {
                ret.push(list.slice(i, i + step));
                i += step;
            }
            return ret;
        }
    },
    mounted() {
        var ctx = this;

        // 点击 table 外的区域关闭 contextmenu
        document.addEventListener('click', this.hideContext, false);

        var clipboard = this.clipboard = new Clipboard('.copyBtn', {
            text(trigger) {
                return ctx.copyValue;
            }
        });
        // TODO: 复制成功后的提示
        clipboard.on('success', function(e) {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);

            ctx.stateOfContextmenu = false;
            e.clearSelection();
        });
        clipboard.on('error', function(e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });
    },
    beforeDestroy() {
        this.clipboard.destroy();
        document.removeEventListener('click', this.hideContext, false);
    },
    methods: {
        // 筛选表格
        tableFilter(event) {
            var value = event.target.value;
            if (!value) {
                return this.list = list;
            }
            if (event.keyCode === 13) {
                this.activePage = 0;
                this.list = this.list.filter(row => {
                    for (let n in row) {
                        if ((row[n] + '').indexOf(value) !== -1) {
                            return true;
                        }
                    }
                });
            }
        },
        // TODO: 仅在框内显示
        contextmenu(event) {
            var widget = getElem(event.target, 'modal-widget');

            this.copyValue = event.target.title;
            this.stateOfContextmenu = true;
            this.leftOfContextmenu = event.pageX - widget.offsetLeft;
            this.topOfContextmenu = event.pageY - widget.offsetTop;
        },
        hideContext(event) {
            var isCopyBtn = getElem(event.target, 'copyBtn');
            if (!isCopyBtn) {
                this.stateOfContextmenu = false;
            }
        },
        // 下一页
        jump(event) {
            var method = event.target.className.indexOf('am-icon-angle-right') !== -1 ? 'next' : 'prev',
                strategy = {
                    next: () => { this.activePage >= this.breakList.length - 1 ? this.activePage : this.activePage += 1; },
                    prev: () => { this.activePage <= 0 ? 0 : this.activePage -= 1; }
                };

            strategy[method]();
        },
        // TODO: 优化滑动动画
        swipeTable(event) {
            var wheelDelta = event.wheelDelta || event.detail * -40,
                maxLeft = this.$el.offsetWidth - getElem(event.target, 'table-widget').offsetWidth,
                multiple = Math.abs(wheelDelta) / 120,
                step = 30 * multiple;

            if (wheelDelta < 0) {
                this.leftOfTable -= step;
                if (this.leftOfTable < maxLeft) {
                    this.leftOfTable = maxLeft;
                }
            } else {
                this.leftOfTable += step;
                if (this.leftOfTable > 0) {
                    this.leftOfTable = 0;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.table-wrapper {
    overflow: hidden;
}

table {
    user-select: none;
    color: #73879c;
    font-size: 13px;
    position: relative;
    top: 0;
    left: 0;
    transition: left .3s;

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    & th,
    & td {
        border: 1px solid #ddd;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border: 1px solid #ddd;
        padding: 8px;
        max-width: 100px;
        min-width: 60px;
        cursor: default;
    }
    th {
        border-bottom-width: 2px;
    }

    td {
        text-align: right;
    }
}

.table-utils {
    font-size: 12px;
    margin-bottom: 4px;

    input {
        padding: 3px 8px;
        width: 100px; // float: right;
    }
}

.pagination {
    float: right;
    margin-top: 10px;
}

.contextmenu {
    user-select: none;
    color: #333;
    margin: 0;
    width: 140px;
    background-color: #fff;
    font-size: 13px;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.5);

    li {
        &:hover {
            background-color: #e5e5e5;
        }
        height: 24px;
        line-height: 24px;
        cursor: default;
        padding-left: 20px;
    }
}
</style>
