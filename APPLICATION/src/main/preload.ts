import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    /* 2  -> index.tsx */
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
      console.log(
        'preload contextBridge.exposeInMainWorld ipcRenderer ###myPing###'
      );
    },
    getIp() {
      ipcRenderer
        .invoke('get-ip', 'ping')
        .then((res) => {
          document?.querySelector('#mainContainer')?.setAttribute('ip', res);
          console.log(`ipip : ${res}`);
        })
        .catch((err) => console.error(err));
    },
    trans() {
      ipcRenderer
        .invoke('ipc-example', 'ping')
        .then((res) => {
          document
            ?.querySelector('#mainContainer')
            ?.setAttribute('temperature', res.temperature);
          document
            ?.querySelector('#mainContainer')
            ?.setAttribute('humidity', res.humidity);
          // console.log(`preload temperature:${res.temperature}, humidity:${res.humidity}`)
        })
        .catch((err) => console.error(err));
    },
    on(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
        console.log(
          'preload contextBridge.exposeInMainWorld ipcRenderer ###on###'
        );
      }
    },
    /* 1 */
    once(channel: string, func: (...args: any[]) => void) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (_event, ...args) => func(...args));
        console.log(
          'preload contextBridge.hexposeInMainWorld ipcRenderer ###once###'
        );
      }
    },
  },
});
