export default {
    namespaced: true,
    state: {
        // contextmenu
        copyValue: '',
        menuLeft: 0,
        menuTop: 0,
        menuState: false,
        menuList: [
            { text: '复制', className: ['copy'] },
            {
                text: '操作', className: '',
                detail: [
                    { text: '发送邮件', className: 'sendMail' },
                    { text: '黑白名单', className: 'bwList' },
                    { text: '添加任务', className: 'addQuest' },
                    { text: '设置任务状态', className: 'setQuest' },
                ],
            },
            {
                text: '查询', className: '',
                detail: [
                    { text: '道具', className: 'queryItem' },
                    { text: '计数器', className: 'queryCounter' },
                    { text: '任务', className: 'queryQuest' },
                    { text: '关卡', className: 'queryScene' },
                    { text: '事件', className: 'queryEvent' },
                ]
            },
        ],
    },
    getters: {},
    mutations: {
        // 更新选择模式
        changeSelectedMode(state, mode) {
            state.selectedMode = mode;
        },
        // 更新 copyValue
        updateCopyValue(state, value) {
            state.copyValue = value
        },
        // 显示 contextmenu
        showMenu(state) {
            state.menuState = true;
        },
        // 隐藏 contextmenu
        hideMenu(state) {
            state.menuState = false;
        },
        // 定位 contextMenu
        setMenuLocation(state, { left, top }) {
            state.menuLeft = left;
            state.menuTop = top;
        },
    },
    actions: {}
}