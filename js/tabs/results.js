// ============================================================
//  tabs/results.js — Onglet Résultats de course
// ============================================================

import { fetchRaceResults } from "../api.js";
import { getTeamColor, posClass, render, showLoading } from "../utils.js";

/**
 * Affiche le sélecteur de course et charge les résultats.
 * @param {Race[]} schedule
 * @param {string} season
 * @param {string} selectedRound
 * @param {function} onRoundChange  callback(round) appelé quand l'utilisateur change de course
 */
export function renderResultsShell(schedule, season, selectedRound, onRoundChange) {
  const options = schedule.map((r) =>
    `<option value="${r.round}"${r.round === selectedRound ? " selected" : ""}>
       R${r.round} — ${r.raceName}
     </option>`
  ).join("");

  render(
    "#content",
    `<div class="select-row">
       <span class="select-label">COURSE :</span>
       <select class="round-select" id="round-sel-results">${options}</select>
     </div>
     <div id="results-body"><div class="loading-box">CHARGEMENT...</div></div>`
  );

  document.getElementById("round-sel-results")
    .addEventListener("change", (e) => onRoundChange(e.target.value));
}

/**
 * Charge et injecte les résultats d'une course dans #results-body.
 * @param {string} season
 * @param {string} round
 */
export async function loadResults(season, round) {
  showLoading("#results-body");

  const { raceName, results } = await fetchRaceResults(season, round);

  if (!results.length) {
    render("#results-body", `<div class="loading-box">AUCUN RÉSULTAT DISPONIBLE</div>`);
    return;
  }

  const rows = results.map((r) => {
    const color    = getTeamColor(r.Constructor.constructorId);
    const pc       = posClass(r.position);
    const finished = r.status === "Finished";
    const time     = r.Time?.time ?? "";

    return `
      <tr>
        <td><span class="pos ${pc}">${r.position}</span></td>
        <td>
          <div class="driver-cell">
            <span class="team-dot" style="background:${color}"></span>
            <span>${r.Driver.givenName} <strong>${r.Driver.familyName}</strong></span>
          </div>
        </td>
        <td class="team-name">${r.Constructor.name}</td>
        <td class="mono">${r.grid}</td>
        <td><span class="pts">${r.points}</span></td>
        <td class="${finished ? "status-ok" : "status-err"}">${r.status}</td>
        <td class="mono">${time}</td>
      </tr>`;
  }).join("");

  render(
    "#results-body",
    `<div class="card">
       <div class="card-header"><span class="card-title">Résultats — ${raceName}</span></div>
       <table>
         <thead><tr>
           <th>Pos</th><th>Pilote</th><th>Écurie</th>
           <th>Grille</th><th>Points</th><th>Statut</th><th>Temps</th>
         </tr></thead>
         <tbody>${rows}</tbody>
       </table>
     </div>`
  );
}
