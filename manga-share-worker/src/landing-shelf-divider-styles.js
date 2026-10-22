export const LANDING_SHELF_DIVIDER_STYLES = `
.shelf-divider {
  --divider-height:clamp(108px,10vw,142px);
  --book-depth:calc(var(--divider-height) * .69);
  position:relative;
  width:100%;
  height:calc(var(--divider-height) + 48px);
  margin-block:28px 0;
  overflow:visible;
  isolation:isolate;
  pointer-events:none
}
.shelf-divider-recess {
  position:absolute;
  inset:0 0 27px;
  overflow:clip;
  background:linear-gradient(0deg,#5a3948b3,#34273580 65%,transparent 96%)
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
  padding-top:8px
}
.shelf-divider-slot {
  position:relative;
  display:block;
  flex:var(--book-width) 0 0;
  height:var(--book-height);
  min-width:0;
  color:var(--spine-ink);
  border-radius:2px 3px 1px 1px;
  background:linear-gradient(90deg,#5a394840,#f7eee81a 55%,#5a394850),var(--spine);
  box-shadow:inset 0 0 0 1px #c2b3b840
}
.shelf-divider-book {
  position:absolute;
  inset:0;
  display:block;
  color:inherit;
  transform:perspective(650px) translate3d(0,0,0) rotateY(0deg) rotateX(0deg);
  transform-origin:center bottom;
  transform-style:preserve-3d
}
.shelf-divider-spine {
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,#30202a35,transparent 18%,#f7eee81d 73%,#30202a65),var(--spine);
  border:1px solid #30202a80;
  border-radius:2px 3px 1px 1px;
  box-shadow:inset 1px 0 #f7eee836,inset -2px 0 #30202a45;
  backface-visibility:hidden
}
.shelf-divider-spine::before,.shelf-divider-spine::after {
  content:"";
  position:absolute;
  left:12%;
  right:12%;
  height:4px;
  border-block:1px solid currentColor;
  opacity:.6
}
.shelf-divider-spine::before {top:8px}
.shelf-divider-spine::after {bottom:26px}
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
.shelf-divider-cover {
  position:absolute;
  top:0;
  bottom:0;
  left:100%;
  width:var(--book-depth);
  overflow:hidden;
  color:var(--spine-ink);
  background:linear-gradient(110deg,#f7eee819,transparent 60%,#30202a30),var(--spine);
  border:1px solid #30202a70;
  box-shadow:inset 0 0 0 3px var(--spine),inset 0 0 0 4px currentColor;
  transform:rotateY(90deg);
  transform-origin:left center;
  backface-visibility:hidden
}
.shelf-divider-cover::before {
  content:"";
  position:absolute;
  inset:25% 15% 24%;
  border:1px solid currentColor;
  border-radius:48% 48% 2px 2px;
  opacity:.52
}
.shelf-divider-cover::after {
  content:"";
  position:absolute;
  width:27%;
  aspect-ratio:1;
  left:36%;
  bottom:30%;
  border:1px solid currentColor;
  transform:rotate(45deg);
  opacity:.5
}
.shelf-divider-cover-title {
  position:absolute;
  top:12%;
  left:8%;
  right:8%;
  text-align:center;
  font-size:clamp(7px,.7vw,10px);
  font-weight:600;
  letter-spacing:.14em
}
.shelf-divider-cover-art {
  position:absolute;
  inset:36% 0 auto;
  text-align:center;
  font-size:29px;
  line-height:1;
  opacity:.9
}
.shelf-divider-cover-volume {
  position:absolute;
  inset:auto 0 9%;
  text-align:center;
  font-size:10px
}
.shelf-divider-pages {
  position:absolute;
  inset:3px 2px 2px;
  background:repeating-linear-gradient(0deg,#f7eee8 0 2px,#c2b3b8 2px 3px);
  border:1px solid #c2b3b8;
  transform:translateZ(calc(-1 * var(--book-depth)))
}
.shelf-divider-top {
  position:absolute;
  left:1px;
  right:0;
  top:calc(-1 * var(--book-depth));
  height:var(--book-depth);
  background:repeating-linear-gradient(90deg,#f7eee8 0 2px,#c2b3b8 2px 3px);
  border:1px solid var(--spine);
  transform:rotateX(90deg);
  transform-origin:center bottom;
  backface-visibility:hidden
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
  z-index:3;
  inset:auto 0 13px;
  height:15px;
  background:linear-gradient(0deg,var(--contrast) 0 32%,var(--bordeaux) 33% 78%,var(--rose) 80% 86%,var(--bordeaux) 88%);
  border-top:1px solid #d7a0af70;
  border-bottom:1px solid #171217;
  box-shadow:0 8px 12px #17121790
}
.shelf-divider-sparks {position:absolute;inset:-100px 0 0;z-index:4;overflow:clip}
.shelf-divider-spark {
  position:absolute;
  bottom:calc(var(--divider-height) * .8 + 27px);
  left:var(--spark-x);
  width:var(--spark-size);
  height:var(--spark-size);
  color:var(--spark-color);
  background:currentColor;
  border-radius:50%;
  opacity:0;
  box-shadow:0 0 5px 1px currentColor,0 0 13px currentColor;
  animation:shelf-divider-spark var(--spark-duration) ease-in-out var(--spark-delay) infinite both paused
}
.shelf-divider-spark:nth-child(3n)::after {
  content:"";
  position:absolute;
  inset:-3px;
  background:currentColor;
  clip-path:polygon(50% 0,59% 40%,100% 50%,59% 60%,50% 100%,41% 60%,0 50%,41% 40%)
}
.is-shelf-divider-moving .shelf-divider-spark {animation-play-state:running}
@keyframes shelf-divider-pull {
  0%,2%,20%,100% {transform:perspective(650px) translate3d(0,0,0) rotateY(0deg) rotateX(0deg);z-index:0}
  8%,12% {transform:perspective(650px) translate3d(-3px,-4px,48px) rotateY(-31deg) rotateX(-4deg);z-index:2}
}
@keyframes shelf-divider-spark {
  0%,12% {opacity:0;transform:translate3d(0,0,0) scale(.5)}
  26% {opacity:.8;transform:translate3d(calc(var(--spark-drift) * .2),-22px,0) scale(1.05)}
  65% {opacity:.45;transform:translate3d(calc(var(--spark-drift) * .8),-96px,0) scale(.65)}
  88%,100% {opacity:0;transform:translate3d(var(--spark-drift),-128px,0) scale(.2)}
}
@media (max-width:760px) {
  .shelf-divider {--divider-height:96px;margin-top:18px}
  .shelf-divider-cover-art {font-size:24px}
}
@media (prefers-reduced-motion:reduce) {
  .shelf-divider-book[data-pull],.shelf-divider-spark {animation:none!important;will-change:auto!important}
  .shelf-divider-spark {display:none}
}
`;
