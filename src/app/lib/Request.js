import initStore from '../store/store';

var state, commit;
initStore.then(store => { ({ state, commit } = store); });

function Request({ emitter, detail }) {
    this.state = 'pending';
    this.created = +new Date;
    this.emitter = emitter;
    this.detail = detail;
    this.prev = state.request.tipQueue[0] || null;
    if (this.prev) {
        this.preprocess();
    }
    commit('request/showGraphLoading');
};
Request.prototype = {
    constructor: Request,
    success() {
        if (this.state === 'pending') {
            this.state = 'success';
            commit('request/clearTipTimer');
            commit('request/showTipShortly');
            commit('request/changeTipScrollTop');
            commit('request/hideGraphLoading');
        }
        return this;
    },
    preprocess() {
        if (this.prev.state === 'pending') {
            commit('request/shiftRequest');
        }
    },
}
export default Request;