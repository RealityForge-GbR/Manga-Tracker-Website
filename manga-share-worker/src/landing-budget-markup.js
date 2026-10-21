export const LANDING_BUDGET_MARKUP = `
<div class="budget-demo" data-budget-demo role="group" aria-label="Interaktiver Budget-Rechner" aria-describedby="budget-example-note" style="--budget-level:1">
  <div class="budget-settings">
    <div class="budget-setting">
      <label for="monthly-budget">Monatsbudget</label>
      <div class="budget-input"><input id="monthly-budget" data-budget-input aria-label="Monatsbudget in Euro" type="number" min="0" max="1000" step="0.01" inputmode="decimal" value="100" disabled><span aria-hidden="true">€</span></div>
      <input class="budget-range" data-budget-range type="range" min="0" max="1000" step="1" value="100" aria-label="Monatsbudget per Regler in Euro" disabled>
    </div>
    <div class="budget-setting budget-price-setting">
      <label for="manga-price">Preis pro Band</label>
      <div class="budget-input"><input id="manga-price" data-price-input aria-label="Preis pro Band in Euro" type="number" min="0.01" max="1000" step="0.01" inputmode="decimal" value="8.50" disabled><span aria-hidden="true">€</span></div>
    </div>
  </div>
  <div class="budget-stage">
    <div class="budget-purchase-node">
      <p class="budget-node-label">Ein Manga</p>
      <div class="budget-source-book" aria-hidden="true"><span></span></div>
    </div>
    <div class="budget-wallet-node">
      <div class="budget-cash" aria-hidden="true"><span>€</span><span>€</span><span>€</span></div>
      <div class="budget-account">
        <span class="budget-node-label">Restbudget</span>
        <strong class="budget-balance" data-budget-remaining>100,00 €</strong>
        <span class="budget-month">von <span data-budget-total>100,00 €</span> / Monat</span>
        <span class="budget-meter" aria-hidden="true"><span data-budget-meter></span></span>
      </div>
      <span class="budget-phase" data-budget-phase>Bereit</span>
    </div>
    <div class="budget-collection-node">
      <p class="budget-node-label">Deine Sammlung</p>
      <div class="budget-shelf" data-budget-shelf aria-hidden="true">${Array.from({length:12},(_,i)=>`<span class="budget-volume" data-budget-volume style="--volume-height:${68+(i%4)*7}px"></span>`).join("")}</div>
      <p class="budget-collection-total"><strong data-budget-count>0</strong> <span data-budget-count-label>Bände</span></p>
    </div>
    <div class="budget-money-flight" aria-hidden="true"><span class="budget-flying-coin">€</span><span class="budget-flying-coin">€</span><span class="budget-flying-coin">€</span></div>
    <div class="budget-book-flight" aria-hidden="true"><span class="budget-flying-book"></span></div>
  </div>
  <div class="budget-summary">
    <div><span>Ausgegeben</span><strong data-budget-spent>0,00 €</strong></div>
    <div><span>Bei diesem Bandpreis</span><strong data-budget-fit>11 Bände</strong></div>
  </div>
  <div class="budget-actions">
    <button class="button budget-buy" data-budget-buy type="button" disabled><span aria-hidden="true">+</span> 1 Band kaufen</button>
    <button class="budget-control" data-budget-toggle type="button" aria-label="Automatische Vorschau" aria-pressed="true" disabled hidden>Pause</button>
    <button class="budget-control" data-budget-reset type="button" disabled>Zurücksetzen</button>
  </div>
  <p id="budget-example-note" class="budget-example-note">Beispielrechnung · kein echter Kauf</p>
  <p class="budget-live" data-budget-live role="status" aria-live="polite" aria-atomic="true"></p>
</div>`;
