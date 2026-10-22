// The existing midpoint gate and completion event remain shared with desktop.
// Only mobile's closing cadence changes: immediate movement and a slow descent.
export const LANDING_MOBILE_LOCK_STYLES = `
@media(max-width:760px) {
  .is-lock-ready .lock-shackle,.is-lock-ready .lock-white,.is-lock-ready .lock-whole,.is-lock-ready .lock-snap-lines {animation-duration:3.6s}
  @keyframes privacy-lock-shut {
    0% {transform:translateY(-18px) rotate(-18deg);animation-timing-function:cubic-bezier(.3,0,.45,1)}
    35% {transform:translateY(-18px) rotate(0deg);animation-timing-function:cubic-bezier(.42,0,.35,1)}
    82% {transform:translateY(0) rotate(0deg)}
    100% {transform:translateY(0) rotate(0deg)}
  }
  @keyframes privacy-lock-tint {
    0%,77% {opacity:1}
    90%,100% {opacity:0}
  }
  @keyframes privacy-lock-settle {
    0%,81%,100% {transform:translateY(0)}
    85% {transform:translateY(1px)}
    91% {transform:translateY(0)}
  }
  @keyframes privacy-lock-snap {
    0%,80% {opacity:0;transform:scale(.9)}
    85% {opacity:.65;transform:scale(1)}
    95%,100% {opacity:0;transform:scale(1.08)}
  }
}
`;
