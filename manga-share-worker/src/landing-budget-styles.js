export const LANDING_BUDGET_STYLES = `
.planning>.budget-cycle-heading {display:block;margin:0 auto 16px;text-align:center}
.planning>.budget-cycle-heading h2 {max-width:850px;margin:0 auto;font-size:clamp(28px,3.2vw,40px);line-height:1.25;color:var(--text);font-weight:550;letter-spacing:-.035em}
.budget-cycle {margin-bottom:90px;font-variant-numeric:tabular-nums;--cycle-error:#e58a92}
.cycle-stage {
  --shop-x:16%;--gate-x:50%;--stack-x:84%;--book-y:52%;--stack-y:52%;--volume-scale:1;--land-offset:-15px;
  position:relative;width:min(100%,1000px);height:380px;margin:0 auto;isolation:isolate;overflow:clip
}
.cycle-stage svg {display:block;fill:none;stroke:none;stroke-width:1;overflow:visible}
.cycle-route {position:absolute;inset:0;width:100%;height:100%;stroke:var(--secondary)!important;stroke-width:1.5!important;stroke-dasharray:3 7;pointer-events:none}
.cycle-route-small {display:none!important}
.cycle-route path:last-child {stroke:var(--muted);stroke-dasharray:none}
.cycle-shop {position:absolute;left:var(--shop-x);top:calc(var(--book-y) - 116px);width:160px;transform:translateX(-50%)}
.cycle-shop-art {width:160px;height:185px}
.cycle-shop>span {position:absolute;top:203px;left:0;right:0;text-align:center;color:var(--muted);font-size:13px}
.cycle-budget {position:absolute;inset:0;pointer-events:none}
.cycle-gate {position:absolute;left:var(--gate-x);top:calc(var(--book-y) - 116px);width:160px;transform:translateX(-50%)}
.cycle-gate-art {width:160px;height:190px}
.cycle-budget-amount {position:absolute;left:var(--gate-x);top:calc(var(--book-y) - 177px);width:190px;transform:translateX(-50%);text-align:center}
.cycle-budget-amount>span {display:block;color:var(--muted);font-size:13px;line-height:18px;margin-bottom:5px}
.cycle-budget-amount strong,.cycle-zero-alert {display:block;color:var(--text);font-size:43px;font-weight:600;line-height:1.15;letter-spacing:-.045em;white-space:nowrap}
.cycle-zero-alert {position:absolute;top:23px;left:0;right:0;color:var(--cycle-error);opacity:0}
.cycle-debit {position:absolute;left:var(--gate-x);top:calc(var(--book-y) - 97px);width:100px;margin-left:-50px;color:var(--cycle-error);font-size:17px;font-weight:600;text-align:center;opacity:0}
.cycle-budget-meter {position:absolute;left:calc(var(--gate-x) - 35px);top:calc(var(--book-y) + 89px);height:4px;width:70px;border-radius:4px;background:var(--secondary);overflow:hidden}
.cycle-budget-meter i {display:block;width:100%;height:100%;background:var(--rose);transform:scaleX(var(--cycle-budget-level,0));transform-origin:left}
.cycle-stack {position:absolute;left:var(--stack-x);top:var(--stack-y);width:112px;height:166px;transform:translate(-50%,-50%) scale(var(--volume-scale))}
.cycle-stack-book {position:absolute;left:0;bottom:calc(var(--stack-index) * 28px);width:112px;height:28px}
.cycle-stack-book .cycle-volume-art {position:absolute;left:42px;top:-42px;width:28px;height:112px;transform:rotate(90deg)}
.cycle-stack-base {position:absolute;left:-10px;right:-10px;bottom:-8px;height:7px;border-radius:3px;background:var(--bordeaux)}
.cycle-collection-value {position:absolute;left:var(--stack-x);top:calc(var(--stack-y) + 102px);width:180px;transform:translateX(-50%);text-align:center}
.cycle-collection-value>strong {display:block;font-size:31px;line-height:1.15;font-weight:600;letter-spacing:-.04em;color:var(--text)}
.cycle-collection-value>span {display:block;margin-top:6px;font-size:12px;color:var(--muted)}
.cycle-collection-value>small {display:block;margin-top:5px;font-size:11px;color:var(--muted)}
.cycle-flight {position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0}
.cycle-flying-volume {position:absolute;left:var(--shop-x);top:var(--book-y);width:28px;height:112px;margin:-56px 0 0 -14px;transform:rotate(0deg) scale(var(--volume-scale));transform-origin:center}
.cycle-flying-volume>span {position:absolute;inset:0}
.cycle-flying-volume .cycle-volume-art {width:28px;height:112px}
.cycle-flight-first,.cycle-flight-second {display:none}
.cycle-gate-alert {opacity:0}
.is-cycle-ready[data-cycle-added="0"] .cycle-stack-first,.is-cycle-ready[data-cycle-added="0"] .cycle-stack-second,.is-cycle-ready[data-cycle-added="1"] .cycle-stack-second {visibility:hidden}
.is-cycle-ready[data-cycle-stage="first"] .cycle-flight-first {display:block}
.is-cycle-ready[data-cycle-stage="second"] .cycle-flight-second {display:block}
.is-cycle-ready[data-cycle-stage="first"] .cycle-flight-blocked,.is-cycle-ready[data-cycle-stage="second"] .cycle-flight-blocked {display:none}
.is-cycle-ready[data-cycle-stage="second"] .cycle-stage {--land-offset:-43px}
.is-cycle-ready[data-cycle-stage="first"] .cycle-flight,.is-cycle-ready[data-cycle-stage="second"] .cycle-flight {animation:cycle-purchase-flight 2.4s linear both}
.is-cycle-ready[data-cycle-stage="first"] .cycle-flying-volume,.is-cycle-ready[data-cycle-stage="second"] .cycle-flying-volume {animation:cycle-volume-turn 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flight {animation:cycle-rejected-flight 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-flying-volume {animation:cycle-rejected-turn 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-budget {animation:cycle-budget-shake 2.4s linear both}
.is-cycle-ready[data-cycle-stage="blocked"] .cycle-gate-alert,.is-cycle-ready[data-cycle-stage="blocked"] .cycle-zero-alert {animation:cycle-budget-error 2.4s linear both}
.is-cycle-ready[data-cycle-charge] .cycle-debit {animation:cycle-debit-flash .75s ease-out both}
.is-cycle-ready[data-cycle-stage="reset"] .cycle-stage {animation:cycle-reset .7s ease-in both}
.budget-cycle.is-cycle-ready .cycle-flight,.budget-cycle.is-cycle-ready .cycle-flying-volume,.budget-cycle.is-cycle-ready .cycle-budget,.budget-cycle.is-cycle-ready .cycle-gate-alert,.budget-cycle.is-cycle-ready .cycle-zero-alert,.budget-cycle.is-cycle-ready .cycle-debit,.budget-cycle.is-cycle-ready .cycle-stage {animation-play-state:paused}
.budget-cycle.is-cycle-playing .cycle-flight,.budget-cycle.is-cycle-playing .cycle-flying-volume,.budget-cycle.is-cycle-playing .cycle-budget,.budget-cycle.is-cycle-playing .cycle-gate-alert,.budget-cycle.is-cycle-playing .cycle-zero-alert,.budget-cycle.is-cycle-playing .cycle-debit,.budget-cycle.is-cycle-playing .cycle-stage {animation-play-state:running}
.budget-cycle:not(.is-cycle-ready) .cycle-flight {opacity:1;transform:translate(calc(var(--gate-x) - var(--shop-x) - 26px),0)}
.budget-cycle:not(.is-cycle-ready) .cycle-gate-alert {opacity:1}
.budget-cycle-ending {max-width:850px;margin:25px auto 0;text-align:center;font-size:clamp(25px,3vw,36px);line-height:1.3;letter-spacing:-.035em;font-weight:550;color:var(--text)}
@keyframes cycle-purchase-flight {
  0% {opacity:0;transform:translate(0,0)}
  7% {opacity:1;transform:translate(0,0);animation-timing-function:cubic-bezier(.4,0,.3,1)}
  48%,52% {transform:translate(calc(var(--gate-x) - var(--shop-x)),0);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  84% {transform:translate(calc(var(--stack-x) - var(--shop-x)),calc(var(--stack-y) - var(--book-y) + var(--land-offset) - 13px));opacity:1}
  95%,100% {transform:translate(calc(var(--stack-x) - var(--shop-x)),calc(var(--stack-y) - var(--book-y) + var(--land-offset)));opacity:1}
}
@keyframes cycle-volume-turn {
  0%,52% {transform:rotate(0deg) scale(var(--volume-scale))}
  84% {transform:rotate(93deg) scale(var(--volume-scale))}
  95%,100% {transform:rotate(90deg) scale(var(--volume-scale))}
}
@keyframes cycle-rejected-flight {
  0% {opacity:0;transform:translate(0,0)}
  7% {opacity:1;transform:translate(0,0);animation-timing-function:cubic-bezier(.4,0,.3,1)}
  46%,51% {transform:translate(calc(var(--gate-x) - var(--shop-x) - 26px),0);opacity:1}
  59% {transform:translate(calc(var(--gate-x) - var(--shop-x) - 35px),-3px)}
  68% {transform:translate(calc(var(--gate-x) - var(--shop-x) - 29px),0);opacity:1;animation-timing-function:ease-in-out}
  93%,100% {transform:translate(0,10px);opacity:0}
}
@keyframes cycle-rejected-turn {
  0%,46% {transform:rotate(0deg) scale(var(--volume-scale))}
  54% {transform:rotate(-7deg) scale(var(--volume-scale))}
  63% {transform:rotate(4deg) scale(var(--volume-scale))}
  74%,100% {transform:rotate(-5deg) scale(var(--volume-scale))}
}
@keyframes cycle-budget-shake {
  0%,46%,69%,100% {transform:translateX(0)}
  50%,60% {transform:translateX(3px)}
  55%,65% {transform:translateX(-3px)}
}
@keyframes cycle-budget-error {
  0%,44% {opacity:0}
  49%,57% {opacity:1}
  72%,100% {opacity:0}
}
@keyframes cycle-debit-flash {
  0% {opacity:0;transform:translateY(6px)}
  20%,45% {opacity:1;transform:translateY(0)}
  100% {opacity:0;transform:translateY(-13px)}
}
@keyframes cycle-reset {0%,25% {opacity:1}100% {opacity:0}}
@media(max-width:760px) {
  .planning>.budget-cycle-heading {margin-bottom:0}
  .planning>.budget-cycle-heading h2 {font-size:clamp(25px,6.4vw,32px);max-width:420px}
  .budget-cycle {margin-bottom:65px}
  .cycle-stage {--shop-x:22%;--gate-x:73%;--stack-x:50%;--book-y:42%;--stack-y:70%;--volume-scale:.82;--land-offset:-12px;height:510px;max-width:460px}
  .is-cycle-ready[data-cycle-stage="second"] .cycle-stage {--land-offset:-35px}
  .cycle-route-wide {display:none!important}
  .cycle-route-small {display:block!important}
  .cycle-shop {top:calc(var(--book-y) - 85px);width:120px}
  .cycle-shop-art {width:120px;height:138.75px}
  .cycle-shop>span {top:161px;font-size:12px}
  .cycle-gate {width:130px;top:calc(var(--book-y) - 96px)}
  .cycle-gate-art {width:130px;height:154.375px}
  .cycle-budget-amount {width:140px;top:calc(var(--book-y) - 163px)}
  .cycle-budget-amount>span {font-size:12px;line-height:16px;margin-bottom:6px}
  .cycle-budget-amount strong,.cycle-zero-alert {font-size:36px}
  .cycle-zero-alert {top:22px}
  .cycle-debit {top:calc(var(--book-y) - 102px);font-size:15px}
  .cycle-budget-meter {top:calc(var(--book-y) + 76px);width:56px;left:calc(var(--gate-x) - 28px)}
  .cycle-collection-value {top:calc(var(--stack-y) + 78px)}
  .cycle-collection-value>strong {font-size:29px}
  .budget-cycle-ending {max-width:420px;margin-top:14px;font-size:clamp(24px,6.2vw,31px)}
}
`;
