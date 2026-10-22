// Original, decorative book spines; no cover artwork or app interface is invented.
const finishes = [
  ["#d7a0af", "#30202a"],
  ["#f7eee8", "#5a3948"],
  ["#5a3948", "#f7eee8"],
  ["#c2b3b8", "#30202a"],
  ["#2a202b", "#d7a0af"],
];
const groups = [0, 0, 0, 1, 1, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1];
const marks = ["✦", "◇", "○", "✧"];
const pullAt = new Map([[2, 0], [10, -13], [19, -4], [28, -17], [37, -8], [46, -21], [55, -12], [64, -3], [73, -16]]);
const spines = Array.from({ length: 80 }, (_, index) => {
  const position = index % groups.length;
  const finish = finishes[groups[position]];
  const height = [92, 92, 92, 97, 97, 87, 87, 87, 95, 95, 91, 91, 91, 100, 100, 100][position];
  const width = [29, 29, 29, 25, 25, 31, 31, 31, 26, 26, 30, 30, 30, 27, 27, 27][position];
  const number = (position % 3) + 1;
  const pull = pullAt.has(index) ? ` data-pull style="--spine:${finish[0]};--spine-ink:${finish[1]};--book-height:${height}%;--book-width:${width};--pull-delay:${pullAt.get(index)}s"` : ` style="--spine:${finish[0]};--spine-ink:${finish[1]};--book-height:${height}%;--book-width:${width}"`;
  return `<span class="shelf-divider-book"${pull}><span class="shelf-divider-mark">${marks[Math.floor(position / 4)]}</span><span class="shelf-divider-number">${number}</span><i></i></span>`;
}).join("");

export const LANDING_SHELF_DIVIDER_MARKUP = `<div class="shelf-divider" data-shelf-divider aria-hidden="true"><div class="shelf-divider-recess"><div class="shelf-divider-row">${spines}</div></div><div class="shelf-divider-board"></div></div>`;
