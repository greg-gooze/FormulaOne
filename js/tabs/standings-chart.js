// ============================================================
//  tabs/standings-chart.js — Évolution du classement par course
// ============================================================

import { fetchStandingsEvolution } from "../api.js";
import { getTeamColor, render, showLoading } from "../utils.js";

let chartInstance = null;

/**
 * Charge Chart.js depuis le CDN si pas encore disponible.
 */
function loadChartJS() {
  return new Promise((resolve, reject) => {
    if (window.Chart) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

/**
 * Détruit le chart précédent s'il existe.
 */
function destroyChart() {
  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
}

/**
 * Affiche le shell de l'onglet avec les contrôles.
 * @param {string} activeType 'driver' | 'constructor'
 * @param {function} onTypeChange
 */
function renderShell(activeType, onTypeChange) {
  render(
    "#content",
    `<div class="select-row" style="margin-bottom:20px">
       <span class="select-label">AFFICHER :</span>
       <button class="evo-btn${activeType === "driver" ? " active" : ""}" data-type="driver">🏆 Pilotes</button>
       <button class="evo-btn${activeType === "constructor" ? " active" : ""}" data-type="constructor">🏗️ Constructeurs</button>
     </div>
     <div id="evo-content">
       <div class="loading-box">CHARGEMENT DES DONNÉES...</div>
     </div>`
  );

  document.querySelectorAll(".evo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".evo-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      onTypeChange(btn.dataset.type);
    });
  });
}

/**
 * Construit les datasets Chart.js à partir des données d'évolution.
 * @param {Array} evolution
 * @param {'driver'|'constructor'} type
 * @param {number} topN
 */
function buildDatasets(evolution, type, topN = 10) {
  if (!evolution.length) return { labels: [], datasets: [] };

  const labels = evolution.map(r => `R${r.round}`);

  // Récupérer les entités du dernier round (classement final)
  const lastRound = evolution[evolution.length - 1].standings;
  const topEntities = lastRound.slice(0, topN).map(s =>
    type === "driver"
      ? { id: s.Driver.driverId, label: s.Driver.code ?? s.Driver.familyName.slice(0,3).toUpperCase(), color: getTeamColor(s.Constructors?.[0]?.constructorId) }
      : { id: s.Constructor.constructorId, label: s.Constructor.name.split(" ").slice(-1)[0], color: getTeamColor(s.Constructor.constructorId) }
  );

  const datasets = topEntities.map(entity => {
    const data = evolution.map(r => {
      const standing = r.standings.find(s =>
        type === "driver"
          ? s.Driver.driverId === entity.id
          : s.Constructor.constructorId === entity.id
      );
      return standing ? parseFloat(standing.points) : null;
    });

    return {
      label: entity.label,
      data,
      borderColor: entity.color,
      backgroundColor: entity.color + "22",
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: entity.color,
      tension: 0.3,
      spanGaps: true,
    };
  });

  return { labels, datasets };
}

/**
 * Rend le graphique d'évolution.
 * @param {string} season
 * @param {Race[]} schedule
 * @param {'driver'|'constructor'} type
 */
export async function loadEvolutionChart(season, schedule, type) {
  const evoContent = document.getElementById("evo-content");
  if (!evoContent) return;

  evoContent.innerHTML = `
    <div class="loading-box" style="height:100px">
      RÉCUPÉRATION DES DONNÉES (${schedule.filter(r => new Date(r.date) < new Date()).length} COURSES)...
    </div>`;

  try {
    await loadChartJS();
    destroyChart();

    const evolution = await fetchStandingsEvolution(season, schedule, type);

    if (!evolution.length) {
      evoContent.innerHTML = `<div class="loading-box">AUCUNE COURSE COMPLÉTÉE</div>`;
      return;
    }

    const { labels, datasets } = buildDatasets(evolution, type);

    evoContent.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span class="card-title">ÉVOLUTION DES POINTS — ${type === "driver" ? "PILOTES" : "CONSTRUCTEURS"} ${season}</span>
          <span style="font-family:'Chakra Petch',sans-serif;font-size:10px;color:#444">${labels.length} COURSES</span>
        </div>
        <div style="padding:20px;position:relative;height:420px">
          <canvas id="evo-chart"></canvas>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="card-header"><span class="card-title">LÉGENDE</span></div>
        <div id="evo-legend" style="padding:14px;display:flex;flex-wrap:wrap;gap:10px"></div>
      </div>`;

    const ctx = document.getElementById("evo-chart").getContext("2d");

    chartInstance = new window.Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1a1a",
            borderColor: "#333",
            borderWidth: 1,
            titleColor: "#888",
            bodyColor: "#fff",
            titleFont: { family: "Chakra Petch", size: 11 },
            bodyFont: { family: "Chakra Petch", size: 12 },
            padding: 10,
            callbacks: {
              title: (items) => items[0]?.label ?? "",
              label: (item) => ` ${item.dataset.label}: ${item.raw ?? "—"} pts`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "#1a1a1a" },
            ticks: { color: "#555", font: { family: "Chakra Petch", size: 10 } },
          },
          y: {
            grid: { color: "#1a1a1a" },
            ticks: { color: "#555", font: { family: "Chakra Petch", size: 10 } },
            title: { display: true, text: "POINTS", color: "#444", font: { family: "Chakra Petch", size: 10 } },
          },
        },
      },
    });

    // Légende custom
    const legend = document.getElementById("evo-legend");
    legend.innerHTML = datasets.map(ds => `
      <div style="display:flex;align-items:center;gap:6px;cursor:pointer" class="legend-item" data-label="${ds.label}">
        <span style="width:24px;height:3px;background:${ds.borderColor};display:inline-block;border-radius:2px"></span>
        <span style="font-family:'Chakra Petch',sans-serif;font-size:11px;color:#aaa">${ds.label}</span>
      </div>`).join("");

    // Toggle visibility on legend click
    legend.querySelectorAll(".legend-item").forEach((item, i) => {
      item.addEventListener("click", () => {
        const meta = chartInstance.getDatasetMeta(i);
        meta.hidden = !meta.hidden;
        item.style.opacity = meta.hidden ? "0.3" : "1";
        chartInstance.update();
      });
    });

  } catch (err) {
    console.error(err);
    if (evoContent) evoContent.innerHTML = `<div class="loading-box">ERREUR DE CHARGEMENT</div>`;
  }
}

/**
 * Point d'entrée principal de l'onglet.
 * @param {string} season
 * @param {Race[]} schedule
 */
export function renderStandingsChart(season, schedule) {
  let currentType = "driver";

  renderShell(currentType, async (type) => {
    currentType = type;
    await loadEvolutionChart(season, schedule, type);
  });

  loadEvolutionChart(season, schedule, currentType);
}
