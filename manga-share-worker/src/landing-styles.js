import { LANDING_BUDGET_STYLES } from "./landing-budget-styles.js";
import { LANDING_CAT_STYLES } from "./landing-cat-styles.js";
import { LANDING_MOBILE_HERO_STYLES } from "./landing-mobile-hero-styles.js";

export const LANDING_STYLES = `
:root {
  --bg:#171217;
  --surface:#211a22;
  --elevated:#2a202b;
  --bordeaux:#5a3948;
  --secondary:#342735;
  --contrast:#30202a;
  --rose:#d7a0af;
  --text:#f7eee8;
  --muted:#c2b3b8;
  --line:var(--secondary);
  font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  color:var(--text);
  background:var(--bg);
  font-synthesis:none;
  scroll-behavior:smooth;
  scroll-padding-top:2rem
}
* {
  box-sizing:border-box
}
body {
  margin:0
}
a {
  color:inherit;
  text-underline-offset:.25em
}
img {
  max-width:100%;
  display:block
}
svg {
  width:22px;
  height:22px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.7;
  stroke-linecap:round;
  stroke-linejoin:round;
  flex:none
}
figure {
  margin:0
}
h1,h2,h3,p {
  margin-top:0
}
h1,h2,h3 {
  font-weight:650;
  letter-spacing:-.05em
}
em {
  font-style:normal;
  color:var(--rose)
}
p {
  color:var(--muted);
  line-height:1.75
}
a:focus-visible {
  outline:3px solid var(--rose);
  outline-offset:6px;
  border-radius:3px
}
.wrap {
  width:min(1280px,calc(100% - 96px));
  margin-inline:auto
}
.skip {
  position:fixed;
  top:-100px;
  left:16px;
  padding:12px 20px;
  background:var(--rose);
  color:var(--contrast);
  z-index:20
}
.skip:focus {
  top:12px
}
.header {
  display:flex;
  align-items:center;
  gap:32px;
  padding-block:26px
}
.brand {
  min-height:44px;
  display:flex;
  align-items:center;
  gap:12px;
  font-weight:700;
  font-size:18px;
  letter-spacing:-.02em;
  text-decoration:none;
  white-space:nowrap
}
.brand img {
  width:42px;
  height:42px
}
.header nav {
  display:flex;
  gap:32px;
  margin-left:auto
}
.header nav a,.header-download {
  font-size:13px;
  font-weight:600;
  text-decoration:none;
  min-height:44px;
  display:inline-flex;
  align-items:center
}
.header nav a {
  color:var(--muted)
}
.header nav a:hover {
  color:var(--text)
}
.header-download {
  gap:12px;
  padding-inline:17px;
  border:1px solid var(--line);
  border-radius:6px
}
.hero.wrap {
  width:100%;
  padding-inline:max(48px,calc((100% - 1280px)/2));
  overflow:clip
}
.hero {
  display:grid;
  grid-template-columns:1.05fr 1fr;
  align-items:center;
  gap:36px;
  min-height:770px;
  padding-top:35px;
  padding-bottom:60px
}
h1 {
  font-size:clamp(52px,5.3vw,80px);
  line-height:1.06;
  margin-bottom:28px
}
.lead {
  font-size:17px;
  max-width:510px;
  line-height:1.8;
  margin-bottom:30px
}
.hero-actions {
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:22px
}
.button {
  max-width:100%;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:12px;
  min-height:54px;
  border-radius:7px;
  padding:15px 19px;
  background:var(--rose);
  color:var(--contrast);
  font-size:14px;
  font-weight:750;
  text-decoration:none;
  transition:background .2s,transform .2s
}
.button:hover {
  background:var(--rose);
  box-shadow:0 0 0 3px var(--bordeaux);
  transform:translateY(-2px)
}
.button>svg:last-child {
  width:18px;
  margin-left:10px
}
.text-link {
  display:inline-flex;
  align-items:center;
  gap:12px;
  min-height:44px;
  font-size:13px;
  font-weight:600;
  text-decoration:none
}
.text-link:hover {
  text-decoration:underline
}
.small {
  font-size:12px;
  line-height:1.65
}
.hero-note {
  margin:18px 0 0;
  color:var(--rose);
  font-weight:600
}
.hero-visual {
  position:relative;
  min-width:0;
  height:650px;
  isolation:isolate
}
.hero-disc {
  position:absolute;
  width:100%;
  aspect-ratio:1;
  border:1px solid var(--line);
  border-radius:50%;
  top:90px;
  left:0
}
.hero-disc:after {
  content:"";
  position:absolute;
  inset:38px;
  border:1px solid var(--elevated);
  border-radius:50%
}
.phone {
  position:relative;
  width:260px;
  max-width:100%;
  padding:8px;
  background:var(--bg);
  border:1px solid var(--secondary);
  border-radius:31px;
  box-shadow:0 22px 45px var(--bg);
  flex:none;
  overflow:hidden
}
.phone img {
  width:100%;
  height:auto;
  border-radius:23px
}
.hero-front-rig {
  position:absolute;
  width:286px;
  top:35px;
  right:17%;
  transform:rotate(7deg);
  z-index:2
}
.hero-front-rig .hero-front {
  width:100%
}
.book-portal {
  visibility:hidden;
  position:absolute;
  inset:0;
  pointer-events:none;
  --travel:460px
}
.is-motion-ready .book-portal {
  visibility:visible
}
.portal-mouth {
  position:absolute;
  left:90%;
  top:51%;
  width:31%;
  height:31%;
  border:2px solid var(--rose);
  border-radius:50%;
  background:radial-gradient(ellipse,transparent 45%,var(--bg) 62%,var(--bordeaux) 82%,var(--rose) 98%);
  box-shadow:0 0 18px var(--bordeaux),inset 0 0 12px var(--bordeaux);
  transform:translate(-50%,-50%) rotate(-7deg)
}
.portal-ring {
  position:absolute;
  inset:-13%;
  border:1px solid var(--rose);
  border-radius:50%;
  opacity:0
}
.portal-book {
  position:absolute;
  left:90%;
  top:51%;
  width:21%;
  aspect-ratio:2/3;
  margin-left:-10.5%;
  margin-top:-15.75%;
  padding:0 5px 3px 0;
  border-radius:2px 4px 4px 2px;
  background:var(--text);
  border-right:2px solid var(--muted);
  border-bottom:2px solid var(--rose);
  box-shadow:5px 6px 0 var(--contrast);
  opacity:0;
  transform-origin:center;
  backface-visibility:hidden
}
.book-cover {
  display:block;
  width:100%;
  height:100%;
  border-left:3px solid var(--bordeaux);
  border-radius:1px 2px 2px 1px;
  background-image:url('/landing/releases.webp');
  background-repeat:no-repeat
}
.book-piece .book-cover {
  background-size:306.383% 398.056%;
  background-position:8.247% 27.213%
}
.book-spy .book-cover {
  background-size:290.323% 404.802%;
  background-position:67.797% 27.062%
}
.is-motion-ready .portal-book {
  animation:book-collect 6.4s linear infinite;
  animation-delay:var(--delay);
  animation-play-state:paused
}
.is-motion-ready .portal-ring {
  animation:portal-pull 2.4s ease-in infinite;
  animation-play-state:paused
}
.is-motion-ready .portal-ring:last-child {
  animation-delay:-1.2s
}
.is-collecting .portal-book,.is-collecting .portal-ring {
  animation-play-state:running
}
@keyframes book-collect {
  0% {
    opacity:0;
    transform:translate3d(var(--travel),var(--lift),0) rotate(var(--turn)) scale(1.12)
  }
  10% {
    opacity:1
  }
  45% {
    opacity:1;
    transform:translate3d(calc(var(--travel) * .52),calc(var(--lift) * .48),0) rotate(calc(var(--turn) * .6)) scale(.94)
  }
  76% {
    opacity:1;
    transform:translate3d(62px,calc(var(--lift) * .12),0) rotate(-14deg) scale(.58)
  }
  96%,100% {
    opacity:0;
    transform:translate3d(-12px,0,0) rotate(-48deg) scale(.02)
  }
}
@keyframes portal-pull {
  0% { opacity:0;transform:scale(1.35) }
  25% { opacity:.55 }
  100% { opacity:0;transform:scale(.65) }
}
.motion-toggle {
  position:absolute;
  right:0;
  bottom:25px;
  display:grid;
  place-items:center;
  width:44px;
  height:44px;
  padding:0;
  border:1px solid var(--line);
  border-radius:50%;
  background:var(--bg);
  color:var(--muted);
  cursor:pointer;
  z-index:3
}
.motion-toggle[hidden],.motion-toggle .resume-icon,.motion-toggle[aria-pressed="true"] .pause-icon {
  display:none
}
.motion-toggle[aria-pressed="true"] .resume-icon {
  display:block
}
.motion-toggle:hover {
  border-color:var(--rose);
  color:var(--rose)
}
.motion-toggle:focus-visible {
  outline:3px solid var(--rose);
  outline-offset:4px
}
.hero-back {
  position:absolute;
  width:240px;
  top:100px;
  left:3%;
  transform:rotate(-10deg)
}
.section {
  padding-block:120px;
  scroll-margin-top:20px
}
.section-heading {
  max-width:750px;
  margin-bottom:70px
}
h2 {
  font-size:clamp(34px,3.5vw,52px);
  line-height:1.16;
  margin-bottom:25px
}
.section-heading>p:last-child {
  max-width:610px;
  font-size:16px;
  margin:0
}
.discovery-grid>* {
  min-width:0
}
.discovery-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:100px;
  align-items:start
}
.discovery-shot {
  display:grid;
  justify-items:center;
  padding:35px 35px 22px;
  background:var(--surface);
  border-radius:18px
}
.discovery-shot .phone {
  width:285px
}
.phone+figcaption,figure>figcaption {
  font-size:11px;
  line-height:1.5;
  color:var(--muted);
  text-align:center;
  margin-top:23px
}
h3 {
  font-size:34px;
  line-height:1.2;
  margin-bottom:20px
}
.discovery-copy>p {
  max-width:420px;
  font-size:15px
}
.detail-inset {
  display:flex;
  align-items:center;
  gap:28px;
  margin-top:42px
}
.detail-inset .phone {
  width:160px;
  padding:5px;
  border-radius:20px
}
.detail-inset .phone img {
  border-radius:15px
}
.detail-inset p {
  font-size:12px;
  line-height:1.7
}
.detail-inset strong {
  font-weight:500;
  color:var(--text)
}
.collection {
  background:var(--surface)
}
.collection-grid {
  display:grid;
  grid-template-columns:1.15fr .85fr;
  gap:110px;
  align-items:center
}
.collection-copy>p {
  max-width:510px;
  font-size:15px
}
.collection-copy h2 {
  font-size:clamp(34px,3.2vw,48px)
}
.collection-shot {
  justify-self:center
}
.collection-shot .phone {
  width:285px
}
.benefits {
  padding:0;
  list-style:none;
  margin:30px 0
}
.benefits li {
  display:flex;
  align-items:center;
  gap:14px;
  padding:12px 0;
  font-size:14px;
  border-bottom:1px solid var(--line);
  line-height:1.6
}
.benefits li:before {
  content:"↗";
  color:var(--rose)
}
.collection-features {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:40px;
  margin-top:80px;
  padding-top:40px;
  border-top:1px solid var(--line)
}
.collection-features h3 {
  font-size:25px;
  letter-spacing:-.035em;
  margin-bottom:16px
}
.collection-features p {
  font-size:14px;
  margin-bottom:0
}
.series-feature {
  display:grid;
  grid-template-columns:.85fr 1.15fr;
  gap:80px;
  margin-top:110px;
  border-top:1px solid var(--line);
  padding-top:85px;
  align-items:center
}
.series-header>p {
  font-size:14px
}
.series-header>.small {
  font-size:12px
}
.preview-badge {
  display:inline-block;
  font-size:10px;
  color:var(--rose);
  border:1px solid var(--bordeaux);
  border-radius:4px;
  padding:6px 10px;
  line-height:1.5;
  margin-bottom:20px
}
.series-shots {
  display:flex;
  gap:24px;
  justify-content:center;
  align-items:center;
  min-width:0
}
.series-shots figure {
  min-width:0;
  width:230px
}
.series-shots .phone {
  width:100%
}
.series-shots figure:last-child {
  margin-top:70px
}
.planning-grid {
  display:grid;
  grid-template-columns:.8fr 1fr .8fr;
  gap:50px;
  align-items:start
}
.planning-grid>figure>.phone {
  width:100%
}
.planning-copy {
  padding-top:35px
}
.planning-copy h3 {
  font-size:28px
}
.planning-copy p {
  font-size:14px
}
.notification-copy {
  border-top:1px solid var(--line);
  margin-top:38px;
  padding-top:8px
}
.notification-copy .small {
  font-size:11px
}
.notification-copy .preview-badge {
  margin:2px 0 10px
}
.notification-shot {
  margin-top:155px
}
.trust {
  display:grid;
  grid-template-columns:1fr 1.35fr;
  gap:80px;
  border-top:1px solid var(--line);
  padding-top:80px;
  padding-bottom:110px
}
.trust dl {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:38px 42px;
  margin:0
}
.trust dt {
  font-size:15px;
  font-weight:600;
  margin-bottom:12px
}
.trust dd {
  margin:0;
  color:var(--muted);
  font-size:13px;
  line-height:1.8
}
.affiliate-note {
  max-width:360px;
  margin:25px 0 0;
  color:var(--muted);
  font-size:12px;
  line-height:1.8
}
.download {
  margin-bottom:70px;
  position:relative;
  display:grid;
  grid-template-columns:1.3fr .7fr;
  align-items:center;
  gap:50px;
  padding:65px 70px 0;
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:18px;
  overflow:hidden
}
.download-copy {
  padding-bottom:70px;
  position:relative;
  z-index:1
}
.download-icon {
  width:60px;
  height:60px;
  margin-bottom:32px
}
.download h2 {
  font-size:clamp(34px,3.6vw,52px)
}
.download-copy>p:not(.small) {
  max-width:420px;
  font-size:14px;
  margin-bottom:28px
}
.download .small {
  margin:17px 0 0;
  max-width:390px
}
.mascot {
  width:100%;
  height:auto;
  max-width:320px;
  align-self:end;
  justify-self:center
}
.footer {
  border-top:1px solid var(--line);
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:24px;
  padding-block:34px
}
.footer .brand {
  font-size:14px
}
.footer .brand img {
  width:30px;
  height:30px
}
.footer>p {
  font-size:11px;
  margin:0
}
.footer nav {
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  margin-left:auto
}
.footer nav a {
  font-size:11px;
  min-height:44px;
  display:inline-flex;
  align-items:center;
  text-decoration:none;
  color:var(--muted)
}
.footer nav a:hover {
  text-decoration:underline
}
@media(min-width:1500px) {
  .hero {
    gap:80px
  }
  .hero-front-rig {
    right:16%;
    width:300px
  }
  .hero-back {
    left:6%
  }
}
@media(max-width:1050px) {
  .hero.wrap {
    padding-inline:32px
  }
  .book-portal {
    --travel:340px
  }
  .wrap {
    width:calc(100% - 64px)
  }
  .header nav {
    gap:20px
  }
  .hero {
    gap:20px;
    min-height:660px;
    padding-top:20px
  }
  .hero h1 {
    font-size:clamp(46px,6vw,65px)
  }
  .hero-visual {
    height:560px
  }
  .hero-front-rig {
    width:235px;
    right:8%
  }
  .hero-back {
    width:190px;
    left:0;
    top:100px
  }
  .hero-disc {
    top:100px
  }
  .lead {
    font-size:15px
  }
  .hero-actions {
    gap:10px
  }
  .button {
    font-size:13px
  }
  .section {
    padding-block:85px
  }
  .discovery-grid {
    gap:60px
  }
  .collection-grid {
    gap:60px
  }
  .series-feature {
    gap:40px
  }
  .series-shots {
    gap:15px
  }
  .planning-grid {
    gap:28px;
    grid-template-columns:.85fr 1.15fr
  }
  .notification-shot {
    display:block;
    grid-column:1/-1;
    justify-self:center;
    width:250px;
    margin-top:0
  }
  .notification-copy {
    margin-top:30px
  }
  .trust {
    gap:50px
  }
  .download {
    padding:50px 45px 0
  }
  .footer nav {
    margin-left:0
  }
}
@media(max-width:760px) {
  .hero.wrap {
    padding-inline:20px
  }
  .book-portal {
    --travel:210px
  }
  .portal-book:nth-of-type(n+7) {
    display:none
  }
  .is-motion-ready .portal-book {
    animation-duration:4s
  }
  .wrap {
    width:calc(100% - 40px)
  }
  .header {
    padding-block:20px;
    gap:12px;
    flex-wrap:wrap
  }
  .brand {
    font-size:16px
  }
  .brand img {
    width:36px;
    height:36px
  }
  .header-download {
    margin-left:auto;
    font-size:12px;
    padding-inline:12px;
    gap:7px
  }
  .header-download svg {
    width:17px
  }
  .header nav {
    order:3;
    width:100%;
    justify-content:space-between;
    margin:4px 0 0;
    gap:15px;
    border-bottom:1px solid var(--line);
    padding-bottom:7px
  }
  .header nav a {
    font-size:12px
  }
  .hero {
    display:flex;
    flex-direction:column;
    gap:10px;
    padding-top:24px;
    padding-bottom:40px;
    min-height:0;
    align-items:stretch
  }
  .hero h1 {
    font-size:clamp(42px,9.8vw,68px);
    line-height:1.08;
    margin-bottom:24px
  }
  .lead {
    font-size:14px;
    line-height:1.8;
    max-width:460px;
    margin-bottom:24px
  }
  .hero-actions {
    gap:9px 18px
  }
  .button {
    min-height:52px;
    padding:14px 16px;
    font-size:13px;
    gap:9px
  }
  .button>svg:last-child {
    margin-left:7px;
    width:16px
  }
  .text-link {
    font-size:12px
  }
  .hero-note {
    font-size:11px;
    margin-top:12px
  }
  .hero-visual {
    height:535px;
    margin:25px auto 0;
    width:min(410px,100%)
  }
  .hero-front-rig {
    width:225px;
    right:18%;
    top:10px;
    transform:rotate(6deg)
  }
  .hero-back {
    width:185px;
    left:0;
    top:48px;
    transform:rotate(-8deg)
  }
  .hero-disc {
    top:65px;
    width:100%
  }
  .section {
    padding-block:65px
  }
  .section-heading {
    margin-bottom:35px
  }
  h2 {
    font-size:clamp(30px,7.7vw,42px);
    margin-bottom:20px
  }
  .section-heading>p:last-child {
    font-size:14px
  }
  .discovery-grid {
    grid-template-columns:1fr;
    gap:40px
  }
  .discovery-shot {
    padding:30px 22px 20px
  }
  .discovery-shot .phone {
    width:245px
  }
  .discovery-copy>p {
    max-width:100%;
    font-size:14px
  }
  .discovery-copy h3 {
    font-size:31px
  }
  .detail-inset {
    justify-content:center;
    gap:25px;
    margin-top:30px
  }
  .detail-inset .phone {
    width:150px
  }
  .collection-features {
    grid-template-columns:1fr;
    gap:30px;
    margin-top:45px;
    padding-top:35px
  }
  .collection-features h3 {
    font-size:24px;
    margin-bottom:12px
  }
  .collection-grid {
    grid-template-columns:1fr;
    gap:35px
  }
  .collection-copy h2 {
    font-size:clamp(30px,7.7vw,42px)
  }
  .collection-copy>p {
    font-size:14px
  }
  .collection-shot .phone {
    width:245px
  }
  .benefits li {
    font-size:13px
  }
  .series-feature {
    grid-template-columns:1fr;
    gap:30px;
    margin-top:65px;
    padding-top:45px
  }
  .series-header h3 {
    font-size:31px
  }
  .series-shots {
    gap:15px;
    align-items:start
  }
  .series-shots figure {
    width:50%
  }
  .series-shots .phone {
    padding:5px;
    border-radius:22px
  }
  .series-shots .phone img {
    border-radius:16px
  }
  .series-shots figure:last-child {
    margin-top:35px
  }
  .series-shots figcaption {
    font-size:9px;
    margin-top:15px
  }
  .planning-grid {
    grid-template-columns:1fr;
    gap:35px
  }
  .planning-grid>figure:first-child {
    justify-self:center;
    width:245px
  }
  .planning-copy {
    padding:0
  }
  .planning-copy h3 {
    font-size:31px
  }
  .notification-shot {
    display:block;
    margin-top:0;
    justify-self:center;
    width:230px
  }
  .notification-copy {
    margin-top:35px;
    padding-top:22px
  }
  .trust {
    grid-template-columns:1fr;
    gap:24px
  }
  .trust dl {
    grid-template-columns:1fr;
    gap:0
  }
  .trust dl>div {
    padding-block:22px;
    border-top:1px solid var(--line)
  }
  .trust dt {
    font-size:15px;
    margin-bottom:8px
  }
  .trust dd {
    font-size:13px
  }
  .download {
    margin-bottom:40px;
    grid-template-columns:1fr;
    gap:0;
    padding:35px 25px 0
  }
  .download-copy {
    padding-bottom:30px
  }
  .download h2 {
    font-size:34px
  }
  .download-icon {
    width:52px;
    height:52px;
    margin-bottom:25px
  }
  .download .mascot {
    max-width:225px;
    justify-self:end;
    margin-top:0
  }
  .download .small {
    font-size:11px
  }
  .footer {
    gap:16px;
    padding-block:26px
  }
  .footer>p {
    margin-left:auto;
    font-size:10px
  }
  .footer nav {
    gap:15px;
    width:100%;
    justify-content:space-between
  }
  .footer nav a {
    font-size:10px
  }
}
@media(max-width:359px) {
  .hero.wrap {
    padding-inline:16px
  }
  .button>svg:last-child {
    display:none
  }
  .wrap {
    width:calc(100% - 32px)
  }
  .brand {
    font-size:14px;
    gap:8px
  }
  .header-download {
    font-size:11px;
    padding-inline:10px
  }
  .hero h1 {
    font-size:39px
  }
  .hero-visual {
    height:480px
  }
  .hero-front-rig {
    width:202px;
    right:16%
  }
  .hero-back {
    width:165px;
    left:0
  }
  .download {
    padding-inline:20px
  }
  .download h2 {
    font-size:29px
  }
  .footer>p {
    margin-left:0
  }
}
${LANDING_BUDGET_STYLES}
${LANDING_CAT_STYLES}
${LANDING_MOBILE_HERO_STYLES}
@media(prefers-reduced-motion:reduce) {
  .book-portal,.motion-toggle {
    display:none
  }
  :root {
    scroll-behavior:auto
  }
  *,*::before,*::after {
    animation:none!important;
    transition:none!important
  }
  .button:hover {
    transform:none
  }
}
`;
