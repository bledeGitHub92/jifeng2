import initStore from '../store/store';

var store;
initStore.then(data => { store = data; });

function Request({ emitter, detail }) {
    this.state = 'pending';
    this.start = +new Date;
    this.emitter = emitter;
    this.detail = detail;
};
Request.prototype = {
    constructor: Request,
    success() {
        if (this.state === 'pending') {
            this.state = 'success';
            store.commit('request/clearTipTimer');
            store.commit('request/showTipShortly');
            store.commit('request/changeTipScrollTop');
        }
        return this;
    },
}
export default Request;