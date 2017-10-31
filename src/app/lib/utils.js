export function swap(elem) {
    var ret, name, old = {},
        cssShow = { position: "absolute", visibility: "hidden", display: "block" };

    // Remember the old values, and insert the new ones
    for (name in cssShow) {
        old[name] = elem.style[name];
        elem.style[name] = cssShow[name];
    }

    ret = elem.getBoundingClientRect();

    // Revert the old values
    for (name in cssShow) {
        elem.style[name] = old[name];
    }

    return ret;
};

export function getDisplay(dom) {
    return getComputedStyle(dom).display === 'none' && (!dom.getClientRects().length || !dom.getBoundingClientRect().width);
}

export function getElem(elem, className) {
    while (elem) {
        if (!elem.className || elem.className.indexOf(className) === -1) {
            elem = elem.parentNode;
        } else {
            break;
        }
    }
    return elem = typeof elem === 'object' ? elem : null;
}

// widget 层叠计数器
export var stackCounter = (function() {
    var counter = 0;

    return {
        increase() {
            return ++counter;
        }
    }
})();