// Mobile has its own reading order and scene sizes; desktop/tablet stay on their shared grid.
export const LANDING_MOBILE_LAYOUT_STYLES = `
.showcase-mobile-only {display:none}
@media(max-width:760px) {
  /* One shared left edge for the brand, store button and benefits. */
  .header.wrap {justify-content:flex-start;padding-inline:max(var(--mobile-inline),calc((100% - 320px) / 2))}
  /* Keep the initial composition within the small viewport. Reserve the extra
     browser-toolbar height below it, so the next section cannot peek through. */
  .hero.wrap {margin-bottom:max(60px,calc(100lvh - 100svh + 20px))}
  .hero.wrap .hero-front-rig {width:min(56vw,44cqh,258px)}
  .hero.wrap .mobile-manga-cloud {display:contents}
  .hero.wrap .mobile-manga.manga-near {filter:blur(1.35px);opacity:.9}
  .hero.wrap .mobile-manga:not(.manga-near) {filter:blur(.3px)}
  .hero.wrap h1 {justify-self:center;text-align:center;max-width:370px;text-wrap:balance}
  .hero-actions {justify-content:center;width:100%}
  .hero.wrap .hero-benefits {justify-self:center;width:min(100%,320px);max-width:100%;text-align:left}

  .planning.section {padding-bottom:26px}
  .budget-details.wrap {
    width:calc(100% - 40px);
    max-width:520px;
    grid-template-columns:minmax(0,1fr);
    gap:24px;
    margin-top:60px;
    text-align:center
  }
  .budget-explanations {display:contents}
  .budget-explanations article {width:100%;max-width:35ch;justify-self:center}
  .budget-explanations article:nth-child(1) {order:1}
  .budget-device-scene {order:2;justify-self:center;width:100%;padding:12px 8px 26px}
  .budget-device {width:clamp(190px,56vw,226px);transform:none}
  .budget-explanations article:nth-child(3) {order:3;margin-top:32px}
  .budget-scan-morph {order:4;width:min(100%,330px);max-width:330px;margin-top:4px}
  .budget-scan-morph .barcode-morph {width:100%;max-width:330px}
  .budget-scan-morph .barcode-morph figcaption {display:none}
  .budget-explanations article:nth-child(2) {display:none}
  .budget-explanations h3 {font-size:clamp(25px,6.8vw,31px);line-height:1.17;margin-bottom:16px;text-wrap:balance}
  .budget-explanations p {font-size:15px;line-height:1.65;margin-bottom:12px;text-wrap:pretty}

  .app-showcase.wrap {width:calc(100% - 40px);max-width:520px;margin-block:30px 44px}
  .showcase-gallery {
    display:grid;
    grid-template-columns:minmax(0,1fr);
    gap:22px;
    overflow:visible;
    padding:0;
    scroll-snap-type:none
  }
  .showcase-card {
    --showcase-art-width:clamp(92px,26vw,132px);
    display:grid;
    grid-template-columns:minmax(0,1fr) var(--showcase-art-width);
    align-items:center;
    gap:clamp(12px,3.5vw,18px);
    width:100%;height:auto;min-height:clamp(230px,60vw,310px);
    padding:clamp(16px,4.6vw,22px);
    border-radius:24px;scroll-snap-align:none;overflow:visible
  }
  .showcase-card-copy {grid-column:1;grid-row:1;min-width:0;padding:0;text-align:center}
  .showcase-card h3 {font-size:clamp(17px,4.9vw,22px);line-height:1.16;margin-bottom:12px;letter-spacing:-.04em;text-wrap:balance;hyphens:none}
  .showcase-card p {max-width:26ch;font-size:clamp(13px,3.5vw,14px);line-height:1.55;text-wrap:pretty}
  .showcase-card::before {width:auto;height:auto;inset:12px 8px 12px 50%;border-radius:50%}
  .showcase-card .showcase-device {
    position:relative;grid-column:2;grid-row:1;justify-self:center;
    left:auto;bottom:auto;width:100%;max-width:100%;margin:0;
    padding:9px 4px 9px;border-radius:19px;
    transform:perspective(700px) rotateY(-6deg) rotateZ(-3deg);
    transform-origin:center
  }
  .showcase-device>img {border-radius:12px}
  .showcase-series .showcase-device {transform:perspective(700px) rotateY(6deg) rotateZ(3deg)}
  .is-showcase-card-ready .showcase-device {animation:showcase-mobile-float 5.8s ease-in-out infinite both paused}
  .showcase-series.is-showcase-card-ready .showcase-device {animation-name:showcase-mobile-float-reverse;animation-delay:-2.9s}
  .is-showcase-card-playing .showcase-device {animation-play-state:running;will-change:transform}
  .achievement-scene {
    position:relative;inset:auto;grid-column:2;grid-row:1;
    width:100%;height:calc(var(--showcase-art-width) * 2.2 + 10px);
    gap:8px;margin:0;overflow:hidden
  }
  .achievement-artwork {width:calc(100% - 12px);max-width:none}
  .achievement-caption {width:100%;gap:4px}
  .achievement-caption>span {font-size:9px;line-height:1.3}
  .achievement-caption>strong {font-size:clamp(13px,3.6vw,17px);line-height:1.2}
  .showcase-sharing {--showcase-art-width:clamp(108px,34vw,148px);background:var(--contrast);border-color:var(--bordeaux)}
  .showcase-sharing .mobile-share-scene {grid-column:2;grid-row:1;width:100%;height:calc(var(--showcase-art-width) * 1.6);max-width:none}
  @keyframes showcase-mobile-float {
    0%,100% {transform:perspective(700px) translateY(3px) rotateY(-6deg) rotateZ(-3deg)}
    50% {transform:perspective(700px) translateY(-3px) rotateY(3deg) rotateZ(-1.5deg)}
  }
  @keyframes showcase-mobile-float-reverse {
    0%,100% {transform:perspective(700px) translateY(-3px) rotateY(6deg) rotateZ(3deg)}
    50% {transform:perspective(700px) translateY(3px) rotateY(-3deg) rotateZ(1.5deg)}
  }

  .shelf-divider {--divider-height:84px;height:calc(var(--divider-height) + 40px);margin-top:10px}
  .trust.wrap {
    display:grid;
    grid-template-columns:minmax(0,1fr);
    width:calc(100% - 40px);
    max-width:520px;
    gap:20px;
    padding-block:36px 42px;
    text-align:center
  }
  .privacy-lock {grid-column:1;grid-row:auto;width:152px;height:152px}
  .trust-copy {display:block}
  .trust-copy h2 {margin:0 0 18px;font-size:clamp(34px,9vw,40px);line-height:1.06;text-wrap:balance}
  .trust-copy>p {max-width:34ch;margin-inline:auto;font-size:15px;line-height:1.65}
  .trust-support {display:flex;flex-direction:column;gap:12px;width:100%;padding-top:26px;margin-top:12px}
  .support-heart {width:36px;height:36px;margin:0;align-self:center}
  .trust-support>p {max-width:37ch;margin-inline:auto;font-size:14px;line-height:1.65}
}
@media(max-width:760px) and (max-height:500px) and (orientation:landscape) {
  .header.wrap {padding-inline:max(var(--mobile-inline),calc((100% - var(--mobile-inline) * 2 - 16px) / 1.9 / 2 - 160px + var(--mobile-inline)))}
}
@media(max-width:359px) {
  .budget-details.wrap,.app-showcase.wrap,.trust.wrap {width:calc(100% - 32px)}
  .showcase-card {padding:14px;gap:12px}
  .budget-explanations h3 {font-size:25px}
}
`;
