// TODO: 了解 Map 结构
const elems = new WeakMap();

function hideStyle(elem) {
    elem.style.left = '0px';
    elem.style.opacity = 0;
}

function showStyle(elem) {
    elem.style.left = '50px';
    elem.style.opacity = 1;
}

export function showTip(elem, text) {
    if (!elems.has(elem)) {
        var { height, top } = elem.getBoundingClientRect();
        var tooltip = document.createElement('div');

        tooltip.className = 'tool-tip';
        tooltip.style.top = top + 'px';
        tooltip.style.lineHeight = tooltip.style.height = height + 'px';

        text = document.createTextNode(text);
        tooltip.appendChild(text);
        document.body.appendChild(tooltip);

        elems.set(elem, { tooltip });

        setTimeout(() => {
            showStyle(tooltip);
        }, 0);
    } else {
        var { timer, tooltip } = elems.get(elem);

        clearTimeout(timer);
        showStyle(tooltip);
    }
}

export function hideTip(elem) {
    var { timer, tooltip } = elems.get(elem);

    setTimeout(() => {
        hideStyle(tooltip);
    }, 60);

    timer = setTimeout(() => {
        document.body.removeChild(tooltip);
        elems.delete(elem);
    }, 400);

    elems.set(elem, { tooltip, timer });
}