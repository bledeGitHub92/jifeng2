export default {
    namespaced: true,
    state: {
        // backdrop
        backdropState: false,
        // event-dialog
        enabledEventDialog: '',
    },
    getters: {},
    mutations: {
        // 改变背景层
        changeBackdrop(state, payload) {
            console.log(payload);
            if (payload === 'show') {
                state.backdropState = true;
            }
            if (payload === 'hide') {
                state.backdropState = false;
            }
        },
        // 改变 enabledEventDialog
        changeEventDialog(state, dialogName) {
            dialogName = typeof dialogName === 'string' ? dialogName : '';
            state.enabledEventDialog = dialogName;
        },
    },
    actions: {},
}