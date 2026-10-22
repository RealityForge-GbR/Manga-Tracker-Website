import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import {createRequire} from "node:module";
import {LANDING_SHOWCASE_SCRIPT} from "../src/landing-showcase-motion.js";
const {transform} = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({mobile=true, reduced=false, hidden=false, images=[1,1,1,1], loaded=true, media=true, observer=true, broken=false, failObserveAt=-1, legacy=false, listener=true, script=LANDING_SHOWCASE_SCRIPT}={}) {
  class Events {
    constructor(){ this.events=new Map(); }
    addEventListener(name,fn){
      const listeners=this.events.get(name) || [];
      listeners.push(fn);this.events.set(name,listeners);
    }
    fire(name){ for(const fn of this.events.get(name) || [])fn(); }
  }
  const document=new Events();document.hidden=hidden;
  const cards=images.map((count)=>{
    const list=Array.from({length:count},()=>{
      const image=new Events();image.complete=loaded;image.naturalWidth=loaded?720:0;
      return image;
    });
    const classes=new Set();
    return {images:list,classes,querySelectorAll:(selector)=>{assert.equal(selector,"img");return list;},classList:{toggle(name,on){if(on)classes.add(name);else classes.delete(name);}}};
  });
  document.querySelectorAll=(selector)=>{assert.equal(selector,".showcase-card");return cards;};
  const viewport=new Events();viewport.matches=mobile;
  const preference=new Events();preference.matches=reduced;
  if(legacy)for(const query of [viewport,preference]){
    query.addListener=(fn)=>query.events.set("change",[...(query.events.get("change") || []),fn]);
    query.addEventListener=undefined;
  }
  if(!listener)for(const query of [viewport,preference]){
    query.addEventListener=undefined;query.addListener=undefined;
  }
  const window={};
  if(media)window.matchMedia=(query)=>query.includes("max-width")?viewport:preference;
  const observations=[];
  let callback, options, constructions=0, disconnections=0;
  if(observer)window.IntersectionObserver=class {
    constructor(fn,settings){constructions++;if(broken)throw new Error("unavailable");callback=fn;options=settings;}
    observe(card){if(observations.length===failObserveAt)throw new Error("observation failed");observations.push(card);}
    disconnect(){disconnections++;}
  };
  const context=vm.createContext({document,window});
  vm.runInContext(script,context);
  return {
    cards,document,viewport,preference,observations,
    get constructions(){return constructions;},get disconnections(){return disconnections;},get options(){return options;},
    ready(i=0){return cards[i].classes.has("is-showcase-card-ready");},
    playing(i=0){return cards[i].classes.has("is-showcase-card-playing");},
    notify(entries){callback?.(entries.map(([index,on=true,ratio=1])=>({target:typeof index==="number"?cards[index]:index,isIntersecting:on,intersectionRatio:ratio})));},
    hide(on=true){document.hidden=on;document.fire("visibilitychange");},
    mobile(on=true){viewport.matches=on;viewport.fire("change");},
    reduce(on=true){preference.matches=on;preference.fire("change");},
    load(i=0,j=0){const image=cards[i].images[j];image.complete=true;image.naturalWidth=720;image.fire("load");},
    fail(i=0,j=0){const image=cards[i].images[j];image.complete=true;image.naturalWidth=0;image.fire("error");},
    rerun(){vm.runInContext(script,context);},
  };
}

test("only visible loaded mobile cards play, including the fourth card",()=>{
  const s=scene();
  assert.equal(s.constructions,1);assert.equal(s.observations.length,4);
  assert.deepEqual(Array.from(s.options.threshold),[0,.2]);
  assert.ok(s.cards.every((_,i)=>s.ready(i) && !s.playing(i)));
  s.notify([[0],[3]]);
  assert.equal(s.playing(0),true);assert.equal(s.playing(3),true);
  assert.equal(s.playing(1),false);assert.equal(s.playing(2),false);
  assert.doesNotMatch(LANDING_SHOWCASE_SCRIPT,/requestAnimationFrame|setTimeout|setInterval/);
});

test("partial observer batches preserve other cards and reject unrelated entries and low visibility",()=>{
  const s=scene();s.notify([[0],[1]]);
  s.notify([[{},true,1],[1,true,.19]]);
  assert.equal(s.playing(0),true);assert.equal(s.playing(1),false);
  s.notify([[1,true,.2],[0,false,1]]);
  assert.equal(s.playing(1),true);assert.equal(s.playing(0),false);
  assert.equal(s.ready(0),true,"offscreen cards keep the ready class and their paused CSS phase");
  s.notify([[1,false,0]]);assert.equal(s.playing(1),false);
});

