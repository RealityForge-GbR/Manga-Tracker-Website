import { ACHIEVEMENT_CYCLE_MS, ACHIEVEMENT_PETALS, achievementPose } from "./landing-achievement-scene.js";

const pct = (ms) => `${(100 * ms / ACHIEVEMENT_CYCLE_MS).toFixed(4)}%`;
const pop = Array.from({length: 23}, (_, i) => {
  const ms = i * 50;
  const p = achievementPose(ms);
  return `${pct(ms)} {opacity:${p.opacity.toFixed(4)};transform:translateY(${p.y.toFixed(3)}px) scale(${p.scale.toFixed(5)})}`;
}).join("\n");
const falls = ACHIEVEMENT_PETALS.map((p, i) => {
  const start = p.delay;
  const end = start + p.duration;
  return `@keyframes achievement-petal-${i} {
    0%,${pct(start)} {opacity:0;transform:translate(0,-12px) rotate(${p.rotation}deg)}
    ${pct(start + 80)} {opacity:${p.alpha}}
    ${pct(start + p.duration * .35)} {opacity:${p.alpha};transform:translate(${p.drift * .5 + 3}cqw,33cqh) rotate(${p.rotation + 45}deg)}
    ${pct(start + p.duration * .7)} {opacity:${p.alpha};transform:translate(${p.drift * .7 - 3}cqw,72cqh) rotate(${p.rotation + 90}deg)}
    ${pct(end)},100% {opacity:0;transform:translate(${p.drift}cqw,112cqh) rotate(${p.rotation + 140}deg)}
  }`;
}).join("\n");

export const LANDING_ACHIEVEMENT_STYLES = `
.showcase-achievements {background:var(--elevated)}
.achievement-scene {position:absolute;inset:172px 16px 23px;margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;overflow:hidden;container-type:size;isolation:isolate}
.achievement-definitions {position:absolute;width:0;height:0;overflow:hidden}
.achievement-petals {position:absolute;inset:0;pointer-events:none}
.achievement-petal {position:absolute;top:0;opacity:0;color:var(--rose);z-index:0}
.achievement-petal.petal-front {z-index:3;color:#ffb6d2}
.achievement-petal>svg {width:100%;height:100%;stroke:none;fill:currentColor}
.achievement-artwork {position:relative;z-index:2;flex:1;min-height:0;width:74%;max-width:250px;transform-origin:50% 60%}
.achievement-artwork>img {display:block;width:100%;height:100%;object-fit:contain}
.achievement-caption {position:relative;z-index:4;display:flex;flex-direction:column;gap:5px;margin:0;text-align:center;line-height:1.3}
.achievement-caption>span {font-size:12px;color:#f3d8e2}
.achievement-caption>strong {font-size:23px;font-weight:600;color:var(--text)}
.achievement-glint {position:absolute;width:12px;height:12px;opacity:0;background:var(--rose);clip-path:polygon(50% 0,61% 39%,100% 50%,61% 61%,50% 100%,39% 61%,0 50%,39% 39%)}
.glint-1 {left:20%;top:26%;--glint-delay:320ms}
.glint-2 {left:83%;top:17%;--glint-delay:405ms}
.glint-3 {left:87%;top:58%;--glint-delay:490ms}
.glint-4 {left:14%;top:69%;--glint-delay:575ms}
.is-achievement-ready .achievement-artwork {animation:achievement-unlock ${ACHIEVEMENT_CYCLE_MS}ms linear infinite both paused}
.is-achievement-ready .achievement-caption {animation:achievement-caption ${ACHIEVEMENT_CYCLE_MS}ms linear infinite both paused}
.is-achievement-ready .achievement-petal {animation-duration:${ACHIEVEMENT_CYCLE_MS}ms;animation-timing-function:linear;animation-iteration-count:infinite;animation-fill-mode:both;animation-play-state:paused}
.is-achievement-ready .achievement-glint {animation:achievement-glint ${ACHIEVEMENT_CYCLE_MS}ms ease var(--glint-delay) infinite both paused}
.is-achievement-playing .achievement-artwork,.is-achievement-playing .achievement-caption,.is-achievement-playing .achievement-petal,.is-achievement-playing .achievement-glint {animation-play-state:running}
@keyframes achievement-unlock {${pop} 88%,100% {opacity:1;transform:translateY(0) scale(1)}}
@keyframes achievement-caption {0% {opacity:0} ${pct(220)},100% {opacity:1}}
@keyframes achievement-glint {0% {opacity:0;transform:scale(.4)} ${pct(350)} {opacity:.8;transform:scale(1.2)} ${pct(700)},100% {opacity:0;transform:scale(.4)}}
${falls}
@media(max-width:760px) {.achievement-scene {inset:162px 14px 20px}.achievement-artwork {max-width:220px}.achievement-caption>strong {font-size:21px}}
@media(prefers-reduced-motion:reduce) {.achievement-scene * {animation:none!important}.achievement-petal,.achievement-glint {display:none}}
`;
