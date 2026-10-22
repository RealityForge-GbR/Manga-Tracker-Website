// Original, code-drawn books; no game artwork or invented app screenshots.
function volume(index, color = "#D7A0AF", ink = "#30202A") {
  return `<svg class="cycle-volume-art" viewBox="0 0 160 80" aria-hidden="true">
    <path d="m8 30 91-27 53 25-91 28Z" fill="${color}" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
    <path d="m8 30 53 26v16L8 46Z" fill="${ink}" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
    <path d="m61 56 91-28v16L61 72Z" fill="#F7EEE8" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
    <path d="m65 61 82-25m-82 29 82-25" stroke="#C2B3B8" stroke-width="1"/>
    <path d="m16 28 83-24m-2 5 39 18-76 23-38-18" fill="none" stroke="${ink}" stroke-width="1" stroke-opacity=".45"/>
    <path d="m82 16 10 4-11 4-10-4Zm-18 9 27 13m-20-9 11 5" fill="none" stroke="${ink}" stroke-width="1.4"/>
    <path d="m14 35 3 1v10l-3-1Zm34 16 3 1v10l-3-1Z" fill="${color}"/>
    <text x="26" y="47" transform="rotate(26 26 47)" font-size="6" font-family="sans-serif" letter-spacing="1" fill="#F7EEE8">${index === null ? "MANGA" : "MANGA " + String(index + 1).padStart(2,"0")}</text>
  </svg>`;
}

const tones = ["#D7A0AF", "#F7EEE8", "#C2B3B8", "#5A3948", "#D7A0AF", "#342735"];
const books = Array.from({ length:18 }, (_, index) => `<span class="cycle-stack-book" style="--book-index:${index};--book-lean:${[0,3,-2,1,-3,2][index % 6]}px">${volume(index, tones[index % 6], index % 6 === 3 || index % 6 === 5 ? "#D7A0AF" : "#30202A")}</span>`).join("");
const parcelBack = `<svg class="cycle-parcel-art" viewBox="0 0 240 220" aria-hidden="true">
  <ellipse cx="121" cy="207" rx="91" ry="10" fill="#171217" opacity=".25"/>
  <path d="m41 83 84-32 75 39v81l-82 38-77-44Z" fill="#5A3948" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m41 83 84-32 75 39-82 36Z" fill="#171217" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <g class="parcel-flap parcel-flap-back-left"><path d="m41 83 84-32-28-41-81 32Z" fill="#D7A0AF" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/><path d="m45 76 73-28" stroke="#F7EEE8" stroke-width="1" opacity=".35"/></g>
  <g class="parcel-flap parcel-flap-back-right"><path d="m125 51 75 39 24-40-76-37Z" fill="#C2B3B8" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/><path d="m134 53 62 32" stroke="#F7EEE8" stroke-width="1" opacity=".4"/></g>
  <path d="m47 85 71 35 75-33" stroke="#D7A0AF" stroke-width="1.5" opacity=".3"/>
</svg>`;
const parcelFront = `<svg class="cycle-parcel-art" viewBox="0 0 240 220" aria-hidden="true">
  <path d="m41 83 77 43v83l-77-44Z" fill="#5A3948" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m118 126 82-36v81l-82 38Z" fill="#D7A0AF" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/>
  <path d="m122 134 72-32m-72 100 72-34" stroke="#F7EEE8" stroke-width="1" opacity=".25"/>
  <path d="m105 128 10 5v67l-10-6Z" fill="#D7A0AF" opacity=".25"/>
  <path d="m144 152 36-16v28l-36 17Z" fill="#F7EEE8" stroke="#30202A" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="m150 155 2-1v17l-2 1m5-19 2-1v17l-2 1m7-20 2-1v17l-2 1m5-19 1-1v17l-1 1m5-19 2-1v17l-2 1" fill="#5A3948"/>
  <g class="parcel-flap parcel-flap-front-left"><path d="m41 83 77 43-29 25-76-43Z" fill="#C2B3B8" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/><path d="m43 91 66 36" stroke="#F7EEE8" stroke-width="1" opacity=".4"/></g>
  <g class="parcel-flap parcel-flap-front-right"><path d="m118 126 82-36 32 29-81 37Z" fill="#5A3948" stroke="#30202A" stroke-width="2" stroke-linejoin="round"/><path d="m126 128 71-31" stroke="#D7A0AF" stroke-width="1" opacity=".45"/></g>
</svg>`;
const budgetDisc = `<svg class="cycle-budget-disc" viewBox="0 0 200 200" aria-hidden="true">
  <defs><radialGradient id="budget-disc-shade" cx=".35" cy=".2" r=".9"><stop stop-color="#342735"/><stop offset="1" stop-color="#211A22"/></radialGradient></defs>
  <circle cx="100" cy="103" r="94" fill="#30202A" opacity=".45"/>
  <circle cx="100" cy="100" r="93" fill="url(#budget-disc-shade)" stroke="#5A3948" stroke-width="1.5"/>
  <circle cx="100" cy="100" r="86" fill="none" stroke="#5A3948" stroke-width="3"/>
  <circle class="cycle-budget-progress" cx="100" cy="100" r="86" fill="none" stroke="#D7A0AF" stroke-width="4" stroke-linecap="round" transform="rotate(-90 100 100)"/>
  <path d="M39 54a77 77 0 0 1 88-25" fill="none" stroke="#F7EEE8" stroke-width="1" opacity=".12"/>
</svg>`;

