export default {
    namespaced: true,
    state: {
        // modal-widget list
        widgetList: [],
    },
    getters: {},
    mutations: {
        // 切换 modal-widget
        toggleWidget(state, widget) {
            var index = state.widgetList.indexOf(widget);
            if (index !== -1) {
                state.widgetList.splice(index, 1);
            } else {
                state.widgetList.push(widget);
            }
        },
        // 清空 modal-widget
        clearWidgetList(state) {
            state.widgetList = [];
        },
    },
    actions: {},
}