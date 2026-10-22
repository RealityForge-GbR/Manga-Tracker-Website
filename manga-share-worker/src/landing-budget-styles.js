// The fixed set of layers grows out of the frame without adding DOM elements.
const ownedLayers = Array.from({ length:4 }, (_, added) => `.is-cycle-ready[data-cycle-added="${added}"] .cycle-stack-book:nth-child(n+${9 + added}) {visibility:hidden}`).join("\n");

export const LANDING_BUDGET_STYLES = `
.planning.section {padding-block:55px 100px}
.planning>.planning-grid {margin-top:85px}
.budget-cycle {
  --cycle-error:#e58a92;--cycle-owned:11;
  position:relative;width:100%;padding:24px 0 20px;overflow:visible;isolation:isolate;
  font-variant-numeric:tabular-nums
}
.budget-cycle::before {content:"";position:absolute;inset:0;z-index:-1;background:var(--secondary);border-block:1px solid var(--bordeaux);transform:skewY(-1.4deg);pointer-events:none}
.budget-cycle-heading {position:relative;z-index:6;text-align:center;padding-inline:24px}
.budget-cycle-heading h2 {margin:0;font-size:clamp(23px,2.3vw,29px);line-height:1.25;font-weight:550;letter-spacing:-.035em;color:var(--text)}
.cycle-stage {
  --shop-x:17%;--gate-x:50%;--stack-x:83%;--book-y:142px;
  --book-width:190px;--layer-step:18px;--flight-lift:-108px;
  --parcel-width:214px;--parcel-top:97px;--budget-size:210px;--budget-top:83px;
  --parcel-rise:calc(var(--parcel-top) + var(--parcel-width) * .22 - var(--book-y) - var(--book-width) * .5 - 12px);
  --reject-gap:calc(var(--budget-size) * .5 + var(--book-width) * .5 - 7px);
  position:relative;width:min(1280px,calc(100% - 64px));height:300px;margin:0 auto;isolation:isolate
}
.cycle-stage svg {display:block;fill:none;stroke:none;stroke-width:1;overflow:visible}
.cycle-parcel-back,.cycle-parcel-front {position:absolute;left:var(--shop-x);top:var(--parcel-top);width:var(--parcel-width);transform:translateX(-50%);pointer-events:none}
.cycle-parcel-back {z-index:1}.cycle-parcel-front {z-index:4}
.cycle-parcel-art {width:100%;height:auto;aspect-ratio:12/11}
.parcel-flap {transform-box:view-box}
.parcel-flap-back-left {transform-origin:83px 66px}
.parcel-flap-back-right {transform-origin:162px 70px}
.parcel-flap-front-left {transform-origin:79px 104px}
.parcel-flap-front-right {transform-origin:160px 108px}
.is-cycle-ready .parcel-flap-back-left,.is-cycle-ready .parcel-flap-back-right {animation:parcel-open-back .75s cubic-bezier(.2,.8,.2,1) both}
.is-cycle-ready .parcel-flap-front-left,.is-cycle-ready .parcel-flap-front-right {animation:parcel-open-front .75s cubic-bezier(.2,.8,.2,1) both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-parcel-art {animation:parcel-catch 3.8s ease-out both}
.cycle-budget {position:absolute;inset:0;pointer-events:none;z-index:5}
.cycle-budget-wallet {position:absolute;left:var(--gate-x);top:var(--budget-top);width:var(--budget-size);height:auto;aspect-ratio:24/19;transform:translateX(-50%) rotate(-4deg)}
.cycle-budget-amount {position:absolute;left:calc(var(--gate-x) - var(--budget-size) * .025);top:calc(var(--budget-top) + var(--budget-size) * .18);width:calc(var(--budget-size) * .82);transform:translateX(-50%);text-align:center}
.cycle-budget-amount>span {display:block;font-size:13px;line-height:18px;color:var(--muted)}
.cycle-budget-amount>strong,.cycle-zero-alert {display:block;margin-top:7px;font-size:47px;line-height:1.1;letter-spacing:-.045em;font-weight:600;color:var(--text)}
.cycle-zero-alert {position:absolute;top:18px;left:0;right:0;opacity:0;color:var(--cycle-error)}
.cycle-budget-slots {position:absolute;left:calc(var(--gate-x) - var(--budget-size) * .305);top:calc(var(--budget-top) + var(--budget-size) * .60);width:calc(var(--budget-size) * .56);height:5px;display:flex;gap:7px}
.cycle-budget-slots>i {flex:1;border-radius:3px;background:var(--rose);opacity:clamp(.12,calc(var(--cycle-budget-level,0) * 3 - var(--slot)),1);transition:opacity .3s ease-out}
.cycle-debit {position:absolute;left:calc(var(--gate-x) + var(--budget-size) * .59);top:calc(var(--budget-top) + var(--budget-size) * .46);opacity:0;color:var(--cycle-error);font-size:17px;font-weight:600;white-space:nowrap}
.cycle-budget-seal {position:absolute;left:calc(var(--gate-x) + var(--budget-size) * .398);top:calc(var(--budget-top) + var(--budget-size) * .32);width:14px;height:14px;transform:translateX(-50%);opacity:0}
.cycle-budget-seal rect,.cycle-budget-seal path {fill:none;stroke:var(--rose);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.budget-cycle[data-cycle-empty="true"] .cycle-budget-seal {opacity:1}
.budget-cycle[data-cycle-empty="true"] .cycle-wallet-dot {opacity:0}
.cycle-collection-value {position:absolute;left:var(--stack-x);top:26px;width:210px;transform:translateX(-50%);text-align:center;z-index:6}
.cycle-collection-value>span:not([hidden]) {display:block;color:var(--muted);font-size:14px;line-height:20px}
.cycle-collection-value>strong {display:block;margin-top:8px;color:var(--text);font-size:48px;line-height:1.05;font-weight:600;letter-spacing:-.04em}
.cycle-collection-value>[hidden] {display:none}
.cycle-stack-window {position:absolute;inset:0;overflow:clip;mask-image:linear-gradient(#000 84%,transparent 100%);pointer-events:none;z-index:2}
.cycle-stack {position:absolute;left:var(--stack-x);top:var(--book-y);width:var(--book-width);height:600px;transform:translateX(-50%)}
.cycle-stack-book {position:absolute;left:0;top:0;width:100%;height:auto;z-index:calc(var(--book-index) + 1);transform:translate(var(--book-lean),calc((var(--cycle-owned) - 1 - var(--book-index)) * var(--layer-step)));transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.cycle-volume-art {width:100%;height:auto;aspect-ratio:2}
${ownedLayers}
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
.budget-cycle.is-cycle-ready .cycle-flight,.budget-cycle.is-cycle-ready .cycle-flying-volume,.budget-cycle.is-cycle-ready .cycle-debit,.budget-cycle.is-cycle-ready .cycle-budget-wallet,.budget-cycle.is-cycle-ready .cycle-zero-alert,.budget-cycle.is-cycle-ready .cycle-impact,.budget-cycle.is-cycle-ready .parcel-flap,.budget-cycle.is-cycle-ready .cycle-parcel-art {animation-play-state:paused}
.budget-cycle.is-cycle-playing .cycle-flight,.budget-cycle.is-cycle-playing .cycle-flying-volume,.budget-cycle.is-cycle-playing .cycle-debit,.budget-cycle.is-cycle-playing .cycle-budget-wallet,.budget-cycle.is-cycle-playing .cycle-zero-alert,.budget-cycle.is-cycle-playing .cycle-impact,.budget-cycle.is-cycle-playing .parcel-flap,.budget-cycle.is-cycle-playing .cycle-parcel-art {animation-play-state:running}
.budget-cycle-ending {position:relative;z-index:6;text-align:center;padding-inline:22px;margin:8px 0 0;font-size:clamp(18px,1.8vw,23px);line-height:1.3;letter-spacing:-.025em;font-weight:500;color:var(--text)}
@keyframes parcel-open-back {0% {transform:scaleY(.04)}100% {transform:scaleY(1)}}
@keyframes parcel-open-front {0% {transform:scaleY(.06) rotate(-8deg)}100% {transform:scaleY(1) rotate(0deg)}}
@keyframes parcel-catch {0%,94%,100% {transform:translateY(0)}97% {transform:translateY(2px)}}
@keyframes cycle-purchase-flight {
  0% {opacity:0;transform:translate(0,35px);animation-timing-function:ease-out}
  8% {opacity:1;transform:translate(0,18px);animation-timing-function:cubic-bezier(.25,.5,.4,1)}
  28% {opacity:1;transform:translate(0,var(--parcel-rise));animation-timing-function:cubic-bezier(.4,.05,.4,1)}
  44% {opacity:1;transform:translate(calc((var(--gate-x) - var(--shop-x)) * .32),var(--parcel-rise));animation-timing-function:cubic-bezier(.3,.1,.4,1)}
  60% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x)),0);animation-timing-function:cubic-bezier(.25,.55,.35,1)}
  81% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x) - 9%),var(--flight-lift));animation-timing-function:cubic-bezier(.45,0,.75,.5)}
  98% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x)),1px)}
  100% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x)),0)}
}
@keyframes cycle-volume-turn {
  0% {transform:rotate(0deg) scale(.35)}
  18% {transform:rotate(0deg) scale(.65)}
  28%,60% {transform:rotate(-2deg) scale(1)}
  81% {transform:rotate(1deg) scale(1)}
  98%,100% {transform:rotate(0deg) scale(1)}
}
@keyframes cycle-rejected-flight {
  0% {opacity:0;transform:translate(0,35px)}
  8% {opacity:1;transform:translate(0,18px);animation-timing-function:ease-out}
  28% {opacity:1;transform:translate(0,var(--parcel-rise));animation-timing-function:cubic-bezier(.3,.1,.4,1)}
  44% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap)),0);animation-timing-function:ease-out}
  51%,54% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap) - 18px),-9px);animation-timing-function:ease-in-out}
  63% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap)),0);animation-timing-function:ease-out}
  70% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap) - 22px),-12px);animation-timing-function:ease-in-out}
  84% {opacity:1;transform:translate(0,var(--parcel-rise));animation-timing-function:cubic-bezier(.4,0,.6,1)}
  96% {opacity:1;transform:translate(0,20px)}
  100% {opacity:0;transform:translate(0,40px)}
}
@keyframes cycle-return-turn {
  0% {transform:rotate(0deg) scale(.35)}18% {transform:rotate(0deg) scale(.65)}28% {transform:rotate(-2deg) scale(1)}
  44% {transform:rotate(2deg) scale(1)}51%,54% {transform:rotate(-6deg) scale(1)}
  63% {transform:rotate(2deg) scale(1)}70% {transform:rotate(-7deg) scale(1)}
  84% {transform:rotate(-2deg) scale(.76)}92% {transform:rotate(0deg) scale(.45)}100% {transform:rotate(0deg) scale(.3)}
}
@keyframes cycle-budget-shake {
  0%,43%,54%,62%,73%,100% {transform:translateX(-50%) rotate(-4deg)}
  45%,64% {transform:translateX(calc(-50% + 2px)) rotate(-3deg)}
  49%,68% {transform:translateX(calc(-50% - 2px)) rotate(-5deg)}
}
@keyframes cycle-budget-error {0%,43%,53%,62%,73%,100% {opacity:0}44%,47%,63%,66% {opacity:1}}
@keyframes cycle-debit-flash {0% {opacity:0;transform:translateY(5px)}20%,45% {opacity:1;transform:translateY(0)}100% {opacity:0;transform:translateY(-12px)}}
@keyframes cycle-land-mark {0% {opacity:1;transform:translateY(3px) scale(.9)}100% {opacity:0;transform:translateY(-4px) scale(1.1)}}
@media(max-width:760px) {
  .planning.section {padding-block:32px 48px}
  .planning>.planning-grid {margin-top:48px}
  .budget-cycle {padding-block:22px 20px}
  .budget-cycle-heading h2 {font-size:clamp(18px,5.4vw,25px);max-width:500px;margin-inline:auto}
  .cycle-stage {
    --shop-x:14%;--gate-x:52%;--stack-x:85%;
    --book-width:104px;--layer-step:14px;--flight-lift:-60px;--book-y:166px;
    --parcel-width:120px;--parcel-top:139px;--budget-size:122px;--budget-top:104px;
    width:calc(100% - 32px);height:312px
  }
  .cycle-budget-amount>span {font-size:10px;line-height:14px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:31px;margin-top:4px}
  .cycle-zero-alert {top:14px}
  .cycle-debit {font-size:12px}
  .cycle-budget-seal {width:10px;height:10px}
  .cycle-budget-slots {height:4px;gap:4px}
  .cycle-collection-value {width:114px;top:36px}
  .cycle-collection-value>span:not([hidden]) {font-size:11px;line-height:16px}
  .cycle-collection-value>strong {font-size:34px;margin-top:8px}
  .cycle-stack-window {mask-image:linear-gradient(#000 87%,transparent 100%)}
  .budget-cycle-ending {font-size:18px;max-width:350px;margin:5px auto 0;padding-inline:18px}
}
@media(max-width:360px) {
  .cycle-stage {--stack-x:86%;--book-width:90px;--parcel-width:112px;--parcel-top:147px;--budget-size:104px;--budget-top:112px;width:calc(100% - 24px)}
  .cycle-collection-value {width:94px}
  .cycle-collection-value>span:not([hidden]) {font-size:10px}
  .cycle-collection-value>strong {font-size:31px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:28px}
}
`;
