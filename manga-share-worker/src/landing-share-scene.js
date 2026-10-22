// Original app capture in both devices; the transfer is a decorative illustration.
function device(side, x) {
  return `<g class="share-device share-device-${side}">
    <rect x="${x + 3}" y="25" width="142" height="300" rx="22" fill="#30202A"/>
    <rect x="${x}" y="19" width="142" height="300" rx="22" fill="url(#share-device-edge)" stroke="#C2B3B8" stroke-width="1"/>
    <rect x="${x + 3}" y="22" width="136" height="294" rx="20" fill="#171217"/>
    <svg class="share-library-screen" x="${x + 6}" y="34" width="130" height="258.736" viewBox="0 0 720 1433" overflow="hidden">
      <image href="/landing/library.webp" width="720" height="1433" decoding="async"/>
    </svg>
    <circle cx="${x + 71}" cy="26.5" r="2" fill="#342735"/>
    <path d="M${x + 58} 306h26" stroke="#C2B3B8" stroke-width="2" stroke-linecap="round"/>
    <path d="M${x + 143} 77v22m0 11v31" stroke="#5A3948" stroke-width="2.5"/>
  </g>`;
}

export function renderShareScene() {
  return `<div class="shelf-action shelf-share-action" aria-hidden="true">
    <div class="share-demo" data-share-demo>
      <svg class="share-scene" viewBox="0 0 480 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="share-device-edge" x1="0" y1="0" x2="1" y2=".35"><stop stop-color="#C2B3B8"/><stop offset=".09" stop-color="#342735"/><stop offset=".8" stop-color="#211A22"/><stop offset="1" stop-color="#5A3948"/></linearGradient>
        </defs>
        <ellipse cx="100" cy="332" rx="66" ry="5" fill="#211A22"/>
        <ellipse cx="386" cy="332" rx="66" ry="5" fill="#211A22"/>
        <path class="share-route" d="M92 150C160 57 278 54 340 150" stroke="#5A3948" stroke-width="1.5" stroke-dasharray="3 7" stroke-linecap="round"/>
        ${device("source", 26)}
        ${device("target", 312)}
        <rect class="share-source-mark" x="43" y="136" width="28" height="41" rx="2" stroke="#D7A0AF" stroke-width="1.5"/>
        <g class="share-trail" stroke="#D7A0AF" stroke-width="1.8" stroke-linecap="round">
          <path d="M162 119h24m-30 9h22m-9 9h15"/>
        </g>
        <g class="share-spark share-spark-one" transform="translate(194 57)"><path d="M0-5V5M-5 0H5" stroke="#D7A0AF" stroke-width="1.5"/></g>
        <g class="share-spark share-spark-two" transform="translate(285 122)"><path d="M0-4V4M-4 0H4" stroke="#F7EEE8" stroke-width="1.5"/></g>
        <g class="share-book" transform="translate(330 138) scale(.36)">
          <path d="M4 4h71v103H5l-5-4V0Z" fill="#C2B3B8" stroke="#30202A" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M70 5h4v99H70M6 105H70" stroke="#F7EEE8" stroke-width="2"/>
          <svg class="share-cover-crop" width="70" height="104" viewBox="67 575 138 205" overflow="hidden"><image href="/landing/library.webp" width="720" height="1433" decoding="async"/></svg>
          <path d="M1 1v102M3 1v102" stroke="#171217" stroke-opacity=".55" stroke-width="1"/>
        </g>
        <g class="share-badge" transform="translate(258 67)">
          <circle r="15" fill="#5A3948" stroke="#D7A0AF" stroke-width="1"/>
          <g stroke="#F7EEE8" stroke-width="1.5"><path d="m-5 0 9-6m-9 6 9 6"/><circle cx="-6" r="2.2" fill="#5A3948"/><circle cx="6" cy="-7" r="2.2" fill="#5A3948"/><circle cx="6" cy="7" r="2.2" fill="#5A3948"/></g>
        </g>
        <g class="share-arrival" transform="translate(343 157)"><circle r="25" stroke="#D7A0AF" stroke-width="1.5"/></g>
        <g class="share-delivered" transform="translate(398 283)">
          <circle r="13" fill="#5A3948" stroke="#D7A0AF" stroke-width="1"/>
          <path d="m-5 0 3 3 7-7" stroke="#F7EEE8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
  </div>`;
}
