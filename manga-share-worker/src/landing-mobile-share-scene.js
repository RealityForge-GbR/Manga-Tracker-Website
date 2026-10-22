import { createMobileShareFlightKeyframes, MOBILE_SHARE_CYCLE_SECONDS } from "./landing-mobile-share-flight.js";

const book = (variant, cover) => `<g class="mobile-share-book mobile-share-book-${variant}">
      <path d="m29 112 6-4h29v53l-6 5H29z" fill="url(#mobile-share-paper)" stroke="#5a3948" stroke-width="1" stroke-linejoin="round"/>
      <path d="m30 114 5-4h29v3l-5 4z" fill="#f7eee8"/>
      <path d="M29 113h29v53H29z" fill="${cover}" stroke="#5a3948" stroke-width="1"/>
      <path d="M33 114v51" stroke="#5a3948" stroke-width="1" opacity=".45"/>
      <path d="m45 127 7 9-7 9-7-9z" fill="none" stroke="#5a3948" stroke-width="1.3"/>
      <path d="M37 153h15m-15 4h10" stroke="#5a3948" stroke-width="1" opacity=".65"/>
      <path d="m59 117 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3m-4 7 4-3" stroke="#c2b3b8" stroke-width=".6"/>
    </g>`;

// A mobile-only diagram of sharing a manga link between two libraries.
// The phones deliberately use illustrated shelves rather than app screenshots.
export const LANDING_MOBILE_SHARE_SCENE = `
<figure class="mobile-share-scene" aria-label="Manga werden nacheinander von einem Handy mit einem zweiten Handy geteilt.">
  <svg class="mobile-share-svg" viewBox="0 0 240 260" role="img" aria-label="Zwei Handys teilen einen Manga per Link" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobile-share-frame" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#c2b3b8"/><stop offset=".08" stop-color="#5a3948"/><stop offset=".52" stop-color="#211a22"/><stop offset="1" stop-color="#d7a0af"/>
      </linearGradient>
      <linearGradient id="mobile-share-paper" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#f7eee8"/><stop offset="1" stop-color="#c2b3b8"/>
      </linearGradient>
    </defs>
    <ellipse cx="120" cy="235" rx="106" ry="9" fill="#171217" opacity=".28"/>

    <g class="mobile-share-phone mobile-share-phone-source">
      <rect x="8" y="66" width="80" height="162" rx="17" fill="#171217" opacity=".35" transform="translate(3 4)"/>
      <rect x="8" y="66" width="80" height="162" rx="17" fill="url(#mobile-share-frame)" stroke="#c2b3b8" stroke-width=".8"/>
      <rect x="12" y="71" width="72" height="152" rx="13" fill="#171217"/>
      <rect x="36" y="76" width="24" height="3" rx="1.5" fill="#342735"/>
      <circle cx="48" cy="77.5" r="1" fill="#c2b3b8" opacity=".6"/>
      <g fill="none" stroke="#c2b3b8" stroke-width="1.5" stroke-linejoin="round">
        <path d="M23 89v8h5v-8zm8-1v9h5v-9zm8 1 2 8 5-1-2-8z"/>
      </g>
      <rect x="20" y="104" width="56" height="68" rx="6" fill="#2a202b" stroke="#5a3948" stroke-width=".6"/>
      <rect x="23" y="179" width="10" height="25" rx="1.5" fill="#f7eee8"/>
      <rect x="35" y="175" width="10" height="29" rx="1.5" fill="#5a3948"/>
      <rect x="47" y="178" width="10" height="26" rx="1.5" fill="#d7a0af"/>
      <rect x="59" y="174" width="12" height="30" rx="1.5" fill="#c2b3b8"/>
      <path d="M20 205h56" stroke="#5a3948" stroke-width="2" stroke-linecap="round"/>
      <path d="M24 183h8m4-4h8m4 3h8m4-4h10" stroke="#171217" stroke-width="1" opacity=".3"/>
      <path d="M38 216h20" stroke="#c2b3b8" stroke-width="2" stroke-linecap="round" opacity=".65"/>
    </g>

    <g class="mobile-share-phone mobile-share-phone-receiver">
      <rect x="152" y="66" width="80" height="162" rx="17" fill="#171217" opacity=".35" transform="translate(3 4)"/>
      <rect x="152" y="66" width="80" height="162" rx="17" fill="url(#mobile-share-frame)" stroke="#c2b3b8" stroke-width=".8"/>
      <rect x="156" y="71" width="72" height="152" rx="13" fill="#171217"/>
      <rect x="180" y="76" width="24" height="3" rx="1.5" fill="#342735"/>
      <circle cx="192" cy="77.5" r="1" fill="#c2b3b8" opacity=".6"/>
      <g fill="none" stroke="#c2b3b8" stroke-width="1.5" stroke-linejoin="round">
        <path d="M167 89v8h5v-8zm8-1v9h5v-9zm8 1 2 8 5-1-2-8z"/>
      </g>
      <rect x="164" y="104" width="56" height="68" rx="6" fill="#2a202b" stroke="#5a3948" stroke-width=".6"/>
      <rect class="mobile-share-destination" x="164" y="104" width="56" height="68" rx="6" fill="#d7a0af" opacity="0"/>
      <rect x="167" y="178" width="12" height="26" rx="1.5" fill="#5a3948"/>
      <rect x="181" y="175" width="10" height="29" rx="1.5" fill="#d7a0af"/>
      <rect x="193" y="178" width="10" height="26" rx="1.5" fill="#f7eee8"/>
      <rect x="205" y="180" width="10" height="24" rx="1.5" fill="#c2b3b8"/>
      <path d="M164 205h56" stroke="#5a3948" stroke-width="2" stroke-linecap="round"/>
      <path d="M168 182h10m4-3h8m4 3h8m4 2h8" stroke="#171217" stroke-width="1" opacity=".3"/>
      <path d="M182 216h20" stroke="#c2b3b8" stroke-width="2" stroke-linecap="round" opacity=".65"/>
    </g>

    <g class="mobile-share-arrival" fill="none" stroke="#d7a0af" stroke-width="1.4">
      <circle cx="192" cy="139" r="30"/>
    </g>
    <g class="mobile-share-sparkles" fill="#f7eee8">
      <path d="m155 103 2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>
      <path d="m223 118 1.4 3.6 3.6 1.4-3.6 1.4-1.4 3.6-1.4-3.6-3.6-1.4 3.6-1.4z"/>
      <circle cx="217" cy="94" r="1.8"/>
    </g>

    ${book("pink", "#d7a0af")}
    ${book("cream", "#f7eee8")}
    ${book("bordeaux", "#8f6579")}
  </svg>
</figure>`;

