import { purchasePose, rejectedPose } from "./landing-budget-flight.js";

const clamp = (value) => Math.max(0, Math.min(1, value));
const ease = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (from, to, progress) => from + (to - from) * ease(progress);

// Reuse the desktop choreography: lift, budget/debit at 60%, then land.
// The narrow panel has a clear route below its budget bar. The same stack factor
// also lowers the flight onto the next book position as the stack grows upward.
export function mobilePurchasePose(progress) {
  const pose = purchasePose(progress);
  return { ...pose, wallet: pose.gate };
}

// Two contacts in the mobile purchase lane match the budget bar's existing
// 40%/58% error flashes. The book then takes the same route home and
// drops vertically into the open parcel.
export function mobileRejectedPose(progress) {
  const t = clamp(progress);
  const source = rejectedPose(t);
  let approach = 0, wallet = 0, rise = 0, pixels = 0, recoil = 0;
  if (t <= .22) {
    rise = ease(t / .22);
    pixels = 35 * (1 - rise);
  } else if (t <= .40) {
    approach = ease((t - .22) / .18);
    wallet = approach;
    rise = 1 - approach;
  } else if (t <= .48) {
    approach = wallet = 1;
    recoil = mix(0, -18, (t - .40) / .08);
    pixels = mix(0, 10, (t - .40) / .08);
  } else if (t <= .58) {
    approach = wallet = 1;
    recoil = mix(-18, 0, (t - .48) / .10);
    pixels = mix(10, 0, (t - .48) / .10);
  } else if (t <= .66) {
    approach = wallet = 1;
    recoil = mix(0, -22, (t - .58) / .08);
    pixels = mix(0, 12, (t - .58) / .08);
  } else if (t <= .88) {
    const home = ease((t - .66) / .22);
    approach = wallet = 1 - home;
    rise = home;
    recoil = -22 * (1 - home);
    pixels = 12 * (1 - home);
  } else {
    const drop = ease((t - .88) / .12);
    rise = 1 - drop;
    pixels = 40 * drop;
  }
  return {
    approach, wallet, rise, pixels, recoil,
    rotation: t <= .22 || t >= .88 ? source.rotation : -4 + recoil * .12,
    scale: source.scale,
    opacity: source.opacity,
  };
}

const number = (value) => Number(value.toFixed(6));
const frames = (sample, render) => Array.from({ length: 101 }, (_, index) => `${index}% {${render(sample(index / 100))}}`).join("\n");
const turn = (pose) => `transform:rotate(${number(pose.rotation)}deg) scale(${number(pose.scale)})`;

export const MOBILE_PURCHASE_FLIGHT_FRAMES = frames(mobilePurchasePose, (p) => `opacity:${number(p.opacity)};transform:translate3d(calc((var(--gate-x) - var(--shop-x)) * ${number(p.gate)} + (var(--stack-x) - var(--shop-x)) * ${number(p.stack)} + var(--cycle-book-lean,0px) * ${number(p.lean)}),calc(var(--parcel-rise) * ${number(p.rise)} + var(--mobile-gate-rise) * ${number(p.wallet)} + var(--mobile-land-offset) * ${number(p.stack)} + var(--flight-lift) * ${number(p.lift)} + ${number(p.pixels)}px),0)`);
export const MOBILE_PURCHASE_TURN_FRAMES = frames(mobilePurchasePose, turn);
export const MOBILE_REJECTED_FLIGHT_FRAMES = frames(mobileRejectedPose, (p) => `opacity:${number(p.opacity)};transform:translate3d(calc((var(--gate-x) - var(--shop-x) - var(--mobile-reject-inset)) * ${number(p.approach)} + ${number(p.recoil)}px),calc(var(--parcel-rise) * ${number(p.rise)} + var(--mobile-stop-rise) * ${number(p.wallet)} + ${number(p.pixels)}px),0)`);
export const MOBILE_REJECTED_TURN_FRAMES = frames(mobileRejectedPose, turn);
