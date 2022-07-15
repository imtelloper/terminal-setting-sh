import path from 'path';
import { app, BrowserWindow, shell, ipcMain, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';
// @ts-ignore
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

export default class AppUpdater {
  constructor() {
    console.log('AppUpdater constructed');
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
// @ts-ignore
const log = require('electron-log');

const NOTIFICATION_TITLE = 'Basic Notification';
const NOTIFICATION_BODY = 'Notification from the MainPage process';

function showNotification(text) {
  new Notification({ title: text, body: text }).show();
}

const http = require('http');

ipcMain.on('ipc-example', async (event, arg) => {
  console.log('ipc-example started');
  console.log('ipc-example arg', arg);
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log('msgTemplate(arg) : ', msgTemplate(arg));
});

ipcMain.handle('ipc-example', async (event, arg) => {
  console.log('ipc-example hanedle!!!!!!!!!!!!!!!!!');
  return 'hi';
});

ipcMain.handle('get-ip', async (event, arg) => {
  console.log('get-ip handle!!!!!!!!!!!!!!!!!');
  const ip: Promise<any> = new Promise((resolve, reject) => {
    http.get({ host: 'api.ipify.org', port: 80, path: '/' }, (resp) => {
      resp.on('data', (ip) => {
        console.log(`My public IP address is: ${ip}`);
        resolve(ip.toString());
      });
    });
  });

  await ip.then((res) => {
    console.log('maybe', res);
  });
  return ip;
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';
console.log('isDevelopment', isDevelopment);

if (isDevelopment) require('electron-debug')();

const installExtensions = async () => {
  console.log('installExtensions start');
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];
  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) await installExtensions();
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  mainWindow = new BrowserWindow({
    show: false,
    width: 1600,
    height: 1200,
    icon: getAssetPath('assets/icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // mainWindow.maximize();
  // mainWindow.setFullScreen(!mainWindow.isFullScreen());

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) throw new Error('"mainWindow" is not defined');
    process.env.START_MINIMIZED ? mainWindow.minimize() : mainWindow.show();
    log.warn('Test Message : Some problem appears');
  });

  mainWindow.on('closed', () => (mainWindow = null));
  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
  new AppUpdater();
};

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
