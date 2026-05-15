(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5232,t=>{"use strict";var e=t.i(43476);function a(t){let e=1e4*Math.sin(7919*t);return e-Math.floor(e)}function o(t,e=3){return Number(t.toFixed(e)).toString()}t.s(["default",0,function(){return(0,e.jsxs)("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",style:{zIndex:0},children:[[{color:"rgba(212,168,83,0.03)",top:"8%",left:"15%",size:350},{color:"rgba(196,85,77,0.02)",top:"55%",left:"80%",size:280},{color:"rgba(59,139,122,0.02)",top:"75%",left:"25%",size:300}].map((t,a)=>(0,e.jsx)("div",{className:"absolute rounded-full",style:{top:t.top,left:t.left,width:t.size,height:t.size,background:`radial-gradient(circle, ${t.color}, transparent 70%)`,filter:"blur(50px)",transform:"translate(-50%, -50%)",animation:`atmo-breathe ${8+3*a}s ease-in-out infinite ${1.5*a}s`}},`atmo-${a}`)),Array.from({length:30}).map((t,r)=>(0,e.jsx)("div",{className:"absolute rounded-full",style:{left:`${o(100*a(r+1))}%`,top:`${o(100*a(r+101))}%`,width:`${o(1+2*a(r+201))}px`,height:`${o(1+2*a(r+301))}px`,background:`rgba(245,239,224,${o(.05+.1*a(r+401))})`,animation:`atmo-twinkle ${o(3+5*a(r+501))}s ease-in-out infinite ${o(4*a(r+601))}s`}},`star-${r}`)),(0,e.jsx)("style",{children:`
        @keyframes atmo-breathe {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes atmo-twinkle {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.5; }
        }
      `})]})}])}]);