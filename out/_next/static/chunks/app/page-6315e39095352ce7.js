(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1540:function(e,t,s){Promise.resolve().then(s.bind(s,7784))},6271:function(e,t,s){"use strict";s.r(t),s.d(t,{GameContext:function(){return c},GameContextProvider:function(){return f},useGameData:function(){return h}});var r=s(9268),i=s(6006),l=s(3827);class a{constructor(e){this.state=e}}class n{nextState(e,t){let s=0,r=0;for(let i=Math.max(e-1,0);i<=Math.min(e+1,this.size-1);i++)for(let a=Math.max(t-1,0);a<=Math.min(t+1,this.size-1);a++)(i!==e||a!==t)&&(this.cells[i][a].state===l.f.A?s++:this.cells[i][a].state===l.f.B&&r++);return this.cells[e][t].state===l.f.EMPTY&&s+r===3?s>r?l.f.A:l.f.B:this.cells[e][t].state!==l.f.EMPTY&&(s+r<2||s+r>3)?l.f.EMPTY:this.cells[e][t].state}update(){let e=Array(this.size);for(let t=0;t<this.size;t++){e[t]=Array(this.size);for(let s=0;s<this.size;s++)e[t][s]=this.nextState(t,s)}for(let t=0;t<this.size;t++)for(let s=0;s<this.size;s++)this.cells[t][s].state=e[t][s]}assignCells(e){this.cells=Array(this.size);for(let t=0;t<this.size;t++){this.cells[t]=Array(this.size);for(let s=0;s<this.size;s++)this.cells[t][s]=new a(e[t][s])}}constructor(e,t){this.size=e,this.cells=Array(e);for(let s=0;s<e;s++){this.cells[s]=Array(e);for(let r=0;r<e;r++)this.cells[s][r]=new a(t[s][r])}}}class o{initialStates(){let e=Array(this.size);for(let t=0;t<this.size;t++){e[t]=Array(this.size);for(let s=0;s<this.size;s++)e[t][s]=l.f.EMPTY}return e}checkWin(){for(let e=this.fortress.a.x;e<this.fortress.a.x+this.fortress.a.width;e++)for(let t=this.fortress.a.y;t<this.fortress.a.y+this.fortress.a.height;t++)if(this.grid.cells[t][e].state===l.f.B)return l.f.B;for(let e=this.fortress.b.x;e<this.fortress.b.x+this.fortress.b.width;e++)for(let t=this.fortress.b.y;t<this.fortress.b.y+this.fortress.b.height;t++)if(this.grid.cells[t][e].state===l.f.A)return l.f.A;return!1}getCellStates(){let e=Array(this.size);for(let t=0;t<this.size;t++){e[t]=Array(this.size);for(let s=0;s<this.size;s++)e[t][s]=this.grid.cells[t][s].state}return e}constructor(e,t,s){this.size=e,this.fortress=t,this.grid=new n(e,this.initialStates()),this.initialPlayer=s||.5>Math.random()?l.f.A:l.f.B}}let c=(0,i.createContext)(void 0),f=e=>{let{children:t}=e,[s,a]=(0,i.useState)(l.D.INIT),[n,f]=(0,i.useState)(void 0),[h,u]=(0,i.useState)(void 0),[d,x]=(0,i.useState)({a:0,b:0}),[A,v]=(0,i.useState)(void 0),[E,m]=(0,i.useState)("");(0,i.useEffect)(()=>{let e=new o(20,{a:{x:10,y:1,width:1,height:1},b:{x:10,y:18,width:1,height:1}});f(e),u(e.initialPlayer),v(e.getCellStates()),a(e.initialPlayer===l.f.A?l.D.PLAYER_A:l.D.PLAYER_B)},[]),(0,i.useEffect)(()=>{void 0!==h&&m("Waiting for player ".concat(h," to choose their squares"))},[h]);let y=(0,i.useCallback)((e,t)=>{if(void 0===h||void 0===A)return!1;console.log("handleCellClick: ".concat(e,", ").concat(t));let s=!1,r=[...A];return r[e][t]===h?(r[e][t]=l.f.EMPTY,x({...d,[h]:d[h]-1})):d[h]<3?(r[e][t]=h,x({...d,[h]:d[h]+1})):s=!0,v(r),s},[h,A,d]),_=(0,i.useCallback)(()=>{void 0!==n&&void 0!==A&&void 0!==h&&(n.grid.assignCells(A),x(e=>({...e,[h]:0})),u(h===l.f.A?l.f.B:l.f.A),s===l.D.PLAYER_A&&n.initialPlayer===l.f.A?(u(l.f.B),a(l.D.PLAYER_B)):s===l.D.PLAYER_A&&n.initialPlayer===l.f.B?(u(void 0),a(l.D.GAME_OF_LIFE)):s===l.D.PLAYER_B&&n.initialPlayer===l.f.B?(u(l.f.A),a(l.D.PLAYER_A)):s===l.D.PLAYER_B&&n.initialPlayer===l.f.A&&(u(void 0),a(l.D.GAME_OF_LIFE)))},[n,h,s,A,u,x]);return(0,i.useEffect)(()=>{if(void 0!==n&&s===l.D.GAME_OF_LIFE){let e=()=>(n.grid.update(),v(n.getCellStates()),n.checkWin()),t=0,s=setInterval(function(){let r=e();++t>10?(clearInterval(s),u(n.initialPlayer),a(n.initialPlayer===l.f.A?l.D.PLAYER_A:l.D.PLAYER_B)):!1!=r&&(clearInterval(s),m("Player ".concat(n.checkWin()," wins!")),u(void 0),a(l.D.END))},100)}},[n,s]),(0,r.jsx)(c.Provider,{value:{size:20,gameState:s,player:h,cells:A,fortress:null==n?void 0:n.fortress,selectedCellsCounter:d,statusText:E,setPlayer:u,setSelectedCellsCounter:x,handleCellClick:y,handleValidation:_},children:t})};function h(){let e=i.useContext(c);if(void 0===e)throw Error("useWallet must be used within a WalletProvider");return e}},7784:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var r=s(9268);let i=e=>{let{variant:t,color:s,onClick:i,children:l}=e;return(0,r.jsx)("button",{className:"px-4 py-2 rounded ".concat("contained"===t?"bg-blue-500 text-white":"border border-blue-500 text-blue-500"),onClick:i,children:l})};var l=s(6006),a=s(3827);let n=()=>(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"23",height:"23",viewBox:"0 0 25000 25000",children:(0,r.jsx)("g",{fill:"rgb(35,31,32)",children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"M2792 20513 l3 -648 763 -3 763 -2 -5 -58 c-6 -61 -14 -175 -46 -642 -11 -162 -25 -358 -30 -435 -5 -77 -19 -273 -30 -435 -11 -162 -25 -360 -30 -440 -6 -80 -15 -209 -20 -287 -21 -302 -30 -438 -40 -575 -6 -79 -19 -276 -30 -438 -11 -162 -25 -358 -30 -435 -34 -481 -120 -1739 -120 -1757 0 -17 -34 -18 -575 -18 l-575 0 0 -565 0 -565 535 0 535 0 0 -780 0 -780 695 0 695 0 0 780 0 780 425 0 425 0 0 -780 0 -780 695 0 695 0 0 780 0 780 515 0 c283 0 515 -1 515 -2 0 -2 88 -439 195 -971 107 -533 195 -970 195 -973 0 -2 -236 -4 -525 -4 l-525 0 0 -1895 0 -1895 885 0 885 0 0 670 0 670 790 0 790 0 0 -670 0 -670 285 0 285 0 2 -2312 3 -2313 25 -45 c14 -24 44 -58 68 -75 38 -26 54 -30 124 -34 134 -6 200 28 244 124 22 45 24 64 24 200 l0 150 1848 766 1847 766 3 35 3 34 -1833 398 c-1008 219 -1841 400 -1850 402 -17 5 -18 59 -18 955 l0 949 355 0 355 0 0 670 0 670 790 0 790 0 0 -670 0 -670 925 0 925 0 0 1895 0 1895 -536 0 -535 0 7 22 c3 12 89 348 190 747 101 400 209 828 241 953 l58 228 613 0 612 0 0 -780 0 -780 815 0 815 0 0 780 0 780 505 0 505 0 0 -780 0 -780 815 0 815 0 0 780 0 780 535 0 535 0 0 565 0 565 -579 0 -578 0 -7 68 c-3 37 -13 150 -21 252 -16 189 -40 485 -75 920 -24 299 -44 542 -65 800 -9 107 -25 303 -35 435 -11 132 -36 434 -55 670 -19 237 -41 511 -49 610 -9 99 -24 293 -35 430 -12 138 -28 333 -36 435 -8 102 -26 327 -40 500 -14 173 -27 334 -31 358 l-5 42 660 0 661 0 0 650 0 650 -9660 0 -9660 0 2 -647z m4392 -679 c4 -14 72 -348 151 -742 79 -395 275 -1367 435 -2162 330 -1635 520 -2583 520 -2588 0 -1 -55 -1 -122 0 l-123 3 -297 1385 c-164 762 -429 1997 -589 2745 -160 748 -294 1366 -296 1373 -4 9 31 12 155 12 l160 0 6 -26z m10612 9 c-3 -10 -79 -310 -170 -668 -90 -357 -314 -1239 -496 -1960 -183 -720 -421 -1661 -530 -2090 l-197 -780 -141 -3 -140 -3 188 743 c103 409 256 1013 340 1343 83 330 254 1005 380 1500 364 1440 480 1899 486 1918 5 15 21 17 145 17 129 0 140 -1 135 -17z m-4508 -4482 l203 -1 -4 -1397 c-4 -1520 0 -1416 -58 -1653 -37 -148 -68 -231 -144 -385 -92 -185 -180 -310 -310 -440 -267 -269 -619 -406 -921 -361 -273 41 -514 171 -722 391 -279 295 -447 700 -482 1160 -6 86 -10 628 -10 1412 l0 1272 98 3 c86 3 1822 2 2350 -1z"})})})})}),o=e=>{let{state:t,canInteract:s,isFortress:i=!1,onClick:o}=e,[c,f]=(0,l.useState)(!1),[h,u]=(0,l.useState)(!1),d="";switch(t){case a.f.A:d="cell-a";break;case a.f.B:d="cell-b";break;case a.f.EMPTY:d="cell-empty"}let x=()=>{let e=o();e?(f(!0),setTimeout(()=>f(!1),2e3)):(u(!0),setTimeout(()=>u(!1),300))};return(0,r.jsxs)("div",{className:"w-6 h-6 border border-black bg-".concat(d," ").concat(s?"cursor-pointer hover:border-".concat(d," hover:scale-125 ").concat(h?"animate-bounce":""):"cursor-not-allowed"),onClick:x,children:[i&&(0,r.jsx)(n,{}),c&&(0,r.jsx)("div",{className:"absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-black text-white text-xs rounded",children:"Maximum 3 squares can be selected. Unselect a square first."})]})};var c=s(6271);let f=e=>{let{row:t,rowIndex:s,onCellClick:i}=e,{fortress:l,player:n}=(0,c.useGameData)(),f=n===a.f.A&&s<t.length/2||n===a.f.B&&s>=t.length/2;return(0,r.jsx)("div",{className:"flex mx-auto",children:t.map((e,t)=>{let a=l&&(l.a.x===t||l.b.x===t)&&(l.a.y===s||l.b.y===s);return(0,r.jsx)(o,{state:e,canInteract:f,isFortress:a,onClick:()=>f&&i(s,t)},t)})})},h=e=>{let{size:t,cells:s,onCellClick:i}=e;return s?(0,r.jsx)("div",{className:"grid grid-cols-".concat(t," gap-0"),children:s.map((e,t)=>(0,r.jsx)(f,{row:e,rowIndex:t,onCellClick:i},t))}):null};function u(){let{size:e,gameState:t,cells:s,statusText:n,handleCellClick:o,handleValidation:f}=(0,c.useGameData)();return(0,l.useEffect)(()=>{let e=e=>{e.stopPropagation(),e.preventDefault()," "===e.key&&f()};return window.addEventListener("keydown",e),()=>window.removeEventListener("keydown",e)},[f]),(0,r.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,r.jsxs)("div",{className:"container mx-auto p-4",children:[(0,r.jsx)("h1",{className:"text-2xl mb-4",children:"Competitive game of Life"}),(0,r.jsx)("p",{children:n}),(0,r.jsx)(h,{size:e,cells:s,onCellClick:o}),(t===a.D.PLAYER_A||t===a.D.PLAYER_B)&&(0,r.jsx)(i,{variant:"contained",color:"primary",onClick:f,children:"Validate"})]})})}},3827:function(e,t,s){"use strict";var r,i,l,a;s.d(t,{D:function(){return i},f:function(){return r}}),(l=r||(r={})).EMPTY="empty",l.A="a",l.B="b",(a=i||(i={})).INIT="init",a[a.PLAYER_A=r.A]="PLAYER_A",a[a.PLAYER_B=r.B]="PLAYER_B",a.GAME_OF_LIFE="gol",a.END="end"},3177:function(e,t,s){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=s(6006),i=Symbol.for("react.element"),l=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,n=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,o={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,s){var r,l={},c=null,f=null;for(r in void 0!==s&&(c=""+s),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(f=t.ref),t)a.call(t,r)&&!o.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:f,props:l,_owner:n.current}}t.Fragment=l,t.jsx=c,t.jsxs=c},9268:function(e,t,s){"use strict";e.exports=s(3177)}},function(e){e.O(0,[667,139,744],function(){return e(e.s=1540)}),_N_E=e.O()}]);