export const LANDING_SHELF_STYLES = `
.shelf-story {
  --shelf-row-height:clamp(340px,32vw,420px);
  position:relative;
  margin-block:70px 100px;
  isolation:isolate;
  overflow:clip
}
.shelf-tower {
  position:absolute;
  inset:0 55% 0 0;
  overflow:hidden;
  border-radius:4px;
  background:var(--bg);
  box-shadow:14px 0 28px #17121750
}
.shelf-tower>img {
  width:100%;
  height:calc(var(--shelf-row-height) * 3);
  max-width:none;
  object-fit:fill
}
.shelf-step {
  --shelf-arrive:clamp(0,calc((var(--shelf-progress,1) - .2) * 2.5),1);
  position:relative;
  display:grid;
  grid-template-columns:45% minmax(0,1fr);
  align-items:center;
  min-height:var(--shelf-row-height);
  scroll-margin-top:70px
}
.shelf-mobile-art {display:none}
.shelf-bubble {
  position:relative;
  grid-column:2;
  margin-left:50px;
  margin-right:10px;
  padding:33px 34px 30px;
  background:var(--text);
  color:var(--contrast);
  border:2px solid var(--contrast);
  border-radius:42% 9% 9% 7% / 10% 15% 12% 18%;
  box-shadow:7px 8px 0 var(--bordeaux);
  z-index:4;
  transition:opacity .3s,transform .3s
}
.shelf-bubble::before {
  content:"";
  position:absolute;
  left:-18px;
  top:42%;
  width:30px;
  height:25px;
  transform:skewY(-25deg) rotate(12deg);
  border-left:2px solid var(--contrast);
  border-bottom:2px solid var(--contrast);
  background:var(--text);
  clip-path:polygon(0 100%,100% 0,100% 100%)
}
.shelf-bubble h2 {
  margin:0 0 14px;
  color:var(--contrast);
  font-size:clamp(26px,2.65vw,38px);
  font-weight:650;
  letter-spacing:-.045em;
  line-height:1.13
}
.shelf-bubble>p {
  margin:0;
  color:var(--contrast);
  font-size:15px;
  line-height:1.65
}
.shelf-bubble-links {
  display:flex;
  flex-wrap:wrap;
  gap:12px 22px;
  margin-top:19px
}
.shelf-bubble-links:empty {display:none}
.shelf-evidence>summary,.shelf-example-link {
  display:inline-flex;
  align-items:center;
  gap:7px;
  min-height:34px;
  color:var(--contrast);
  font-size:12px;
  font-weight:650;
  text-decoration:none;
  list-style:none;
  border-bottom:1px solid var(--bordeaux);
  cursor:pointer
}
.shelf-evidence>summary::-webkit-details-marker {display:none}
.shelf-bubble-links svg {width:15px;height:15px}
.shelf-evidence>summary:focus-visible,.shelf-example-link:focus-visible {
  outline:2px solid var(--contrast);
  outline-offset:4px
}
.shelf-evidence[open]>summary {border-bottom-color:var(--contrast)}
.shelf-bubble:has(.shelf-evidence[open]) {z-index:10;opacity:1!important;transform:none!important}
.shelf-proof {
  position:absolute;
  right:0;
  top:calc(100% + 15px);
  display:grid;
  justify-items:center;
  width:260px;
  padding:16px;
  border:1px solid var(--line);
  border-radius:14px;
  background:var(--surface);
  color:var(--text);
  box-shadow:0 14px 30px #17121790;
  z-index:11
}
.shelf-proof>img {width:190px;height:auto;border-radius:12px}
.shelf-proof>figcaption {margin-top:11px;color:var(--muted);font-size:11px;text-align:center}
.is-shelf-ready .shelf-bubble {opacity:.48;transform:translateY(15px) scale(.98)}
.is-shelf-ready .is-shelf-active .shelf-bubble,.is-shelf-ready .shelf-step:focus-within .shelf-bubble,.is-shelf-ready .shelf-step:hover .shelf-bubble {opacity:1;transform:none}
.shelf-action {
  position:absolute;
  inset:0 55% 0 0;
  z-index:2;
  pointer-events:none
}
.shelf-moving-book {
  position:absolute;
  left:calc(69% + var(--book-index) * 6.5%);
  top:21%;
  width:31px;
  height:70%;
  max-height:285px;
  border:1.5px solid var(--contrast);
  border-left:3px solid var(--bordeaux);
  border-right:3px solid var(--rose);
  border-radius:2px 4px 3px 2px;
  background:var(--rose) url('/landing/manga-shelf-illustration.webp') var(--spine-x) -160px / 800px 1600px;
  box-shadow:3px 3px 0 #17121780;
  transform-origin:50% 100%;
  z-index:2
}
.shelf-moving-book::before,.shelf-moving-book::after {
  content:"";
  position:absolute;
  inset:6px 3px auto;
  height:4px;
  border-block:1px solid var(--contrast)
}
.shelf-moving-book::after {top:auto;bottom:11px}
.shelf-moving-book i {
  position:absolute;
  left:7px;
  top:35%;
  width:9px;
  height:9px;
  border:1px solid var(--text);
  transform:rotate(45deg)
}
.is-shelf-ready .shelf-feature-release .shelf-moving-book,.is-shelf-ready .shelf-feature-complete .shelf-moving-book {
  transform:translateX(calc((1 - var(--shelf-arrive)) * (720px + var(--book-index) * 85px))) translateY(calc((1 - var(--shelf-arrive)) * -80px)) rotate(calc((1 - var(--shelf-arrive)) * (18deg + var(--book-index) * 9deg)));
  opacity:clamp(0,calc(var(--shelf-progress,0) * 5),1)
}
.shelf-feature-follow .shelf-moving-book,.shelf-feature-discover .shelf-moving-book,.shelf-feature-detail .shelf-moving-book {
  left:calc(28% + var(--book-index) * 7%);
  width:34px
}
.is-shelf-ready .shelf-feature-follow .shelf-moving-book,.is-shelf-ready .shelf-feature-discover .shelf-moving-book,.is-shelf-ready .shelf-feature-detail .shelf-moving-book {
  transform:translateY(calc(var(--shelf-arrive) * -20px)) translateX(calc(var(--shelf-arrive) * var(--book-index) * 9px)) rotate(calc(var(--shelf-arrive) * (var(--book-index) - 1) * 3deg))
}
.shelf-row-highlight {
  position:absolute;
  inset:12% 4% 7%;
  border:2px solid transparent;
  border-radius:4px;
  pointer-events:none
}
.shelf-feature-value .shelf-row-highlight,.shelf-feature-complete .shelf-row-highlight {
  background:#d7a0af24;
  border-color:var(--rose);
  opacity:var(--shelf-arrive)
}
.shelf-feature-value .shelf-moving-book {transform:translateY(calc((1 - var(--shelf-arrive)) * -30px));opacity:var(--shelf-arrive)}
.shelf-follow-mark {
  position:absolute;
  top:5%;
  left:39%;
  display:grid;
  place-items:center;
  width:50px;
  height:50px;
  border:2px solid var(--text);
  border-radius:50%;
  background:var(--bordeaux);
  color:var(--text);
  transform:scale(calc(.7 + var(--shelf-arrive) * .3))
}
.shelf-follow-mark svg {width:30px;height:30px}
.shelf-feature-achievement .shelf-moving-book {display:none}
.shelf-award {
  position:absolute;
  left:calc(50% - 52px);
  top:calc(50% - 52px);
  display:grid;
  place-items:center;
  width:104px;
  height:104px;
  border:3px solid var(--text);
  border-radius:50%;
  outline:5px solid var(--bordeaux);
  background:var(--bordeaux);
  color:var(--text);
  box-shadow:8px 9px 0 #17121790;
  transform:rotate(calc(-8deg + var(--shelf-arrive) * 8deg)) scale(calc(.7 + var(--shelf-arrive) * .3))
}
.shelf-award svg {width:64px;height:64px;stroke-width:2}
.shelf-value {display:grid;gap:6px;margin-top:20px;padding-top:16px;border-top:1px solid #5a394840}
.shelf-value strong {font-size:42px;line-height:1.1;font-variant-numeric:tabular-nums;letter-spacing:-.05em}
.shelf-value span {font-size:11px;line-height:1.5;color:var(--bordeaux)}
@media(max-width:1050px) and (min-width:761px) {
  .shelf-story {--shelf-row-height:350px}
  .shelf-tower {right:53%}
  .shelf-step {grid-template-columns:47% minmax(0,1fr)}
  .shelf-action {right:53%}
  .shelf-bubble {margin-left:27px;padding:26px 25px}
  .shelf-bubble h2 {font-size:28px}
  .shelf-bubble>p {font-size:14px}
  .shelf-bubble-links {gap:6px 15px}
  .shelf-moving-book {width:25px}
}
@media(max-width:760px) {
  .shelf-story {--shelf-mobile-height:clamp(195px,calc((100vw - 40px) * .667),360px);max-width:540px;margin-block:10px 60px}
  .shelf-tower {display:none}
  .shelf-step {
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    align-items:stretch;
    min-height:calc(var(--shelf-mobile-height) + 230px);
    padding:calc(var(--shelf-mobile-height) - 68px) 0 28px;
    scroll-margin-top:25px
  }
  .shelf-mobile-art {display:block;position:absolute;top:0;left:0;right:0;height:var(--shelf-mobile-height);overflow:hidden;border-radius:3px}
  .shelf-mobile-art img {width:100%;height:calc(var(--shelf-mobile-height) * 3);max-width:none;transform:translateY(calc(var(--shelf-row) * var(--shelf-mobile-height) * -1));object-fit:fill}
  .shelf-bubble {width:calc(100% - 19px);margin:0 0 0 19px;padding:25px 25px 22px;box-shadow:5px 6px 0 var(--bordeaux)}
  .shelf-bubble::before {top:-14px;left:34px;width:24px;height:25px;transform:rotate(108deg)}
  .shelf-bubble h2 {font-size:27px;line-height:1.12;margin-bottom:12px}
  .shelf-bubble>p {font-size:14px;line-height:1.6}
  .shelf-action {inset:0 0 auto;height:var(--shelf-mobile-height);overflow:clip}
  .shelf-moving-book {top:16%;height:73%;width:22px}
  .shelf-follow-mark {width:38px;height:38px;top:4%}
  .shelf-follow-mark svg {width:25px;height:25px}
  .shelf-proof {width:min(260px,100%);right:0}
  .shelf-proof>img {width:160px}
  .shelf-value strong {font-size:36px}
  .shelf-award {width:78px;height:78px;left:calc(50% - 39px);top:calc(50% - 39px)}
  .shelf-award svg {width:48px;height:48px}
}
@media(prefers-reduced-motion:reduce) {
  .shelf-bubble,.shelf-moving-book,.shelf-award {transition:none!important}
}
`;
