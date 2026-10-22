// The fixed set of layers grows out of the frame without adding DOM elements.
const ownedLayers = Array.from({ length:11 }, (_, added) => `.is-cycle-ready[data-cycle-added="${added}"] .cycle-stack-book:nth-child(n+${9 + added}) {visibility:hidden}`).join("\n");

export const LANDING_BUDGET_STYLES = `
.planning.section {padding-block:55px 100px}
.planning>.planning-grid {margin-top:85px}
.budget-cycle {
  --cycle-error:#e58a92;--cycle-owned:18;
  width:100%;padding:24px 0 20px;overflow:clip;isolation:isolate;
  border-block:1px solid var(--bordeaux);background:var(--secondary);
  font-variant-numeric:tabular-nums
}
.budget-cycle-heading {position:relative;z-index:6;text-align:center;padding-inline:24px}
.budget-cycle-heading h2 {margin:0;font-size:clamp(23px,2.3vw,29px);line-height:1.25;font-weight:550;letter-spacing:-.035em;color:var(--text)}
.cycle-stage {
  --shop-x:17%;--gate-x:50%;--stack-x:83%;--book-y:142px;
  --book-width:190px;--layer-step:18px;--flight-lift:-108px;
  --parcel-width:214px;--parcel-top:97px;--budget-size:200px;--budget-top:58px;
  --reject-gap:calc(var(--budget-size) * .35 + var(--book-width) * .48);
  position:relative;width:min(1280px,calc(100% - 64px));height:300px;margin:0 auto;isolation:isolate
}
.cycle-stage svg {display:block;fill:none;stroke:none;stroke-width:1;overflow:visible}
.cycle-route {position:absolute;inset:0;width:100%;height:100%;stroke:var(--rose)!important;stroke-opacity:.16;stroke-width:1.2!important;stroke-dasharray:2 8;pointer-events:none}
.cycle-route path:last-child {stroke-dasharray:none;stroke-opacity:.7}
.cycle-parcel-back,.cycle-parcel-front {position:absolute;left:var(--shop-x);top:var(--parcel-top);width:var(--parcel-width);transform:translateX(-50%);pointer-events:none}
.cycle-parcel-back {z-index:1}.cycle-parcel-front {z-index:4}
.cycle-parcel-art {width:100%;height:auto;aspect-ratio:12/11}
.parcel-flap {transform-box:view-box}
.parcel-flap-back-left {transform-origin:83px 66px}
.parcel-flap-back-right {transform-origin:162px 70px}
.parcel-flap-front-left {transform-origin:79px 104px}
.parcel-flap-front-right {transform-origin:160px 108px}
.is-cycle-ready .parcel-flap-back-left,.is-cycle-ready .parcel-flap-back-right {animation:parcel-open-back .6s cubic-bezier(.2,.8,.2,1) both}
.is-cycle-ready .parcel-flap-front-left,.is-cycle-ready .parcel-flap-front-right {animation:parcel-open-front .6s cubic-bezier(.2,.8,.2,1) both}
.is-cycle-ready[data-cycle-stage="purchase"] .cycle-parcel-art {animation:parcel-release 1.4s ease-out both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-parcel-art {animation:parcel-catch 2.4s ease-out both}
.cycle-budget {position:absolute;inset:0;pointer-events:none;z-index:5}
.cycle-budget-disc {position:absolute;left:var(--gate-x);top:var(--budget-top);width:var(--budget-size);height:var(--budget-size);transform:translateX(-50%)}
.cycle-budget-progress {stroke-dasharray:540.36px;stroke-dashoffset:calc((1 - var(--cycle-budget-level,0)) * 540.36px);transition:stroke-dashoffset .3s ease-out}
.cycle-budget-amount {position:absolute;left:var(--gate-x);top:calc(var(--budget-top) + 45px);width:var(--budget-size);transform:translateX(-50%);text-align:center}
.cycle-budget-amount>span {display:block;font-size:13px;line-height:18px;color:var(--muted)}
.cycle-budget-amount>strong,.cycle-zero-alert {display:block;margin-top:8px;font-size:49px;line-height:1.1;letter-spacing:-.045em;font-weight:600;color:var(--text)}
.cycle-zero-alert {position:absolute;top:18px;left:0;right:0;opacity:0;color:var(--cycle-error)}
.cycle-debit {position:absolute;left:calc(var(--gate-x) + var(--budget-size) * .51);top:calc(var(--budget-top) + 87px);opacity:0;color:var(--cycle-error);font-size:17px;font-weight:600;white-space:nowrap}
.cycle-budget-seal {position:absolute;left:var(--gate-x);top:calc(var(--budget-top) + var(--budget-size) * .76);width:19px;height:19px;transform:translateX(-50%);opacity:0}
.cycle-budget-seal rect,.cycle-budget-seal path {fill:none;stroke:var(--rose);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.budget-cycle[data-cycle-empty="true"] .cycle-budget-seal {opacity:1}
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
.is-cycle-ready[data-cycle-stage="purchase"] .cycle-flight {animation:cycle-purchase-flight 1.4s linear both}
.is-cycle-ready[data-cycle-stage="purchase"] .cycle-flying-volume {animation:cycle-volume-turn 1.4s linear both}
.is-cycle-ready[data-cycle-charge] .cycle-debit {animation:cycle-debit-flash .65s ease-out both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flight {animation:cycle-rejected-flight 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flying-volume {animation:cycle-return-turn 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-budget-disc {animation:cycle-budget-shake 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-zero-alert {animation:cycle-budget-error 2.4s linear both}
.cycle-impact {position:absolute;left:var(--stack-x);top:calc(var(--book-y) + 8px);width:var(--book-width);height:42px;margin-left:calc(var(--book-width) / -2);z-index:4;opacity:0;pointer-events:none}
.cycle-impact i {position:absolute;top:0;width:2px;height:12px;border-radius:2px;background:var(--rose)}
.cycle-impact i:nth-child(1) {left:5%;transform:rotate(-40deg)}
.cycle-impact i:nth-child(2) {right:5%;transform:rotate(40deg)}
.cycle-impact i:nth-child(3) {left:50%;top:-8px;height:8px}
.is-cycle-ready[data-cycle-stage="landed"] .cycle-impact {animation:cycle-land-mark .18s ease-out both}
.budget-cycle.is-cycle-ready .cycle-flight,.budget-cycle.is-cycle-ready .cycle-flying-volume,.budget-cycle.is-cycle-ready .cycle-debit,.budget-cycle.is-cycle-ready .cycle-budget-disc,.budget-cycle.is-cycle-ready .cycle-zero-alert,.budget-cycle.is-cycle-ready .cycle-impact,.budget-cycle.is-cycle-ready .parcel-flap,.budget-cycle.is-cycle-ready .cycle-parcel-art {animation-play-state:paused}
.budget-cycle.is-cycle-playing .cycle-flight,.budget-cycle.is-cycle-playing .cycle-flying-volume,.budget-cycle.is-cycle-playing .cycle-debit,.budget-cycle.is-cycle-playing .cycle-budget-disc,.budget-cycle.is-cycle-playing .cycle-zero-alert,.budget-cycle.is-cycle-playing .cycle-impact,.budget-cycle.is-cycle-playing .parcel-flap,.budget-cycle.is-cycle-playing .cycle-parcel-art {animation-play-state:running}
.budget-cycle-ending {position:relative;z-index:6;text-align:center;padding-inline:22px;margin:8px 0 0;font-size:clamp(18px,1.8vw,23px);line-height:1.3;letter-spacing:-.025em;font-weight:500;color:var(--text)}
@keyframes parcel-open-back {0% {transform:scaleY(.04)}100% {transform:scaleY(1)}}
@keyframes parcel-open-front {0% {transform:scaleY(.06) rotate(-8deg)}100% {transform:scaleY(1) rotate(0deg)}}
@keyframes parcel-release {0%,27%,100% {transform:translateY(0)}11% {transform:translateY(2px)}}
@keyframes parcel-catch {0%,83%,100% {transform:translateY(0)}92% {transform:translateY(3px)}}
@keyframes cycle-purchase-flight {
  0% {opacity:0;transform:translate(0,35px)}
  8% {opacity:1;transform:translate(0,12px);animation-timing-function:cubic-bezier(.3,.4,.4,1)}
  20% {opacity:1;transform:translate(6%,-30px);animation-timing-function:cubic-bezier(.35,0,.35,1)}
  40% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x)),0);animation-timing-function:cubic-bezier(.2,.6,.3,1)}
  72% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x) - 7%),var(--flight-lift));animation-timing-function:cubic-bezier(.55,0,.9,.7)}
  96% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x)),3px)}
  100% {opacity:1;transform:translate(calc(var(--stack-x) - var(--shop-x)),0)}
}
@keyframes cycle-volume-turn {0% {transform:rotate(-9deg) scale(.35)}20%,40% {transform:rotate(-7deg) scale(1)}72% {transform:rotate(5deg) scale(1)}96%,100% {transform:rotate(0deg) scale(1)}}
@keyframes cycle-rejected-flight {
  0% {opacity:0;transform:translate(0,35px)}
  8% {opacity:1;transform:translate(0,12px)}
  21% {opacity:1;transform:translate(3%,-30px);animation-timing-function:cubic-bezier(.3,.4,.4,1)}
  44%,52% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap)),0)}
  59% {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - var(--reject-gap) - 10px),-6px);animation-timing-function:ease-in-out}
  79% {opacity:1;transform:translate(3%,-34px);animation-timing-function:cubic-bezier(.5,0,.8,1)}
  94% {opacity:1;transform:translate(0,20px)}
  100% {opacity:0;transform:translate(0,40px)}
}
@keyframes cycle-return-turn {0% {transform:rotate(-9deg) scale(.35)}21%,44% {transform:rotate(-7deg) scale(1)}59% {transform:rotate(-15deg) scale(1)}79% {transform:rotate(8deg) scale(.85)}100% {transform:rotate(0deg) scale(.3)}}
@keyframes cycle-budget-shake {0%,44%,65%,100% {transform:translateX(-50%)}48%,56% {transform:translateX(calc(-50% + 3px))}52%,60% {transform:translateX(calc(-50% - 3px))}}
@keyframes cycle-budget-error {0%,43% {opacity:0}47%,56% {opacity:1}68%,100% {opacity:0}}
@keyframes cycle-debit-flash {0% {opacity:0;transform:translateY(5px)}20%,45% {opacity:1;transform:translateY(0)}100% {opacity:0;transform:translateY(-12px)}}
@keyframes cycle-land-mark {0% {opacity:1;transform:translateY(3px) scale(.9)}100% {opacity:0;transform:translateY(-4px) scale(1.1)}}
@media(max-width:760px) {
  .planning.section {padding-block:32px 48px}
  .planning>.planning-grid {margin-top:48px}
  .budget-cycle {padding-block:22px 20px}
  .budget-cycle-heading h2 {font-size:clamp(18px,5.4vw,25px);max-width:500px;margin-inline:auto}
  .cycle-stage {
    --book-width:104px;--layer-step:14px;--flight-lift:-83px;--book-y:166px;
    --parcel-width:132px;--parcel-top:139px;--budget-size:124px;--budget-top:88px;
    width:calc(100% - 32px);height:312px
  }
  .cycle-budget-amount {top:calc(var(--budget-top) + 26px)}
  .cycle-budget-amount>span {font-size:10px;line-height:14px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:35px;margin-top:7px}
  .cycle-zero-alert {top:14px}
  .cycle-debit {left:calc(var(--gate-x) + var(--budget-size) * .45);top:calc(var(--budget-top) + 80px);font-size:12px}
  .cycle-budget-seal {width:13px;height:13px;top:calc(var(--budget-top) + var(--budget-size) * .78)}
  .cycle-collection-value {width:114px;top:36px}
  .cycle-collection-value>span:not([hidden]) {font-size:11px;line-height:16px}
  .cycle-collection-value>strong {font-size:34px;margin-top:8px}
  .cycle-route {top:6px}
  .cycle-stack-window {mask-image:linear-gradient(#000 87%,transparent 100%)}
  .budget-cycle-ending {font-size:18px;max-width:350px;margin:5px auto 0;padding-inline:18px}
}
@media(max-width:360px) {
  .cycle-stage {--book-width:90px;--parcel-width:112px;--parcel-top:147px;--budget-size:108px;--budget-top:96px;width:calc(100% - 24px)}
  .cycle-collection-value {width:94px}
  .cycle-collection-value>span:not([hidden]) {font-size:10px}
  .cycle-collection-value>strong {font-size:31px}
  .cycle-budget-amount {top:calc(var(--budget-top) + 22px)}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:30px}
}
`;
