import { getParent, stackCounter } from './utils';

var DragDrop = function () {
    var dragging = null,
        diffX = 0, diffY = 0,
        elemWidth = 0,
        elemHeight = 0,
        left, top;

    function handleEvent(event) {
        var target = event.target,
            docHeight = document.documentElement.clientHeight,
            docWidth = document.documentElement.clientWidth;

        function limit(num, min, max) {
            if (num < min) { num = min; }
            if (num > max) { num = max; }
            return num;
        }

        //确定事件类型
        switch (event.type) {
            case "mousedown":
                // 点击整个 widget 递增 z-index
                if (dragging = getParent(target, '.modal-widget')) {
                    dragging.style.zIndex = stackCounter.increase();
                }
                // 点击 modal-header 移动 widget
                if (dragging = getParent(getParent(target, '.modal-header'), '.modal-widget')) {
                    diffX = event.clientX - dragging.offsetLeft;
                    diffY = event.clientY - dragging.offsetTop;
                    elemWidth = dragging.offsetWidth;
                    elemHeight = dragging.offsetHeight;
                }
                // 拖动关闭按钮无效
                if (getParent(target, '.am-icon-times')) {
                    dragging = null;
                }
                break;
            case "mousemove":
                if (dragging !== null) {
                    event.preventDefault();
                    left = limit(event.clientX - diffX, 0, docWidth - elemWidth);
                    top = limit(event.clientY - diffY, 0, docHeight - 42);
                    // 指定位置
                    dragging.style.left = left + 'px';
                    dragging.style.top = top + 'px';
                }
                break;
            case "mouseup":
                if (dragging) {
                    localStorage.setItem(dragging.id, JSON.stringify({ left, top }));
                }
                dragging = null;
                break;
        }
    };
    //公共接口
    return {
        enable: function () {
            document.addEventListener("mousedown", handleEvent);
            document.addEventListener("mousemove", handleEvent);
            document.addEventListener("mouseup", handleEvent);
        },
        disable: function () {
            document.removeEventListener("mousedown", handleEvent);
            document.removeEventListener("mousemove", handleEvent);
            document.removeEventListener("mouseup", handleEvent);
        }
    }
}();

export default DragDrop;