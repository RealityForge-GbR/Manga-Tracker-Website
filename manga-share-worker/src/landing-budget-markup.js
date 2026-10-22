function volume(number, color = "#D7A0AF", ink = "#30202A") {
  return `<svg class="cycle-volume-art" viewBox="0 0 28 112" aria-hidden="true">
    <rect x="1" y="1" width="26" height="110" rx="2" fill="${color}" stroke="#30202A" stroke-width="1.5"/>
    <path d="M4 3v106M24 4v103" stroke="${ink}" stroke-opacity=".5" stroke-width="1"/>
    <path d="M7 11h14M7 14h14M7 99h14M7 102h14" stroke="${ink}" stroke-width=".8"/>
    <text x="14" y="29" font-size="8" text-anchor="middle" fill="${ink}" stroke="none">0${number}</text>
    <path d="m14 40 6 9-6 9-6-9Zm0 19v26m0-8c-7 0-8-7-8-7 7 0 8 7 8 7Zm0-5c7 0 8-7 8-7-7 0-8 7-8 7Z" fill="none" stroke="${ink}" stroke-width="1"/>
  </svg>`;
}

const shop = `<svg class="cycle-shop-art" viewBox="0 0 160 185" aria-hidden="true">
  <path d="M18 45h124v125H18Z" fill="#211A22" stroke="#5A3948" stroke-width="3"/>
  <path d="M20 12h120l16 34H4Z" fill="#5A3948" stroke="#30202A" stroke-width="2"/>
  <path d="m20 12-5 34h25l4-34Zm49 0-1 34h24l-1-34Zm47 0 4 34h25l-5-34Z" fill="#D7A0AF"/>
  <path d="M4 46h25v9c0 13-25 13-25 0Zm49 0h27v9c0 13-27 13-27 0Zm54 0h25v9c0 13-25 13-25 0Z" fill="#C2B3B8" stroke="#30202A" stroke-width="1.5"/>
  <path d="M29 46h24v9c0 13-24 13-24 0Zm51 0h27v9c0 13-27 13-27 0Zm52 0h24v9c0 13-24 13-24 0Z" fill="#5A3948" stroke="#30202A" stroke-width="1.5"/>
  <rect x="27" y="76" width="106" height="71" rx="2" fill="#171217" stroke="#342735" stroke-width="2"/>
  <path d="M36 142V92h12v50m5 0V87h11v55m36 0V95h12v47m4 0V89h9v53" fill="#5A3948" stroke="#D7A0AF" stroke-width="1"/>
  <path d="M38 100h8m9-4h7m40 10h8m7-7h6" stroke="#F7EEE8" stroke-width="1"/>
  <path d="M14 149h132v10H14Z" fill="#5A3948" stroke="#30202A" stroke-width="2"/>
  <path d="M24 170v9m112-9v9" stroke="#5A3948" stroke-width="5"/>
</svg>`;

const gate = `<svg class="cycle-gate-art" viewBox="0 0 160 190" aria-hidden="true">
  <path d="M25 181V69c0-57 110-57 110 0v112" stroke="#30202A" stroke-width="13"/>
  <path d="M25 181V69c0-57 110-57 110 0v112" stroke="#5A3948" stroke-width="8"/>
  <path d="M31 179V70c0-50 98-50 98 0v109" stroke="#D7A0AF" stroke-width="1.5"/>
  <path d="M16 182h128" stroke="#5A3948" stroke-width="9" stroke-linecap="round"/>
  <path d="M30 63v111m100-111v111" stroke="#C2B3B8" stroke-opacity=".15" stroke-width="2"/>
  <g class="cycle-gate-alert"><path d="M25 181V69c0-57 110-57 110 0v112" stroke="#E58A92" stroke-width="6"/><path d="M80 57v117" stroke="#E58A92" stroke-width="4" stroke-linecap="round"/></g>
</svg>`;

export const LANDING_BUDGET_MARKUP = `
<div class="budget-cycle" data-budget-cycle data-cycle-stage="complete" data-cycle-added="2" data-cycle-owned="5">
  <div class="cycle-stage" role="img" aria-label="Beispiel: 20 Euro Monatsbudget reichen für zwei Manga zu je 10 Euro. Die bestehende Sammlung wächst von drei Bänden im Wert von 30 Euro auf fünf Bände im Wert von 50 Euro. Ein dritter Kauf wird bei null Euro Budget gestoppt.">
    <svg class="cycle-route cycle-route-wide" viewBox="0 0 1000 380" preserveAspectRatio="none"><path d="M160 198H840M840 287C840 354 160 354 160 287"/><path d="m489 333-9 5 9 5m160-151 9 6-9 6"/></svg>
    <svg class="cycle-route cycle-route-small" viewBox="0 0 360 510" preserveAspectRatio="none"><path d="M79 214H263M288 254C321 310 275 357 202 357M141 430C25 430 22 324 62 277"/><path d="m168 208 9 6-9 6m-113 68 7-11 3 13"/></svg>
    <div class="cycle-shop">${shop}<span>Shop</span></div>
    <div class="cycle-budget">
      <div class="cycle-budget-amount"><span>Monatsbudget</span><strong data-cycle-budget>0 €</strong><b class="cycle-zero-alert">0 €</b></div>
      <div class="cycle-gate">${gate}</div>
      <span class="cycle-debit">−10 €</span>
      <span class="cycle-budget-meter"><i></i></span>
    </div>
    <div class="cycle-stack">
      <span class="cycle-stack-book" style="--stack-index:0">${volume(1, "#C2B3B8")}</span>
      <span class="cycle-stack-book" style="--stack-index:1">${volume(2, "#5A3948", "#F7EEE8")}</span>
      <span class="cycle-stack-book" style="--stack-index:2">${volume(3, "#F7EEE8")}</span>
      <span class="cycle-stack-book cycle-stack-first" style="--stack-index:3">${volume(4)}</span>
      <span class="cycle-stack-book cycle-stack-second" style="--stack-index:4">${volume(5, "#F7EEE8")}</span>
      <i class="cycle-stack-base"></i>
    </div>
    <div class="cycle-collection-value"><strong data-cycle-value>50 €</strong><span>Sammlungswert</span><small><span data-cycle-count>5</span> Bände</small></div>
    <div class="cycle-flight"><div class="cycle-flying-volume"><span class="cycle-flight-first">${volume(4)}</span><span class="cycle-flight-second">${volume(5, "#F7EEE8")}</span><span class="cycle-flight-blocked">${volume(6, "#5A3948", "#F7EEE8")}</span></div></div>
  </div>
  <p class="budget-cycle-ending">… und erfasse den Wert deiner Sammlung.</p>
</div>`;
