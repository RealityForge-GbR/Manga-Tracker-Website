import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { LANDING_PRIVACY_SCRIPT } from "../src/landing-privacy-motion.js";
import { LANDING_MOBILE_LOCK_STYLES } from "../src/landing-mobile-lock-styles.js";
import { LANDING_PRIVACY_MARKUP } from "../src/landing-privacy-section.js";

const { build } = createRequire(`${process.cwd()}/package.json`)("esbuild");
class Events {
  constructor() { this.events = new Map(); }
  addEventListener(type, callback) { if (!this.events.has(type)) this.events.set(type, new Set()); this.events.get(type).add(callback); }
  removeEventListener(type, callback) { this.events.get(type)?.delete(callback); }
  fire(type, event) { for (const callback of [...this.events.get(type) || []]) callback(event); }
  count(type) { return this.events.get(type)?.size || 0; }
}
function scene({width=390,height=844,lockHeight=152,reduced=false,hidden=false,visualViewport,legacy=false,raf=true,geometry=true,script=LANDING_PRIVACY_SCRIPT}={}) {
  const element = Object.assign(new Events(), {values:new Map(),classes:new Set(),added:[],reads:0});
  element.style = {setProperty(name,value) { element.values.set(name,value); }};
  element.classList = {
    add(...names) { for (const name of names) { if (!element.classes.has(name)) element.added.push(name); element.classes.add(name); } },
    remove(...names) { for (const name of names) element.classes.delete(name); },
  };
  const box = {top:height+100,height:lockHeight};
  if (geometry) element.getBoundingClientRect=()=>{element.reads++;return {...box};};
  const document = Object.assign(new Events(), {hidden,querySelector:()=>element});
  const preference = Object.assign(new Events(),{matches:reduced});
  const viewport = Object.assign(new Events(),{matches:width<=760});
  if (legacy) for (const media of [preference,viewport]) {
    media.addListener=(callback)=>media.events.set("change",new Set([callback]));
    media.removeListener=(callback)=>media.events.get("change")?.delete(callback);
    media.addEventListener=undefined;media.removeEventListener=undefined;
  }
  const window = Object.assign(new Events(),{innerHeight:height,innerWidth:width,matchMedia:query=>query.includes("max-width")?viewport:preference});
  if (visualViewport) window.visualViewport=Object.assign(new Events(),visualViewport);
  const frames=new Map();let next=0;
  if (raf) {
    window.requestAnimationFrame=callback=>{frames.set(++next,callback);return next;};
    window.cancelAnimationFrame=id=>frames.delete(id);
  }
  const observers=[];
  window.IntersectionObserver=class {
    constructor(callback,options) { this.callback=callback;this.options=options;this.disconnected=false;observers.push(this); }
    observe(target) { assert.equal(target,element); }
    disconnect() { this.disconnected=true; }
  };
  const noTimer=()=>{throw new Error("mobile scroll-close does not need timers or a continuous loop");};
  vm.runInNewContext(script,{document,window,setInterval:noTimer,setTimeout:noTimer,requestAnimationFrame:noTimer});
  const visibility=()=>[...observers].reverse().find(o=>!o.disconnected && !o.options.rootMargin?.includes("-"));
  return {
    element,document,window,box,preference,viewport,frames,observers,
    get progress(){return Number(element.values.get("--mobile-lock-progress"));},
    get snapped(){return element.classes.has("is-mobile-lock-snapped");},
    get glimmer(){return element.classes.has("is-mobile-lock-glimmer-playing");},
    get desktopReady(){return element.classes.has("is-lock-ready");},
    get desktopPlaying(){return element.classes.has("is-lock-playing");},
    flush(){const callbacks=[...frames.values()];frames.clear();for(const callback of callbacks)callback();},
    visible(ratio=1){visibility()?.callback([{target:element,isIntersecting:ratio>0,intersectionRatio:ratio}]);},
    move(top){box.top=top;window.fire("scroll");},
    resize(height){window.innerHeight=height;window.fire("resize");},
    hide(value=true){document.hidden=value;document.fire("visibilitychange");},
    reduce(value=true){preference.matches=value;preference.fire("change");},
    mode(width){window.innerWidth=width;viewport.matches=width<=760;viewport.fire("change");},
    finish(){element.fire("animationend",{animationName:"mobile-lock-glimmer-fade"});},
    midpoint(){[...observers].reverse().find(o=>!o.disconnected&&o.options.rootMargin?.includes("-"))?.callback([{target:element,isIntersecting:true,intersectionRatio:1}]);},
  };
}
const near=(a,b)=>assert.ok(Math.abs(a-b)<.00002,`${a} should be near ${b}`);

