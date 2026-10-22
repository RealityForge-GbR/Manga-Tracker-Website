// Original P04 / Collector Arc artwork and Sakura presentation from the Android app.
// RewardParticles.kt: 220ms fade, 350ms rise, damped spring settling by 1100ms.
export const ACHIEVEMENT_CYCLE_MS = 7600;
export function achievementPose(ms) {
  return {
    opacity: Math.min(1, ms / 220),
    scale: ms > 1100 ? 1 : 1 - .18 * Math.exp(-7 * ms / 1000) * Math.cos(15 * ms / 1000),
    y: 24 * Math.max(0, 1 - ms / 350),
  };
}

export const ACHIEVEMENT_PETALS = Array.from({ length: 42 }, (_, i) => {
  const front = i < 16;
  const n = front ? i : i - 16;
  const count = front ? 16 : 26;
  return {
    front, x: 2 + 96 * (n + .45) / count,
    size: (front ? 8 : 5) + (i * 7 % 41) / 10,
    delay: n % 5 === 0 ? 0 : 80 + i * 83 % 570,
    duration: 2200 + i * 137 % 1001,
    drift: i * 7 % 17 - 8,
    rotation: i * 47 % 360,
    alpha: front ? .7 : .36,
  };
});

const petals = ACHIEVEMENT_PETALS.map((p, i) => `<span class="achievement-petal${p.front ? ' petal-front' : ''}" style="left:${p.x}%;width:${p.size}px;height:${p.size}px;animation-name:achievement-petal-${i}"><svg viewBox="-1 -1 2 2" aria-hidden="true"><use href="#achievement-sakura-petal"/></svg></span>`).join("");

export const LANDING_ACHIEVEMENT_MARKUP = `<figure class="achievement-scene" data-achievement-demo aria-label="Collector Arc: originales Achievement-Artwork mit der Sakura-Freischaltanimation aus der App">
  <svg class="achievement-definitions" aria-hidden="true"><defs><path id="achievement-sakura-petal" d="M0 -.32C.18 -.66 .56 -.5 .47 -.06C.42 .32 .15 .58 0 .68C-.38 .4 -.57 .03 -.43 -.31C-.32 -.6 -.1 -.61 0 -.32Z"/></defs></svg>
  <div class="achievement-petals" aria-hidden="true">${petals}</div>
  <div class="achievement-artwork"><img src="/landing/collection-mascot.webp" alt="Originales Collector-Arc-Achievement aus Manga Tracker" width="683" height="1024" loading="lazy" decoding="async"><span class="achievement-glint glint-1" aria-hidden="true"></span><span class="achievement-glint glint-2" aria-hidden="true"></span><span class="achievement-glint glint-3" aria-hidden="true"></span><span class="achievement-glint glint-4" aria-hidden="true"></span></div>
  <figcaption class="achievement-caption"><span>Achievement freigeschaltet</span><strong>Collector Arc</strong></figcaption>
</figure>`;
