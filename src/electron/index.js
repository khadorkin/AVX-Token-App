/* eslint-disable no-console */
// Module imports
import keytar from 'keytar';
import SemVer from 'semver';
import url from 'url';
import https from 'https';
import { shell, app, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import Server from './Server';
import Tray from './Tray';
import createWindow from './createWindow';

process.on('uncaughtException', err => {
  console.error(err);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled Rejection at: Promise ${p} reason: ${reason}`);
  if (reason.stack) {
    console.error(reason.stack);
  }
});

autoUpdater.autoDownload = true;

// This is set to true if an auto update has been downloaded through the Electron
// auto-update system and is ready to install. If the user declined an update earlier,
// it will still install on shutdown.
let autoUpdateDownloaded = false;

// Keeps track of whether the user has accepted an auto-update through the interface.
let autoUpdateAccepted = false;

// This is used to keep track of whether we are showing the special dialog
// that we show on Windows after you decline an upgrade and close the app later.
let showingAutoUpdateCloseAlert = false;

// Keep a global reference, if you don't, they will be closed automatically when the JavaScript
// object is garbage collected.
let uiWindow;
// eslint-disable-next-line no-unused-vars
let tray;
let server;

let isQuitting;

const updateRendererWindow = window => {
  uiWindow = window;
};

const installExtensions = async () => {
  // eslint-disable-next-line import/no-extraneous-dependencies,global-require
  const installer = require('electron-devtools-installer');
  // eslint-disable-next-line import/no-extraneous-dependencies,global-require
  const devtronExtension = require('devtron');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(
      name => installer.default(installer[name], forceDownload),
      devtronExtension.install()
    )
  ).catch(console.log);
};

app.setAsDefaultProtocolClient('lbry');
app.setName('AVX Token');

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }
  server = new Server();
  server.on('exit', () => {
    server = null;
    if (!isQuitting) {
      dialog.showErrorBox(
        'server has Exited',
        'The server may have encountered an unexpected error, or another server instance is already running.'
      );
      app.quit();
    }
  });
  server.launch();
  uiWindow = createWindow();
  tray = new Tray(uiWindow, updateRendererWindow);
  tray.create();
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!uiWindow) uiWindow = createWindow();
});

app.on('will-quit', event => {
  if (
    process.platform === 'win32' &&
    autoUpdateDownloaded &&
    !autoUpdateAccepted &&
    !showingAutoUpdateCloseAlert
  ) {
    // We're on Win and have an update downloaded, but the user declined it (or closed
    // the app without accepting it). Now the user is closing the app, so the new update
    // will install. On Mac this is silent, but on Windows they get a confusing permission
    // escalation dialog, so we show Windows users a warning dialog first.

    showingAutoUpdateCloseAlert = true;
    dialog.showMessageBox(
      {
        type: 'info',
        title: 'AVX Token Will Upgrade',
        message:
          'AVX Token has a pending upgrade. Please select "Yes" to install it on the prompt shown after this one.',
      },
      () => {
        app.quit();
      }
    );

    event.preventDefault();
    return;
  }

  isQuitting = true;
  if (server) server.quit();
});

// https://electronjs.org/docs/api/app#event-will-finish-launching
app.on('will-finish-launching', () => {
  // Protocol handler for macOS
  app.on('open-url', (event, URL) => {
    event.preventDefault();
    if (uiWindow && !uiWindow.isDestroyed()) {
      uiWindow.webContents.send('open-uri-requested', URL);
      uiWindow.show();
      uiWindow.focus();
    } else {
      uiWindow = createWindow(URL);
    }
  });
});

app.on('window-all-closed', () => {
  // Subscribe to event so the app doesn't quit when closing the window.
});

ipcMain.on('upgrade', (event, installerPath) => {
  app.on('quit', () => {
    console.log('Launching upgrade installer at', installerPath);
    // This gets triggered called after *all* other quit-related events, so
    // we'll only get here if we're fully prepared and quitting for real.
    shell.openItem(installerPath);
  });
  // what to do if no shutdown in a long time?
  console.log('Update downloaded to', installerPath);
  console.log(
    'The app will close, and you will be prompted to install the latest version of AVX Token.'
  );
  console.log('After the install is complete, please reopen the app.');
  app.quit();
});

autoUpdater.on('update-downloaded', () => {
  autoUpdateDownloaded = true;
});

ipcMain.on('autoUpdateAccepted', () => {
  autoUpdateAccepted = true;
  autoUpdater.quitAndInstall();
});

ipcMain.on('version-info-requested', () => {
  function formatRc(ver) {
    // Adds dash if needed to make RC suffix SemVer friendly
    return ver.replace(/([^-])rc/, '$1-rc');
  }

  const localVersion = app.getVersion();
  const latestReleaseAPIURL = 'https://api.github.com/repos/lbryio/lbry-app/releases/latest';
  const opts = {
    headers: {
      'User-Agent': `LBRY/${localVersion}`,
    },
  };
  let result = '';

  const req = https.get(Object.assign(opts, url.parse(latestReleaseAPIURL)), res => {
    res.on('data', data => {
      result += data;
    });
    res.on('end', () => {
      const tagName = JSON.parse(result).tag_name;
      const [, remoteVersion] = tagName.match(/^v([\d.]+(?:-?rc\d+)?)$/);
      if (!remoteVersion) {
        if (uiWindow) {
          uiWindow.webContents.send('version-info-received', null);
        }
      } else {
        const upgradeAvailable = SemVer.gt(formatRc(remoteVersion), formatRc(localVersion));
        if (uiWindow) {
          uiWindow.webContents.send('version-info-received', {
            remoteVersion,
            localVersion,
            upgradeAvailable,
          });
        }
      }
    });
  });

  req.on('error', err => {
    console.log('Failed to get current version from GitHub. Error:', err);
    if (uiWindow) {
      uiWindow.webContents.send('version-info-received', null);
    }
  });
});

ipcMain.on('get-auth-token', event => {
  keytar.getPassword('LBRY', 'auth_token').then(token => {
    event.sender.send('auth-token-response', token ? token.toString().trim() : null);
  });
});

ipcMain.on('set-auth-token', (event, token) => {
  keytar.setPassword('LBRY', 'auth_token', token ? token.toString().trim() : null);
});

process.on('uncaughtException', error => {
  dialog.showErrorBox('Error Encountered', `Caught error: ${error}`);
  isQuitting = true;
  if (server) server.quit();
  app.exit(1);
});

// Force single instance application
const isSecondInstance = app.makeSingleInstance(argv => {
  // Protocol handler for win32
  // argv: An array of the second instance’s (command line / deep linked) arguments

  let URI;
  if (process.platform === 'win32' && String(argv[1]).startsWith('lbry')) {
    // Keep only command line / deep linked arguments
    URI = argv[1].replace(/\/$/, '').replace('/#', '#');
  }

  if (uiWindow && !uiWindow.isDestroyed()) {
    uiWindow.webContents.send('open-uri-requested', URI);

    uiWindow.show();
    uiWindow.focus();
  } else {
    uiWindow = createWindow(URI);
  }
});

if (isSecondInstance) {
  app.exit();
}
