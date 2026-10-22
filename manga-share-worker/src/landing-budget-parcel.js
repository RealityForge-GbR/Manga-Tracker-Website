// Matching vector frames retain the strip technique, with a finer opening cadence.
// Front and back layers leave a real opening for the books between them.
export const PARCEL_FRAME_COUNT = 24;
const FRAME_COUNT = PARCEL_FRAME_COUNT;
const A = [41,83], B = [125,51], C = [200,90], D = [118,126];
const midpoint = (a,b) => a.map((value,index) => (value + b[index]) / 2);
const point = (p) => p.map((value) => Number(value.toFixed(2))).join(" ");
const ease = (value) => {
  const p = Math.max(0,Math.min(1,value));
  return p * p * (3 - 2 * p);
};

function flap(a,b,closedA,closedB,angle,color,highlight) {
  const cosine = Math.cos(angle), lift = -44.8 * Math.sin(angle);
  const free = (hinge,closed) => [hinge[0] + (closed[0] - hinge[0]) * cosine,hinge[1] + (closed[1] - hinge[1]) * cosine + lift];
  const outerA = free(a,closedA), outerB = free(b,closedB);
  const crease = (hinge,outer) => hinge.map((value,index) => value + (outer[index] - value) * .14);
  return `<path d="M${point(a)} ${point(b)} ${point(outerB)} ${point(outerA)}Z" fill="${color}" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/><path d="M${point(crease(a,outerA))} ${point(crease(b,outerB))}" stroke="${highlight}" stroke-width="1" opacity=".35"/>`;
}

function frame(index,front) {
  const progress = index / (FRAME_COUNT - 1);
  // The front pair lifts first; reversing the strip closes the back pair first.
  const backAngle = ease((progress - .12) / .88) * 150 * Math.PI / 180;
  const frontAngle = ease(progress / .88) * 210 * Math.PI / 180;
  const shapes = front
    ? flap(A,D,midpoint(A,B),midpoint(D,C),frontAngle,"#C2B3B8","#F7EEE8") + flap(D,C,midpoint(D,A),midpoint(C,B),frontAngle,"#5A3948","#D7A0AF")
    : flap(A,B,midpoint(A,D),midpoint(B,C),backAngle,"#D7A0AF","#F7EEE8") + flap(B,C,midpoint(B,A),midpoint(C,D),backAngle,"#C2B3B8","#F7EEE8");
  return `<g transform="translate(${index * 240} 0)">${shapes}</g>`;
}

function strip(front) {
  return `<div class="parcel-flap-window"><svg class="parcel-frame-strip" viewBox="0 0 ${FRAME_COUNT * 240} 220" aria-hidden="true">${Array.from({length:FRAME_COUNT},(_,index) => frame(index,front)).join("")}</svg></div>`;
}

export const PARCEL_BACK = `<svg class="cycle-parcel-art" viewBox="0 0 240 220" aria-hidden="true">
  <ellipse cx="121" cy="207" rx="91" ry="10" fill="#171217" opacity=".25"/>
  <path d="m41 83 84-32 75 39v81l-82 38-77-44Z" fill="#5A3948" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m41 83 84-32 75 39-82 36Z" fill="#171217" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m47 85 71 35 75-33" stroke="#D7A0AF" stroke-width="1.5" opacity=".3"/>
</svg>${strip(false)}`;

export const PARCEL_FRONT = `<svg class="cycle-parcel-art" viewBox="0 0 240 220" aria-hidden="true">
  <path d="m41 83 77 43v83l-77-44Z" fill="#5A3948" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m118 126 82-36v81l-82 38Z" fill="#D7A0AF" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m122 134 72-32m-72 100 72-34" stroke="#F7EEE8" stroke-width="1" opacity=".25"/>
  <path d="m105 128 10 5v67l-10-6Z" fill="#D7A0AF" opacity=".25"/>
</svg>${strip(true)}`;
