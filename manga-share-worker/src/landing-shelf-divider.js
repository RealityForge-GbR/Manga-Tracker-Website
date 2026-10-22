// Original decorative bindings and cover ornaments, without licensed cover art.
const finishes = [
  ["#d7a0af", "#30202a"],
  ["#f7eee8", "#5a3948"],
  ["#5a3948", "#f7eee8"],
  ["#c2b3b8", "#30202a"],
  ["#2a202b", "#d7a0af"],
];
const groups = [0, 0, 0, 1, 1, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1];
const marks = ["✦", "◇", "○", "✧"];
const pullAt = new Map([[2, -2.4], [10, -13], [19, -4], [28, -17], [37, -8], [46, -21], [55, -12], [64, -3], [73, -16]]);
const spines = Array.from({ length: 80 }, (_, index) => {
  const position = index % groups.length;
  const finish = finishes[groups[position]];
  const height = [92, 92, 92, 97, 97, 87, 87, 87, 95, 95, 91, 91, 91, 100, 100, 100][position];
  const width = [29, 29, 29, 25, 25, 31, 31, 31, 26, 26, 30, 30, 30, 27, 27, 27][position];
  const number = (position % 3) + 1;
  const variables = `--spine:${finish[0]};--spine-ink:${finish[1]};--book-height:${height}%;--book-width:${width}${pullAt.has(index) ? `;--pull-delay:${pullAt.get(index)}s` : ""}`;
  const volume = pullAt.has(index) ? `<span class="shelf-divider-cover"><span class="shelf-divider-cover-title">MANGA</span><span class="shelf-divider-cover-art">${marks[Math.floor(position / 4)]}</span><span class="shelf-divider-cover-volume">${number}</span></span><span class="shelf-divider-pages"></span><span class="shelf-divider-top"></span>` : "";
  return `<span class="shelf-divider-slot" style="${variables}"><span class="shelf-divider-book"${pullAt.has(index) ? " data-pull" : ""}><span class="shelf-divider-spine"><span class="shelf-divider-mark">${marks[Math.floor(position / 4)]}</span><span class="shelf-divider-number">${number}</span></span>${volume}</span></span>`;
}).join("");

// A fixed handful of compositor-only particles keeps the effect light on phones.
const sparks = Array.from({ length: 12 }, (_, index) => {
  const x = [2, 10, 19, 27, 35, 44, 52, 61, 69, 78, 87, 97][index];
  const drift = [-10, 13, -6, 15, -12, 9, -15, 12, -8, 16, -11, 7][index];
  const duration = [6.2, 7.4, 6.8, 8.1][index % 4];
  return `<i class="shelf-divider-spark" style="--spark-x:${x}%;--spark-drift:${drift}px;--spark-duration:${duration}s;--spark-delay:${-(index * 1.37)}s;--spark-size:${index % 3 === 0 ? 3 : 2}px;--spark-color:${index % 3 === 1 ? "#f7eee8" : "#d7a0af"}"></i>`;
}).join("");

export const LANDING_SHELF_DIVIDER_MARKUP = `<div class="shelf-divider" data-shelf-divider aria-hidden="true"><div class="shelf-divider-recess"><div class="shelf-divider-row">${spines}</div></div><div class="shelf-divider-board"></div><div class="shelf-divider-sparks">${sparks}</div></div>`;
