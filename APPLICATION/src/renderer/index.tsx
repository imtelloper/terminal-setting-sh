import axios from 'axios';
import * as ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

/* 3 */
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  console.log('index.tsx ipc-example arg : ', arg);
  console.log('index.tsx window.electron.ipcRenderer.once - ipc-example');
});
window.electron.ipcRenderer.myPing();
