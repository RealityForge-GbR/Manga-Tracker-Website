import {
  MOBILE_PURCHASE_FLIGHT_FRAMES,
  MOBILE_PURCHASE_TURN_FRAMES,
  MOBILE_REJECTED_FLIGHT_FRAMES,
  MOBILE_REJECTED_TURN_FRAMES,
} from "./landing-budget-mobile-flight.js";

// The same accessible example and milestone controller get a phone-specific stage.
// Every animation is still a transform/opacity interpolation, paused offscreen.
export const LANDING_BUDGET_MOBILE_STYLES = `
@media(max-width:760px) {
  .budget-cycle {padding-block:24px 20px}
  .budget-cycle::before {transform:skewY(-1.4deg)}
  .budget-cycle-heading {transform:none;padding-inline:24px}
  .budget-cycle-heading h2 {max-width:350px;margin-inline:auto;font-size:clamp(23px,6vw,28px);line-height:1.2;text-wrap:balance}
  .cycle-stage {
    --shop-x:20%;--gate-x:50%;--stack-x:80%;
    --book-width:clamp(104px,31vw,134px);--layer-step:13px;
    --book-y:220px;--stack-tail:0px;--flight-lift:-8px;
    --parcel-width:clamp(128px,36vw,154px);--parcel-top:236px;
    --budget-size:clamp(180px,48vw,198px);--budget-top:24px;
    --mobile-gate-rise:calc(var(--budget-top) + var(--budget-size) * .36 - var(--book-y));
    --mobile-stop-rise:calc(var(--budget-top) + var(--budget-size) * .64 - var(--book-y));
    --mobile-reject-inset:calc(var(--budget-size) * .18);
    width:min(480px,calc(100% - 32px));height:430px;margin:12px auto 0
  }
  .cycle-budget-amount>span {font-size:13px;line-height:18px}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:44px;line-height:1.1;margin-top:6px}
  .cycle-zero-alert {top:18px}
  .cycle-budget-slots {height:4px;gap:7px}
  .cycle-debit {font-size:15px;top:calc(var(--budget-top) - 10px);left:calc(var(--gate-x) - 30px);width:60px;text-align:center;transform:none}
  .cycle-stack-window {inset:var(--book-y) 0 92px;mask-image:linear-gradient(to bottom,#000 0%,#000 42%,#000b 58%,#0005 78%,transparent 100%)}
  .cycle-collection-value {top:354px;width:min(42vw,160px)}
  .cycle-collection-value>span:not([hidden]) {font-size:12px;line-height:16px}
  .cycle-collection-value>strong {font-size:40px;line-height:1.1;margin-top:7px}
  .budget-cycle-ending {transform:none;max-width:330px;margin-inline:auto;padding-inline:20px;font-size:20px;line-height:1.3;text-wrap:balance}
  .is-cycle-ready[data-cycle-stage="purchase"] .cycle-flight {animation-name:cycle-mobile-purchase-flight}
  .is-cycle-ready[data-cycle-stage="purchase"] .cycle-flying-volume {animation-name:cycle-mobile-purchase-turn}
  .is-cycle-ready[data-cycle-stage="blocked"] .cycle-flight {animation-name:cycle-mobile-rejected-flight}
  .is-cycle-ready[data-cycle-stage="blocked"] .cycle-flying-volume {animation-name:cycle-mobile-rejected-turn}
  @keyframes cycle-mobile-purchase-flight {${MOBILE_PURCHASE_FLIGHT_FRAMES}}
  @keyframes cycle-mobile-purchase-turn {${MOBILE_PURCHASE_TURN_FRAMES}}
  @keyframes cycle-mobile-rejected-flight {${MOBILE_REJECTED_FLIGHT_FRAMES}}
  @keyframes cycle-mobile-rejected-turn {${MOBILE_REJECTED_TURN_FRAMES}}
}
`;
