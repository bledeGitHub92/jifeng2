// TODO: 结合 jquery 优化 animate.js

var createTime = function () {
    return (+new Date);
}

// 缓动算法
var easing = {
    swing(time) {
        return 0.5 - Math.cos(time * Math.PI) / 2;
    }
}

var swap = function (elem, options, callback, args) {
    var ret, name,
        old = {};

    // Remember the old values, and insert the new ones
    for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
    }

    ret = callback.apply(elem, args || []);

    // Revert the old values
    for (name in options) {
        elem.style[name] = old[name];
    }

    return ret;
};

// 计数器
var timer = 0;

// flags
var progressing = false;

var cssShow = { position: "absolute", visibility: "hidden", display: "block" };

export default function animate(elem, options) {
    if (progressing === true) { return; }

    progressing = true;

    var computedStyle = getComputedStyle ? getComputedStyle(elem) : elem.currentStyle,
        startProp = parseFloat(computedStyle.height),    //元素初始化位置
        endProp = 0,    //元素终点位置
        duration = 200,    //动画运行时间
        startTime = createTime();    //动画开始时间

    if (computedStyle.display === 'none' && (!elem.getClientRects().length || !elem.getBoundingClientRect().width)) {
        swap(elem, cssShow, function () {
            startProp = 0;
            endProp = parseFloat(computedStyle['height']);
        });
    }

    function tick() {
        //每次变化的时间
        var remaining = Math.max(0, duration - (createTime() - startTime))
        var temp = remaining / duration || 0;
        temp = easing.swing(temp);
        var percent = 1 - temp;

        //最终每次移动的距离
        var direction = endProp - startProp;
        if (direction > 0) {
            elem.style.display = 'block';
        }
        var dist = direction * percent + startProp;
        elem.style['height'] = dist + 'px';

        if (percent === 1) {
            if (direction < 0) {
                elem.style = 'display:none';
            }
            clearInterval(timer);
            progressing = false;
        }
    }

    //开始执行动画
    timer = setInterval(tick, 16);
}