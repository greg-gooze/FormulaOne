// ============================================================
//  tabs/track.js — Visualiseur de tracés de circuits F1
// ============================================================

import { getCircuitData } from "../tracks-data.js";
import { countryFlag, render, showLoading } from "../utils.js";

const SECTOR_COLORS = ["#00D4FF", "#FFD700", "#C855FF"];
const SECTOR_LABELS = ["S1", "S2", "S3"];

/**
 * Génère le SVG du tracé du circuit avec les secteurs colorés.
 * @param {object} circuit
 * @returns {string} HTML string
 */
function buildCircuitSVG(circuit) {
  // On crée 3 chemins superposés avec stroke-dasharray/offset
  // pour coloriser les 3 secteurs sur le même path.
  // La technique nécessite un élément <path> invisible pour getTotalLength(),
  // puis on anime via JS après insertion dans le DOM.

  return `
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"
         style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto">
      <!-- Fond de piste (ombre) -->
      <path d="${circuit.path}"
            fill="none"
            stroke="#333"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"/>

      <!-- Piste principale -->
      <path d="${circuit.path}"
            fill="none"
            stroke="#3a3a3a"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"/>

      <!-- Secteurs (colorés via JS) -->
      <path id="track-s1" d="${circuit.path}"
            fill="none"
            stroke="${SECTOR_COLORS[0]}"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.9"/>
      <path id="track-s2" d="${circuit.path}"
            fill="none"
            stroke="${SECTOR_COLORS[1]}"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.9"/>
      <path id="track-s3" d="${circuit.path}"
            fill="none"
            stroke="${SECTOR_COLORS[2]}"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.9"/>

      <!-- Point de départ / arrivée -->
      <path id="track-full" d="${circuit.path}"
            fill="none" stroke="transparent" stroke-width="1"/>
    </svg>`;
}

/**
 * Applique les dasharray sur les 3 segments de secteur.
 * Doit être appelé après insertion dans le DOM.
 */
function applySectorColors(circuit) {
  const fullPath = document.getElementById("track-full");
  if (!fullPath) return;

  const total = fullPath.getTotalLength();
  const s1End = total * circuit.s1;
  const s2End = total * circuit.s2;

  // Secteur 1 : du début à s1End
  const s1 = document.getElementById("track-s1");
  if (s1) {
    s1.style.strokeDasharray = `${s1End} ${total}`;
    s1.style.strokeDashoffset = 0;
  }

  // Secteur 2 : de s1End à s2End
  const s2 = document.getElementById("track-s2");
  if (s2) {
    const s2Len = s2End - s1End;
    s2.style.strokeDasharray = `${s2Len} ${total}`;
    s2.style.strokeDashoffset = -s1End;
  }

  // Secteur 3 : de s2End à la fin
  const s3 = document.getElementById("track-s3");
  if (s3) {
    const s3Len = total - s2End;
    s3.style.strokeDasharray = `${s3Len} ${total}`;
    s3.style.strokeDashoffset = -s2End;
  }
}

/**
 * Génère la carte info d'un circuit.
 * @param {Race} race
 * @param {object} circuit
 */
