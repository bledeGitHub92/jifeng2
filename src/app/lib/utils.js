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

export function getParent(elem, selector) {
    var methodName = selector[0] === '.' ? 'searchByClass' : 'searchByTag',
        methods = {
            searchByTag(elem, tagName) {
                while (elem) {
                    if (elem.nodeName.toLowerCase() === tagName) {
                        return elem;
                    } else {
                        elem = elem.parentNode;
                    }
                }
            },
            searchByClass(elem, className) {
                className = className.slice(1);
                while (elem) {
                    if (elem.className && elem.className.indexOf(className) !== -1) {
                        return elem;
                    } else {
                        elem = elem.parentNode;
                    }
                }
            }
        };

    elem = methods[methodName](elem, selector);
    return typeof elem === 'object' ? elem : null;
}

// widget 层叠计数器
export var stackCounter = (function () {
    var counter = 0;

    return {
        increase() {
            return ++counter;
        }
    }
})();