export const LANDING_APP_SHOWCASE_STYLES = `
.app-showcase {margin-block:110px 90px;scroll-margin-top:45px}
.app-showcase>h2 {max-width:840px;margin:0 auto 44px;text-align:center;font-size:clamp(36px,4.4vw,58px);font-weight:600;line-height:1.1;letter-spacing:-.05em;color:var(--text)}
.showcase-gallery {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;outline-offset:7px}
.showcase-gallery:focus-visible {outline:2px solid var(--rose);border-radius:8px}
.showcase-card {position:relative;isolation:isolate;height:650px;min-width:0;overflow:hidden;border:1px solid var(--secondary);border-radius:30px;background:var(--surface)}
.showcase-card::before {content:"";position:absolute;left:calc(50% - 190px);top:215px;width:380px;height:380px;border-radius:50%;background:var(--bordeaux);opacity:.3;z-index:-1}
.showcase-releases {background:var(--secondary);border-color:var(--bordeaux)}
.showcase-releases::before {background:var(--rose);opacity:.12;top:245px}
.showcase-detail::before {width:360px;height:360px;left:calc(50% - 180px);top:235px;background:var(--elevated);opacity:1}
.showcase-card-copy {position:relative;z-index:2;padding:35px 31px 0}
.showcase-card h3 {margin:0 0 12px;font-size:29px;font-weight:600;letter-spacing:-.045em;line-height:1.15;color:var(--text)}
.showcase-card p {max-width:285px;margin:0;font-size:15px;line-height:1.6;color:var(--muted)}
.showcase-device {position:absolute;left:50%;bottom:-54px;width:252px;max-width:none;margin:0;padding:17px 7px 16px;border:1px solid var(--muted);border-radius:30px;background:linear-gradient(112deg,var(--muted),var(--secondary) 5%,var(--bg) 14%,var(--elevated) 94%,var(--muted));box-shadow:inset 2px 0 1px var(--secondary),inset -1px 0 1px var(--text),6px 9px 0 -5px var(--contrast),0 24px 40px #17121790;transform:translateX(-50%);transform-origin:50% 70%}
.showcase-device::before {content:"";position:absolute;left:calc(50% - 2px);top:6px;width:5px;height:5px;border:1px solid var(--secondary);border-radius:50%;background:var(--bg)}
.showcase-device::after {content:"";position:absolute;left:39%;bottom:6px;width:22%;height:2px;border-radius:2px;background:var(--muted);opacity:.65}
.showcase-device>img {display:block;width:100%;height:auto;border-radius:19px}
.showcase-library .showcase-device {transform:translateX(-50%) rotate(-5deg)}
.showcase-releases .showcase-device {bottom:-25px}
.showcase-detail .showcase-device {transform:translateX(-50%) rotate(5deg)}
@media(max-width:1100px) and (min-width:1001px) {
  .showcase-card-copy {padding-inline:25px}
  .showcase-card h3 {font-size:26px}
  .showcase-device {width:230px}
  .showcase-card {height:610px}
}
@media(max-width:1000px) {
  .showcase-gallery {display:flex;gap:20px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:var(--rose) var(--surface);padding-bottom:17px}
  .showcase-card {flex:0 0 min(78vw,360px);height:630px;scroll-snap-align:start}
}
@media(max-width:760px) {
  .app-showcase {margin-block:75px 55px}
  .app-showcase>h2 {max-width:420px;margin-bottom:30px;font-size:clamp(31px,8vw,42px);line-height:1.13;text-align:left}
  .showcase-gallery {gap:16px}
  .showcase-card {height:580px;border-radius:25px}
  .showcase-card-copy {padding:28px 24px 0}
  .showcase-card h3 {font-size:clamp(23px,6.4vw,28px);letter-spacing:-.045em}
  .showcase-card p {font-size:14px;line-height:1.6}
  .showcase-device {width:218px;bottom:-32px}
  .showcase-releases .showcase-device {bottom:-12px}
  .showcase-card::before {top:210px}
}
`;
