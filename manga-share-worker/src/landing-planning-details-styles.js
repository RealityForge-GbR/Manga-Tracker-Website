export const LANDING_PLANNING_DETAILS_STYLES = `
.planning.section {padding-bottom:52px}
.budget-details {
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(0,1fr);
  align-items:center;
  gap:clamp(48px,7vw,100px);
  margin-top:85px;
  max-width:1100px
}
.budget-device-scene {
  position:relative;
  display:grid;
  place-items:center;
  min-width:0;
  padding:18px 20px 30px;
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
  box-shadow:inset 2px 0 1px var(--bordeaux),inset -1px 0 1px var(--text),7px 5px 0 -3px var(--bordeaux),10px 9px 0 -5px var(--contrast),16px 25px 38px var(--bg);
  transform:rotateY(-13deg) rotateZ(-4deg);
  transform-style:preserve-3d
}
.budget-device>img {width:100%;height:auto;border-radius:20px}
.budget-device-camera {position:absolute;top:7px;left:calc(50% - 3px);width:6px;height:6px;border:1px solid var(--secondary);border-radius:50%;background:var(--bg)}
.budget-device::before {content:"";position:absolute;right:-5px;top:88px;width:3px;height:58px;border-radius:0 2px 2px 0;background:var(--muted)}
.budget-device::after {content:"";position:absolute;bottom:7px;left:39%;width:22%;height:2px;border-radius:2px;background:var(--muted);opacity:.7}
.budget-explanations {display:flex;flex-direction:column;justify-content:space-between;gap:55px;min-height:500px;padding-block:15px}
.budget-explanations article {max-width:460px}
.budget-explanations h3 {margin:0 0 20px;font-size:clamp(26px,2.6vw,35px);line-height:1.15;letter-spacing:-.04em;font-weight:600;color:var(--text)}
.budget-explanations p {margin:0 0 13px;font-size:16px;line-height:1.7;text-wrap:pretty}
.budget-explanations p:last-child {margin:0}
.retained-preview {margin-block:0 60px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted)}
.retained-preview summary {width:fit-content;cursor:pointer;font-size:14px;line-height:1.6}
.retained-preview summary:focus-visible {outline:2px solid var(--rose);outline-offset:7px;border-radius:3px}
.retained-preview>figure {display:grid;justify-items:center;gap:16px;padding-top:32px}
.retained-preview .phone {width:260px}
.retained-preview figcaption {margin:0;max-width:500px;font-size:11px;line-height:1.6;text-align:center;color:var(--muted)}
@media(max-width:1050px) and (min-width:761px) {
  .budget-details {gap:40px;margin-top:65px}
  .budget-device {width:255px}
  .budget-explanations {min-height:430px;gap:35px}
  .budget-explanations h3 {font-size:27px}
  .budget-explanations p {font-size:15px}
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
  .retained-preview {margin-bottom:42px}
}
`;
