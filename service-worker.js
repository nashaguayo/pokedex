if(!self.define){let e,l={};const s=(s,o)=>(s=new URL(s+".js",o).href,l[s]||new Promise((l=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=l,document.head.appendChild(e)}else e=s,importScripts(s),l()})).then((()=>{let e=l[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(o,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(l[n])return;let r={};const u=e=>s(e,n),d={module:{uri:n},exports:r,require:u};l[n]=Promise.all(o.map((e=>d[e]||u(e)))).then((e=>(i(...e),r)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"pokedex"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/pokedex/css/222.f95315c0.css",revision:null},{url:"/pokedex/css/4.df1572f4.css",revision:null},{url:"/pokedex/css/407.b973f68d.css",revision:null},{url:"/pokedex/css/437.91eb4c62.css",revision:null},{url:"/pokedex/css/497.ddb9e026.css",revision:null},{url:"/pokedex/css/527.74526f88.css",revision:null},{url:"/pokedex/css/653.b2549846.css",revision:null},{url:"/pokedex/css/928.58e7ed5d.css",revision:null},{url:"/pokedex/css/934.26de57dd.css",revision:null},{url:"/pokedex/css/app.aa0e1378.css",revision:null},{url:"/pokedex/fonts/kanit.23e110ca.ttf",revision:null},{url:"/pokedex/fonts/pokemon-hollow.7ad25a8b.ttf",revision:null},{url:"/pokedex/fonts/pokemon-solid.c76e2194.ttf",revision:null},{url:"/pokedex/fonts/upheaval.512ffeb4.ttf",revision:null},{url:"/pokedex/img/cave.49f196d5.jpg",revision:null},{url:"/pokedex/img/forest.e30c2956.jpeg",revision:null},{url:"/pokedex/img/github-logo.dca37a9c.jpeg",revision:null},{url:"/pokedex/img/grassland.b12d804e.jpeg",revision:null},{url:"/pokedex/img/legendary.d345def9.jpg",revision:null},{url:"/pokedex/img/mountain.cefdcff4.jpeg",revision:null},{url:"/pokedex/img/mystery-pokemon.7c5fdabf.jpg",revision:null},{url:"/pokedex/img/pokeapi.b164a226.png",revision:null},{url:"/pokedex/img/pokeball.svg.a8940122.png",revision:null},{url:"/pokedex/img/pokedex-logo.81bdab2c.png",revision:null},{url:"/pokedex/img/pokemons.3d87c9b9.png",revision:null},{url:"/pokedex/img/rare.f82e8de1.jpg",revision:null},{url:"/pokedex/img/rough-terrain.72564bfd.jpg",revision:null},{url:"/pokedex/img/sea.f1477528.jpg",revision:null},{url:"/pokedex/img/urban.e1d97878.jpg",revision:null},{url:"/pokedex/img/waters-edge.c2029ec6.jpg",revision:null},{url:"/pokedex/index.html",revision:"b7f53833173e9272f2338f6edf136664"},{url:"/pokedex/js/222.a6cdfd8b.js",revision:null},{url:"/pokedex/js/4.4f172a1e.js",revision:null},{url:"/pokedex/js/407.a5a13d79.js",revision:null},{url:"/pokedex/js/437.e6bf86df.js",revision:null},{url:"/pokedex/js/497.36f20dae.js",revision:null},{url:"/pokedex/js/527.f2566ddc.js",revision:null},{url:"/pokedex/js/653.c20479c9.js",revision:null},{url:"/pokedex/js/928.24b6b7c1.js",revision:null},{url:"/pokedex/js/934.3dc3061e.js",revision:null},{url:"/pokedex/js/app.446a005a.js",revision:null},{url:"/pokedex/js/chunk-vendors.03369b69.js",revision:null},{url:"/pokedex/manifest.json",revision:"e3a225216b3416bd536b0ea39dec96ce"},{url:"/pokedex/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map