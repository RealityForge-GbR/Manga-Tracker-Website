export const LANDING_CAT_STYLES = `
.download {
  grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);
  gap:12px;
  padding:36px 44px 20px 56px
}
.download-copy {
  padding-block:20px
}
.download-copy>p:not(.small) {
  margin-bottom:0
}
.cat-scene {
  position:relative;
  isolation:isolate;
  width:100%;
  aspect-ratio:5/4;
  align-self:end
}
.cat-art {
  position:absolute;
  bottom:0;
  left:0;
  width:100%;
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
.cat-still {
  width:100%
}
.cat-sprite {
  width:1500%;
  visibility:hidden
}
.is-cat-ready .cat-still {
  visibility:hidden
}
.is-cat-ready .cat-sprite {
  visibility:visible;
  animation:cat-nuzzle 1.875s steps(15,end) infinite;
  animation-play-state:paused
}
.is-cat-playing .cat-sprite {
  animation-play-state:running
}
.is-cat-unavailable .cat-sprite {
  display:none
}
.cat-cta {
  position:absolute;
  left:45.3125%;
  top:55.125%;
  width:51.5625%;
  min-height:44px;
  height:12.7%;
  justify-content:center;
  gap:10px;
  padding:0 14px;
  font-size:13px;
  white-space:nowrap;
  box-shadow:0 6px 0 var(--bordeaux)
}
.cat-cta>span,.cat-cta>svg {
  position:relative;
  z-index:3
}
.cat-cta>svg {
  width:18px;
  height:18px;
  flex:none
}
.cat-cta:hover {
  transform:none
}
.cat-cta:focus-visible {
  outline:3px solid var(--text);
  outline-offset:6px
}
.cat-toggle {
  position:absolute;
  right:2%;
  bottom:1%;
  z-index:5;
  display:grid;
  place-items:center;
  width:44px;
  height:44px;
  padding:10px;
  border:1px solid var(--line);
  border-radius:50%;
  background:var(--bg);
  color:var(--muted);
  cursor:pointer
}
.cat-toggle[hidden] {
  display:none
}
.cat-toggle svg {
  width:20px;
  height:20px;
  fill:none;
  stroke:currentColor;
  stroke-width:1.8;
  stroke-linecap:round;
  stroke-linejoin:round
}
.cat-toggle .cat-resume-icon,.cat-toggle[aria-pressed="true"] .cat-pause-icon {
  display:none
}
.cat-toggle[aria-pressed="true"] .cat-resume-icon {
  display:block
}
@keyframes cat-nuzzle {
  from {transform:translateX(0)}
  to {transform:translateX(-100%)}
}
@media(max-width:1050px) and (min-width:761px) {
  .download {
    grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);
    padding:30px 24px 20px 32px
  }
  .cat-scene {
    width:calc(100% + 12px);
    margin-left:-12px
  }
  .cat-cta {
    left:auto;
    right:2%;
    width:62%;
    min-width:205px;
    font-size:11px;
    gap:0;
    padding:0 10px 0 68px
  }
  .cat-cta>svg {
    display:none
  }
}
@media(max-width:760px) {
  .download {
    grid-template-columns:1fr;
    gap:0;
    padding:30px 24px 12px
  }
  .download-copy {
    padding:0
  }
  .cat-scene {
    width:calc(100% + 32px);
    max-width:480px;
    justify-self:center;
    margin:5px -16px 0
  }
  .cat-cta {
    left:auto;
    right:2%;
    width:66%;
    min-width:210px;
    height:14%;
    font-size:12px;
    gap:0;
    padding:0 10px 0 78px
  }
  .cat-cta>svg {
    display:none
  }
  .cat-toggle {
    right:1%;
    bottom:0
  }
}
@media(max-width:359px) {
  .download {
    padding-inline:20px
  }
  .cat-cta {
    min-width:200px;
    font-size:11px
  }
}
@media(prefers-reduced-motion:reduce) {
  .cat-sprite {
    animation:none!important;
    transform:none!important
  }
  .cat-toggle {
    display:none
  }
}
`;
