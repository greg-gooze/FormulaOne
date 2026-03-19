// ============================================================
//  tabs/qualifying.js — Onglet Qualifications
// ============================================================

import { fetchQualifyingResults } from "../api.js";
import { getTeamColor, posClass, render, showLoading } from "../utils.js";

/**
 * Affiche le sélecteur de course et charge les qualifications.
 * @param {Race[]} schedule
 * @param {string} season
 * @param {string} selectedRound
 * @param {function} onRoundChange  callback(round)
 */
export function renderQualifyingShell(schedule, season, selectedRound, onRoundChange) {
  const options = schedule.map((r) =>
    `<option value="${r.round}"${r.round === selectedRound ? " selected" : ""}>
       R${r.round} — ${r.raceName}
     </option>`
  ).join("");

  render(
    "#content",
    `<div class="select-row">
       <span class="select-label">COURSE :</span>
       <select class="round-select" id="round-sel-qualifying">${options}</select>
     </div>
     <div id="qualifying-body"><div class="loading-box">CHARGEMENT...</div></div>`
  );

  document.getElementById("round-sel-qualifying")
    .addEventListener("change", (e) => onRoundChange(e.target.value));
}

/**
 * Charge et injecte les résultats des qualifications dans #qualifying-body.
 * @param {string} season
 * @param {string} round
 */
export async function loadQualifying(season, round) {
  showLoading("#qualifying-body");

  const { raceName, results } = await fetchQualifyingResults(season, round);

  if (!results.length) {
    render("#qualifying-body", `<div class="loading-box">AUCUNE DONNÉE DE QUALIFICATION</div>`);
    return;
  }

  const rows = results.map((q) => {
    const color = getTeamColor(q.Constructor.constructorId);
    const pc    = posClass(q.position);

    return `
      <tr>
        <td><span class="pos ${pc}">${q.position}</span></td>
        <td>
          <div class="driver-cell">
            <span class="team-dot" style="background:${color}"></span>
            <span>${q.Driver.givenName} <strong>${q.Driver.familyName}</strong></span>
          </div>
        </td>
        <td class="team-name">${q.Constructor.name}</td>
        <td class="q1q2-time">${q.Q1 ?? "—"}</td>
        <td class="q1q2-time">${q.Q2 ?? "—"}</td>
        <td class="q3-time">${q.Q3 ?? "—"}</td>
      </tr>`;
  }).join("");

  render(
    "#qualifying-body",
    `<div class="card">
       <div class="card-header"><span class="card-title">Qualifications — ${raceName}</span></div>
       <table>
         <thead><tr>
           <th>Pos</th><th>Pilote</th><th>Écurie</th>
           <th style="color:#ffcc00">Q1</th>
           <th style="color:#aaaaaa">Q2</th>
           <th style="color:#E8002D">Q3</th>
         </tr></thead>
         <tbody>${rows}</tbody>
       </table>
     </div>`
  );
}
