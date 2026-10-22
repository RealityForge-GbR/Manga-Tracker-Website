// A centered product scene with scroll-driven depth layers and concise mobile copy.
export const LANDING_MOBILE_HERO_STYLES = `
.mobile-manga-cloud,.mobile-copy {
  display:none
}
@media(max-width:760px), (max-width:1050px) and (max-height:500px) and (orientation:landscape) {
  :root {
    --mobile-viewport:100vh;
    --mobile-header-height:calc(64px + env(safe-area-inset-top,0px));
    --mobile-inline:max(16px,env(safe-area-inset-left,0px),env(safe-area-inset-right,0px))
  }
  .header.wrap {
    width:100%;
    height:var(--mobile-header-height);
    padding:calc(10px + env(safe-area-inset-top,0px)) var(--mobile-inline) 10px;
    flex-wrap:nowrap
  }
  .header nav,.header-download {
    display:none
  }
  .hero.wrap {
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-template-rows:auto minmax(0,1fr) auto auto;
    gap:0;
    height:calc(var(--mobile-viewport) - var(--mobile-header-height));
    padding-top:6px;
    padding-bottom:max(18px,env(safe-area-inset-bottom,0px));
    padding-inline:var(--mobile-inline);
    min-height:24rem
  }
  .hero.wrap .hero-copy {
    display:contents
  }
  .hero.wrap h1 {
    order:1;
    color:var(--text);
    max-width:560px;
    justify-self:start;
    text-align:left;
    font-size:clamp(22px,5.6vw,28px);
    line-height:1.2;
    letter-spacing:-.04em;
    margin:0 0 8px
  }
  .wide-copy {display:none}
  .mobile-copy {display:inline}
  .hero.wrap .hero-visual {
    order:3;
    width:calc(100% + var(--mobile-inline) * 2);
    max-width:540px;
    height:100%;
    min-height:0;
    margin:0;
    justify-self:center;
    perspective:1200px;
    perspective-origin:50% 50%;
    overflow:clip;
    container-type:size
  }
  .hero-back-rig,.hero.wrap .hero-book-field {
    display:none
  }
  .hero.wrap .hero-bob {
    animation:none;
    transform:none
  }
  .hero.wrap .hero-visual:before {
    content:"";
    position:absolute;
    inset:0 -5% 0;
    background:radial-gradient(ellipse at 50% 49%,var(--bordeaux),transparent 66%);
    opacity:.38;
    pointer-events:none
  }
  .hero.wrap .hero-visual:after {
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
  .hero.wrap .hero-front-rig {
    width:min(52vw,calc((var(--mobile-viewport) - var(--mobile-header-height) - 276px) * .4),240px);
    width:min(52vw,40cqh,240px);
    max-width:none;
    top:50%;
    right:auto;
    left:50%;
    transform:translate(-50%,-50%) translateY(calc(var(--mobile-progress,0) * 12px)) rotateY(calc(-22deg + var(--mobile-progress,0) * 26deg)) rotateX(calc(6deg - var(--mobile-progress,0) * 6deg)) rotateZ(calc(-8deg + var(--mobile-progress,0) * 22deg));
    transform-origin:50% 50%;
    z-index:2
  }
  .hero-visual .hero-front-rig .hero-bob>.hero-front {
    padding:clamp(9px,3.5cqh,17px) clamp(4px,1.4cqh,7px) clamp(9px,3.4cqh,16px);
    border:1px solid var(--muted);
    border-radius:clamp(15px,6cqh,29px);
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
  .hero-visual .hero-front-rig .hero-bob>.hero-front img {
    border-radius:clamp(10px,4cqh,19px)
  }
  .mobile-manga-cloud {
    display:block;
    position:absolute;
    inset:0;
    z-index:1;
    pointer-events:none
  }
  .mobile-manga {
    --travel-x:12px;
    --travel-y:-94px;
    --swing:14deg;
    position:absolute;
    left:var(--x);
    top:var(--y);
    width:var(--w);
    width:min(var(--w),22cqh);
    aspect-ratio:2/3;
    padding:0 5px 3px 0;
    border-radius:2px 4px 4px 2px;
    background:var(--text);
    border-right:2px solid var(--muted);
    border-bottom:2px solid var(--rose);
    box-shadow:4px 5px 0 var(--contrast),8px 12px 20px var(--bg);
    transform:translate3d(calc(var(--mobile-progress,0) * var(--travel-x)),calc(var(--mobile-progress,0) * var(--travel-y)),0) rotateZ(calc(var(--rz) + var(--mobile-progress,0) * var(--swing))) rotateY(var(--ry)) rotateX(var(--rx));
    z-index:var(--depth);
    opacity:var(--opacity)
  }
  .mobile-manga.manga-near {
    --travel-x:-16px;
    --travel-y:104px;
    --swing:-16deg
  }
  .is-parallax-active .hero-front-rig,.is-parallax-active .mobile-manga {
    will-change:transform;
    transition:transform 180ms cubic-bezier(.2,.65,.35,1)
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
    justify-content:flex-start;
    margin-top:6px
  }
  .hero-actions .button {
    width:min(100%,320px);
    min-height:58px
  }
  .hero.wrap .hero-benefits {
    order:5;
    justify-self:start;
    width:min(100%,320px);
    gap:3px;
    font-size:12px;
    margin:10px 0 0
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
@supports(height:100svh) {
  @media(max-width:760px), (max-width:1050px) and (max-height:500px) and (orientation:landscape) {
    :root {--mobile-viewport:100svh}
  }
}
@media(max-width:1050px) and (max-height:500px) and (orientation:landscape) {
  .hero.wrap {
    grid-template-columns:minmax(0,1fr) minmax(0,.9fr);
    grid-template-rows:auto auto minmax(0,1fr);
    column-gap:16px;
    min-height:0
  }
  .hero.wrap h1 {
    grid-column:1;
    grid-row:1;
    font-size:22px
  }
  .hero.wrap .hero-visual {
    grid-column:2;
    grid-row:1 / 4;
    width:100%;
    max-width:none
  }
  .hero.wrap .hero-front-rig {
    width:min(40vw,calc((var(--mobile-viewport) - var(--mobile-header-height) - 24px) * .4),240px);
    width:min(40vw,40cqh,240px)
  }
  .hero-actions {grid-column:1;grid-row:2}
  .hero.wrap .hero-benefits {grid-column:1;grid-row:3;align-self:start}
}
`;
