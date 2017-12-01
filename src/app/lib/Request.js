function Request({ emitter, detail }) {
    this.state = 'pending';
    this.time = +new Date;
    this.emitter = emitter;
    this.detail = detail;
};
Request.prototype = {
    constructor: Request,
    success() {
        this.state = 'success';
    }
}

export default Request;