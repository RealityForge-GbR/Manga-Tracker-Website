// Mobile has its own reading order and scene sizes; desktop/tablet stay on their shared grid.
export const LANDING_MOBILE_LAYOUT_STYLES = `
@media(max-width:760px) {
  .header.wrap {justify-content:center}
  .hero.wrap h1 {justify-self:center;text-align:center;max-width:370px;text-wrap:balance}
  .hero-actions {justify-content:center;width:100%}
  .hero.wrap .hero-benefits {justify-self:center;width:max-content;max-width:100%;text-align:left}

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
  .budget-device {width:clamp(190px,56vw,226px);transform:rotateY(14deg)}
  .budget-explanations article:nth-child(3) {order:3;margin-top:32px}
  .budget-scan-morph {order:4;width:min(100%,330px);max-width:330px;margin-top:4px}
  .budget-scan-morph .barcode-morph {width:100%;max-width:330px}
  .budget-scan-morph .barcode-morph figcaption {margin:-10px 0 0;font-size:15px}
  .budget-explanations article:nth-child(2) {order:5;margin-top:30px;padding-block:30px;border-block:1px solid var(--line)}
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
  .showcase-card {width:100%;height:490px;min-width:0;border-radius:26px;scroll-snap-align:none}
  .showcase-card-copy {padding:26px 20px 0}
  .showcase-card h3 {font-size:clamp(23px,6.1vw,28px);line-height:1.16;margin-bottom:10px;text-wrap:balance}
  .showcase-card p {max-width:29ch;font-size:14px;line-height:1.55;text-wrap:pretty}
  .showcase-card::before {width:300px;height:300px;left:calc(50% - 150px);top:185px}
  .showcase-device {width:174px;padding:12px 5px 12px;border-radius:24px;bottom:-6px}
  .showcase-device>img {border-radius:16px}
  .showcase-releases .showcase-device {bottom:-6px;transform:translateX(-50%) rotate(-3deg)}
  .showcase-series .showcase-device {transform:translateX(-50%) rotate(3deg)}
  .achievement-scene {inset:137px 14px 24px;gap:10px}
  .achievement-artwork {width:78%;max-width:205px}
  .achievement-caption>span {font-size:11px}
  .achievement-caption>strong {font-size:21px}

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
@media(max-width:359px) {
  .budget-details.wrap,.app-showcase.wrap,.trust.wrap {width:calc(100% - 32px)}
  .showcase-card {height:480px}
  .showcase-card-copy {padding-inline:18px}
  .showcase-device {width:166px}
  .achievement-scene {inset:143px 10px 22px}
  .budget-explanations h3 {font-size:25px}
}
`;