export const LANDING_MOBILE_SHARE_STYLES = `
@media(max-width:760px) {
  .mobile-share-scene {position:relative;display:block;width:100%;max-width:180px;height:230px;margin:0 auto;isolation:isolate}
  .mobile-share-svg {display:block;width:100%;height:100%;overflow:visible}
  .mobile-share-book {transform-box:view-box;transform-origin:47px 138px;animation-duration:${MOBILE_SHARE_CYCLE_SECONDS}s;animation-timing-function:linear;animation-iteration-count:infinite}
  .mobile-share-book-pink {animation-name:mobile-share-pink-flight}
  .mobile-share-book-cream {animation-name:mobile-share-cream-flight}
  .mobile-share-book-bordeaux {animation-name:mobile-share-bordeaux-flight}
  .mobile-share-arrival {transform-box:fill-box;transform-origin:center;opacity:0;animation:mobile-share-arrival-ring 4s ease-out infinite}
  .mobile-share-sparkles {transform-box:fill-box;transform-origin:center;opacity:0;animation:mobile-share-arrival-sparkles 4s ease-out infinite}
  .mobile-share-destination {animation:mobile-share-destination-glow 4s ease-in-out infinite}
  .mobile-share-book,.mobile-share-arrival,.mobile-share-sparkles,.mobile-share-destination {animation-play-state:paused}
  .is-showcase-card-playing .mobile-share-book {will-change:transform}
  .is-showcase-card-playing .mobile-share-book,.is-showcase-card-playing .mobile-share-arrival,.is-showcase-card-playing .mobile-share-sparkles,.is-showcase-card-playing .mobile-share-destination {animation-play-state:running}

  ${createMobileShareFlightKeyframes("mobile-share-pink-flight")}
  ${createMobileShareFlightKeyframes("mobile-share-cream-flight", 2 / 3)}
  ${createMobileShareFlightKeyframes("mobile-share-bordeaux-flight", 1 / 3)}
  @keyframes mobile-share-arrival-ring {
    0%,78% {opacity:0;transform:scale(.7)}
    83% {opacity:.65;transform:scale(.8)}
    98%,100% {opacity:0;transform:scale(1.4)}
  }
  @keyframes mobile-share-arrival-sparkles {
    0%,78% {opacity:0;transform:scale(.7)}
    85% {opacity:.85;transform:scale(1)}
    99%,100% {opacity:0;transform:scale(1.12)}
  }
  @keyframes mobile-share-destination-glow {
    0%,77%,100% {opacity:0}
    85%,93% {opacity:.15}
  }
}
@media(max-width:760px) and (prefers-reduced-motion:reduce) {
  .mobile-share-book,.mobile-share-arrival,.mobile-share-sparkles,.mobile-share-destination {animation:none!important}
  .mobile-share-book-pink {transform:translate(144px,0);opacity:1}
  .mobile-share-book-cream {transform:none;opacity:1}
  .mobile-share-book-bordeaux {transform:none;opacity:0}
  .mobile-share-destination {opacity:.1}
  .mobile-share-arrival,.mobile-share-sparkles {opacity:0}
}
`;
