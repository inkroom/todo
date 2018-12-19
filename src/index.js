// const electron = require('electron');

const { app, BrowserWindow } = require('electron');

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadFile('src/index.html');
    win.webContents.openDevTools()
    win.on('closed', function () {
        console.log('窗口关闭');
        win = null;
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    console.log(process.platform)
    if (process.platform !== 'darwin') {
        app.quit();
    }
})


app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
})