// ============================================================
//  tabs/constructors.js — Onglet Classement Constructeurs
// ============================================================

import { fetchConstructorStandings } from "../api.js";
import { getTeamColor, posClass, barRow, render, showLoading } from "../utils.js";

/**
 * Charge et affiche le classement constructeurs.
 * @param {string} season
 */
export async function renderConstructors(season) {
  showLoading("#content");

  const standings = await fetchConstructorStandings(season);

  if (!standings.length) {
    render("#content", `<div class="loading-box">AUCUNE DONNÉE</div>`);
    return;
  }

  const maxPts = parseFloat(standings[0].points) || 1;

  // Graphe
  const chartRows = standings.map((c) => {
    const pts   = parseFloat(c.points);
    const color = getTeamColor(c.Constructor.constructorId);
    const name  = c.Constructor.name;
    const shortName = name.split(" ").slice(-1)[0]; // Dernier mot du nom
    return barRow(shortName, pts, maxPts, color);
  }).join("");

  // Tableau
  const rows = standings.map((c) => {
    const color = getTeamColor(c.Constructor.constructorId);
    const pc    = posClass(c.position);

    return `
      <tr>
        <td><span class="pos ${pc}">${c.position}</span></td>
        <td>
          <div class="driver-cell">
            <span class="team-dot" style="background:${color}; width:12px; height:12px;"></span>
            <strong style="font-size:15px">${c.Constructor.name}</strong>
          </div>
        </td>
        <td class="nat">${c.Constructor.nationality}</td>
        <td><span class="pts">${c.points}</span></td>
        <td class="mono">${c.wins}</td>
      </tr>`;
  }).join("");

  render(
    "#content",
    `<div class="card">
       <div class="card-header"><span class="card-title">Points Constructeurs</span></div>
       <div class="chart-container"><div class="bar-chart-wrap">${chartRows}</div></div>
     </div>
     <div class="card">
       <div class="card-header"><span class="card-title">Classement Constructeurs</span></div>
       <table>
         <thead><tr>
           <th>Pos</th><th>Écurie</th><th>Nationalité</th><th>Points</th><th>Victoires</th>
         </tr></thead>
         <tbody>${rows}</tbody>
       </table>
     </div>`
  );
}
