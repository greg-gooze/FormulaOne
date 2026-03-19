// ============================================================
//  main.js — Point d'entrée, état global, routage des onglets
// ============================================================

import { SEASONS }                                from "./config.js";
import { fetchSchedule }                          from "./api.js";
import { showLoading }                            from "./utils.js";
import { renderCalendar }                         from "./tabs/calendar.js";
import { renderDrivers }                          from "./tabs/drivers.js";
import { renderConstructors }                     from "./tabs/constructors.js";
import { renderResultsShell, loadResults }        from "./tabs/results.js";
import { renderQualifyingShell, loadQualifying }  from "./tabs/qualifying.js";
import { renderStandingsChart }                   from "./tabs/standings-chart.js";
import { renderTrackShell, renderTrack }          from "./tabs/track.js";

// ---- État global ----
const state = {
  season:        "2025",
  tab:           "calendar",
  schedule:      [],
  selectedRound: "1",
};

// ---- Saisons ----
function initSeasonBar() {
  const bar = document.getElementById("season-bar");
  bar.innerHTML = SEASONS.map((s) =>
    `<button class="season-btn${s === state.season ? " active" : ""}" data-season="${s}">${s}</button>`
  ).join("");

  bar.addEventListener("click", async (e) => {
    const btn = e.target.closest(".season-btn");
    if (!btn) return;
    state.season   = btn.dataset.season;
    state.schedule = [];
    initSeasonBar();
    await ensureSchedule();
    renderCurrentTab();
  });
}

// ---- Onglets ----
function initTabs() {
  const nav = document.querySelector(".nav-inner");
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.tab = btn.dataset.tab;
    renderCurrentTab();
  });
}

// ---- Calendrier (cache) ----
async function ensureSchedule() {
  if (state.schedule.length) return;

  state.schedule = await fetchSchedule(state.season);

  if (state.schedule.length) {
    const now = new Date();
    let lastPast = state.schedule[0].round;
    for (const r of state.schedule) {
      if (new Date(r.date) < now) lastPast = r.round;
    }
    state.selectedRound = lastPast;
  }
}

// ---- Routeur ----
async function renderCurrentTab() {
  showLoading("#content");

  await ensureSchedule();

  switch (state.tab) {
    case "calendar":
      renderCalendar(state.schedule, state.season);
      break;

    case "drivers":
      await renderDrivers(state.season);
      break;

    case "constructors":
      await renderConstructors(state.season);
      break;

    case "results":
      renderResultsShell(
        state.schedule,
        state.season,
        state.selectedRound,
        async (round) => {
          state.selectedRound = round;
          await loadResults(state.season, round);
        }
      );
      await loadResults(state.season, state.selectedRound);
      break;

    case "qualifying":
      renderQualifyingShell(
        state.schedule,
        state.season,
        state.selectedRound,
        async (round) => {
          state.selectedRound = round;
          await loadQualifying(state.season, round);
        }
      );
      await loadQualifying(state.season, state.selectedRound);
      break;

    case "standings-chart":
      renderStandingsChart(state.season, state.schedule);
      break;

    case "track":
      renderTrackShell(
        state.schedule,
        state.selectedRound,
        (round) => {
          state.selectedRound = round;
          renderTrack(state.schedule, round);
        }
      );
      renderTrack(state.schedule, state.selectedRound);
      break;
  }
}

// ---- Boot ----
async function boot() {
  initSeasonBar();
  initTabs();
  await renderCurrentTab();
}

boot();
