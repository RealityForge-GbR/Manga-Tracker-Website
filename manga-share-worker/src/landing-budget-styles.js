import { PARCEL_FRAME_COUNT } from "./landing-budget-parcel.js";
import { PURCHASE_FLIGHT_FRAMES, PURCHASE_TURN_FRAMES, REJECTED_FLIGHT_FRAMES, REJECTED_TURN_FRAMES } from "./landing-budget-flight.js";
const parcelEnd = ((PARCEL_FRAME_COUNT - 1) / PARCEL_FRAME_COUNT * 100).toFixed(10);
// The fixed set of layers grows out of the frame without adding DOM elements.
const ownedLayers = Array.from({ length:3 }, (_, added) => `.is-cycle-ready[data-cycle-added="${added}"] .cycle-stack-book:nth-child(n+${9 + added}) {visibility:hidden}`).join("\n");

export const LANDING_BUDGET_STYLES = `
.planning.section {padding-block:55px 100px}
.planning>.planning-grid {margin-top:85px}
.budget-cycle {
  --cycle-error:#e58a92;--cycle-owned:10;
  position:relative;width:100%;padding:16px 0 14px;overflow-x:clip;overflow-y:visible;isolation:isolate;
  font-variant-numeric:tabular-nums
}
.budget-cycle::before {content:"";position:absolute;inset:0;z-index:-1;background:var(--secondary);border-block:1px solid var(--bordeaux);transform:skewY(-1.4deg);pointer-events:none}
.budget-cycle-heading {transform:translateY(16px);position:relative;z-index:6;text-align:center;padding-inline:24px}
.budget-cycle-heading h2 {margin:0;font-size:clamp(23px,2.3vw,29px);line-height:1.25;font-weight:550;letter-spacing:-.035em;color:var(--text)}
.cycle-stage {
  --shop-x:17%;--gate-x:50%;--stack-x:83%;--book-y:124px;--stack-tail:28px;
  --book-width:190px;--layer-step:18px;--flight-lift:-20px;
  --parcel-width:214px;--parcel-top:79px;--budget-size:210px;--budget-top:65px;
  --parcel-rise:calc(var(--parcel-top) + var(--parcel-width) * .22 - var(--book-y) - var(--book-width) * .5 - 12px);
  --reject-gap:calc(var(--budget-size) * .5 + var(--book-width) * .5 - 7px);
  position:relative;width:min(1280px,calc(100% - 64px));height:320px;margin:0 auto;isolation:isolate
}
.cycle-stage svg {display:block;fill:none;stroke:none;stroke-width:1;overflow:visible}
.cycle-parcel-back,.cycle-parcel-front {position:absolute;left:var(--shop-x);top:var(--parcel-top);width:var(--parcel-width);transform:translateX(-50%);pointer-events:none}
.cycle-parcel-back {z-index:1}.cycle-parcel-front {z-index:4}
.cycle-parcel-art {width:100%;height:auto;aspect-ratio:12/11}
.parcel-flap-window {position:absolute;inset:0;overflow:clip;pointer-events:none}
.parcel-frame-strip {position:absolute;top:0;left:0;width:${PARCEL_FRAME_COUNT * 100}%;height:100%;max-width:none;transform:translateX(0)}
.is-cycle-ready .parcel-frame-strip {transform:translateX(-${parcelEnd}%)}
.is-cycle-ready[data-cycle-stage="initial"] .parcel-frame-strip {animation:parcel-open .75s steps(${PARCEL_FRAME_COUNT - 1},end) both}
.is-cycle-ready[data-cycle-stage="closing"] .parcel-frame-strip {animation:parcel-close .75s steps(${PARCEL_FRAME_COUNT - 1},end) both}
.budget-cycle[data-cycle-stage="complete"] .parcel-frame-strip {transform:translateX(0)}
.cycle-budget {position:absolute;inset:0;pointer-events:none;z-index:5}
.cycle-budget-wallet {position:absolute;left:var(--gate-x);top:var(--budget-top);width:var(--budget-size);height:auto;aspect-ratio:24/19;transform:translateX(-50%) rotate(-4deg)}
.cycle-budget-amount {position:absolute;left:calc(var(--gate-x) - var(--budget-size) * .025);top:calc(var(--budget-top) + var(--budget-size) * .18);width:calc(var(--budget-size) * .82);transform:translateX(-50%);text-align:center}
.cycle-budget-amount>span {display:block;font-size:13px;line-height:18px;color:var(--muted)}
.cycle-budget-amount>strong,.cycle-zero-alert {display:block;margin-top:7px;font-size:47px;line-height:1.1;letter-spacing:-.045em;font-weight:600;color:var(--text)}
.cycle-zero-alert {position:absolute;top:18px;left:0;right:0;opacity:0;color:var(--cycle-error)}
.cycle-budget-slots {position:absolute;left:calc(var(--gate-x) - var(--budget-size) * .305);top:calc(var(--budget-top) + var(--budget-size) * .60);width:calc(var(--budget-size) * .56);height:5px;display:flex;gap:7px}
.cycle-budget-slots>i {flex:1;border-radius:3px;background:var(--rose);opacity:clamp(.12,calc(var(--cycle-budget-level,0) * 2 - var(--slot)),1);transition:opacity .3s ease-out}
.cycle-debit {position:absolute;left:calc(var(--gate-x) - var(--budget-size) * .3);top:calc(var(--budget-top) - 25px);opacity:0;color:var(--cycle-error);font-size:17px;font-weight:600;white-space:nowrap}
.cycle-collection-value {position:absolute;left:var(--stack-x);top:8px;width:210px;transform:translateX(-50%);text-align:center;z-index:6}
.cycle-collection-value>span:not([hidden]) {display:block;color:var(--muted);font-size:14px;line-height:20px}
.cycle-collection-value>strong {display:block;margin-top:8px;color:var(--text);font-size:48px;line-height:1.05;font-weight:600;letter-spacing:-.04em}
.cycle-collection-value>[hidden] {display:none}
.cycle-stack-window {position:absolute;inset:var(--book-y) 0 calc(var(--stack-tail) * -1);overflow:clip;mask-image:linear-gradient(to bottom,#000 0%,#000 34%,#000c 52%,#0006 74%,#0002 90%,transparent 100%);pointer-events:none;z-index:2}
.cycle-stack {position:absolute;left:var(--stack-x);top:0;width:var(--book-width);height:600px;transform:translateX(-50%)}
.cycle-stack-book,.cycle-stack-continuation-book {position:absolute;left:0;top:0;width:100%;height:auto;z-index:calc(var(--book-index) + 1);--stack-offset:calc((var(--cycle-owned) - 1 - var(--book-index)) * var(--layer-step));transform:translate3d(var(--book-lean),var(--stack-offset),0)}
.cycle-volume-art {width:100%;height:auto;aspect-ratio:2}
${ownedLayers}
.is-cycle-ready[data-cycle-added="1"] .cycle-stack-book:nth-child(9),.is-cycle-ready[data-cycle-added="2"] .cycle-stack-book:nth-child(10) {animation:none}
.budget-cycle.is-cycle-playing .cycle-flight {will-change:transform,opacity}
.budget-cycle.is-cycle-playing .cycle-flying-volume,.budget-cycle.is-cycle-playing .cycle-stack-book,.budget-cycle.is-cycle-playing .cycle-stack-continuation-book,.budget-cycle.is-cycle-playing .parcel-frame-strip {will-change:transform}
.is-cycle-ready[data-cycle-stage="landed"] .cycle-stack-book,.is-cycle-ready[data-cycle-stage="landed"] .cycle-stack-continuation-book {animation:cycle-stack-settle .2s cubic-bezier(.22,.7,.3,1) both}
.is-cycle-ready[data-cycle-stage="landed"] .cycle-collection-value>strong {animation:cycle-value-settle .2s ease-out both}

.cycle-flight {position:absolute;inset:0;z-index:3;opacity:0;pointer-events:none}
.cycle-flying-volume {position:absolute;left:var(--shop-x);top:var(--book-y);width:var(--book-width);margin-left:calc(var(--book-width) / -2);transform-origin:50% 70%}
.is-cycle-ready[data-cycle-stage="purchase"] .cycle-flight {animation:cycle-purchase-flight 2.2s linear both}
.is-cycle-ready[data-cycle-stage="purchase"] .cycle-flying-volume {animation:cycle-volume-turn 2.2s linear both}
.is-cycle-ready[data-cycle-charge] .cycle-debit {animation:cycle-debit-flash .65s ease-out both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flight {animation:cycle-rejected-flight 3.8s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flying-volume {animation:cycle-return-turn 3.8s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-budget-wallet {animation:cycle-budget-shake 3.8s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-zero-alert {animation:cycle-budget-error 3.8s linear both}
.cycle-impact {position:absolute;left:var(--stack-x);top:calc(var(--book-y) + 8px);width:var(--book-width);height:42px;margin-left:calc(var(--book-width) / -2);z-index:4;opacity:0;pointer-events:none}
.cycle-impact i {position:absolute;top:0;width:2px;height:12px;border-radius:2px;background:var(--rose)}
.cycle-impact i:nth-child(1) {left:5%;transform:rotate(-40deg)}
.cycle-impact i:nth-child(2) {right:5%;transform:rotate(40deg)}
.cycle-impact i:nth-child(3) {left:50%;top:-8px;height:8px}
.is-cycle-ready[data-cycle-stage="landed"] .cycle-impact {animation:cycle-land-mark .18s ease-out both}
.budget-cycle.is-cycle-ready .cycle-flight,.budget-cycle.is-cycle-ready .cycle-flying-volume,.budget-cycle.is-cycle-ready .cycle-debit,.budget-cycle.is-cycle-ready .cycle-budget-wallet,.budget-cycle.is-cycle-ready .cycle-zero-alert,.budget-cycle.is-cycle-ready .cycle-impact,.budget-cycle.is-cycle-ready .parcel-frame-strip,.budget-cycle.is-cycle-ready .cycle-stack-book,.budget-cycle.is-cycle-ready .cycle-stack-continuation-book,.budget-cycle.is-cycle-ready .cycle-collection-value>strong {animation-play-state:paused}
.budget-cycle.is-cycle-playing .cycle-flight,.budget-cycle.is-cycle-playing .cycle-flying-volume,.budget-cycle.is-cycle-playing .cycle-debit,.budget-cycle.is-cycle-playing .cycle-budget-wallet,.budget-cycle.is-cycle-playing .cycle-zero-alert,.budget-cycle.is-cycle-playing .cycle-impact,.budget-cycle.is-cycle-playing .parcel-frame-strip,.budget-cycle.is-cycle-playing .cycle-stack-book,.budget-cycle.is-cycle-playing .cycle-stack-continuation-book,.budget-cycle.is-cycle-playing .cycle-collection-value>strong {animation-play-state:running}
.budget-cycle-ending {transform:translateY(-16px);position:relative;z-index:6;text-align:center;padding-inline:22px;margin:0;font-size:clamp(18px,1.8vw,23px);line-height:1.3;letter-spacing:-.025em;font-weight:500;color:var(--text)}
@keyframes parcel-open {from {transform:translateX(0)}to {transform:translateX(-${parcelEnd}%)}}
@keyframes parcel-close {from {transform:translateX(-${parcelEnd}%)}to {transform:translateX(0)}}
@keyframes cycle-purchase-flight {${PURCHASE_FLIGHT_FRAMES}}
@keyframes cycle-volume-turn {${PURCHASE_TURN_FRAMES}}
@keyframes cycle-rejected-flight {${REJECTED_FLIGHT_FRAMES}}
@keyframes cycle-return-turn {${REJECTED_TURN_FRAMES}}
@keyframes cycle-budget-shake {
  0%,39%,50%,57%,68%,100% {transform:translateX(-50%) rotate(-4deg)}
  42%,60% {transform:translateX(calc(-50% + 2px)) rotate(-3deg)}
  46%,64% {transform:translateX(calc(-50% - 2px)) rotate(-5deg)}
}
@keyframes cycle-budget-error {0%,39%,49%,57%,67%,100% {opacity:0}41%,44%,59%,62% {opacity:1}}
@keyframes cycle-stack-settle {from {transform:translate3d(var(--book-lean),calc(var(--stack-offset) - var(--layer-step)),0)}to {transform:translate3d(var(--book-lean),var(--stack-offset),0)}}
@keyframes cycle-value-settle {0% {transform:translateY(0) scale(1)}40% {transform:translateY(-1px) scale(1.025)}100% {transform:translateY(0) scale(1)}}
@keyframes cycle-debit-flash {0% {opacity:0;transform:translateY(5px)}20%,45% {opacity:1;transform:translateY(0)}100% {opacity:0;transform:translateY(-12px)}}
@keyframes cycle-land-mark {0% {opacity:1;transform:translateY(3px) scale(.9)}100% {opacity:0;transform:translateY(-4px) scale(1.1)}}
@media(max-width:760px) {
  .planning.section {padding-block:32px 48px}
  .planning>.planning-grid {margin-top:48px}
  .budget-cycle {padding-block:16px 12px}
  .budget-cycle-heading {transform:translateY(8px)}
  .budget-cycle-heading h2 {font-size:clamp(18px,5.4vw,25px);max-width:500px;margin-inline:auto}
  .cycle-stage {
    --shop-x:14%;--gate-x:52%;--stack-x:85%;
    --book-width:104px;--layer-step:14px;--flight-lift:-40px;--book-y:144px;--stack-tail:48px;
    --parcel-width:120px;--parcel-top:117px;--budget-size:122px;--budget-top:82px;
    width:calc(100% - 32px);height:284px
  }
  .cycle-budget-amount>span {font-size:10px;line-height:14px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:31px;margin-top:4px}
  .cycle-zero-alert {top:14px}
  .cycle-debit {font-size:12px}
  .cycle-budget-slots {height:4px;gap:4px}
  .cycle-collection-value {width:114px;top:14px}
  .cycle-collection-value>span:not([hidden]) {font-size:11px;line-height:16px}
  .cycle-collection-value>strong {font-size:34px;margin-top:8px}
  .cycle-stack-window {mask-image:linear-gradient(to bottom,#000 0%,#000 20%,#0009 42%,#0003 64%,#0001 75%,transparent 100%)}
  .budget-cycle-ending {transform:translateY(-8px);font-size:18px;max-width:350px;margin:0 auto;padding-inline:18px}
}
@media(max-width:360px) {
  .cycle-stage {--stack-x:86%;--book-width:90px;--parcel-width:112px;--parcel-top:125px;--budget-size:104px;--budget-top:90px;width:calc(100% - 24px)}
  .cycle-collection-value {width:94px}
  .cycle-collection-value>span:not([hidden]) {font-size:10px}
  .cycle-collection-value>strong {font-size:31px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:28px}
}
`;
