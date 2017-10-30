// TODO: 结合 jquery 优化 animate.js

import { swap, getDisplay } from './utils';

// 缓动算法
var easing = {
    swing(time) {
        return 0.5 - Math.cos(time * Math.PI) / 2;
    }
}

function Animate() {}

Animate.prototype = {
    constructor: Animate,
    start(dom, prop, duration) {
        return new Promise(resolve => {
            var startPos, endPos, dist,
                startTime = createTime();

            if (getDisplay(dom)) {
                startPos = 0;
                endPos = swap(dom)[prop];
            } else {
                startPos = dom.getBoundingClientRect()[prop];
                endPos = 0;
            }

            dist = endPos - startPos;

            if (dist > 0) { dom.style.display = 'block'; }

            tick();

            function tick() {
                //每次变化的时间
                var remaining = Math.max(0, duration - (createTime() - startTime)),
                    percent = 1 - easing.swing(remaining / duration || 0),
                    step = dist * percent + startPos;

                dom.style[prop] = step + 'px';

                if (percent === 1) {
                    resolve(dist > 0);
                    if (dist < 0) { dom.style = 'display:none'; }
                } else {
                    return setTimeout(tick, 16)
                }
            }
        });
    }
};

function createTime() {
    return +new Date;
}

export default Animate;