/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/connect_four.js":
/*!*****************************!*\
  !*** ./src/connect_four.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ConnectFour; });\nclass ConnectFour {\n    constructor(board, playerOne, playerTwo) {\n        this.board = board;\n        this.currentPlayer = playerOne;\n        this.playerOne = playerOne;\n        this.playerTwo = playerTwo;\n        \n        this.setup();\n        this.gamePlay();\n    }\n\n    gamePlay() {\n        let cols = document.querySelectorAll('.col.empty');\n        let game = this;\n\n        this.promptPlayer();\n        \n        cols.forEach((col) => {\n            col.addEventListener('mouseenter', function() {\n                let top = game.getTop(col.dataset.col);\n\n                top.classList.add(`selecting-${game.currentPlayer.color}`);\n            });\n        });\n\n        cols.forEach((col) => {\n            col.addEventListener('mouseleave', function(event) {\n                let top = game.getTop(col.dataset.col);\n                \n                top.classList.remove(`selecting-${game.currentPlayer.color}`);\n            });\n        });\n\n        cols.forEach((col) => {\n            col.addEventListener('click', function(event) {\n                let top = game.getTop(col.dataset.col);\n\n                top.classList.remove(`selecting-${game.currentPlayer.color}`);\n                top.classList.remove('empty');\n                top.classList.add(game.currentPlayer.color);\n                top.setAttribute('data-player', game.currentPlayer.color);\n\n                let isOver = game.checkForWinner(top.dataset);\n                \n                if (isOver) {\n                    game.showWinner();                                        \n                    return;\n                } else {\n                    game.switchPlayers();\n                    top.dispatchEvent(new Event('mouseenter'));\n                }\n\n            });\n        });\n    }\n\n    isFourInARow(dirs, pos) {   \n        let count = 1;\n        let [row, col] = pos;\n        \n        for (let i = 0; i < dirs.length; i++) {\n            let { x, y } = dirs[i];\n            let nextRow = row + y;\n            let nextCol = col + x;\n            let cell = document.querySelector(`[data-row='${nextRow}'][data-col='${nextCol}']`);\n\n            while (nextRow >= 0 && nextRow < 6 && nextCol >= 0 && nextCol < 7 && cell.dataset.player === this.currentPlayer.color) {\n                count += 1;\n                nextRow += y;\n                nextCol += x;\n                cell = document.querySelector(`[data-row='${nextRow}'][data-col='${nextCol}']`);\n            }\n        }\n\n        return count >= 4;\n    }\n    \n    winByDiagonal(pos) {\n        return this.isFourInARow(\n            [\n                { x: 1, y: 1 }, \n                { x: -1, y: -1}, \n                { x: 1, y: -1}, \n                { x: -1, y: 1 }\n            ], pos);\n    }\n\n    winByVertical(pos) {\n        return this.isFourInARow([{ x: 0, y: 1 }, { x: 0, y: -1 }], pos)\n    }\n    \n    winByHorizontal(pos) {\n        return this.isFourInARow([{ x: 1, y: 0 }, { x: -1, y: 0 }], pos);\n    }\n    \n    checkForWinner({ row, col }) {\n        let pos = [Number(row), Number(col)];\n\n        return this.winByDiagonal(pos)\n            || this.winByVertical(pos)\n            || this.winByHorizontal(pos);\n    }\n    \n    switchPlayers() {\n        this.currentPlayer = this.currentPlayer === this.playerOne\n                            ? this.playerTwo \n                            : this.playerOne; \n        this.promptPlayer();\n    }\n    \n    reset() {\n        while (this.board.firstChild) {\n            this.board.removeChild(this.board.firstChild);\n        }\n        this.setup();\n        this.currentPlayer = this.playerOne;\n        this.gamePlay();\n    }\n    \n    getTop(col) {\n        let fullColumn = document.querySelectorAll(`[data-col='${col}']`);\n        \n        for (let i = fullColumn.length - 1; i >= 0; i--) {\n            if (fullColumn[i].classList.contains('empty')) {\n                return fullColumn[i];\n            }\n        }\n\n        return null;\n    }  \n\n    promptPlayer() {\n        document\n            .querySelector('#current-player')\n            .innerText = `It is ${this.currentPlayer.name}'s turn!`\n    }\n\n    showWinner() {\n        document\n            .querySelector('#current-player')\n            .innerText = `${this.currentPlayer.name} wins!`\n\n        setTimeout(() => { this.reset() }, 1000);\n    }\n    \n    setup() {\n        for (let Y = 0; Y < 6; Y++) {\n            let row = document.createElement('div');\n            row.className = 'row';\n            \n            for (let X = 0; X < 7; X++) {\n                let col = document.createElement('div');\n                col.className = 'col empty';\n                col.setAttribute('data-row', Y);\n                col.setAttribute('data-col', X);\n\n                row.appendChild(col);\n            }\n\n            this.board.appendChild(row);\n        }\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/connect_four.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _connect_four__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./connect_four */ \"./src/connect_four.js\");\n\n\nwindow.addEventListener('DOMContentLoaded', () => {\n    let modal = document.querySelector('#modal');\n    let board = document.getElementById('connect-four');\n    let playerOne = { color: 'red', name: 'player one'};\n    let playerTwo = { color: 'black', name: 'player two' };\n\n    \n    document\n        .querySelectorAll('.name-input')\n        .forEach((input) => {\n            input.addEventListener('change', function() {\n                this.id === 'player-1-name' \n                ? playerOne.name = this.value\n                : playerTwo.name = this.value;\n            });\n        });\n\n    document\n        .querySelectorAll('.color-select')\n        .forEach((square) => {\n            square.addEventListener('click', function() {\n                let player = this.id.slice(-3);\n\n                player === 'one'\n                ? playerOne.color = this.dataset.value\n                : playerTwo.color = this.dataset.value\n\n                document\n                    .querySelector(`#selected-color-${player}`)\n                    .classList\n                    .add(this.dataset.value);\n            });\n        });\n                \n    document\n        .querySelector('#close-button')\n        .addEventListener('click', function(event) {\n            modal.style.display = 'none';\n            console.log(playerOne, playerTwo)\n            new _connect_four__WEBPACK_IMPORTED_MODULE_0__[\"default\"](board, playerOne, playerTwo);\n        });\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });