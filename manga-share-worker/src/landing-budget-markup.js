import { PARCEL_BACK, PARCEL_FRONT } from "./landing-budget-parcel.js";

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
const books = Array.from({ length:11 }, (_, index) => `<span class="cycle-stack-book" style="--book-index:${index};--book-lean:${[0,3,-2,1,-3,2][index % 6]}px">${volume(index, tones[index % 6], index % 6 === 3 || index % 6 === 5 ? "#D7A0AF" : "#30202A")}</span>`).join("");
const budgetWallet = `<svg class="cycle-budget-wallet" viewBox="0 0 240 190" aria-hidden="true">
  <defs><linearGradient id="budget-wallet-shade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#342735"/><stop offset="1" stop-color="#211A22"/></linearGradient></defs>
  <rect x="16" y="25" width="209" height="147" rx="24" fill="#171217" opacity=".4"/>
  <rect x="10" y="20" width="212" height="147" rx="24" fill="#5A3948"/>
  <rect x="6" y="14" width="216" height="147" rx="24" fill="url(#budget-wallet-shade)" stroke="#5A3948" stroke-width="1.5"/>
  <path d="M27 24h153m-160 9v94" fill="none" stroke="#F7EEE8" stroke-width="1" opacity=".11"/>
  <path d="M26 150h169" stroke="#D7A0AF" stroke-width="1" opacity=".12"/>
  <path d="M198 73h27c7 0 11 5 11 12v15c0 7-4 12-11 12h-27c-7 0-12-5-12-12V85c0-7 5-12 12-12Z" fill="#5A3948" stroke="#30202A" stroke-width="1.5"/>
  <circle class="cycle-wallet-dot" cx="215" cy="92" r="5" fill="#D7A0AF"/>
</svg>`;

export const LANDING_BUDGET_MARKUP = `
<div class="budget-cycle" data-budget-cycle data-cycle-stage="complete" data-cycle-added="3" data-cycle-owned="11" data-cycle-empty="true">
  <div class="budget-cycle-heading"><h2 id="planning-title">Lege dein Monatsbudget fest …</h2></div>
  <div class="cycle-stage" role="img" aria-label="Beispiel mit 30 Euro Monatsbudget: Ein Paket öffnet sich. Drei Bücher werden einzeln senkrecht aus dem Paket gehoben, fliegen durch das Budget und landen von oben auf dem Stapel. Jeder Band kostet 10 Euro. Die Sammlung wächst von acht Bänden im Wert von 80 Euro auf elf Bände im Wert von 110 Euro. Bei null Euro versucht ein weiteres Buch zweimal durchzukommen und kehrt anschließend ins Paket zurück. Budget und Wert der Sammlung bleiben dabei unverändert. Nach der Rückkehr schließt sich das Paket wieder.">
    <div class="cycle-parcel-back">${PARCEL_BACK}</div>
    <div class="cycle-parcel-front">${PARCEL_FRONT}</div>
    <div class="cycle-budget">
      ${budgetWallet}
      <div class="cycle-budget-amount"><span>Monatsbudget</span><strong data-cycle-budget>0 €</strong><b class="cycle-zero-alert" aria-hidden="true">0 €</b></div>
      <div class="cycle-budget-slots" aria-hidden="true"><i style="--slot:0"></i><i style="--slot:1"></i><i style="--slot:2"></i></div>
      <svg class="cycle-budget-seal" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="10" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2"/></svg>
      <span class="cycle-debit" aria-hidden="true">−10 €</span>
    </div>
    <div class="cycle-collection-value"><span>Wert deiner Sammlung</span><strong data-cycle-value>110 €</strong><span data-cycle-count hidden>11</span></div>
    <div class="cycle-stack-window" aria-hidden="true"><div class="cycle-stack">${books}</div></div>
    <div class="cycle-flight" aria-hidden="true"><div class="cycle-flying-volume">${volume(null, "var(--cycle-book-color, #D7A0AF)", "var(--cycle-book-ink, #30202A)")}</div></div>
    <div class="cycle-impact" aria-hidden="true"><i></i><i></i><i></i></div>
  </div>
  <p class="budget-cycle-ending">… und erfasse den Wert deiner Sammlung.</p>
</div>`;