export const LANDING_BUDGET_MARKUP = `
<div class="budget-cycle" data-budget-cycle data-cycle-stage="complete" data-cycle-added="10" data-cycle-owned="18" data-cycle-empty="true">
  <div class="budget-cycle-heading"><h2 id="planning-title">Lege dein Monatsbudget fest …</h2></div>
  <div class="cycle-stage" role="img" aria-label="Beispiel mit 100 Euro Monatsbudget: Ein Paket öffnet sich. Bücher fliegen nacheinander daraus durch das Budget und landen von oben auf dem Stapel. Jeder Band kostet 10 Euro. Die bestehende Sammlung wächst von acht Bänden im Wert von 80 Euro auf 18 Bände im Wert von 180 Euro. Bei null Euro wird das nächste Buch aufgehalten und fliegt zurück ins Paket. Budget und Sammlungswert bleiben dabei unverändert.">
    <svg class="cycle-route" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"><path d="M215 192H395M610 192H710"/><path d="m335 187 7 5-7 5m327-10 7 5-7 5"/></svg>
    <div class="cycle-parcel-back">${parcelBack}</div>
    <div class="cycle-parcel-front">${parcelFront}</div>
    <div class="cycle-budget">
      ${budgetDisc}
      <div class="cycle-budget-amount"><span>Monatsbudget</span><strong data-cycle-budget>0 €</strong><b class="cycle-zero-alert" aria-hidden="true">0 €</b></div>
      <svg class="cycle-budget-seal" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/></svg>
      <span class="cycle-debit" aria-hidden="true">−10 €</span>
    </div>
    <div class="cycle-collection-value"><span>Sammlungswert</span><strong data-cycle-value>180 €</strong><span data-cycle-count hidden>18</span></div>
    <div class="cycle-stack-window" aria-hidden="true"><div class="cycle-stack">${books}</div></div>
    <div class="cycle-flight" aria-hidden="true"><div class="cycle-flying-volume">${volume(null, "var(--cycle-book-color, #D7A0AF)", "var(--cycle-book-ink, #30202A)")}</div></div>
    <div class="cycle-impact" aria-hidden="true"><i></i><i></i><i></i></div>
  </div>
  <p class="budget-cycle-ending">… und erfasse den Wert deiner Sammlung.</p>
</div>`;