test("mobile lock starts at 10% entering and snaps with its centre at the viewport centre",()=>{
  const s=scene();const start=844-.1*152,close=(844-152)/2;
  assert.equal(s.progress,0);assert.equal(s.element.reads,0);
  s.visible(.09);s.flush();assert.equal(s.element.reads,0);
  s.box.top=start;s.visible(.1);s.flush();near(s.progress,0);
  s.move((start+close)/2);s.flush();near(s.progress,.5);
  assert.ok(Number.parseFloat(s.element.values.get("--mobile-lock-lift"))<0);assert.equal(s.snapped,false);
  s.move(close);s.flush();near(s.progress,1);assert.equal(s.snapped,true);assert.equal(s.glimmer,true);
  assert.equal(s.window.count("scroll"),0);assert.equal(s.frames.size,0);
  s.finish();assert.equal(s.glimmer,false);assert.ok(s.observers.every(o=>o.disconnected));
});

test("closing progress never reverses and a closed lock never reopens",()=>{
  const s=scene();const start=844-15.2,close=346;
  s.box.top=start-(start-close)*.7;s.visible();s.flush();near(s.progress,.7);
  s.move(start-(start-close)*.2);s.flush();near(s.progress,.7);
  s.move(close);s.flush();s.finish();const reads=s.element.reads;
  s.move(900);s.visible(0);s.hide();s.hide(false);s.reduce();s.reduce(false);s.visible();s.flush();
  near(s.progress,1);assert.equal(s.frames.size,0);assert.equal(s.element.reads,reads);
  assert.equal(s.element.added.filter(name=>name==="is-mobile-lock-snapped").length,1);
});

test("fast scrolling closes once without delaying the snap beyond the screen midpoint",()=>{
  const s=scene();s.box.top=100;s.visible();s.flush();near(s.progress,1);assert.equal(s.snapped,true);
  assert.equal(s.element.added.filter(name=>name==="is-mobile-lock-snapped").length,1);
});

test("coalesced event measurements pause while hidden or offscreen and never run as a loop",()=>{
  const s=scene();s.box.top=700;s.visible();assert.equal(s.frames.size,1);
  for(let i=0;i<12;i++)s.move(680);assert.equal(s.frames.size,1);
  s.flush();assert.equal(s.frames.size,0);assert.equal(s.element.reads,1);
  s.move(650);s.hide();assert.equal(s.frames.size,0);assert.equal(s.window.count("scroll"),0);
  s.move(500);s.flush();assert.equal(s.element.reads,1);
  s.hide(false);s.flush();assert.equal(s.element.reads,2);
  s.visible(0);s.move(450);s.flush();assert.equal(s.element.reads,2);
  s.visible();s.flush();assert.equal(s.element.reads,3);
});

test("the brief snap glimmer pauses with visibility and finishes permanently",()=>{
  const s=scene();s.box.top=300;s.visible();s.flush();assert.equal(s.glimmer,true);
  s.hide();assert.equal(s.glimmer,false);s.hide(false);assert.equal(s.glimmer,true);
  s.visible(0);assert.equal(s.glimmer,false);s.visible();assert.equal(s.glimmer,true);
  s.finish();assert.equal(s.glimmer,false);s.hide();s.hide(false);assert.equal(s.glimmer,false);
});

