export const LANDING_PLANNING_DETAILS_STYLES = `
.planning.section {padding-bottom:52px}
.budget-details.wrap {
  width:min(1560px,calc(100% - clamp(64px,10vw,240px)));
  container-type:inline-size;
  display:grid;
  grid-template-columns:minmax(260px,.72fr) minmax(280px,1.08fr) minmax(280px,1fr);
  align-items:stretch;
  gap:clamp(36px,4vw,84px);
  margin-top:85px;
  max-width:none
}
.budget-device-scene {
  position:relative;
  display:grid;
  place-items:center;
  min-width:0;
  padding:14px 8px;
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
  width:280px;
  max-width:100%;
  padding:20px 7px 19px;
  border:1px solid var(--muted);
  border-radius:31px;
  background:linear-gradient(112deg,var(--muted),var(--secondary) 4%,var(--bg) 12%,var(--elevated) 93%,var(--muted));
  box-shadow:inset 2px 0 1px var(--text),inset -1px 0 1px var(--bordeaux),-5px 3px 0 -3px var(--bordeaux),-9px 5px 0 -5px var(--contrast),-16px 25px 38px var(--bg);
  transform:rotateY(22deg);
  transform-origin:50% 50%;
  transform-style:preserve-3d
}
.budget-device-back {position:absolute;inset:-1px;border:1px solid var(--muted);border-radius:32px;background:var(--contrast);transform:translateZ(-8px)}
.budget-device>img {position:relative;width:100%;height:auto;border-radius:20px;transform:translateZ(1px)}
.budget-device-camera {position:absolute;top:7px;left:calc(50% - 3px);width:6px;height:6px;border:1px solid var(--secondary);border-radius:50%;background:var(--bg)}
.budget-device::before {content:"";position:absolute;left:-5px;top:88px;width:3px;height:58px;border-radius:2px 0 0 2px;background:var(--muted)}
.budget-device::after {content:"";position:absolute;bottom:7px;left:39%;width:22%;height:2px;border-radius:2px;background:var(--muted);opacity:.7}
.budget-explanations {display:flex;flex-direction:column;justify-content:space-between;gap:40px;min-height:0;padding-block:0}
.budget-explanations article {max-width:none}
.budget-explanations h3 {margin:0 0 18px;font-size:clamp(26px,2.2cqw,34px);line-height:1.15;letter-spacing:-.04em;font-weight:600;color:var(--text)}
.budget-explanations p {margin:0 0 13px;font-size:clamp(15px,1.1cqw,17px);line-height:1.7;text-wrap:pretty}
.budget-explanations p:last-child {margin:0}
.budget-scan-morph {min-width:0}
.budget-scan-morph .barcode-morph {max-width:none}
.retained-preview {margin-block:0 60px;padding-top:22px;border-top:1px solid var(--line);color:var(--muted)}
.retained-preview summary {width:fit-content;cursor:pointer;font-size:14px;line-height:1.6}
.retained-preview summary:focus-visible {outline:2px solid var(--rose);outline-offset:7px;border-radius:3px}
.retained-preview>figure {display:grid;justify-items:center;gap:16px;padding-top:32px}
.retained-preview .phone {width:260px}
.retained-preview figcaption {margin:0;max-width:500px;font-size:11px;line-height:1.6;text-align:center;color:var(--muted)}
@media(min-width:1101px) {
  .budget-details {--budget-panel-height:clamp(520px,38vw,620px)}
  .budget-device-scene {height:var(--budget-panel-height);perspective:calc(var(--budget-panel-height) * 3.72 - 1080px)}
  .budget-device {height:calc(var(--budget-panel-height) - 28px);width:calc((var(--budget-panel-height) - 28px) * .5);min-height:0;min-width:0}
  .budget-device>img {height:100%;object-fit:contain}
  .budget-scan-morph .barcode-morph {height:100%;display:flex;flex-direction:column;justify-content:space-between}
  .budget-scan-morph .barcode-morph-scene {flex:none}
  .budget-scan-morph .barcode-morph figcaption {margin:0}
}
@media(max-width:1100px) and (min-width:761px) {
  .budget-details.wrap {width:calc(100% - 64px);grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:30px 40px;margin-top:65px}
  .budget-device {width:100%;max-width:300px}
  .budget-explanations {min-height:430px;gap:35px}
  .budget-explanations h3 {font-size:27px}
  .budget-explanations p {font-size:15px}
  .budget-scan-morph {grid-column:1/-1;width:min(100%,560px);justify-self:center}
}
@media(max-width:760px) {
  .planning.section {padding-bottom:32px}
  .budget-details.wrap {width:calc(100% - 40px);grid-template-columns:minmax(0,1fr);gap:35px;margin-top:46px}
  .budget-device-scene {padding:12px 20px 25px}
  .budget-device {width:clamp(220px,70vw,300px)}
  .budget-explanations {min-height:0;padding:0;gap:35px}
  .budget-explanations article {max-width:none}
  .budget-explanations h3 {font-size:clamp(26px,7vw,32px);margin-bottom:15px}
  .budget-explanations p {font-size:16px;line-height:1.65}
  .budget-scan-morph {width:100%;max-width:560px;justify-self:center}
  .retained-preview {margin-bottom:42px}
}
`;
