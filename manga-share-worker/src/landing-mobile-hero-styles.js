// Frozen depth layers form the mobile scene. Scroll/gyro control is a later design decision.
export const LANDING_MOBILE_HERO_STYLES = `
.mobile-manga-cloud {
  display:none
}
@media(max-width:760px) {
  .header {
    padding-block:16px
  }
  .header nav {
    display:none
  }
  .hero.wrap {
    display:grid;
    grid-template-columns:minmax(0,1fr);
    gap:0;
    padding-top:12px;
    padding-bottom:52px;
    padding-inline:20px;
    min-height:0
  }
  .hero-copy {
    display:contents
  }
  .hero h1 {
    order:1;
    text-align:center;
    font-size:clamp(34px,9.2vw,46px);
    line-height:1.04;
    letter-spacing:-.055em;
    margin:0 0 10px
  }
  .hero .lead {
    display:none
  }
  .hero-visual {
    order:2;
    width:calc(100% + 40px);
    max-width:540px;
    height:clamp(372px,108vw,470px);
    margin:0 auto 0;
    justify-self:center;
    perspective:1000px
  }
  .hero-back,.hero-disc,.hero-visual .book-portal,.hero-visual .motion-toggle {
    display:none
  }
  .hero-visual:before {
    content:"";
    position:absolute;
    inset:0 -5% 0;
    background:radial-gradient(ellipse at 50% 49%,var(--bordeaux),transparent 66%);
    opacity:.38;
    pointer-events:none
  }
  .hero-visual:after {
    content:"";
    position:absolute;
    left:22%;
    bottom:1%;
    width:56%;
    height:7%;
    background:radial-gradient(ellipse,var(--contrast),transparent 70%);
    opacity:.8;
    pointer-events:none
  }
  .hero-front-rig {
    width:clamp(174px,50vw,224px);
    max-width:none;
    top:12px;
    right:auto;
    left:50%;
    transform:translateX(-50%) rotateY(-12deg) rotateX(6deg) rotateZ(-6deg);
    transform-origin:50% 55%;
    z-index:2
  }
  .hero-front-rig .hero-front {
    padding:17px 7px 16px;
    border:1px solid var(--muted);
    border-radius:29px;
    background:linear-gradient(112deg,var(--muted),var(--secondary) 5%,var(--bg) 14%,var(--elevated) 94%,var(--muted));
    box-shadow:inset 2px 0 1px var(--secondary),inset -1px 0 1px var(--text),12px 18px 0 -9px var(--contrast),18px 28px 35px var(--bg)
  }
  .hero-front:before {
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
  .hero-front:after {
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
  .hero-front img {
    border-radius:19px
  }
  .mobile-manga-cloud {
    display:block;
    position:absolute;
    inset:0;
    pointer-events:none
  }
  .mobile-manga {
    position:absolute;
    left:var(--x);
    top:var(--y);
    width:var(--w);
    aspect-ratio:2/3;
    padding:0 5px 3px 0;
    border-radius:2px 4px 4px 2px;
    background:var(--text);
    border-right:2px solid var(--muted);
    border-bottom:2px solid var(--rose);
    box-shadow:4px 5px 0 var(--contrast),8px 12px 20px var(--bg);
    transform:rotateZ(var(--rz)) rotateY(var(--ry)) rotateX(var(--rx));
    z-index:var(--depth);
    opacity:var(--opacity)
  }
  .mobile-manga:after {
    content:"";
    position:absolute;
    right:-1px;
    top:3px;
    bottom:3px;
    width:4px;
    background:repeating-linear-gradient(to bottom,var(--text) 0 2px,var(--muted) 2px 3px);
    border-radius:0 2px 2px 0
  }
  .hero-actions {
    order:3;
    justify-content:center;
    margin-top:8px
  }
  .hero-actions .button {
    width:min(100%,320px);
    min-height:54px
  }
  .hero-note {
    order:4;
    text-align:center;
    font-size:10px;
    margin:13px 0 0
  }
}
`;
