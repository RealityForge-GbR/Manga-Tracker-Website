export const LANDING_SHELF_DIVIDER_STYLES = `
.shelf-divider {
  --divider-height:clamp(108px,10vw,142px);
  position:relative;
  width:100%;
  height:calc(var(--divider-height) + 36px);
  margin-block:28px 0;
  overflow:clip;
  isolation:isolate;
  pointer-events:none
}
.shelf-divider-recess {
  position:absolute;
  inset:0 0 27px;
  background:linear-gradient(0deg,#171217b3,transparent 80%);
  perspective:900px
}
.shelf-divider-row {
  position:absolute;
  bottom:0;
  left:-12px;
  display:flex;
  align-items:flex-end;
  width:max(calc(100% + 24px),2280px);
  height:var(--divider-height);
  gap:2px;
  padding-top:8px;
  transform-style:preserve-3d
}
.shelf-divider-book {
  position:relative;
  display:block;
  flex:var(--book-width) 0 0;
  height:var(--book-height);
  min-width:0;
  color:var(--spine-ink);
  background:linear-gradient(90deg,#17121730,transparent 18%,#f7eee815 73%,#17121750),var(--spine);
  border:1px solid #17121770;
  border-radius:2px 3px 1px 1px;
  box-shadow:inset 1px 0 #f7eee828,inset -2px 0 #17121735;
  transform-origin:center bottom;
  transform-style:preserve-3d
}
.shelf-divider-book::before,.shelf-divider-book::after {
  content:"";
  position:absolute;
  left:12%;
  right:12%;
  height:4px;
  border-block:1px solid currentColor;
  opacity:.6
}
.shelf-divider-book::before {top:8px}
.shelf-divider-book::after {bottom:26px}
.shelf-divider-mark {
  position:absolute;
  inset:26% 0 auto;
  color:inherit;
  font-size:14px;
  line-height:1;
  text-align:center;
  opacity:.8
}
.shelf-divider-number {
  position:absolute;
  inset:auto 0 9px;
  font-size:9px;
  font-weight:600;
  line-height:1;
  letter-spacing:.04em;
  text-align:center;
  opacity:.85
}
.shelf-divider-book i {
  position:absolute;
  top:1px;
  bottom:0;
  left:calc(100% - 1px);
  width:7px;
  background:linear-gradient(90deg,#17121755,transparent),var(--spine);
  border:1px solid #17121770;
  transform:rotateY(78deg);
  transform-origin:left center
}
.shelf-divider-book[data-pull] {
  animation:shelf-divider-pull 26s cubic-bezier(.42,0,.2,1) var(--pull-delay) infinite both paused
}
.is-shelf-divider-moving .shelf-divider-book[data-pull] {
  animation-play-state:running;
  will-change:transform
}
.shelf-divider-board {
  position:absolute;
  inset:auto 0 13px;
  height:15px;
  background:linear-gradient(0deg,var(--contrast) 0 32%,var(--bordeaux) 33% 78%,var(--rose) 80% 86%,var(--bordeaux) 88%);
  border-top:1px solid #d7a0af70;
  border-bottom:1px solid #171217;
  box-shadow:0 8px 12px #17121790
}
@keyframes shelf-divider-pull {
  0%,2%,18%,100% {transform:translate3d(0,0,0) rotateY(0deg);z-index:0}
  7%,11% {transform:translate3d(0,-6px,42px) rotateY(-11deg);z-index:2}
}
@media (max-width:760px) {
  .shelf-divider {--divider-height:96px;margin-top:18px}
}
@media (prefers-reduced-motion:reduce) {
  .shelf-divider-book[data-pull] {animation:none!important;will-change:auto!important}
}
`;
