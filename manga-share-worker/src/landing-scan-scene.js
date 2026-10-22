const palette = [
  { cover: "#D7A0AF", ink: "#30202A", edge: "#5A3948" },
  { cover: "#F7EEE8", ink: "#5A3948", edge: "#C2B3B8" },
  { cover: "#5A3948", ink: "#F7EEE8", edge: "#D7A0AF" },
];

function volume(index) {
  const { cover, ink, edge } = palette[index];
  return `<g class="scan-flight scan-flight-${index}" transform="translate(${263 + index * 32} 136)">
    <rect x="1" y="1" width="28" height="117" rx="2" fill="${cover}" stroke="#30202A" stroke-width="2"/>
    <path d="M5 3v113M26 4v109" stroke="${edge}" stroke-width="2"/>
    <path d="M8 10h14M8 13h14M8 107h14M8 110h14" stroke="${ink}" stroke-width=".8"/>
    <text x="15" y="29" fill="${ink}" font-size="8" font-family="sans-serif" text-anchor="middle">0${index + 1}</text>
    <path d="m15 39 6 8-6 8-6-8Zm0 18v14m0-5c-7 0-8-6-8-6 7 0 8 6 8 6Zm0-6c7 0 8-6 8-6-7 0-8 6-8 6Z" fill="none" stroke="${ink}" stroke-width="1"/>
    <rect x="8" y="78" width="15" height="24" rx="1" fill="#F7EEE8"/>
    <path d="M10 81v17m2-17v17m3-17v17m3-17v17m1-17v17m2-17v17" stroke="#30202A" stroke-width="1"/>
  </g>`;
}

export function renderScanScene() {
  return `<div class="shelf-action shelf-scan-action" aria-hidden="true">
    <div class="scan-demo" data-scan-demo>
      <svg class="scan-scene" viewBox="0 0 440 310" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="scan-light" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#D7A0AF" stop-opacity="0"/><stop offset="1" stop-color="#D7A0AF" stop-opacity=".23"/></linearGradient></defs>
        <path d="M19 282h402" stroke="#5A3948" stroke-width="2"/>
        <ellipse cx="94" cy="282" rx="70" ry="5" fill="#211A22"/>
        <rect x="249" y="53" width="162" height="207" fill="#211A22"/>
        <path d="M250 257V49h164v208" stroke="#30202A" stroke-width="15"/>
        <path d="M247 256V47h164v209" stroke="#5A3948" stroke-width="9"/>
        <path d="M247 56h164M250 63v186m157-186v186" stroke="#C2B3B8" stroke-opacity=".25"/>
        <rect x="236" y="257" width="188" height="17" rx="2" fill="#5A3948" stroke="#30202A" stroke-width="2"/>
        <path d="M239 261h181M243 267h172" stroke="#D7A0AF" stroke-opacity=".35"/>
        <path d="M245 274v8m168-8v8" stroke="#5A3948" stroke-width="7"/>
        <g stroke="#30202A" stroke-width="1.5">
          <rect x="361" y="121" width="20" height="134" rx="2" fill="#342735"/>
          <rect x="383" y="112" width="19" height="143" rx="2" fill="#C2B3B8"/>
        </g>
        <path d="M367 128h8m-8 4h8m-4 20v62m-4 33h8m13-128h10m-10 4h10m-5 21 4 6-4 6-4-6Zm0 24v54m-5 19h10" stroke="#D7A0AF" stroke-width="1"/>
        <path d="M389 124h8m-4 23 4 6-4 6-4-6Zm0 24v54m-4 19h8" stroke="#5A3948" stroke-width="1"/>
        <g stroke="#30202A" stroke-width="1.5">
          <rect x="37" y="264" width="117" height="14" rx="2" fill="#D7A0AF"/>
          <rect x="42" y="250" width="110" height="13" rx="2" fill="#342735"/>
        </g>
        <path d="M47 268h101m-99 4h95" stroke="#F7EEE8" stroke-opacity=".65" stroke-width="1"/>
        <path d="M47 254h99m-97 4h92" stroke="#C2B3B8" stroke-width=".8"/>
        <path d="M22 169v-16h18m109 0h18v16m-145 64v16h18m109 0h18v-16" stroke="#D7A0AF" stroke-width="2" stroke-linecap="round"/>
        <path d="M183 212c23-3 37-19 49-32m-10 2 11-3-1 11" stroke="#C2B3B8" stroke-opacity=".6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${[0, 1, 2].map(volume).join("")}
        <g class="scan-beam"><path d="M27 149h136v10H27Z" fill="url(#scan-light)"/><path d="M27 159h136" stroke="#F7EEE8" stroke-width="2"/></g>
        ${[0, 1, 2].map((index) => `<g class="scan-confirm scan-confirm-${index}" transform="translate(${76 + index * 23} 126)"><circle r="8" fill="#5A3948"/><path d="m-3 0 2 2 4-4" stroke="#F7EEE8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g>`).join("")}
      </svg>
    </div>
  </div>`;
}
