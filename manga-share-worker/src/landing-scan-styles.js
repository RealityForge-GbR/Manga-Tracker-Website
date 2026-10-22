export const LANDING_SCAN_STYLES = `
.scan-demo {
  position:absolute;
  inset:6% 4% 7%;
  display:grid;
  place-items:center;
  overflow:hidden;
  border:2px solid var(--bordeaux);
  border-radius:5px;
  background:var(--bg);
  box-shadow:inset 0 0 0 5px var(--surface),4px 5px 0 #17121770
}
.scan-scene {display:block;width:100%;height:100%;overflow:visible;stroke:none;stroke-width:1}
.scan-flight,.scan-beam {transform-origin:0 0}
.scan-beam {opacity:0}
.scan-confirm {opacity:1}
.is-scan-ready .scan-flight,.is-scan-ready .scan-beam,.is-scan-ready .scan-confirm {
  animation-duration:12s;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
  animation-fill-mode:both;
  animation-play-state:paused
}
.is-scan-ready .scan-flight-0 {animation-name:scan-volume-one}
.is-scan-ready .scan-flight-1 {animation-name:scan-volume-two}
.is-scan-ready .scan-flight-2 {animation-name:scan-volume-three}
.is-scan-ready .scan-beam {animation-name:scan-sweep}
.is-scan-ready .scan-confirm-0 {animation-name:scan-confirm-one}
.is-scan-ready .scan-confirm-1 {animation-name:scan-confirm-two}
.is-scan-ready .scan-confirm-2 {animation-name:scan-confirm-three}
.is-scan-playing .scan-flight,.is-scan-playing .scan-beam,.is-scan-playing .scan-confirm {animation-play-state:running}
@keyframes scan-volume-one {
  0%,11% {transform:translate(153px,159px) rotate(90deg);opacity:1}
  14% {transform:translate(154px,139px) rotate(85deg);animation-timing-function:cubic-bezier(.45,0,.2,1)}
  21% {transform:translate(263px,132px) rotate(0deg)}
  23%,89% {transform:translate(263px,136px) rotate(0deg);opacity:1}
  93% {transform:translate(263px,136px) rotate(0deg);opacity:0}
  94% {transform:translate(153px,159px) rotate(90deg);opacity:0}
  99%,100% {transform:translate(153px,159px) rotate(90deg);opacity:1}
}
@keyframes scan-volume-two {
  0%,36% {transform:translate(153px,189px) rotate(90deg);opacity:1}
  39% {transform:translate(153px,168px) rotate(85deg);animation-timing-function:cubic-bezier(.45,0,.2,1)}
  46% {transform:translate(295px,132px) rotate(0deg)}
  48%,89% {transform:translate(295px,136px) rotate(0deg);opacity:1}
  93% {transform:translate(295px,136px) rotate(0deg);opacity:0}
  94% {transform:translate(153px,189px) rotate(90deg);opacity:0}
  99%,100% {transform:translate(153px,189px) rotate(90deg);opacity:1}
}
@keyframes scan-volume-three {
  0%,61% {transform:translate(153px,219px) rotate(90deg);opacity:1}
  64% {transform:translate(153px,198px) rotate(85deg);animation-timing-function:cubic-bezier(.45,0,.2,1)}
  71% {transform:translate(327px,132px) rotate(0deg)}
  73%,89% {transform:translate(327px,136px) rotate(0deg);opacity:1}
  93% {transform:translate(327px,136px) rotate(0deg);opacity:0}
  94% {transform:translate(153px,219px) rotate(90deg);opacity:0}
  99%,100% {transform:translate(153px,219px) rotate(90deg);opacity:1}
}
@keyframes scan-sweep {
  0%,3% {transform:translateY(0);opacity:0}
  4% {transform:translateY(0);opacity:1}
  10% {transform:translateY(29px);opacity:1}
  11%,27% {transform:translateY(29px);opacity:0}
  28% {transform:translateY(30px);opacity:1}
  35% {transform:translateY(59px);opacity:1}
  36%,52% {transform:translateY(59px);opacity:0}
  53% {transform:translateY(60px);opacity:1}
  60% {transform:translateY(89px);opacity:1}
  61%,100% {transform:translateY(89px);opacity:0}
}
@keyframes scan-confirm-one {
  0%,10% {opacity:.2}
  12%,89% {opacity:1}
  94%,100% {opacity:.2}
}
@keyframes scan-confirm-two {
  0%,35% {opacity:.2}
  37%,89% {opacity:1}
  94%,100% {opacity:.2}
}
@keyframes scan-confirm-three {
  0%,60% {opacity:.2}
  62%,89% {opacity:1}
  94%,100% {opacity:.2}
}
@media(max-width:760px) {
  .scan-demo {inset:2px 0 4px;box-shadow:inset 0 0 0 4px var(--surface)}
}
`;
