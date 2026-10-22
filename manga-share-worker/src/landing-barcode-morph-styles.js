export const LANDING_BARCODE_MORPH_STYLES = `
.barcode-morph {
  --barcode-cycle:8.8s;
  position:relative;
  width:100%;
  max-width:430px;
  min-width:0;
  margin:0;
  align-self:center;
  justify-self:center;
  isolation:isolate
}
.barcode-morph-scene {display:block;width:100%;height:auto;overflow:visible;stroke:none}
.barcode-morph figcaption {margin:-18px 0 0;text-align:center;color:var(--text);font-size:clamp(15px,1.2vw,18px);font-weight:500;line-height:1.4}
.barcode-morph-volume {transform:translate(var(--book-shift),var(--book-drop));transform-origin:15px 116px}
.barcode-morph-binding {fill:var(--book-color);transform:scale(var(--book-wide),var(--book-scale));transform-origin:0 0}
.barcode-morph-stripe {fill:#30202a;opacity:0;transform:translateX(var(--stripe-fold)) scaleX(.12);transform-origin:0 0}
.barcode-morph-cover,.barcode-morph-ornament {opacity:1}
.barcode-morph-label {opacity:1}
.barcode-morph-scanner,.barcode-morph-settle {opacity:0}
.is-barcode-morph-ready .barcode-morph-volume {animation:barcode-morph-fall var(--barcode-cycle) cubic-bezier(.4,0,.2,1) var(--book-stagger) infinite both paused}
.is-barcode-morph-ready .barcode-morph-binding {animation:barcode-morph-binding var(--barcode-cycle) cubic-bezier(.4,0,.2,1) var(--book-stagger) infinite both paused}
.is-barcode-morph-ready .barcode-morph-stripe {animation:barcode-morph-stripe var(--barcode-cycle) cubic-bezier(.4,0,.2,1) var(--book-stagger) infinite both paused}
.is-barcode-morph-ready .barcode-morph-cover,.is-barcode-morph-ready .barcode-morph-ornament {animation:barcode-morph-cover var(--barcode-cycle) ease var(--book-stagger) infinite both paused}
.is-barcode-morph-ready .barcode-morph-scanner {animation:barcode-morph-scan var(--barcode-cycle) cubic-bezier(.45,0,.2,1) 0s infinite both paused}
.is-barcode-morph-ready .barcode-morph-settle {animation:barcode-morph-settle var(--barcode-cycle) ease 0s infinite both paused}
.is-barcode-morph-moving .barcode-morph-volume,.is-barcode-morph-moving .barcode-morph-binding,.is-barcode-morph-moving .barcode-morph-stripe,.is-barcode-morph-moving .barcode-morph-cover,.is-barcode-morph-moving .barcode-morph-ornament,.is-barcode-morph-moving .barcode-morph-scanner,.is-barcode-morph-moving .barcode-morph-settle {animation-play-state:running}
@keyframes barcode-morph-scan {
  0%,8% {opacity:0;transform:translateX(0)}
  10% {opacity:1;transform:translateX(0)}
  25% {opacity:1;transform:translateX(304px)}
  28%,100% {opacity:0;transform:translateX(304px)}
}
@keyframes barcode-morph-binding {
  0%,27% {fill:#30202a;transform:scale(1,1)}
  40%,87% {fill:var(--book-color);transform:scale(var(--book-wide),var(--book-scale))}
  95%,100% {fill:#30202a;transform:scale(1,1)}
}
@keyframes barcode-morph-stripe {
  0%,27% {opacity:1;transform:translateX(0) scaleX(1)}
  39%,88% {opacity:0;transform:translateX(var(--stripe-fold)) scaleX(.12)}
  96%,100% {opacity:1;transform:translateX(0) scaleX(1)}
}
@keyframes barcode-morph-cover {
  0%,32% {opacity:0}
  42%,87% {opacity:1}
  94%,100% {opacity:0}
}
@keyframes barcode-morph-fall {
  0%,29% {transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.36,0,.64,1)}
  40% {transform:translate(var(--book-shift),-17px) rotate(var(--book-lean));animation-timing-function:cubic-bezier(.55,0,.85,.55)}
  55% {transform:translate(var(--book-shift),var(--book-drop)) rotate(0deg);animation-timing-function:cubic-bezier(.15,.7,.25,1)}
  58% {transform:translate(var(--book-shift),calc(var(--book-drop) - 5px)) rotate(0deg);animation-timing-function:cubic-bezier(.45,0,.75,.55)}
  62%,87% {transform:translate(var(--book-shift),var(--book-drop)) rotate(0deg)}
  96%,100% {transform:translate(0,0) rotate(0deg)}
}
@keyframes barcode-morph-settle {
  0%,56% {opacity:0;transform:translateY(5px)}
  61% {opacity:.7;transform:translateY(0)}
  68%,100% {opacity:0;transform:translateY(-7px)}
}
@media (prefers-reduced-motion:reduce) {
  .barcode-morph [class^="barcode-morph-"] {animation:none!important}
}
`;
