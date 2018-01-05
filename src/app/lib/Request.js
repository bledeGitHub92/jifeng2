var state, commit;

import('../store/store').then(initStore => {
    initStore.default.then(store => { ({ state, commit } = store); });
});

class Request {
    constructor({ emitter, detail, recordable }) {
        this.state = 'pending';
        this.created = +new Date;
        this.emitter = emitter;
        this.detail = detail;
        if (recordable) {
            this.prev = state.request.recordableQueue[0] || null;
            this.recordable = recordable;
        } else {
            this.prev = state.request.tipQueue[0] || null;
        }
        if (this.prev) {
            this.preprocess();
        }
    }

    success() {
        if (this.state === 'pending') {
            this.state = 'success';
            commit('request/clearTipTimer');
            commit('request/showTipShortly');
            commit('request/changeTipScrollTop');
            commit('request/hideGraphLoading');
        }
        return this;
    }

    preprocess() {
        if (this.prev.state === 'pending') {
            if (this.recordable) {
                commit('request/shiftRecord');
            } else {
                commit('request/shiftRequest');
            }
        }
    }
}
export default Request;