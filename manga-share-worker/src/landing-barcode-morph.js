// A real ISBN/EAN-13 pattern, split into six adjacent clusters for the illustration.
// The same bars remain in the DOM as they become the decorative manga bindings.
export const BARCODE_MORPH_ISBN = "9783551771575";
const leftOdd = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const leftEven = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const right = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];
const parity = "LGGLGL";
export const BARCODE_MORPH_MODULES = "101" + Array.from(BARCODE_MORPH_ISBN.slice(1, 7), (digit, index) => (parity[index] === "L" ? leftOdd : leftEven)[Number(digit)]).join("") + "01010" + Array.from(BARCODE_MORPH_ISBN.slice(7), (digit) => right[Number(digit)]).join("") + "101";

const moduleWidth = 3.2;
const originX = 58;
const originY = 104;
const barcodeHeight = 116;
const shelfY = 348;
const finishes = [["#d7a0af", "#30202a"], ["#f7eee8", "#5a3948"], ["#5a3948", "#f7eee8"], ["#c2b3b8", "#30202a"], ["#2a202b", "#d7a0af"], ["#d7a0af", "#30202a"]];
const heights = [127, 137, 131, 143, 128, 136];
const marks = ["✦", "◇", "○", "✧", "◇", "✦"];

export const BARCODE_MORPH_VOLUMES = Array.from({ length: 6 }, (_, index) => {
  const from = Math.floor(index * 95 / 6);
  const to = Math.floor((index + 1) * 95 / 6);
  const segment = BARCODE_MORPH_MODULES.slice(from, to);
  const bars = [];
  for (let cursor = 0; cursor < segment.length;) {
    if (segment[cursor] === "0") { cursor += 1; continue; }
    const start = cursor;
    while (cursor < segment.length && segment[cursor] === "1") cursor += 1;
    bars.push({ module: from + start, modules: cursor - start });
  }
  const startX = originX + bars[0].module * moduleWidth;
  const targetX = 86 + index * 40;
  return { index, bars, startX, targetX, height: heights[index], drop: shelfY - originY - heights[index], shift: targetX - startX, finish: finishes[index], mark: marks[index] };
});

const volumes = BARCODE_MORPH_VOLUMES.map((volume) => {
  const { index, bars, startX, height, drop, shift, finish, mark } = volume;
  const firstWidth = bars[0].modules * moduleWidth;
  const variables = `--book-color:${finish[0]};--book-ink:${finish[1]};--book-height:${height};--book-scale:${height / barcodeHeight};--book-wide:${30 / firstWidth};--book-shift:${shift}px;--book-drop:${drop}px;--book-stagger:${index * 0.075}s;--book-lean:${index % 2 ? 5 : -5}deg`;
  const otherBars = bars.slice(1).map((bar, barIndex) => {
    const x = (bar.module - bars[0].module) * moduleWidth;
    // Collapse the remaining physical stripes into the binding before they merge.
    return `<rect class="barcode-morph-stripe" x="${x}" y="0" width="${bar.modules * moduleWidth}" height="${barcodeHeight}" style="--stripe-fold:${4 + barIndex * 2 - x}px"/>`;
  }).join("");
  return `<g transform="translate(${startX} ${originY})"><g class="barcode-morph-volume" style="${variables}" data-volume="${index + 1}"><g class="barcode-morph-cover"><path d="M0 0 7 -5H37L30 0Z" fill="${finish[0]}"/><path d="M30 0 37 -5V${height - 5}L30 ${height}Z" fill="#f7eee8"/><path d="M32 3V${height - 9}M34 1V${height - 11}" stroke="#c2b3b8" stroke-width=".8"/><path d="M30 0 37 -5V${height - 5}L30 ${height}Z" fill="none" stroke="#30202a" stroke-width=".8"/></g><rect class="barcode-morph-binding" x="0" y="0" width="${firstWidth}" height="${barcodeHeight}" rx=".6"/>${otherBars}<g class="barcode-morph-ornament" fill="none" stroke="${finish[1]}" stroke-width=".8"><path d="M4 9H26M4 13H26M4 ${height - 29}H26M4 ${height - 25}H26" opacity=".7"/><rect x="3" y="3" width="24" height="${height - 6}" rx="1" opacity=".25"/><text x="15" y="${Math.round(height * .43)}" fill="${finish[1]}" stroke="none" text-anchor="middle" font-size="16">${mark}</text><text x="15" y="${height - 10}" fill="${finish[1]}" stroke="none" text-anchor="middle" font-size="9">${index + 1}</text></g></g></g>`;
}).join("");

export const LANDING_BARCODE_MORPH_MARKUP = `<figure class="barcode-morph" data-barcode-morph><svg class="barcode-morph-scene" viewBox="0 0 420 420" role="img" aria-label="Ein Barcode wird gescannt. Seine Streifen verwandeln sich in Manga, die auf einem Regal landen."><defs><linearGradient id="barcode-morph-paper" x2="0" y2="1"><stop stop-color="#f7eee8"/><stop offset="1" stop-color="#e9dce0"/></linearGradient><linearGradient id="barcode-morph-board" x2="0" y2="1"><stop stop-color="#d7a0af"/><stop offset=".25" stop-color="#5a3948"/><stop offset="1" stop-color="#30202a"/></linearGradient><linearGradient id="barcode-morph-beam"><stop stop-color="#d7a0af" stop-opacity="0"/><stop offset="1" stop-color="#d7a0af" stop-opacity=".32"/></linearGradient></defs><ellipse class="barcode-morph-ground" cx="208" cy="370" rx="156" ry="9" fill="#171217" opacity=".55"/><g class="barcode-morph-label"><rect x="20" y="82" width="380" height="174" rx="12" fill="url(#barcode-morph-paper)"/><text x="210" y="244" text-anchor="middle" fill="#30202a" font-size="13" letter-spacing="5">9 783551 771575</text></g><g class="barcode-morph-shelf"><path d="M46 348H370L379 354H37Z" fill="#d7a0af"/><rect x="37" y="354" width="342" height="9" rx="1.5" fill="url(#barcode-morph-board)"/><path d="M61 363V377M354 363V377" stroke="#30202a" stroke-width="7"/></g>${volumes}<g class="barcode-morph-scanner"><rect x="40" y="96" width="18" height="136" rx="3" fill="url(#barcode-morph-beam)"/><path d="M58 96V232" stroke="#d7a0af" stroke-width="2.5"/><path d="M51 95H65M51 233H65" stroke="#d7a0af" stroke-width="1.5" stroke-linecap="round"/></g><g class="barcode-morph-settle" stroke="#d7a0af" stroke-width="1.5" stroke-linecap="round"><path d="M72 337 67 332M341 337 346 332M206 194V188"/><path d="M201 191H211"/></g></svg><figcaption>Band für Band ins Regal.</figcaption></figure>`;
