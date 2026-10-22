import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import {createRequire} from "node:module";
import {achievementPose, ACHIEVEMENT_PETALS, LANDING_ACHIEVEMENT_MARKUP} from "../src/landing-achievement-scene.js";
import {LANDING_ACHIEVEMENT_SCRIPT} from "../src/landing-achievement-motion.js";
const {transform} = createRequire(`${process.cwd()}/package.json`)("esbuild");

function scene({loaded=true, hidden=false, reduced=false, media=true, observer=true, broken=false, root=true, script=LANDING_ACHIEVEMENT_SCRIPT}={}) {
  class Events {
    constructor(){this.events=new Map();}
    addEventListener(name,fn){this.events.set(name,fn);}
    fire(name){this.events.get(name)?.();}
  }
  const classes=new Set();
  const image=new Events();
  image.complete=loaded; image.naturalWidth=loaded?683:0;
  const element={querySelector:()=>image,classList:{toggle(name,on){if(on)classes.add(name);else classes.delete(name);}}};
  const document=new Events(); document.hidden=hidden; document.querySelector=()=>root?element:null;
  const preference=new Events(); preference.matches=reduced;
  let notify, disconnected=false;
  const window={};
  if(media)window.matchMedia=()=>preference;
  if(observer)window.IntersectionObserver=class {
    constructor(fn){notify=fn;if(broken)throw new Error("unavailable");}
    observe(target){assert.equal(target,element);}
    disconnect(){disconnected=true;}
  };
  vm.runInNewContext(script,{document,window});
  return {classes,document,image,preference,
    get ready(){return classes.has("is-achievement-ready");},
    get playing(){return classes.has("is-achievement-playing");},
    visible(on=true,ratio=1){notify?.([{target:element,isIntersecting:on,intersectionRatio:ratio}]);},
    unrelated(){notify?.([{target:{},isIntersecting:true,intersectionRatio:1}]);},
    hidden(on=true){document.hidden=on;document.fire("visibilitychange");},
    load(){image.naturalWidth=683;image.fire("load");},
    fail(){image.naturalWidth=0;image.fire("error");},
    reduced(on=true){preference.matches=on;preference.fire("change");},
  };
}

test("Collector Arc uses the app's original artwork, spring, rise and Sakura depth layers",()=>{
  assert.equal(achievementPose(0).opacity,0);
  assert.ok(Math.abs(achievementPose(0).scale-.82)<1e-12);
  assert.equal(achievementPose(0).y,24);
  assert.equal(achievementPose(220).opacity,1);
  assert.ok(achievementPose(180).scale>1.03 && achievementPose(180).scale<1.05);
  assert.equal(achievementPose(350).y,0);
  assert.equal(achievementPose(1101).scale,1);
  assert.equal(ACHIEVEMENT_PETALS.filter(p=>p.front).length,16);
  assert.equal(ACHIEVEMENT_PETALS.filter(p=>!p.front).length,26);
  for(const p of ACHIEVEMENT_PETALS){assert.ok(p.duration>=2200 && p.duration<=3200);assert.ok(p.delay>=0 && p.delay<=650);}
  assert.match(LANDING_ACHIEVEMENT_MARKUP,/src="\/landing\/collection-mascot.webp"/);
  assert.match(LANDING_ACHIEVEMENT_MARKUP,/Collector Arc/);
  assert.doesNotMatch(LANDING_ACHIEVEMENT_SCRIPT,/requestAnimationFrame|setTimeout|setInterval/);
});
test("unloaded art waits for load; offscreen and hidden scenes pause the existing CSS phase",()=>{
  const s=scene({loaded:false});s.visible();assert.equal(s.playing,false);
  s.load();assert.equal(s.playing,true);
  s.hidden();assert.equal(s.playing,false);assert.equal(s.ready,true);
  s.hidden(false);assert.equal(s.playing,true);
  s.visible(false);assert.equal(s.playing,false);assert.equal(s.ready,true);
});
test("an artwork load completing while hidden cannot start playback and errors stop it",()=>{
  const s=scene({loaded:false,hidden:true});s.visible();s.load();assert.equal(s.playing,false);
  s.hidden(false);assert.equal(s.playing,true);
  s.fail();assert.equal(s.playing,false);assert.equal(s.ready,false);
});
test("the animation requires twenty percent visibility and ignores other targets",()=>{
  const s=scene();s.unrelated();assert.equal(s.playing,false);
  s.visible(true,.19);assert.equal(s.playing,false);
  s.visible(true,.2);assert.equal(s.playing,true);
  s.visible(false);s.hidden();s.hidden(false);assert.equal(s.playing,false);
});
test("reduced motion preserves a static original reward and respects preference changes",()=>{
  const s=scene({reduced:true});s.visible();assert.equal(s.ready,false);assert.equal(s.playing,false);
  s.reduced(false);assert.equal(s.playing,true);
  s.reduced();assert.equal(s.playing,false);assert.equal(s.ready,false);
});
test("missing or failed browser features retain static content",()=>{
  for(const options of [{root:false},{media:false},{observer:false},{broken:true}]){
    const s=scene(options);s.visible();assert.equal(s.playing,false);assert.equal(s.ready,false);
  }
});
test("the minified browser controller retains loading and visibility safeguards",async()=>{
  const {code}=await transform(LANDING_ACHIEVEMENT_SCRIPT,{minify:true,keepNames:true,target:"es2022"});
  const s=scene({loaded:false,script:code});s.visible();assert.equal(s.playing,false);
  s.load();assert.equal(s.playing,true);s.reduced();assert.equal(s.playing,false);
});
