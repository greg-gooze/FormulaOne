// ============================================================
//  tabs/calendar.js — Onglet Calendrier
// ============================================================

import { countryFlag, formatDate, isPast, render } from "../utils.js";

/**
 * Affiche le calendrier de la saison.
 * @param {Race[]} schedule
 * @param {string} season
 */
export function renderCalendar(schedule, season) {
  if (!schedule.length) {
    render("#content", `<div class="loading-box">AUCUNE DONNÉE</div>`);
    return;
  }

  let nextRoundFound = false;

  const cards = schedule.map((race) => {
    const past   = isPast(race.date);
    const isNext = !past && !nextRoundFound;
    if (isNext) nextRoundFound = true;

    const country  = race.Circuit.Location.country;
    const f        = countryFlag(country);
    const dateStr  = formatDate(race.date);
    const cardClass = `race-card${past ? " past" : ""}${isNext ? " next-race" : ""}`;

    const badge = past
      ? `<span class="badge badge-past">TERMINÉ</span>`
      : isNext
        ? `<span class="badge badge-next">PROCHAIN</span>`
        : `<span class="badge badge-future">À VENIR</span>`;

    return `
      <div class="${cardClass}">
        <div class="round-label">ROUND ${race.round}</div>
        <div class="race-card-top">
          <div>
            <div class="race-country">${f} ${country}</div>
            <div class="race-name">${race.raceName}</div>
          </div>
          ${badge}
        </div>
        <div class="race-footer">
          <div>
            <div class="race-date-label">COURSE</div>
            <div class="race-date" style="color:${past ? "#555" : "#fff"}">${dateStr}</div>
          </div>
          <div class="circuit-name">${race.Circuit.circuitName}</div>
        </div>
      </div>`;
  }).join("");

  render(
    "#content",
    `<div class="section-label">SAISON ${season} — ${schedule.length} GRANDS PRIX</div>
     <div class="calendar-grid">${cards}</div>`
  );
}
