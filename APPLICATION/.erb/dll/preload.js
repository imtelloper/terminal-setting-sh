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
        /* 2  -> index.tsx*/
        myPing() {
            electron_1.ipcRenderer.send('ipc-example', 'ping');
            console.log('preload contextBridge.exposeInMainWorld ipcRenderer ###myPing###');
        },
        getIp() {
            electron_1.ipcRenderer.invoke('get-ip', 'ping').then(res => {
                document
                    ?.querySelector('#mainContainer')
                    ?.setAttribute('ip', res);
                console.log(`ipip : ${res}`);
            });
        },
        trans() {
            electron_1.ipcRenderer.invoke('ipc-example', 'ping').then((res) => {
                document
                    ?.querySelector('#mainContainer')
                    ?.setAttribute('temperature', res.temperature);
                document
                    ?.querySelector('#mainContainer')
                    ?.setAttribute('humidity', res.humidity);
                // console.log(`preload temperature:${res.temperature}, humidity:${res.humidity}`)
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSxtRUFBc0Q7QUFFdEQsd0JBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7SUFDMUMsV0FBVyxFQUFFO1FBQ1gsb0JBQW9CO1FBQ3BCLE1BQU07WUFDSixzQkFBVyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FDVCxrRUFBa0UsQ0FDbkUsQ0FBQztRQUNKLENBQUM7UUFDRCxLQUFLO1lBQ0gsc0JBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUU7Z0JBQzdDLFFBQVE7b0JBQ04sRUFBRSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2pDLEVBQUUsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxVQUFVLEdBQUcsRUFBRSxDQUNoQixDQUFDO1lBQ0osQ0FBQyxDQUFDO1FBQ0osQ0FBQztRQUNELEtBQUs7WUFDSCxzQkFBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3JELFFBQVE7b0JBQ04sRUFBRSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2pDLEVBQUUsWUFBWSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pELFFBQVE7b0JBQ04sRUFBRSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2pDLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNDLGtGQUFrRjtZQUNwRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxFQUFFLENBQUMsT0FBZSxFQUFFLElBQThCO1lBQ2hELE1BQU0sYUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNuQyxtREFBbUQ7Z0JBQ25ELHNCQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCw4REFBOEQsQ0FDL0QsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUNELE9BQU87UUFDUCxJQUFJLENBQUMsT0FBZSxFQUFFLElBQThCO1lBQ2xELE1BQU0sYUFBYSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNuQyxtREFBbUQ7Z0JBQ25ELHNCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxpRUFBaUUsQ0FDbEUsQ0FBQzthQUNIO1FBQ0gsQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtYm9pbGVycGxhdGUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtYm9pbGVycGxhdGUvLi9zcmMvbWFpbi9wcmVsb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBjb250ZXh0QnJpZGdlLCBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCgnZWxlY3Ryb24nLCB7XG4gIGlwY1JlbmRlcmVyOiB7XG4gICAgLyogMiAgLT4gaW5kZXgudHN4Ki9cbiAgICBteVBpbmcoKSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdpcGMtZXhhbXBsZScsICdwaW5nJyk7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgJ3ByZWxvYWQgY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCBpcGNSZW5kZXJlciAjIyNteVBpbmcjIyMnXG4gICAgICApO1xuICAgIH0sXG4gICAgZ2V0SXAoKSB7XG4gICAgICBpcGNSZW5kZXJlci5pbnZva2UoJ2dldC1pcCcsICdwaW5nJykudGhlbihyZXM9PntcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICA/LnF1ZXJ5U2VsZWN0b3IoJyNtYWluQ29udGFpbmVyJylcbiAgICAgICAgICA/LnNldEF0dHJpYnV0ZSgnaXAnLCByZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgaXBpcCA6ICR7cmVzfWBcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgfSxcbiAgICB0cmFucygpIHtcbiAgICAgIGlwY1JlbmRlcmVyLmludm9rZSgnaXBjLWV4YW1wbGUnLCAncGluZycpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgID8ucXVlcnlTZWxlY3RvcignI21haW5Db250YWluZXInKVxuICAgICAgICAgID8uc2V0QXR0cmlidXRlKCd0ZW1wZXJhdHVyZScsIHJlcy50ZW1wZXJhdHVyZSk7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgPy5xdWVyeVNlbGVjdG9yKCcjbWFpbkNvbnRhaW5lcicpXG4gICAgICAgICAgPy5zZXRBdHRyaWJ1dGUoJ2h1bWlkaXR5JywgcmVzLmh1bWlkaXR5KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHByZWxvYWQgdGVtcGVyYXR1cmU6JHtyZXMudGVtcGVyYXR1cmV9LCBodW1pZGl0eToke3Jlcy5odW1pZGl0eX1gKVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbihjaGFubmVsOiBzdHJpbmcsIGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkge1xuICAgICAgY29uc3QgdmFsaWRDaGFubmVscyA9IFsnaXBjLWV4YW1wbGUnXTtcbiAgICAgIGlmICh2YWxpZENoYW5uZWxzLmluY2x1ZGVzKGNoYW5uZWwpKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBzdHJpcCBldmVudCBhcyBpdCBpbmNsdWRlcyBgc2VuZGVyYFxuICAgICAgICBpcGNSZW5kZXJlci5vbihjaGFubmVsLCAoX2V2ZW50LCAuLi5hcmdzKSA9PiBmdW5jKC4uLmFyZ3MpKTtcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgJ3ByZWxvYWQgY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZCBpcGNSZW5kZXJlciAjIyNvbiMjIydcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8qIDEgKi9cbiAgICBvbmNlKGNoYW5uZWw6IHN0cmluZywgZnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkKSB7XG4gICAgICBjb25zdCB2YWxpZENoYW5uZWxzID0gWydpcGMtZXhhbXBsZSddO1xuICAgICAgaWYgKHZhbGlkQ2hhbm5lbHMuaW5jbHVkZXMoY2hhbm5lbCkpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IHN0cmlwIGV2ZW50IGFzIGl0IGluY2x1ZGVzIGBzZW5kZXJgXG4gICAgICAgIGlwY1JlbmRlcmVyLm9uY2UoY2hhbm5lbCwgKF9ldmVudCwgLi4uYXJncykgPT4gZnVuYyguLi5hcmdzKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICdwcmVsb2FkIGNvbnRleHRCcmlkZ2UuaGV4cG9zZUluTWFpbldvcmxkIGlwY1JlbmRlcmVyICMjI29uY2UjIyMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=