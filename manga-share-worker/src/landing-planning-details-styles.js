export const LANDING_PLANNING_DETAILS_STYLES = `
.planning.section {padding-bottom:52px}
.budget-details {
  display:grid;
  grid-template-columns:minmax(220px,.8fr) minmax(280px,1fr) minmax(300px,1.08fr);
  align-items:center;
  gap:clamp(24px,2.5vw,42px);
  margin-top:85px;
  max-width:1280px
}
.budget-device-scene {
  position:relative;
  display:grid;
  place-items:center;
  min-width:0;
  padding:18px 8px 30px;
  perspective:1200px;
  isolation:isolate
}
.budget-device-scene::before {
  content:"";
  position:absolute;
  inset:12% 2% 8%;
  z-index:-1;
  border-radius:50%;
  background:radial-gradient(ellipse,var(--secondary),transparent 70%);
  opacity:.65
}
.budget-device {
  position:relative;
  width:282px;
  max-width:100%;
  padding:20px 7px 19px;
  border:1px solid var(--muted);
  border-radius:31px;
  background:linear-gradient(112deg,var(--muted),var(--secondary) 4%,var(--bg) 12%,var(--elevated) 93%,var(--muted));
  box-shadow:inset 2px 0 1px var(--text),inset -1px 0 1px var(--bordeaux),-5px 3px 0 -3px var(--bordeaux),-9px 5px 0 -5px var(--contrast),-16px 25px 38px var(--bg);
  transform:rotateY(18deg) rotateZ(3deg);
  transform-style:preserve-3d
}
.budget-device-back {position:absolute;inset:-1px;border:1px solid var(--muted);border-radius:32px;background:var(--contrast);transform:translateZ(-8px)}
.budget-device>img {position:relative;width:100%;height:auto;border-radius:20px;transform:translateZ(1px)}
.budget-device-camera {position:absolute;top:7px;left:calc(50% - 3px);width:6px;height:6px;border:1px solid var(--secondary);border-radius:50%;background:var(--bg)}
.budget-device::before {content:"";position:absolute;left:-5px;top:88px;width:3px;height:58px;border-radius:2px 0 0 2px;background:var(--muted)}
.budget-device::after {content:"";position:absolute;bottom:7px;left:39%;width:22%;height:2px;border-radius:2px;background:var(--muted);opacity:.7}
.budget-explanations {display:flex;flex-direction:column;justify-content:space-between;gap:40px;min-height:460px;padding-block:15px}
.budget-explanations article {max-width:460px}
.budget-explanations h3 {margin:0 0 18px;font-size:clamp(24px,2.1vw,30px);line-height:1.15;letter-spacing:-.04em;font-weight:600;color:var(--text)}
.budget-explanations p {margin:0 0 13px;font-size:15px;line-height:1.7;text-wrap:pretty}
.budget-explanations p:last-child {margin:0}
.budget-scan-morph {min-width:0;align-self:center}
.retained-preview {margin-block:0 60px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted)}
.retained-preview summary {width:fit-content;cursor:pointer;font-size:14px;line-height:1.6}
.retained-preview summary:focus-visible {outline:2px solid var(--rose);outline-offset:7px;border-radius:3px}
.retained-preview>figure {display:grid;justify-items:center;gap:16px;padding-top:32px}
.retained-preview .phone {width:260px}
.retained-preview figcaption {margin:0;max-width:500px;font-size:11px;line-height:1.6;text-align:center;color:var(--muted)}
@media(max-width:1100px) and (min-width:761px) {
  .budget-details {grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:30px 40px;margin-top:65px}
  .budget-device {width:255px}
  .budget-explanations {min-height:430px;gap:35px}
  .budget-explanations h3 {font-size:27px}
  .budget-explanations p {font-size:15px}
  .budget-scan-morph {grid-column:1/-1;width:min(100%,440px);justify-self:center}
}
@media(max-width:760px) {
  .planning.section {padding-bottom:32px}
  .budget-details {grid-template-columns:minmax(0,1fr);gap:35px;margin-top:46px;max-width:540px}
  .budget-device-scene {padding:12px 20px 25px}
  .budget-device {width:246px}
  .budget-explanations {min-height:0;padding:0;gap:35px}
  .budget-explanations article {max-width:none}
  .budget-explanations h3 {font-size:clamp(26px,7vw,32px);margin-bottom:15px}
  .budget-explanations p {font-size:16px;line-height:1.65}
  .budget-scan-morph {width:100%;max-width:440px;justify-self:center}
  .retained-preview {margin-bottom:42px}
}
`;
