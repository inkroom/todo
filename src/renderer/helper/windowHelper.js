/**
 * 窗口操作方法
 */


function setWindowBounds(win, xOffset) {



    let bounds = win.getBounds()
    bounds.x = bounds.x + xOffset
    console.log('set window bounds', bounds)
    win.setBounds(bounds);

}

/**
 * 从边缘显示当前窗口
 * @param {*} win 窗口
 */
export function showWindow(win, screenWidth) {

    console.log('开始show window')
    return new Promise((resolve, reject) => {

        let windowWidth = win.getSize()[0];
        let i = setInterval(() => {
            let bounds = win.getBounds();
            if (bounds.x < screenWidth - windowWidth) {
                clearInterval(i);
                resolve();
                return;
            }
            setWindowBounds(win, -15);

        }, 5);
    })

}
export function hideWindow(win, screenWidth) {

    console.log('开始show window')
    return new Promise((resolve, reject) => {

        let windowWidth = win.getSize()[0];
        let i = setInterval(() => {
            let bounds = win.getBounds();
            if (bounds.x > screenWidth - 10) {
                clearInterval(i);
                resolve();
                return;
            }
            setWindowBounds(win, 15);

        }, 5);
    })

}
