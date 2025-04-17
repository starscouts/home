const {app, BrowserWindow, ipcMain, dialog} = require('electron');
const pronote = require("pronote-api");
const os = require("os");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1024,
        height: 600,
        useContentSize: true,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
        minimizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('index.html');
}

ipcMain.handle("homework", async (_) => {
    const pronote = require('pronote-api');

    const session = await pronote.login(require('./credentials.json')['pronote']['url'], require('./credentials.json')['pronote']['username'], require('./credentials.json')['pronote']['password']);
    const homework = await session.homeworks(new Date(new Date().getTime() - 86400000), new Date(new Date().getTime() + (86400000 * 60)));
    console.log(homework);

    return homework;
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})