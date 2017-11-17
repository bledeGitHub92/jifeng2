<template>
    <div class="table-wrapper">
        <div class="table-utils clearfix">
            <!-- TODO: 导出按钮样式调整  -->
            <input @keyup="tableFilter" type="text" placeholder="搜索..">
            <span style="float:right;">csv</span>
            <span style="float:right;">excel</span>
        </div>
        <table class="table-widget" @mousedown="selectRow" @contextmenu="showContext" @mousewheel="swipeTable" @DOMMouseScroll="swipeTable" :style="{'left':leftOfTable+'px'}">
            <tr>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
                <th title="战力">战力</th>
            </tr>
            <tr v-for="row of breakList[page]" :key="row.id" :class="{active:selectedPlayers.includes(row)}">
                <td v-for="(col,key) of row" :key="key" :title="col">{{col}}</td>
            </tr>
            <tr v-if="list.length===0">
                <td colspan="21" style="text-align:center">没有相关记录</td>
            </tr>
        </table>
        <div @click="jump" class="pagination am-btn-group am-btn-group-xs">
            <!-- TODO: 分页方式 -->
            <span style="float:left;margin-right:10px;font-size:12px;color:#73879c;margin-top:5px;">
                {{page+1}} / {{breakList.length}}
            </span>
            <button type="button" class="am-btn am-icon-angle-left"></button>
            <button type="button" class="am-btn am-icon-angle-right"></button>
        </div>
    </div>
</template>

<script>
import { getParent } from '../lib/utils';
import list from './juicetable/role.json';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: 'JuiceTable',
    data() {
        return {
            // table
            list,
            page: 0,
            maxRow: 5,
            leftOfTable: 0,
        }
    },
    computed: {
        ...mapState([
            'selectedPlayers'
        ]),
        // 分组后的表格
        breakList() {
            var partOfTable = [],
                list = this.list,
                length = list.length,
                i = 0, maxRow = this.maxRow;

            while (i < length) {
                partOfTable.push(list.slice(i, i + maxRow));
                i += maxRow;
            }
            return partOfTable;
        }
    },
    methods: {
        ...mapMutations([
            'setMenuLocation', 'showMenu',
            'updateCopyValue'
        ]),
        ...mapActions(['togglePlayer']),
        // 选择行
        selectRow(event) {
            // TODO: 取消邮件操作玩家列表
            var target = event.target;
            // 点击表头无效
            if (target.nodeName.toLowerCase() === 'th' || event.button !== 0) { return; }
            var tr = getParent(target, 'tr'),
                table = getParent(tr, 'table'),
                currList = this.breakList[this.page],
                order = Array.from(table.children).indexOf(tr) - 1,
                player = currList[order];

                this.togglePlayer(player);
        },
        // 筛选表格
        tableFilter(event) {
            var value;
            if (event.keyCode === 13) {
                value = event.target.value;
                if (!value) {
                    return this.list = list;
                }
                this.page = 0;
                this.list = this.list.filter(row => {
                    for (let n in row) {
                        if ((row[n] + '').indexOf(value) !== -1) {
                            return true;
                        }
                    }
                });
            }
        },
        // 下一页
        jump(event) {
            var method = event.target.className.indexOf('am-icon-angle-right') !== -1 ? 'next' : 'prev',
                strategy = {
                    next: () => { this.page >= this.breakList.length - 1 ? this.page : this.page += 1; },
                    prev: () => { this.page <= 0 ? 0 : this.page -= 1; }
                };

            strategy[method]();
        },
        // TODO: 优化滑动动画
        swipeTable(event) {
            var wheelDelta = event.wheelDelta || event.detail * -40,
                maxLeft = this.$el.offsetWidth - getParent(event.target, '.table-widget').offsetWidth,
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
        },
        // TODO: 仅在框内显示
        showContext(event) {
            event.preventDefault();

            this.updateCopyValue(event.target.title);
            this.showMenu();
            this.setMenuLocation({
                left: event.pageX,
                top: event.pageY
            });
        },
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
    width: 100%;
    top: 0;
    left: 0;
    transition: left .3s;

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr.active {
        background-color: #389CFF;
        color: #fff;
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
</style>
