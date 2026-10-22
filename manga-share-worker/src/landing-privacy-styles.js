export const LANDING_PRIVACY_STYLES = `
.trust {
  display:grid;
  grid-template-columns:280px minmax(0,1fr);
  align-items:center;
  column-gap:76px;
  row-gap:36px;
  padding-block:72px 80px;
  border-top:1px solid var(--line)
}
.privacy-lock {width:280px;height:280px;justify-self:center;position:relative}
.privacy-lock-art {position:absolute;inset:0;display:block;width:100%;height:100%;fill:none;stroke:none;stroke-width:1;overflow:visible}
.lock-shackle {transform-origin:92px 128px;transform-box:view-box}
.lock-white {opacity:0}
.lock-snap-lines {opacity:0;transform-origin:140px 115px;transform-box:view-box}
.is-lock-ready .lock-shackle {animation:privacy-lock-shut 6s linear infinite both}
.is-lock-ready .lock-white {animation:privacy-lock-tint 6s linear infinite both}
.is-lock-ready .lock-whole {animation:privacy-lock-settle 6s linear infinite both}
.is-lock-ready .lock-snap-lines {animation:privacy-lock-snap 6s linear infinite both}
.is-lock-ready .lock-shackle,.is-lock-ready .lock-white,.is-lock-ready .lock-whole,.is-lock-ready .lock-snap-lines {animation-play-state:paused}
.is-lock-playing .lock-shackle,.is-lock-playing .lock-white,.is-lock-playing .lock-whole,.is-lock-playing .lock-snap-lines {animation-play-state:running}
.trust-copy h2 {margin:0 0 22px;font-size:clamp(48px,5.4vw,72px);line-height:1.04;font-weight:600;letter-spacing:-.05em}
.trust-copy>p,.trust-support>p {margin:0;color:var(--muted);font-size:17px;line-height:1.7}
.trust-copy>p {max-width:640px}
.trust-support {grid-column:1/-1;display:grid;grid-template-columns:64px minmax(0,1fr);align-items:center;gap:24px;border-top:1px solid var(--line);padding-top:28px}
.support-heart {width:56px;height:56px;fill:none;stroke:none;stroke-width:1;justify-self:center}
.trust-support strong {color:var(--text);font-size:inherit;font-weight:650}
.trust-support>p {max-width:960px;text-wrap:pretty}
@keyframes privacy-lock-shut {
  0%,25% {transform:translateY(-18px) rotate(-18deg)}
  34% {transform:translateY(-18px) rotate(0deg);animation-timing-function:cubic-bezier(.5,0,.8,1)}
  41% {transform:translateY(1px) rotate(0deg)}
  45%,86% {transform:translateY(0) rotate(0deg);animation-timing-function:ease-in-out}
  94%,100% {transform:translateY(-18px) rotate(-18deg)}
}
@keyframes privacy-lock-tint {
  0%,40% {opacity:1}
  47%,86% {opacity:0}
  94%,100% {opacity:1}
}
@keyframes privacy-lock-settle {
  0%,40%,49%,100% {transform:translateY(0)}
  43% {transform:translateY(3px)}
  46% {transform:translateY(-1px)}
}
@keyframes privacy-lock-snap {
  0%,40% {opacity:0;transform:scale(.8)}
  44% {opacity:1;transform:scale(1)}
  54%,100% {opacity:0;transform:scale(1.12)}
}
@media(max-width:1050px) and (min-width:761px) {
  .trust {grid-template-columns:230px minmax(0,1fr);column-gap:44px;row-gap:30px;padding-block:60px 70px}
  .privacy-lock {width:230px;height:230px}
  .trust-copy h2 {font-size:clamp(44px,5.7vw,58px)}
}
@media(max-width:760px) {
  .trust {grid-template-columns:clamp(88px,26vw,112px) minmax(0,1fr);column-gap:18px;row-gap:24px;padding-block:42px 48px;max-width:620px}
  .privacy-lock {width:100%;height:auto;aspect-ratio:1;grid-column:1;grid-row:1}
  .trust-copy {display:contents}
  .trust-copy h2 {grid-column:2;grid-row:1;margin:0;font-size:clamp(29px,8.4vw,42px);line-height:1.08;letter-spacing:-.05em}
  .trust-copy>p {grid-column:1/-1}
  .trust-copy>p,.trust-support>p {font-size:16px;line-height:1.65}
  .trust-support {grid-template-columns:40px minmax(0,1fr);gap:17px;padding-top:24px}
  .support-heart {width:40px;height:40px;align-self:start;margin-top:3px}
  .download h2 {white-space:normal;font-size:clamp(22px,5.6vw,29px);line-height:1.15;letter-spacing:-.045em;text-wrap:balance}
}
`;
