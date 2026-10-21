export const LANDING_BUDGET_STYLES = `
.budget-demo {
  position:relative;
  padding:36px 44px 25px;
  margin-bottom:80px;
  border:1px solid var(--secondary);
  border-radius:24px;
  background:var(--surface);
  overflow:clip;
  isolation:isolate;
  font-variant-numeric:tabular-nums
}
.budget-settings {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
  max-width:760px;
  margin-inline:auto
}
.budget-setting {
  display:grid;
  grid-template-columns:1fr 145px;
  align-items:center;
  gap:12px 20px
}
.budget-setting label {
  font-size:14px;
  font-weight:600
}
.budget-input {
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
  padding-right:16px;
  border:1px solid var(--bordeaux);
  border-radius:9px;
  background:var(--bg);
  color:var(--rose)
}
.budget-input input {
  width:100%;
  min-width:0;
  min-height:48px;
  padding:10px 0 10px 14px;
  border:0;
  border-radius:9px;
  background:transparent;
  color:var(--text);
  font:inherit;
  font-size:18px;
  font-weight:600;
  font-variant-numeric:tabular-nums
}
.budget-input:focus-within {
  outline:2px solid var(--rose);
  outline-offset:3px
}
.budget-input input:focus-visible {
  outline:none
}
.budget-range {
  grid-column:1/-1;
  width:100%;
  min-height:30px;
  margin:0;
  accent-color:var(--rose);
  cursor:pointer
}
.budget-price-setting {
  align-content:start
}
.budget-stage {
  position:relative;
  display:grid;
  grid-template-columns:1fr 1.2fr 1fr;
  gap:25px;
  align-items:center;
  min-height:330px;
  margin-block:20px 12px;
  --coin-end-x:-34%;
  --coin-end-y:0px;
  --coin-start-y:0px;
  --book-end-x:67%;
  --book-left:16.5%;
  --transfer-top:50%
}
.budget-node-label {
  display:block;
  margin:0 0 16px;
  color:var(--muted);
  font-size:13px;
  line-height:1.5;
  font-weight:500
}
.budget-purchase-node,.budget-collection-node {
  text-align:center;
  min-width:0
}
.budget-purchase-node {
  padding-bottom:44px
}
.budget-source-book {
  position:relative;
  width:78px;
  height:116px;
  padding:0 6px 4px 0;
  margin:0 auto;
  border-radius:3px 6px 6px 3px;
  background:var(--text);
  border-right:3px solid var(--muted);
  border-bottom:3px solid var(--rose);
  box-shadow:7px 8px 0 var(--contrast);
  transform:rotate(-9deg)
}
.budget-source-book span,.budget-flying-book {
  display:block;
  width:100%;
  height:100%;
  border-left:5px solid var(--bordeaux);
  border-radius:2px 4px 4px 2px;
  background-image:url('/landing/releases.webp');
  background-repeat:no-repeat;
  background-size:306.383% 398.056%;
  background-position:8.247% 27.213%
}
.budget-wallet-node {
  position:relative;
  min-width:0;
  width:260px;
  max-width:100%;
  padding-top:45px;
  justify-self:center;
  text-align:center
}
.budget-cash {
  position:absolute;
  left:12%;
  right:12%;
  top:6px;
  height:100px;
  z-index:-1
}
.budget-cash span {
  position:absolute;
  inset:0;
  display:grid;
  place-items:center;
  border:2px solid var(--rose);
  border-radius:10px;
  background:var(--bordeaux);
  color:var(--rose);
  font-size:40px;
  line-height:1;
  transform:rotate(-12deg) translate(-13px,4px)
}
.budget-cash span:nth-child(2) {
  transform:rotate(10deg) translate(13px,3px);
  background:var(--secondary)
}
.budget-cash span:last-child {
  transform:rotate(-3deg);
  background:var(--elevated)
}
.budget-account {
  position:relative;
  padding:25px 20px 22px;
  border:1px solid var(--rose);
  border-radius:18px;
  background:var(--elevated);
  box-shadow:0 9px 0 var(--bordeaux)
}
.budget-account .budget-node-label {
  margin-bottom:7px
}
.budget-balance {
  display:block;
  font-size:clamp(30px,3.2vw,44px);
  line-height:1.2;
  letter-spacing:-.06em;
  font-weight:650;
  white-space:nowrap;
  color:var(--text)
}
.budget-month {
  display:block;
  font-size:11px;
  color:var(--muted);
  margin-top:9px
}
.budget-meter {
  display:block;
  height:6px;
  margin-top:20px;
  border-radius:4px;
  background:var(--secondary);
  overflow:hidden
}
.budget-meter span {
  display:block;
  width:100%;
  height:100%;
  border-radius:inherit;
  background:var(--rose);
  transform:scaleX(var(--budget-level));
  transform-origin:left;
  transition:transform .35s ease
}
.budget-phase {
  display:block;
  min-height:20px;
  margin-top:21px;
  color:var(--rose);
  font-size:12px
}
.budget-shelf {
  display:flex;
  justify-content:center;
  align-items:end;
  gap:4px;
  min-height:116px;
  padding:0 4px 5px;
  border-bottom:5px solid var(--bordeaux);
  border-radius:3px;
  max-width:230px;
  margin-inline:auto
}
.budget-volume {
  position:relative;
  flex:1 1 0;
  max-width:17px;
  height:var(--volume-height);
  border:1px solid var(--bordeaux);
  border-radius:2px 3px 0 0;
  background:var(--rose);
  opacity:.18;
  transform:scaleY(.06);
  transition:opacity .25s,transform .35s;
  transform-origin:bottom
}
.budget-volume:after {
  content:"";
  position:absolute;
  inset:12px 2px auto;
  height:3px;
  border-top:1px solid var(--muted);
  border-bottom:1px solid var(--muted);
  opacity:0
}
.budget-volume.is-owned {
  background:var(--rose);
  border-color:var(--rose);
  opacity:1;
  transform:translateY(-3px) scaleY(1)
}
.budget-volume.is-owned:after {
  opacity:1
}
.budget-volume.is-owned:nth-child(3n+2) {
  background:var(--bordeaux)
}
.budget-volume.is-owned:nth-child(3n) {
  background:var(--muted)
}
.budget-collection-total {
  margin:13px 0 0;
  color:var(--muted);
  font-size:13px
}
.budget-collection-total strong {
  font-size:25px;
  font-weight:600;
  color:var(--text);
  margin-right:3px
}
.budget-money-flight,.budget-book-flight {
  position:absolute;
  inset:0;
  pointer-events:none;
  opacity:0;
  z-index:3
}
.budget-flying-coin {
  position:absolute;
  top:var(--transfer-top);
  left:50%;
  display:grid;
  place-items:center;
  width:26px;
  height:26px;
  margin:-13px 0 0 -13px;
  border:2px solid var(--rose);
  border-radius:50%;
  background:var(--bordeaux);
  color:var(--text);
  font-size:14px;
  font-weight:700
}
.budget-flying-coin:nth-child(2) {
  margin-top:-34px;
  margin-left:4px;
  transform:scale(.8)
}
.budget-flying-coin:last-child {
  margin-top:5px;
  margin-left:8px;
  transform:scale(.72)
}
.budget-flying-book {
  position:absolute;
  left:var(--book-left);
  top:var(--transfer-top);
  width:52px;
  height:78px;
  margin:-39px 0 0 -26px;
  border-right:4px solid var(--text);
  border-bottom:3px solid var(--rose);
  box-shadow:4px 4px 0 var(--contrast)
}
.is-buying .budget-money-flight {
  animation:budget-pay 1.1s ease-in-out both
}
.is-buying .budget-book-flight {
  animation:budget-collect 1.1s ease-in-out both
}
.is-buying .budget-flying-book {
  animation:budget-book-turn 1.1s ease-in-out both
}
@keyframes budget-pay {
  0%,4% { opacity:0;transform:translate3d(0,var(--coin-start-y),0) }
  12% { opacity:1 }
  34% { opacity:1;transform:translate3d(var(--coin-end-x),var(--coin-end-y),0) }
  43%,100% { opacity:0;transform:translate3d(var(--coin-end-x),var(--coin-end-y),0) }
}
@keyframes budget-collect {
  0%,39% { opacity:0;transform:translate3d(0,0,0) }
  47% { opacity:1;transform:translate3d(0,0,0) }
  66% { opacity:1;transform:translate3d(calc(var(--book-end-x) * .5),-65px,0) }
  82% { opacity:1;transform:translate3d(var(--book-end-x),0,0) }
  94%,100% { opacity:0;transform:translate3d(var(--book-end-x),0,0) }
}
@keyframes budget-book-turn {
  0%,47% { transform:rotate(-9deg) scale(.9) }
  66% { transform:rotate(8deg) scale(.8) }
  82% { transform:rotate(0deg) scale(.4) }
  94%,100% { transform:scale(.15) }
}
.budget-summary {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  padding-block:18px;
  border-top:1px solid var(--secondary);
  border-bottom:1px solid var(--secondary);
  text-align:center
}
.budget-summary div {
  display:grid;
  gap:6px
}
.budget-summary div>span {
  color:var(--muted);
  font-size:12px
}
.budget-summary strong {
  font-size:20px;
  font-weight:600
}
.budget-actions {
  display:flex;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  gap:12px;
  margin-top:23px
}
.budget-demo button {
  font-family:inherit
}
.budget-buy {
  cursor:pointer;
  border:0;
  min-height:46px;
  padding-block:12px;
  font-weight:650
}
.budget-buy>span:first-child {
  font-size:23px;
  line-height:1
}
.budget-control {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:46px;
  padding:10px 16px;
  border:1px solid var(--secondary);
  border-radius:7px;
  background:transparent;
  color:var(--muted);
  font-size:13px;
  cursor:pointer
}
.budget-control:hover {
  color:var(--text);
  border-color:var(--rose)
}
.budget-demo button:focus-visible,.budget-range:focus-visible {
  outline:3px solid var(--rose);
  outline-offset:4px
}
.budget-demo button:disabled {
  cursor:default;
  opacity:.5;
  transform:none
}
.budget-demo [hidden] {
  display:none
}
.budget-example-note {
  margin:16px 0 0;
  font-size:11px;
  line-height:1.5;
  text-align:center
}
.budget-live {
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip-path:inset(50%);
  white-space:nowrap
}
@media(max-width:1050px) {
  .budget-demo {
    padding:28px;
    margin-bottom:60px
  }
  .budget-settings {
    gap:24px
  }
  .budget-setting {
    grid-template-columns:1fr 120px;
    gap:10px
  }
  .budget-stage {
    gap:12px
  }
  .budget-balance {
    font-size:34px
  }
}
@media(max-width:760px) {
  .budget-demo {
    padding:24px 18px;
    border-radius:18px;
    margin-bottom:45px
  }
  .budget-settings {
    grid-template-columns:1fr;
    gap:18px;
    max-width:400px
  }
  .budget-setting {
    grid-template-columns:1fr 125px
  }
  .budget-stage {
    grid-template-columns:1fr 1fr;
    grid-template-rows:230px 170px;
    gap:12px;
    min-height:0;
    margin-top:25px;
    --coin-end-x:-25%;
    --coin-start-y:-190px;
    --coin-end-y:0px;
    --book-end-x:50%;
    --book-left:25%;
    --transfer-top:75%
  }
  .budget-wallet-node {
    grid-column:1/-1;
    grid-row:1;
    width:235px
  }
  .budget-purchase-node {
    grid-column:1;
    grid-row:2
  }
  .budget-collection-node {
    grid-column:2;
    grid-row:2
  }
  .budget-account {
    padding:20px 18px 18px
  }
  .budget-balance {
    font-size:39px
  }
  .budget-source-book {
    width:62px;
    height:92px
  }
  .budget-shelf {
    gap:2px;
    min-height:92px;
    padding-inline:0
  }
  .budget-volume {
    min-width:0;
    height:calc(var(--volume-height) * .85)
  }
  .budget-node-label {
    font-size:12px;
    margin-bottom:12px
  }
  .budget-summary strong {
    font-size:18px
  }
  .budget-actions {
    gap:10px
  }
  .budget-buy {
    flex-basis:100%
  }
  .budget-control {
    flex:1
  }
}
@media(prefers-reduced-motion:reduce) {
  .budget-money-flight,.budget-book-flight {
    display:none
  }
}
`;
