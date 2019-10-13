import { app, BrowserWindow, ipcMain, screen } from 'electron';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let indexWindow;//trans window
let mainWindow;//

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const mainURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/main`
  : `file://${__dirname}/index.html#/main`

function createWindow() {
  /**
   * Initial window options
   */

  //放在主界面的右边隐藏
  let display = screen.getPrimaryDisplay();




  let height = 400;//窗口高度



  //  new BrowserWindow({frame:false,transparent:true}).show()
  indexWindow = new BrowserWindow({
    fullscreen: false,
    height: height,
    // useContentSize: true,
    width: 800,
    x: display.size.width - 100,
    y: (display.size.height - height) / 2,
    frame: false,
    transparent: true,
    alwaysOnTop:true,
    webPreferences: {
      nodeIntegration: true
    }
  })


  indexWindow.loadURL(winURL)

  indexWindow.on('closed', () => {
    indexWindow = null
  })



  ipcMain.on('OPEN_MAIN_WINDOW', (event, args) => {
    mainWindow = new BrowserWindow({
      fullscreen: false,
      height: 860,
      // useContentSize: true,
      width: 1450,
      x: 2053,
      y: 215,
      webPreferences: {
        nodeIntegration: true
      },
      show: true,
    })

    mainWindow.loadURL(mainURL)

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (indexWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
