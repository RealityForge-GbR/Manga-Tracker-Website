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
  .planning.section {padding-top:36px}
  .budget-cycle {width:calc(100% - 32px);max-width:520px;margin-inline:auto;padding:24px 16px 18px;border-radius:26px;overflow:hidden}
  .budget-cycle::before {transform:none;border:1px solid var(--bordeaux);border-radius:inherit;background:linear-gradient(145deg,var(--secondary),var(--surface))}
  .budget-cycle-heading {transform:none;padding:0}
  .budget-cycle-heading h2 {max-width:330px;margin-inline:auto;font-size:clamp(21px,5.6vw,26px);line-height:1.2;text-wrap:balance}
  .budget-cycle-ellipsis,.budget-cycle-ending {display:none}
  .cycle-stage {
    --shop-x:22%;--gate-x:50%;--stack-x:78%;
    --book-width:clamp(90px,26vw,116px);--layer-step:12px;
    --parcel-width:clamp(112px,32vw,144px);--parcel-top:128px;
    --mobile-floor-y:calc(var(--parcel-top) + var(--parcel-width) * .8708333333);
    --book-y:calc(var(--mobile-floor-y) - var(--book-width) * .45 - var(--layer-step) * 2);
    --stack-tail:0px;--flight-lift:-8px;
    --budget-size:180px;--budget-top:8px;
    --mobile-gate-rise:calc(112px - var(--book-y));
    --mobile-stop-rise:calc(122px - var(--book-y));
    --mobile-reject-inset:0px;
    --mobile-land-offset:calc((7 - var(--cycle-owned,10)) * var(--layer-step));
    width:min(440px,100%);height:calc(var(--mobile-floor-y) + 108px);margin:14px auto 0
  }
  .cycle-parcel-back>.cycle-parcel-art>ellipse {display:none}
  .cycle-stage .cycle-budget-wallet {display:none}
  .cycle-budget-amount {
    display:flex;align-items:center;justify-content:space-between;gap:14px;
    left:50%;top:8px;width:100%;height:76px;padding:12px 18px 17px;
    border:1px solid var(--bordeaux);border-radius:17px;
    background:var(--surface);text-align:left;transform:translateX(-50%)
  }
  .cycle-budget-amount>span {font-size:13px;line-height:1.3;color:var(--text)}
  .cycle-budget-amount>strong,.cycle-zero-alert {font-size:40px;line-height:1;margin:0;font-weight:600;letter-spacing:-.045em}
  .cycle-zero-alert {top:calc(50% - 2.5px);right:18px;left:auto;transform:translateY(-50%)}
  .cycle-budget-slots {left:18px;top:73px;width:calc(100% - 36px);height:3px;gap:7px}
  .cycle-debit {display:none}
  .cycle-stack-window {inset:0 0 88px;mask-image:none;overflow:visible}
  .cycle-stack {top:calc(var(--book-y) - (var(--cycle-owned,10) - 8) * var(--layer-step));height:180px}
  .cycle-stack-book:nth-child(-n+5),.cycle-stack-continuation-book {display:none}
  .is-cycle-ready[data-cycle-stage="landed"] .cycle-stack-book {animation:none}
  .cycle-impact {top:calc(var(--book-y) - (var(--cycle-owned,10) - 8) * var(--layer-step) + 8px)}
  .cycle-collection-value {
    display:flex;align-items:center;justify-content:space-between;gap:12px;
    left:50%;top:calc(var(--mobile-floor-y) + 20px);width:100%;height:70px;
    padding:14px 18px;border:1px solid var(--bordeaux);border-radius:17px;
    background:var(--surface);text-align:left
  }
  .cycle-collection-value>span:not([hidden]) {flex:1;min-width:0;max-width:120px;font-size:12px;line-height:1.3;color:var(--muted)}
  .cycle-collection-value>strong {flex:none;margin:0;font-size:36px;line-height:1.05}
  .is-cycle-ready[data-cycle-charge] .cycle-budget-amount>strong {animation:mobile-budget-charge .65s ease-out both paused}
  .is-cycle-playing[data-cycle-charge] .cycle-budget-amount>strong {animation-play-state:running}
  .is-cycle-ready[data-cycle-stage="blocked"] .cycle-budget-amount {animation:mobile-budget-refuse 3.8s linear both paused}
  .is-cycle-playing[data-cycle-stage="blocked"] .cycle-budget-amount {animation-play-state:running}
  .is-cycle-ready[data-cycle-stage="purchase"] .cycle-flight {animation-name:cycle-mobile-purchase-flight}
  .is-cycle-ready[data-cycle-stage="purchase"] .cycle-flying-volume {animation-name:cycle-mobile-purchase-turn}
  .is-cycle-ready[data-cycle-stage="blocked"] .cycle-flight {animation-name:cycle-mobile-rejected-flight}
  .is-cycle-ready[data-cycle-stage="blocked"] .cycle-flying-volume {animation-name:cycle-mobile-rejected-turn}
  @keyframes mobile-budget-charge {0%,55% {color:var(--cycle-error)}100% {color:var(--text)}}
  @keyframes mobile-budget-refuse {
    0%,39%,50%,57%,68%,100% {transform:translateX(-50%);border-color:var(--bordeaux)}
    42%,60% {transform:translateX(calc(-50% + 2px));border-color:var(--cycle-error)}
    46%,64% {transform:translateX(calc(-50% - 2px));border-color:var(--cycle-error)}
  }
  @keyframes cycle-mobile-purchase-flight {${MOBILE_PURCHASE_FLIGHT_FRAMES}}
  @keyframes cycle-mobile-purchase-turn {${MOBILE_PURCHASE_TURN_FRAMES}}
  @keyframes cycle-mobile-rejected-flight {${MOBILE_REJECTED_FLIGHT_FRAMES}}
  @keyframes cycle-mobile-rejected-turn {${MOBILE_REJECTED_TURN_FRAMES}}
}
`;
