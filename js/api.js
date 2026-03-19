// ============================================================
//  api.js — Appels à l'API Jolpica (Ergast F1)
// ============================================================

import { API_BASE } from "./config.js";

/**
 * Fetch générique avec gestion d'erreur.
 * @param {string} url
 * @returns {Promise<object|null>}
 */
async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("[API] Erreur:", url, err);
    return null;
  }
}

/**
 * Récupère le calendrier d'une saison.
 * @param {string} season
 * @returns {Promise<Race[]>}
 */
export async function fetchSchedule(season) {
  const data = await fetchJSON(`${API_BASE}/${season}.json?limit=30`);
  return data?.MRData?.RaceTable?.Races ?? [];
}

/**
 * Classement pilotes d'une saison.
 * @param {string} season
 * @returns {Promise<DriverStanding[]>}
 */
export async function fetchDriverStandings(season) {
  const data = await fetchJSON(`${API_BASE}/${season}/driverStandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

/**
 * Classement constructeurs d'une saison.
 * @param {string} season
 * @returns {Promise<ConstructorStanding[]>}
 */
export async function fetchConstructorStandings(season) {
  const data = await fetchJSON(`${API_BASE}/${season}/constructorStandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

/**
 * Résultats d'une course.
 * @param {string} season
 * @param {string} round
 * @returns {Promise<{raceName: string, results: Result[]}>}
 */
export async function fetchRaceResults(season, round) {
  const data = await fetchJSON(`${API_BASE}/${season}/${round}/results.json`);
  const race = data?.MRData?.RaceTable?.Races?.[0];
  return {
    raceName: race?.raceName ?? "",
    results: race?.Results ?? [],
  };
}

/**
 * Résultats des qualifications d'une course.
 * @param {string} season
 * @param {string} round
 * @returns {Promise<{raceName: string, results: QualifyingResult[]}>}
 */
export async function fetchQualifyingResults(season, round) {
  const data = await fetchJSON(`${API_BASE}/${season}/${round}/qualifying.json`);
  const race = data?.MRData?.RaceTable?.Races?.[0];
  return {
    raceName: race?.raceName ?? "",
    results: race?.QualifyingResults ?? [],
  };
}

/**
 * Classement pilotes après un round précis.
 * @param {string} season
 * @param {string} round
 * @returns {Promise<DriverStanding[]>}
 */
export async function fetchDriverStandingsAfterRound(season, round) {
  const data = await fetchJSON(`${API_BASE}/${season}/${round}/driverStandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

/**
 * Classement constructeurs après un round précis.
 * @param {string} season
 * @param {string} round
 * @returns {Promise<ConstructorStanding[]>}
 */
export async function fetchConstructorStandingsAfterRound(season, round) {
  const data = await fetchJSON(`${API_BASE}/${season}/${round}/constructorStandings.json`);
  return data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

/**
 * Récupère l'évolution complète du classement pilotes ou constructeurs
 * pour tous les rounds complétés d'une saison (requêtes parallèles).
 * @param {string} season
 * @param {Race[]} schedule
 * @param {'driver'|'constructor'} type
 * @returns {Promise<Array<{round, raceName, standings}>>}
 */
export async function fetchStandingsEvolution(season, schedule, type = "driver") {
  const now = new Date();
  const completedRounds = schedule.filter(r => new Date(r.date) < now);
  if (!completedRounds.length) return [];

  const fetcher = type === "driver"
    ? fetchDriverStandingsAfterRound
    : fetchConstructorStandingsAfterRound;

  const results = await Promise.all(
    completedRounds.map(async (race) => {
      const standings = await fetcher(season, race.round);
      return { round: race.round, raceName: race.raceName, standings };
    })
  );

  return results.filter(r => r.standings.length > 0);
}
