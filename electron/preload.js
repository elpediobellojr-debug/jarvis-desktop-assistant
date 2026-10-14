const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('jarvisAPI', {
  send: (channel, data) => {
    const validChannels = ['app:request'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ['app:response'];
    if (validChannels.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