test("all images in a card must load; image-free cards remain supported and errors stop the affected card",()=>{
  const s=scene({images:[2,1,0,1],loaded:false});s.notify([[0],[1],[2],[3]]);
  assert.equal(s.playing(2),true);assert.equal(s.ready(0),false);
  s.load(0);assert.equal(s.ready(0),false);
  s.load(0,1);assert.equal(s.playing(0),true);
  s.load(1);assert.equal(s.playing(1),true);
  s.fail(0,1);assert.equal(s.ready(0),false);assert.equal(s.playing(0),false);
  assert.equal(s.playing(1),true,"a failed image must not stop other cards");
  s.load(0,1);assert.equal(s.playing(0),true);
});

test("hidden documents pause every card, including an image finishing loading while hidden",()=>{
  const s=scene({loaded:false});s.notify([[0],[3]]);s.hide();
  s.load(0);s.load(3);assert.equal(s.ready(0),true);assert.equal(s.playing(0),false);assert.equal(s.playing(3),false);
  s.hide(false);assert.equal(s.playing(0),true);assert.equal(s.playing(3),true);
  s.notify([[3,false,0]]);s.hide();s.hide(false);
  assert.equal(s.playing(0),true);assert.equal(s.playing(3),false);
});

test("desktop is static and mobile changes reuse one observer without duplicated event listeners",()=>{
  const s=scene({mobile:false});s.notify([[0],[3]]);
  assert.ok(s.cards.every((_,i)=>!s.ready(i) && !s.playing(i)));
  s.mobile();assert.equal(s.playing(0),true);assert.equal(s.playing(3),true);
  s.mobile(false);assert.equal(s.ready(0),false);assert.equal(s.playing(0),false);
  s.mobile();s.rerun();s.mobile(false);s.mobile();
  assert.equal(s.constructions,1);assert.equal(s.observations.length,4);
  assert.equal(s.document.events.get("visibilitychange").length,1);
  assert.equal(s.viewport.events.get("change").length,1);
  assert.equal(s.cards[0].images[0].events.get("load").length,1);
  assert.equal(s.playing(0),true);
});

test("reduced motion and legacy media listeners respond without resetting visibility",()=>{
  const s=scene({reduced:true,legacy:true});s.notify([[0],[3]]);
  assert.equal(s.ready(0),false);assert.equal(s.playing(3),false);
  s.reduce(false);assert.equal(s.playing(0),true);assert.equal(s.playing(3),true);
  s.reduce();assert.equal(s.ready(0),false);assert.equal(s.playing(0),false);
  s.mobile(false);s.reduce(false);assert.equal(s.ready(0),false);
  s.mobile();assert.equal(s.playing(0),true);
  assert.equal(s.constructions,1);
});

test("missing or failed browser features preserve static cards, including later image events",()=>{
  for(const options of [{media:false},{observer:false},{broken:true},{failObserveAt:1},{listener:false}]){
    const s=scene({...options,loaded:false});s.notify([[0],[3]]);s.load(0);s.mobile();s.reduce(false);
    assert.ok(s.cards.every((_,i)=>!s.ready(i) && !s.playing(i)),JSON.stringify(options));
  }
  assert.equal(scene({failObserveAt:1}).disconnections,1);
  assert.equal(scene({images:[]}).constructions,0);
});

test("the minified runtime retains fourth-card loading, preference and visibility safeguards",async()=>{
  const {code}=await transform(LANDING_SHOWCASE_SCRIPT,{minify:true,keepNames:true,target:"es2022"});
  const s=scene({loaded:false,script:code});s.notify([[3]]);
  assert.equal(s.ready(3),false);s.load(3);assert.equal(s.playing(3),true);
  s.hide();assert.equal(s.playing(3),false);assert.equal(s.ready(3),true);
  s.hide(false);s.reduce();assert.equal(s.ready(3),false);
  s.reduce(false);s.mobile(false);assert.equal(s.playing(3),false);assert.equal(s.ready(3),false);
  s.mobile();assert.equal(s.playing(3),true);s.rerun();assert.equal(s.constructions,1);
});