function buildInfoCard(race, circuit) {
  const flag = countryFlag(race.Circuit.Location.country);
  const raceDate = new Date(race.date).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return `
    <div style="margin-bottom:14px">
      <div style="font-family:'Chakra Petch',sans-serif;font-size:10px;color:#E8002D;letter-spacing:0.12em;margin-bottom:4px">
        ROUND ${race.round}
      </div>
      <div style="font-family:'Chakra Petch',sans-serif;font-size:20px;font-weight:700;line-height:1.2">
        ${flag} ${race.Circuit.Location.country}
      </div>
      <div style="font-size:13px;color:#666;margin-top:3px">${race.raceName}</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
      ${infoItem("CIRCUIT", circuit.label)}
      ${infoItem("LOCALISATION", `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`)}
      ${infoItem("TOURS", circuit.laps)}
      ${infoItem("LONGUEUR", circuit.length)}
      ${infoItem("DISTANCE TOTALE", computeDistance(circuit))}
      ${infoItem("DATE COURSE", raceDate)}
    </div>

    ${circuit.record ? `
    <div style="background:#0a0a0a;border:1px solid #1f1f1f;border-radius:6px;padding:10px 14px;margin-bottom:16px">
      <div style="font-family:'Chakra Petch',sans-serif;font-size:9px;color:#444;letter-spacing:0.12em;margin-bottom:4px">MEILLEUR TOUR EN COURSE</div>
      <div style="font-family:'Chakra Petch',sans-serif;font-size:17px;font-weight:700;color:#E8002D">${circuit.record.time}</div>
      <div style="font-size:12px;color:#555;margin-top:2px">${circuit.record.driver} — ${circuit.record.year}</div>
    </div>` : ""}

    <div style="display:flex;gap:16px;flex-wrap:wrap">
      ${SECTOR_COLORS.map((color, i) => `
        <div style="display:flex;align-items:center;gap:8px">
          <span style="display:inline-block;width:20px;height:4px;background:${color};border-radius:2px"></span>
          <span style="font-family:'Chakra Petch',sans-serif;font-size:11px;font-weight:700;color:${color}">${SECTOR_LABELS[i]}</span>
        </div>`).join("")}
    </div>`;
}

function infoItem(label, value) {
  return `
    <div>
      <div style="font-family:'Chakra Petch',sans-serif;font-size:9px;color:#444;letter-spacing:0.12em;margin-bottom:2px">${label}</div>
      <div style="font-size:13px;color:#aaa">${value}</div>
    </div>`;
}

function computeDistance(circuit) {
  const len = parseFloat(circuit.length);
  if (!isNaN(len)) return `${(len * circuit.laps).toFixed(2)} km`;
  return "—";
}

/**
 * Point d'entrée principal de l'onglet Tracés.
 * @param {Race[]} schedule
 * @param {string} selectedRound
 * @param {function} onRoundChange
 */
export function renderTrackShell(schedule, selectedRound, onRoundChange) {
  const options = schedule.map(r =>
    `<option value="${r.round}"${r.round === selectedRound ? " selected" : ""}>
       R${r.round} — ${r.raceName}
     </option>`
  ).join("");

  render(
    "#content",
    `<div class="select-row">
       <span class="select-label">CIRCUIT :</span>
       <select class="round-select" id="round-sel-track">${options}</select>
     </div>
     <div id="track-body"></div>`
  );

  document.getElementById("round-sel-track")
    .addEventListener("change", (e) => onRoundChange(e.target.value));
}

/**
 * Affiche le tracé et les infos d'un circuit donné.
 * @param {Race[]} schedule
 * @param {string} round
 */
export function renderTrack(schedule, round) {
  const body = document.getElementById("track-body");
  if (!body) return;

  const race = schedule.find(r => r.round === round);
  if (!race) {
    body.innerHTML = `<div class="loading-box">COURSE NON TROUVÉE</div>`;
    return;
  }

  const circuit = getCircuitData(race);

  if (!circuit) {
    body.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${countryFlag(race.Circuit.Location.country)} ${race.raceName}</span>
        </div>
        <div style="padding:24px">
          <div style="font-family:'Chakra Petch',sans-serif;font-size:12px;color:#444;margin-bottom:10px">
            ${race.Circuit.circuitName}
          </div>
          <div style="color:#333;font-size:12px">Tracé non disponible pour ce circuit.</div>
        </div>
      </div>`;
    return;
  }

  body.innerHTML = `
    <div class="card">
      <div class="card-header">
        <span class="card-title">${countryFlag(race.Circuit.Location.country)} ${race.Circuit.circuitName}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;min-height:300px">
        <!-- SVG tracé -->
        <div style="padding:24px;border-right:1px solid #1f1f1f;display:flex;align-items:center;justify-content:center;background:#0d0d0d">
          ${buildCircuitSVG(circuit)}
        </div>
        <!-- Infos -->
        <div style="padding:20px">
          ${buildInfoCard(race, circuit)}
        </div>
      </div>
    </div>`;

  // Appliquer les secteurs après rendu DOM
  requestAnimationFrame(() => applySectorColors(circuit));
}
