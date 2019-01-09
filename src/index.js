// const electron = require('electron');

const {
    app,
    BrowserWindow
} = require('electron');
const path = require('path');


/*
  作者：苏南大叔
来源：https://newsn.net/say/electron-single-instance.html
 */


// 关键代码在这里 
// const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
//     if (win) {
//         if (win.isMinimized()) {
//             win.restore();
//         }
//         win.focus()
//     }
// })
// if (shouldQuit) {
//     app.quit()
// }
// 关键代码在这里
function createWindow() {


    // //执行cmd命令
    // const exec = require('child_process').exec;

    // // cmd命令
    // let cmdStr = 'echo 1 >/home/inkbox/test.txt';

    // // 子进程名称
    // let workerProcess;


    // workerProcess = exec(cmdStr, {});
    // // 打印正常的后台可执行程序输出
    // workerProcess.stdout.on('data', function(data) {
    //     console.log('stdout: ' + data);
    // });








    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: '待办事项',
        icon: path.join(__dirname, '../assets/icon/logo.png')
    })
    win.loadFile("src/index.html");
    // win.webContents.openDevTools()
    win.on('closed', function() {
        win = null;
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

//保证程序单例运行
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })

    app.on('activate', function() {
        if (win === null) {
            createWindow();
        }
    })
}