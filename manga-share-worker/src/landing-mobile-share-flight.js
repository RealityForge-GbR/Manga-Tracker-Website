// CSS owns playback. This pure path supplies densely sampled keyframes once at build time.
// Three staggered colors let the next source appear before the current arrival.
export const MOBILE_SHARE_CYCLE_SECONDS = 12;
export const MOBILE_SHARE_DEPARTURE = .06;
export const MOBILE_SHARE_ARRIVAL = .27;
export const MOBILE_SHARE_BOOK_PHASES = [0, 2 / 3, 1 / 3];

const clamp = (value) => Math.min(1, Math.max(0, value));
const smooth = (value) => {
  const t = clamp(value);
  return clamp(t * t * t * (t * (t * 6 - 15) + 10));
};

export function mobileShareBookPose(progress, phaseOffset = 0) {
  const shifted = progress + phaseOffset;
  const phase = shifted >= 0 ? shifted % 1 : (shifted % 1 + 1) % 1;
  if (phase <= MOBILE_SHARE_DEPARTURE || phase >= .7) {
    return {
      x: 0, y: 0, rotation: 0, scale: 1,
      opacity: phase >= .7 ? smooth((phase - .84) / .04) : 1,
    };
  }
  if (phase < MOBILE_SHARE_ARRIVAL) {
    const position = smooth((phase - MOBILE_SHARE_DEPARTURE) / (MOBILE_SHARE_ARRIVAL - MOBILE_SHARE_DEPARTURE));
    return {
      x: 144 * position,
      y: -68 * Math.sin(Math.PI * position),
      rotation: -12 * Math.sin(2 * Math.PI * position),
      scale: 1 + .025 * Math.sin(Math.PI * position),
      opacity: 1,
    };
  }
  return {
    x: 144, y: 0, rotation: 0, scale: 1,
    opacity: 1 - smooth((phase - .61) / .06),
  };
}

const round = (value) => {
  const rounded = Math.round(value * 10000) / 10000;
  return Object.is(rounded, -0) ? 0 : rounded;
};

export function createMobileShareFlightKeyframes(name, phaseOffset = 0) {
  const frames = [];
  for (let index = 0; index <= 240; index += 1) {
    const pose = mobileShareBookPose(index / 240, phaseOffset);
    frames.push(`${round(index / 2.4)}% {transform:translate(${round(pose.x)}px,${round(pose.y)}px) rotate(${round(pose.rotation)}deg) scale(${round(pose.scale)});opacity:${round(pose.opacity)}}`);
  }
  return `@keyframes ${name} {${frames.join("\n")}}`;
}
