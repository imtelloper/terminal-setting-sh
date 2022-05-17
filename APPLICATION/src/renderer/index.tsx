import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('root'));

/* 3 */
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log('index.tsx ipc-example arg : ', arg);
  console.log('index.tsx window.electron.ipcRenderer.once - ipc-example');
});
window.electron.ipcRenderer.myPing();
