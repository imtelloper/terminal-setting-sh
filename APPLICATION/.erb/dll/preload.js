/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*****************************!*\
  !*** ./src/main/preload.ts ***!
  \*****************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        /* 2  -> index.tsx */
        myPing() {
            electron_1.ipcRenderer.send('ipc-example', 'ping');
            console.log('preload contextBridge.exposeInMainWorld ipcRenderer ###myPing###');
        },
        getIp() {
            electron_1.ipcRenderer
                .invoke('get-ip', 'ping')
                .then((res) => {
                document?.querySelector('#mainContainer')?.setAttribute('ip', res);
                console.log(`ipip : ${res}`);
            })
                .catch((err) => console.error(err));
        },
        trans() {
            electron_1.ipcRenderer
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
        on(channel, func) {
            const validChannels = ['ipc-example'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                electron_1.ipcRenderer.on(channel, (_event, ...args) => func(...args));
                console.log('preload contextBridge.exposeInMainWorld ipcRenderer ###on###');
            }
        },
        /* 1 */
        once(channel, func) {
            const validChannels = ['ipc-example'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                electron_1.ipcRenderer.once(channel, (_event, ...args) => func(...args));
                console.log('preload contextBridge.hexposeInMainWorld ipcRenderer ###once###');
            }
        },
    },
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9TQUZFVFktQUkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU0FGRVRZLUFJLy4vc3JjL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgY29udGV4dEJyaWRnZSwgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5cbmNvbnRleHRCcmlkZ2UuZXhwb3NlSW5NYWluV29ybGQoJ2VsZWN0cm9uJywge1xuICBpcGNSZW5kZXJlcjoge1xuICAgIC8qIDIgIC0+IGluZGV4LnRzeCAqL1xuICAgIG15UGluZygpIHtcbiAgICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2lwYy1leGFtcGxlJywgJ3BpbmcnKTtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAncHJlbG9hZCBjb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkIGlwY1JlbmRlcmVyICMjI215UGluZyMjIydcbiAgICAgICk7XG4gICAgfSxcbiAgICBnZXRJcCgpIHtcbiAgICAgIGlwY1JlbmRlcmVyXG4gICAgICAgIC5pbnZva2UoJ2dldC1pcCcsICdwaW5nJylcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGRvY3VtZW50Py5xdWVyeVNlbGVjdG9yKCcjbWFpbkNvbnRhaW5lcicpPy5zZXRBdHRyaWJ1dGUoJ2lwJywgcmVzKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgaXBpcCA6ICR7cmVzfWApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9LFxuICAgIHRyYW5zKCkge1xuICAgICAgaXBjUmVuZGVyZXJcbiAgICAgICAgLmludm9rZSgnaXBjLWV4YW1wbGUnLCAncGluZycpXG4gICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgPy5xdWVyeVNlbGVjdG9yKCcjbWFpbkNvbnRhaW5lcicpXG4gICAgICAgICAgICA/LnNldEF0dHJpYnV0ZSgndGVtcGVyYXR1cmUnLCByZXMudGVtcGVyYXR1cmUpO1xuICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICA/LnF1ZXJ5U2VsZWN0b3IoJyNtYWluQ29udGFpbmVyJylcbiAgICAgICAgICAgID8uc2V0QXR0cmlidXRlKCdodW1pZGl0eScsIHJlcy5odW1pZGl0eSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYHByZWxvYWQgdGVtcGVyYXR1cmU6JHtyZXMudGVtcGVyYXR1cmV9LCBodW1pZGl0eToke3Jlcy5odW1pZGl0eX1gKVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiAgICB9LFxuICAgIG9uKGNoYW5uZWw6IHN0cmluZywgZnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKSB7XG4gICAgICBjb25zdCB2YWxpZENoYW5uZWxzID0gWydpcGMtZXhhbXBsZSddO1xuICAgICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IHN0cmlwIGV2ZW50IGFzIGl0IGluY2x1ZGVzIGBzZW5kZXJgXG4gICAgICAgIGlwY1JlbmRlcmVyLm9uKGNoYW5uZWwsIChfZXZlbnQsIC4uLmFyZ3MpID0+IGZ1bmMoLi4uYXJncykpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAncHJlbG9hZCBjb250ZXh0QnJpZGdlLmV4cG9zZUluTWFpbldvcmxkIGlwY1JlbmRlcmVyICMjI29uIyMjJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG4gICAgLyogMSAqL1xuICAgIG9uY2UoY2hhbm5lbDogc3RyaW5nLCBmdW5jOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IHZhbGlkQ2hhbm5lbHMgPSBbJ2lwYy1leGFtcGxlJ107XG4gICAgICBpZiAodmFsaWRDaGFubmVscy5pbmNsdWRlcyhjaGFubmVsKSkge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgc3RyaXAgZXZlbnQgYXMgaXQgaW5jbHVkZXMgYHNlbmRlcmBcbiAgICAgICAgaXBjUmVuZGVyZXIub25jZShjaGFubmVsLCAoX2V2ZW50LCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ3ByZWxvYWQgY29udGV4dEJyaWRnZS5oZXhwb3NlSW5NYWluV29ybGQgaXBjUmVuZGVyZXIgIyMjb25jZSMjIydcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=