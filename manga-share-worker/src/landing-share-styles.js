export const LANDING_SHARE_STYLES = `
.share-demo {
  position:absolute;
  inset:4% 4% 5%;
  display:block;
  overflow:hidden;
  border:2px solid var(--bordeaux);
  border-radius:5px;
  background:var(--bg);
  box-shadow:inset 0 0 0 5px var(--surface),4px 5px 0 #17121770
}
.share-scene {position:absolute;inset:6px;display:block;width:calc(100% - 12px);height:calc(100% - 12px);overflow:visible;stroke:none;stroke-width:1}
.share-scene svg {stroke:none;stroke-width:1}
.share-library-screen {width:130px;height:258.736px}
.share-cover-crop {width:70px;height:104px}
.share-book {transform-origin:0 0;opacity:0}
.share-source-mark,.share-trail,.share-spark,.share-arrival {opacity:0}
.share-delivered,.share-badge {opacity:1}
.share-device-target {transform-origin:383px 169px}
.share-arrival,.share-badge,.share-spark {transform-origin:0 0}
.is-share-ready .share-book,.is-share-ready .share-source-mark,.is-share-ready .share-trail,
.is-share-ready .share-badge,.is-share-ready .share-spark,.is-share-ready .share-arrival,
.is-share-ready .share-delivered,.is-share-ready .share-device-target {
  animation-duration:9.6s;
  animation-timing-function:linear;
  animation-iteration-count:infinite;
  animation-fill-mode:both;
  animation-play-state:paused
}
.is-share-ready .share-book {animation-name:share-book-flight}
.is-share-ready .share-source-mark {animation-name:share-select}
.is-share-ready .share-trail {animation-name:share-flight-trail}
.is-share-ready .share-badge {animation-name:share-midway-badge}
.is-share-ready .share-spark-one {animation-name:share-sparkle-one}
.is-share-ready .share-spark-two {animation-name:share-sparkle-two}
.is-share-ready .share-arrival {animation-name:share-arrival-ring}
.is-share-ready .share-delivered {animation-name:share-confirm}
.is-share-ready .share-device-target {animation-name:share-phone-settle}
.is-share-playing .share-book,.is-share-playing .share-source-mark,.is-share-playing .share-trail,
.is-share-playing .share-badge,.is-share-playing .share-spark,.is-share-playing .share-arrival,
.is-share-playing .share-delivered,.is-share-playing .share-device-target {animation-play-state:running}
@keyframes share-book-flight {
  0%,11% {transform:translate(44px,138px) rotate(0deg) scale(.36);opacity:0}
  13% {transform:translate(44px,138px) rotate(0deg) scale(.36);opacity:1;animation-timing-function:cubic-bezier(.2,.7,.3,1)}
  22% {transform:translate(62px,113px) rotate(-9deg) scale(.55);animation-timing-function:cubic-bezier(.35,0,.2,1)}
  37% {transform:translate(203px,65px) rotate(-10deg) scale(1.06);animation-timing-function:ease-in-out}
  46% {transform:translate(204px,72px) rotate(6deg) scale(1);animation-timing-function:cubic-bezier(.6,0,.4,1)}
  63% {transform:translate(330px,134px) rotate(0deg) scale(.4)}
  67%,79% {transform:translate(330px,138px) rotate(0deg) scale(.36);opacity:1}
  84%,91% {transform:translate(330px,138px) rotate(0deg) scale(.36);opacity:0}
  92%,100% {transform:translate(44px,138px) rotate(0deg) scale(.36);opacity:0}
}
@keyframes share-select {
  0%,5% {opacity:0}
  10%,17% {opacity:1}
  27%,100% {opacity:0}
}
@keyframes share-flight-trail {
  0%,25% {opacity:0;transform:translateX(-12px)}
  34%,40% {opacity:.8;transform:translateX(0)}
  52%,100% {opacity:0;transform:translateX(12px)}
}
@keyframes share-midway-badge {
  0%,30% {opacity:0;transform:translate(258px,67px) scale(.7)}
  38%,46% {opacity:1;transform:translate(258px,67px) scale(1)}
  54%,100% {opacity:0;transform:translate(258px,67px) scale(.85)}
}
@keyframes share-sparkle-one {
  0%,28% {opacity:0;transform:translate(194px,57px) scale(.5)}
  35% {opacity:1;transform:translate(194px,57px) scale(1)}
  43%,100% {opacity:0;transform:translate(194px,57px) scale(.5)}
}
@keyframes share-sparkle-two {
  0%,38% {opacity:0;transform:translate(285px,122px) scale(.5)}
  44% {opacity:1;transform:translate(285px,122px) scale(1)}
  52%,100% {opacity:0;transform:translate(285px,122px) scale(.5)}
}
@keyframes share-arrival-ring {
  0%,60% {opacity:0;transform:translate(343px,157px) scale(.7)}
  65% {opacity:.9;transform:translate(343px,157px) scale(1)}
  77%,100% {opacity:0;transform:translate(343px,157px) scale(1.45)}
}
@keyframes share-confirm {
  0%,62% {opacity:0}
  68%,86% {opacity:1}
  94%,100% {opacity:0}
}
@keyframes share-phone-settle {
  0%,62% {transform:translateY(0) rotate(0deg)}
  65% {transform:translateY(2px) rotate(.6deg);animation-timing-function:ease-out}
  71%,100% {transform:translateY(0) rotate(0deg)}
}
@media(max-width:760px) {
  .shelf-feature-share {--shelf-mobile-height:clamp(220px,calc((100vw - 40px) * .78),390px)}
  .share-demo {inset:2px 0 4px;box-shadow:inset 0 0 0 4px var(--surface)}
}
`;
