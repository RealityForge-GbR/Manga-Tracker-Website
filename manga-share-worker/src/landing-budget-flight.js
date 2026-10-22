// Sample continuous curves once while building CSS; the browser only interpolates transforms.
const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) => { const p = clamp(value); return p * p * (3 - 2 * p); };
const mix = (a, b, p) => a + (b - a) * ease(p);

export function purchasePose(progress) {
  const t = clamp(progress);
  let gate = 0, stack = 0, rise = 0, lift = 0, pixels = 0, lean = 0;
  if (t <= .24) {
    rise = ease(t / .24);
    pixels = 35 * (1 - rise);
  } else if (t <= .60) {
    const u = (t - .24) / .36;
    gate = -2 * u ** 3 + 3 * u ** 2;
    stack = (u ** 3 - u ** 2) * .36 / .76;
    rise = 1 - ease(u);
  } else {
    const u = (t - .60) / .40;
    gate = 2 * u ** 3 - 3 * u ** 2 + 1;
    stack = -2 * u ** 3 + 3 * u ** 2 + (u ** 3 - 2 * u ** 2 + u) * .40 / .76;
    lift = Math.sin(Math.PI * u) ** 2;
    lean = ease(u);
  }
  const travel = clamp((t - .24) / .76);
  return {
    gate, stack, rise, lift, pixels, lean,
    rotation: t <= .24 ? -4 * ease(t / .24) : -4 * (1 - ease(travel)) + 4 * Math.sin(Math.PI * travel) ** 2,
    scale: .35 + .65 * ease(t / .24),
    opacity: ease(t / .06),
  };
}

export function rejectedPose(progress) {
  const t = clamp(progress);
  let gate = 0, rise = 0, pixels = 0, recoil = 0;
  if (t <= .22) {
    rise = ease(t / .22);
    pixels = 35 * (1 - rise);
  } else if (t <= .40) {
    gate = ease((t - .22) / .18);
    rise = 1 - gate;
  } else if (t <= .48) {
    gate = 1;
    recoil = mix(0, -18, (t - .40) / .08);
    pixels = mix(0, -9, (t - .40) / .08);
  } else if (t <= .58) {
    gate = 1;
    recoil = mix(-18, 0, (t - .48) / .10);
    pixels = mix(-9, 0, (t - .48) / .10);
  } else if (t <= .66) {
    gate = 1;
    recoil = mix(0, -22, (t - .58) / .08);
    pixels = mix(0, -12, (t - .58) / .08);
  } else if (t <= .76) {
    const p = ease((t - .66) / .10);
    gate = 1;
    recoil = -22;
    pixels = -12 * (1 - p);
    rise = p;
  } else if (t <= .88) {
    const p = ease((t - .76) / .12);
    gate = 1 - p;
    recoil = -22 * (1 - p);
    rise = 1;
  } else {
    rise = 1 - ease((t - .88) / .12);
    pixels = 40 * (1 - rise);
  }
  return {
    gate, rise, pixels, recoil,
    rotation: t <= .22 ? -4 * ease(t / .22) : t >= .88 ? -4 * (1 - ease((t - .88) / .12)) : -4 + recoil * .16,
    scale: t <= .22 ? .35 + .65 * ease(t / .22) : t >= .88 ? 1 - .65 * ease((t - .88) / .12) : 1,
    opacity: ease(t / .06) * (1 - ease((t - .95) / .05)),
  };
}

const number = (value) => Number(value.toFixed(6));
const frames = (sample, render) => Array.from({ length:101 }, (_, i) => `${i}% {${render(sample(i / 100))}}`).join("\n");
const turn = (pose) => `transform:rotate(${number(pose.rotation)}deg) scale(${number(pose.scale)})`;
export const PURCHASE_FLIGHT_FRAMES = frames(purchasePose, (p) => `opacity:${number(p.opacity)};transform:translate3d(calc((var(--gate-x) - var(--shop-x)) * ${number(p.gate)} + (var(--stack-x) - var(--shop-x)) * ${number(p.stack)} + var(--cycle-book-lean,0px) * ${number(p.lean)}),calc(var(--parcel-rise) * ${number(p.rise)} + var(--flight-lift) * ${number(p.lift)} + ${number(p.pixels)}px),0)`);
export const PURCHASE_TURN_FRAMES = frames(purchasePose, turn);
export const REJECTED_FLIGHT_FRAMES = frames(rejectedPose, (p) => `opacity:${number(p.opacity)};transform:translate3d(calc((var(--gate-x) - var(--shop-x) - var(--reject-gap)) * ${number(p.gate)} + ${number(p.recoil)}px),calc(var(--parcel-rise) * ${number(p.rise)} + ${number(p.pixels)}px),0)`);
export const REJECTED_TURN_FRAMES = frames(rejectedPose, turn);
