// ============================================================
//  tabs/drivers.js — Onglet Classement Pilotes
// ============================================================

import { fetchDriverStandings } from "../api.js";
import { getTeamColor, posClass, nationalityFlag, barRow, render, showLoading } from "../utils.js";

/**
 * Charge et affiche le classement pilotes.
 * @param {string} season
 */
export async function renderDrivers(season) {
  showLoading("#content");

  const standings = await fetchDriverStandings(season);

  if (!standings.length) {
    render("#content", `<div class="loading-box">AUCUNE DONNÉE</div>`);
    return;
  }

  const maxPts = parseFloat(standings[0].points) || 1;

  // Graphe top 10
  const chartRows = standings.slice(0, 10).map((d) => {
    const code  = d.Driver.code ?? d.Driver.familyName.slice(0, 3).toUpperCase();
    const pts   = parseFloat(d.points);
    const color = getTeamColor(d.Constructors[0]?.constructorId);
    return barRow(code, pts, maxPts, color);
  }).join("");

  // Tableau complet
  const rows = standings.map((d) => {
    const color = getTeamColor(d.Constructors[0]?.constructorId);
    const pc    = posClass(d.position);
    const nat   = d.Driver.nationality;

    return `
      <tr>
        <td><span class="pos ${pc}">${d.position}</span></td>
        <td>
          <div class="driver-cell">
            <span class="team-dot" style="background:${color}"></span>
            <div>
              <div class="driver-name">${d.Driver.givenName} <strong>${d.Driver.familyName}</strong></div>
              <div class="driver-num">#${d.Driver.permanentNumber ?? "—"}</div>
            </div>
          </div>
        </td>
        <td class="nat">${nationalityFlag(nat)} ${nat}</td>
        <td class="team-name">${d.Constructors[0]?.name ?? "—"}</td>
        <td><span class="pts">${d.points}</span></td>
        <td class="mono">${d.wins}</td>
      </tr>`;
  }).join("");

  render(
    "#content",
    `<div class="card">
       <div class="card-header"><span class="card-title">Points — Top 10</span></div>
       <div class="chart-container"><div class="bar-chart-wrap">${chartRows}</div></div>
     </div>
     <div class="card">
       <div class="card-header"><span class="card-title">Classement Pilotes</span></div>
       <table>
         <thead><tr>
           <th>Pos</th><th>Pilote</th><th>Nationalité</th>
           <th>Écurie</th><th>Points</th><th>Victoires</th>
         </tr></thead>
         <tbody>${rows}</tbody>
       </table>
     </div>`
  );
}
