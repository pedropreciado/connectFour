!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);window.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector("#modal"),t=document.getElementById("connect-four"),r={color:"red",name:"player one"},n={color:"black",name:"player two"};document.querySelectorAll(".name-input").forEach(e=>{e.addEventListener("change",function(){"player-1-name"===this.id?r.name=this.value:n.name=this.value})}),document.querySelectorAll(".color-select").forEach(e=>{e.addEventListener("click",function(){let e=this.id.slice(-3);"one"===e?r.color=this.dataset.value:n.color=this.dataset.value,document.querySelector(`#selected-color-${e}`).classList.add(this.dataset.value)})}),document.querySelector("#close-button").addEventListener("click",function(o){e.style.display="none",new class{constructor(e,t,r){this.board=e,this.currentPlayer=t,this.playerOne=t,this.playerTwo=r,this.setup(),this.gamePlay()}gamePlay(){let e=document.querySelectorAll(".col.empty"),t=this;this.promptPlayer(),e.forEach(e=>{e.addEventListener("mouseenter",function(){t.getTop(e.dataset.col).classList.add(`selecting-${t.currentPlayer.color}`)})}),e.forEach(e=>{e.addEventListener("mouseleave",function(r){t.getTop(e.dataset.col).classList.remove(`selecting-${t.currentPlayer.color}`)})}),e.forEach(e=>{e.addEventListener("click",function(r){let n=t.getTop(e.dataset.col);n.classList.remove(`selecting-${t.currentPlayer.color}`),n.classList.remove("empty"),n.classList.add(t.currentPlayer.color),n.setAttribute("data-player",t.currentPlayer.color),t.checkForWinner(n.dataset)?t.showWinner():(t.switchPlayers(),n.dispatchEvent(new Event("mouseenter")))})})}isFourInARow(e,t){let r=1,[n,o]=t;for(let t=0;t<e.length;t++){let{x:l,y:a}=e[t],i=n+a,c=o+l,s=document.querySelector(`[data-row='${i}'][data-col='${c}']`);for(;i>=0&&i<6&&c>=0&&c<7&&s.dataset.player===this.currentPlayer.color;)r+=1,i+=a,c+=l,s=document.querySelector(`[data-row='${i}'][data-col='${c}']`)}return r>=4}winByDiagonal(e){return this.isFourInARow([{x:1,y:1},{x:-1,y:-1},{x:1,y:-1},{x:-1,y:1}],e)}winByVertical(e){return this.isFourInARow([{x:0,y:1},{x:0,y:-1}],e)}winByHorizontal(e){return this.isFourInARow([{x:1,y:0},{x:-1,y:0}],e)}checkForWinner({row:e,col:t}){let r=[Number(e),Number(t)];return this.winByDiagonal(r)||this.winByVertical(r)||this.winByHorizontal(r)}switchPlayers(){this.currentPlayer=this.currentPlayer===this.playerOne?this.playerTwo:this.playerOne,this.promptPlayer()}reset(){for(;this.board.firstChild;)this.board.removeChild(this.board.firstChild);this.setup(),this.currentPlayer=this.playerOne,this.gamePlay()}getTop(e){let t=document.querySelectorAll(`[data-col='${e}']`);for(let e=t.length-1;e>=0;e--)if(t[e].classList.contains("empty"))return t[e];return null}promptPlayer(){document.querySelector("#current-player").innerText=`It is ${this.currentPlayer.name}'s turn!`}showWinner(){document.querySelector("#current-player").innerText=`${this.currentPlayer.name} wins!`,setTimeout(()=>{this.reset()},1e3)}setup(){for(let e=0;e<6;e++){let t=document.createElement("div");t.className="row";for(let r=0;r<7;r++){let n=document.createElement("div");n.className="col empty",n.setAttribute("data-row",e),n.setAttribute("data-col",r),t.appendChild(n)}this.board.appendChild(t)}}}(t,r,n)})})}]);