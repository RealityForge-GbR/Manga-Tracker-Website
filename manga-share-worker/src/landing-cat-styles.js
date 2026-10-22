export const LANDING_CAT_STYLES = `
.download {
  grid-template-columns:minmax(0,1fr) minmax(360px,.9fr);
  align-items:center;
  column-gap:28px;
  row-gap:8px;
  padding:28px 40px 18px
}
.download-heading {
  grid-column:1/-1;
  display:flex;
  align-items:center;
  gap:20px;
  min-width:0
}
.download .download-icon {
  flex:none;
  width:80px;
  height:80px;
  margin:0;
  border-radius:12px
}
.download h2 {
  margin:0;
  color:var(--text);
  font-size:clamp(28px,3.1vw,42px);
  line-height:1.15;
  white-space:nowrap
}
.download-benefits {
  list-style:none;
  display:grid;
  gap:11px;
  align-self:center;
  padding:12px 0;
  margin:0;
  font-size:14px;
  line-height:1.5;
  color:var(--muted)
}
.download-benefits li {
  position:relative;
  padding-left:23px
}
.download-benefits li::before {
  content:"";
  position:absolute;
  left:2px;
  top:.35em;
  width:6px;
  height:10px;
  border:solid var(--rose);
  border-width:0 1.5px 1.5px 0;
  transform:rotate(45deg)
}
.cat-scene {
  --cat-size:240px;
  position:relative;
  isolation:isolate;
  width:100%;
  max-width:410px;
  height:210px;
  justify-self:end;
  align-self:end
}
.cat-art {
  position:absolute;
  bottom:18px;
  left:0;
  width:var(--cat-size);
  aspect-ratio:1;
  overflow:hidden;
  pointer-events:none;
  z-index:2
}
.cat-still,.cat-sprite {
  position:absolute;
  top:0;
  left:0;
  display:block;
  height:100%;
  max-width:none;
  pointer-events:none;
  user-select:none
}
.cat-still {width:100%}
.cat-sprite {width:1500%;visibility:hidden}
.is-cat-ready .cat-still {visibility:hidden}
.is-cat-ready .cat-sprite {
  visibility:visible;
  animation:cat-nuzzle 1.875s steps(15,end) infinite;
  animation-play-state:paused
}
.is-cat-playing .cat-sprite {animation-play-state:running}
.is-cat-unavailable .cat-sprite {display:none}
.cat-cta {
  position:absolute;
  left:calc(var(--cat-size) * .453125);
  bottom:62px;
  width:238px;
  height:64px;
  min-height:64px;
  justify-content:center;
  gap:10px;
  padding:9px 11px 9px 26px;
  border-radius:8px;
  box-shadow:0 4px 0 var(--bordeaux)
}
.cat-cta>span,.cat-cta>svg {position:relative;z-index:3}
.cat-cta>svg {
  width:22px;
  height:22px;
  flex:none
}
.cat-cta-label {
  display:grid;
  gap:3px;
  text-align:left;
  white-space:nowrap
}
.cat-cta-label strong {font-size:13px;font-weight:750;line-height:1.2}
.cat-cta-label small {font-size:11px;font-weight:500;line-height:1.2}
.cat-cta:hover {transform:none}
.cat-cta:focus-visible {outline:3px solid var(--text);outline-offset:6px}
.manga-shelf {
  position:absolute;
  left:0;
  right:0;
  bottom:14px;
  height:12px;
  border-top:2px solid var(--rose);
  border-radius:2px;
  background:linear-gradient(var(--bordeaux),var(--secondary));
  box-shadow:0 5px 10px #17121760
}
.manga-shelf::before,.manga-shelf::after {
  content:"";
  position:absolute;
  top:10px;
  width:9px;
  height:14px;
  background:var(--secondary);
  border-radius:0 0 2px 2px
}
.manga-shelf::before {left:26px}
.manga-shelf::after {right:26px}
.shelf-books {
  position:absolute;
  left:calc(var(--cat-size) * .453125 + 4px);
  bottom:26px;
  width:230px;
  height:36px;
  display:flex;
  flex-direction:column;
  gap:2px
}
.shelf-books span {
  position:relative;
  flex:1;
  border:1px solid var(--bordeaux);
  border-left:9px solid var(--bordeaux);
  border-right:3px solid var(--bordeaux);
  border-radius:2px;
  background:repeating-linear-gradient(0deg,var(--muted) 0 1px,var(--text) 1px 3px)
}
.shelf-books span:nth-child(2) {
  margin-inline:5px -3px;
  border-color:var(--rose)
}
.shelf-books span:nth-child(3) {margin-inline:-3px 2px}
@keyframes cat-nuzzle {
  from {transform:translateX(0)}
  to {transform:translateX(-100%)}
}
@media(max-width:980px) {
  .download {
    grid-template-columns:1fr;
    padding:26px 30px 18px;
    row-gap:14px
  }
  .download .download-icon {width:66px;height:66px}
  .download h2 {font-size:clamp(24px,4vw,36px)}
  .download-benefits {padding:0}
  .cat-scene {justify-self:center;margin-top:4px}
}
@media(max-width:760px) {
  .download {padding:24px 20px 16px;row-gap:20px}
  .download-heading {gap:12px}
  .download .download-icon {width:44px;height:44px;border-radius:7px}
  .download h2 {font-size:clamp(17px,4.15vw,27px);letter-spacing:-.055em}
  .download-benefits {gap:10px;font-size:12px;line-height:1.55}
  .cat-scene {
    --cat-size:210px;
    width:100%;
    max-width:350px;
    height:188px;
    margin-top:12px
  }
  .cat-cta {
    width:calc(100% - var(--cat-size) * .453125 - 2px);
    height:60px;
    min-height:60px;
    padding:8px 8px 8px 17px;
    gap:7px
  }
  .cat-cta>svg {width:19px;height:19px}
  .cat-cta-label strong {font-size:11px}
  .cat-cta-label small {font-size:10px}
  .shelf-books {width:calc(100% - var(--cat-size) * .453125 - 7px)}
}
@media(max-width:380px) {
  .download {padding-inline:14px}
  .download-heading {gap:9px}
  .download .download-icon {width:38px;height:38px}
  .download h2 {font-size:clamp(15px,4.15vw,17px)}
  .cat-scene {--cat-size:185px;height:174px}
  .cat-cta {padding-left:14px;gap:5px}
  .cat-cta>svg {width:17px;height:17px}
  .cat-cta-label strong {font-size:10px}
}
@media(prefers-reduced-motion:reduce) {
  .cat-sprite {animation:none!important;transform:none!important}
}
`;
