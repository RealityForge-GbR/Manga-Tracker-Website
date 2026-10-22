export const LANDING_HERO_FLOAT_STYLES = `
.hero-book-field {display:none}
.hero-visual .hero-bob>.phone {
  position:relative;
  top:auto;
  left:auto;
  width:100%;
  transform:none;
  padding:17px 7px 16px;
  border:1px solid var(--muted);
  border-radius:29px;
  background:linear-gradient(112deg,var(--muted),var(--secondary) 5%,var(--bg) 14%,var(--elevated) 94%,var(--muted));
  box-shadow:inset 2px 0 1px var(--secondary),inset -1px 0 1px var(--text),7px 10px 0 -5px var(--contrast),8px 24px 32px var(--bg)
}
.hero-visual .hero-bob>.phone::before {
  content:"";
  position:absolute;
  top:6px;
  left:calc(50% - 2px);
  width:5px;
  height:5px;
  border:1px solid var(--secondary);
  border-radius:50%;
  background:var(--bg)
}
.hero-visual .hero-bob>.phone::after {
  content:"";
  position:absolute;
  bottom:6px;
  left:39%;
  width:22%;
  height:2px;
  border-radius:2px;
  background:var(--muted);
  opacity:.65
}
.hero-visual .hero-bob>.phone>img {border-radius:19px}
@media(min-width:761px) {
  .hero {
    grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);
    gap:36px;
    min-height:690px;
    padding-top:25px;
    padding-bottom:50px
  }
  .hero-copy {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    min-width:0
  }
  .hero h1 {
    max-width:380px;
    margin:0 auto 28px;
    color:var(--text);
    font-size:clamp(28px,2.6vw,36px);
    font-weight:550;
    line-height:1.25;
    letter-spacing:-.035em
  }
  .hero-actions {justify-content:center}
  .hero-benefits {width:max-content;max-width:100%;margin:23px auto 0;text-align:left;gap:8px}
  .hero-visual {
    height:610px;
    width:100%;
    perspective:1200px;
    perspective-origin:50% 50%
  }
  .hero-visual::before {
    content:"";
    position:absolute;
    inset:5% 1% 0;
    background:radial-gradient(ellipse,var(--bordeaux),transparent 65%);
    opacity:.18;
    pointer-events:none
  }
  .hero-back-rig {
    position:absolute;
    width:clamp(195px,18.8vw,248px);
    top:15%;
    left:7%;
    transform:translate3d(calc(var(--hero-x,0) * -7px),calc(var(--hero-y,0) * -5px),0) rotateY(9deg) rotateX(2deg) rotateZ(-7deg);
    transform-origin:50% 50%;
    z-index:1
  }
  .hero-front-rig {
    width:clamp(220px,21vw,278px);
    top:4%;
    right:9%;
    left:auto;
    transform:translate3d(calc(var(--hero-x,0) * 11px),calc(var(--hero-y,0) * 8px),0) rotateY(-8deg) rotateX(3deg) rotateZ(5deg);
    transform-origin:50% 50%;
    z-index:2
  }
  .hero-bob {
    animation:hero-phone-bob 12s ease-in-out infinite;
    animation-play-state:paused
  }
  .hero-bob-back {animation-duration:15s;animation-delay:-5s}
  .hero-book-field {display:block;position:absolute;inset:0;pointer-events:none;z-index:0}
  .hero-ambient-book {
    position:absolute;
    left:var(--book-x);
    top:var(--book-y);
    width:var(--book-size);
    aspect-ratio:2/3;
    padding:0 4px 3px 0;
    border-right:2px solid var(--muted);
    border-bottom:2px solid var(--muted);
    border-radius:2px 4px 4px 2px;
    background:var(--text);
    opacity:.42;
    box-shadow:2px 4px 0 var(--contrast);
    animation:hero-book-drift var(--book-duration) ease-in-out infinite;
    animation-delay:var(--book-delay);
    animation-play-state:paused
  }
  .is-hero-floating .hero-bob,.is-hero-floating .hero-ambient-book {animation-play-state:running;will-change:transform}
  @keyframes hero-phone-bob {
    0%,100% {transform:translate3d(0,-6px,0) rotateZ(-.35deg)}
    50% {transform:translate3d(0,7px,0) rotateZ(.35deg)}
  }
  @keyframes hero-book-drift {
    0%,100% {transform:translate3d(0,calc(var(--book-travel) * -1),0) rotate(var(--book-tilt))}
    50% {transform:translate3d(0,var(--book-travel),0) rotate(calc(var(--book-tilt) + 3deg))}
  }
}
@media(min-width:761px) and (max-width:1050px) {
  .hero {grid-template-columns:minmax(245px,.9fr) minmax(0,1.1fr);gap:16px;min-height:590px}
  .hero h1 {font-size:clamp(27px,3.2vw,32px);max-width:340px}
  .hero-visual {height:510px}
  .hero-back-rig {width:clamp(164px,20vw,205px);top:20%;left:3%}
  .hero-front-rig {width:clamp(180px,23vw,235px);top:8%;right:5%}
}
@media(max-width:760px) {
  .hero-back-rig {display:none}
  .hero h1 {max-width:380px;font-size:clamp(26px,6.3vw,32px);line-height:1.22}
}
@media(prefers-reduced-motion:reduce) {
  .hero-bob,.hero-ambient-book {animation:none!important;transform:none!important}
}
`;
