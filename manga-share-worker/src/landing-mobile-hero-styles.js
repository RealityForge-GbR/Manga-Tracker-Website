// A centered product scene with scroll-driven depth layers and concise mobile copy.
export const LANDING_MOBILE_HERO_STYLES = `
.mobile-manga-cloud,.hero-title-mobile,.mobile-lead,.mobile-copy {
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
    font-size:clamp(36px,9.8vw,48px);
    line-height:1.04;
    letter-spacing:-.055em;
    margin:0 0 12px
  }
  .hero-title-wide,.wide-copy {
    display:none
  }
  .hero-title-mobile,.mobile-copy {
    display:inline
  }
  .mobile-lead {
    display:block;
    order:2;
    max-width:300px;
    justify-self:center;
    text-align:center;
    font-size:13px;
    line-height:1.65;
    margin:0 0 8px
  }
  .hero .lead {
    display:none
  }
  .hero-visual {
    order:3;
    width:calc(100% + 40px);
    max-width:540px;
    height:clamp(404px,108vw,500px);
    margin:0;
    justify-self:center;
    perspective:1200px;
    perspective-origin:50% 50%;
    overflow:clip
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
    width:clamp(184px,52vw,240px);
    max-width:none;
    top:50%;
    right:auto;
    left:50%;
    transform:translate(-50%,-50%) translateY(calc(var(--mobile-progress,0) * 12px)) rotateY(calc(-8deg + var(--mobile-progress,0) * 9deg)) rotateX(3deg) rotateZ(calc(var(--mobile-progress,0) * 2deg));
    transform-origin:50% 50%;
    z-index:2
  }
  .hero-front-rig .hero-front {
    padding:17px 7px 16px;
    border:1px solid var(--muted);
    border-radius:29px;
    background:linear-gradient(112deg,var(--muted),var(--secondary) 5%,var(--bg) 14%,var(--elevated) 94%,var(--muted));
    box-shadow:inset 2px 0 1px var(--secondary),inset -1px 0 1px var(--text),7px 10px 0 -5px var(--contrast),8px 24px 32px var(--bg)
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
    --travel-y:-44px;
    --swing:6deg;
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
    transform:translateY(calc(var(--mobile-progress,0) * var(--travel-y))) rotateZ(calc(var(--rz) + var(--mobile-progress,0) * var(--swing))) rotateY(var(--ry)) rotateX(var(--rx));
    z-index:var(--depth);
    opacity:var(--opacity)
  }
  .mobile-manga.manga-near {
    --travel-y:64px;
    --swing:-7deg
  }
  .is-parallax-active .hero-front-rig,.is-parallax-active .mobile-manga {
    will-change:transform
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
    order:4;
    justify-content:center;
    margin-top:8px
  }
  .hero-actions .button {
    width:min(100%,320px);
    min-height:54px
  }
  .hero-note {
    order:5;
    text-align:center;
    font-size:11px;
    margin:13px 0 0
  }
  .section {
    padding-block:56px
  }
  .section-heading {
    margin-bottom:28px
  }
  .discovery-grid {
    gap:32px
  }
  .discovery-shot {
    border:1px solid var(--line);
    border-radius:24px;
    background:var(--surface)
  }
  .collection-features {
    gap:0;
    margin-top:32px;
    padding-top:0;
    border-top:0
  }
  .collection-features article {
    padding-block:24px;
    border-top:1px solid var(--line)
  }
  .collection-features h3 {
    font-size:22px;
    margin-bottom:8px
  }
  .collection-features p {
    font-size:13px;
    line-height:1.7
  }
  .download-copy>.small {
    display:none
  }
}
`;
