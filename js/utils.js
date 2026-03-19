// ============================================================
//  utils.js — Fonctions utilitaires partagées
// ============================================================

import { TEAM_COLORS, FLAGS_NATIONALITY, FLAGS_COUNTRY } from "./config.js";

/** Couleur hex d'une écurie par son constructorId */
export function getTeamColor(id) {
  return TEAM_COLORS[id] ?? "#555555";
}

/** Classe CSS selon la position (podium) */
export function posClass(pos) {
  if (pos === "1") return "pos-1";
  if (pos === "2") return "pos-2";
  if (pos === "3") return "pos-3";
  return "";
}

/** Emoji drapeau par nationalité de pilote */
export function nationalityFlag(nat) {
  return FLAGS_NATIONALITY[nat] ?? "";
}

/** Emoji drapeau par pays de GP */
export function countryFlag(country) {
  return FLAGS_COUNTRY[country] ?? "🏎️";
}

/** Formate une date ISO en français court */
export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

/** Vérifie si une date est passée */
export function isPast(isoDate) {
  return new Date(isoDate) < new Date();
}

/**
 * Injecte du HTML dans un élément DOM.
 * @param {string} selector
 * @param {string} html
 */
export function render(selector, html) {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
}

/** Affiche un indicateur de chargement */
export function showLoading(selector, message = "CHARGEMENT...") {
  render(selector, `<div class="loading-box">${message}</div>`);
}

/**
 * Génère une barre de progression HTML.
 * @param {string} label
 * @param {number} value
 * @param {number} max
 * @param {string} color
 */
export function barRow(label, value, max, color) {
  const pct = max > 0 ? ((value / max) * 100).toFixed(1) : 0;
  return `
    <div class="bar-row">
      <div class="bar-label" title="${label}">${label}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%;background:${color}">${value}</div>
      </div>
    </div>`;
}