test("mobile reduced motion closes statically and can never restart the lock or glimmer",()=>{
  for(const legacy of [false,true]) {
    const initial=scene({reduced:true,legacy});near(initial.progress,1);assert.equal(initial.observers.length,0);assert.equal(initial.glimmer,false);
    initial.reduce(false);initial.visible();initial.flush();near(initial.progress,1);
    const s=scene({legacy});s.box.top=600;s.visible();s.flush();assert.ok(s.progress>0&&s.progress<1);
    s.reduce();near(s.progress,1);assert.equal(s.snapped,false);assert.equal(s.glimmer,false);assert.equal(s.window.count("scroll"),0);
    s.reduce(false);s.visible();s.flush();near(s.progress,1);
  }
});

test("mobile geometry follows the actual symbol and viewport height, including visual viewport changes",()=>{
  for(const [height,lockHeight] of [[568,152],[932,180],[640,96]]) {
    const s=scene({height,lockHeight});const start=height-.1*lockHeight,close=(height-lockHeight)/2;
    s.box.top=(start+close)/2;s.visible();s.flush();near(s.progress,.5);
    s.move(close);s.flush();near(s.progress,1);
  }
  const s=scene({visualViewport:{height:700,offsetTop:20}});
  s.box.top=(700-.1*152+(700-152)/2)/2+20;s.visible();s.flush();near(s.progress,.5);
  s.window.visualViewport.height=500;s.window.visualViewport.fire("resize");s.flush();near(s.progress,.5);
  s.move((500-152)/2+20);s.flush();near(s.progress,1);
});

test("a breakpoint change cannot reopen a partly or fully closed lock",()=>{
  const s=scene();s.box.top=600;s.visible();s.flush();assert.ok(s.progress>0);
  s.mode(820);assert.equal(s.desktopReady,false);assert.equal(s.desktopPlaying,false);
  assert.equal(s.element.classes.has("is-mobile-lock"),false);
  s.mode(390);near(s.progress,1);assert.equal(s.glimmer,false);
  const desktop=scene({width:820});desktop.visible();assert.equal(desktop.desktopPlaying,false);desktop.midpoint();assert.equal(desktop.desktopPlaying,true);
  desktop.mode(390);near(desktop.progress,1);assert.equal(desktop.glimmer,false);
});

test("missing mobile capabilities leave the default closed illustration",()=>{
  for(const options of [{raf:false},{geometry:false}]) {
    const s=scene(options);assert.equal(s.element.classes.has("is-mobile-lock"),false);
    assert.equal(s.observers.length,0);assert.equal(s.window.count("scroll"),0);
  }
});

test("six short orange glimmers are mobile-only and reduced-motion safe",()=>{
  assert.equal((LANDING_PRIVACY_MARKUP.match(/class="mobile-lock-glimmer"/g)||[]).length,6);
  assert.match(LANDING_PRIVACY_MARKUP,/class="mobile-lock-glimmers" fill="#F6A35E"/);
  assert.match(LANDING_MOBILE_LOCK_STYLES,/\.mobile-lock-glimmers \{display:none\}/);
  assert.match(LANDING_MOBILE_LOCK_STYLES,/@media\(max-width:760px\)/);
  assert.match(LANDING_MOBILE_LOCK_STYLES,/@media\(prefers-reduced-motion:reduce\).*display:none!important/);
});

test("the mobile literal controller survives Worker bundling and keepNames",async()=>{
  const {outputFiles}=await build({entryPoints:[fileURLToPath(new URL("../src/landing-privacy-motion.js",import.meta.url))],bundle:true,write:false,format:"esm",platform:"browser",keepNames:true,minify:true,logLevel:"silent"});
  const bundled=await import("data:text/javascript;base64,"+Buffer.from(outputFiles[0].text).toString("base64"));
  const s=scene({script:bundled.LANDING_PRIVACY_SCRIPT});s.box.top=600;s.visible();s.flush();assert.ok(s.progress>0&&s.progress<1);
  s.move(300);s.flush();near(s.progress,1);assert.equal(s.glimmer,true);
});
