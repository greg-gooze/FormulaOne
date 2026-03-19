// ============================================================
//  tracks-data.js — Tracés SVG des circuits F1
//  ViewBox : 0 0 300 200 — Sens horaire — Secteurs S1/S2/S3
// ============================================================

/**
 * Chaque circuit contient :
 *  - path       : SVG path string (tracé centerline)
 *  - s1, s2     : fraction (0‑1) de fin des secteurs 1 et 2
 *  - laps       : nombre de tours
 *  - length     : longueur du circuit
 *  - record     : { time, driver, year }
 *  - circuitKey : clé correspondant au circuitId de l'API Jolpica
 */
export const CIRCUIT_DATA = {

  // ── Bahrain ────────────────────────────────────────────────
  bahrain: {
    label: "Bahrain International Circuit",
    country: "Bahrain", laps: 57, length: "5.412 km",
    record: { time: "1:31.447", driver: "P. de la Rosa", year: 2005 },
    s1: 0.32, s2: 0.63,
    path: `M 60,40 L 200,40 Q 240,40 245,75 L 245,90 Q 245,110 225,115
           L 195,115 Q 178,115 175,130 L 175,155 Q 175,172 158,172
           L 120,172 Q 102,172 100,155 L 100,130 Q 100,115 82,115
           L 55,115 Q 38,115 38,95 L 38,75 Q 38,40 60,40 Z`,
  },

  // ── Jeddah ─────────────────────────────────────────────────
  jeddah: {
    label: "Jeddah Corniche Circuit",
    country: "Saudi Arabia", laps: 50, length: "6.174 km",
    record: { time: "1:30.734", driver: "L. Hamilton", year: 2021 },
    s1: 0.28, s2: 0.58,
    path: `M 80,25 L 230,25 Q 265,25 265,55 L 265,75 Q 265,88 250,90
           L 240,90 Q 228,90 228,102 L 228,118 Q 228,130 240,132
           L 252,132 Q 265,132 265,145 L 265,168 Q 265,182 248,182
           L 60,182 Q 42,182 42,165 L 42,145 Q 42,130 55,130
           L 68,130 Q 78,130 78,118 L 78,100 Q 78,88 68,88
           L 55,88 Q 40,88 40,72 L 40,50 Q 40,25 80,25 Z`,
  },

  // ── Albert Park (Melbourne) ────────────────────────────────
  albert_park: {
    label: "Albert Park Circuit",
    country: "Australia", laps: 58, length: "5.303 km",
    record: { time: "1:20.235", driver: "M. Schumacher", year: 2004 },
    s1: 0.30, s2: 0.62,
    path: `M 100,30 L 195,30 Q 262,30 262,88 L 262,130
           Q 262,160 240,168 L 200,175 Q 175,180 158,175
           L 130,168 Q 112,162 100,152 L 88,140 Q 72,120 72,100
           L 72,75 Q 72,30 100,30 Z`,
  },

  // ── Suzuka ─────────────────────────────────────────────────
  suzuka: {
    label: "Suzuka International Racing Course",
    country: "Japan", laps: 53, length: "5.807 km",
    record: { time: "1:30.983", driver: "K. Räikkönen", year: 2019 },
    s1: 0.38, s2: 0.68,
    // Figure en 8 — passage supérieur à Dunlop curve
    path: `M 150,22 L 245,22 Q 270,22 270,48 L 270,70
           Q 270,90 248,95 L 228,98 Q 210,100 205,112
           L 200,128 Q 198,140 210,148 L 228,155
           Q 248,162 248,182 L 248,190
           M 150,22 L 55,22 Q 30,22 30,48 L 30,75
           Q 30,98 55,105 L 90,112 Q 115,118 125,132
           L 130,148 Q 132,162 120,170 L 95,178
           Q 70,185 68,190
           M 68,190 Q 80,198 150,198 Q 220,198 248,190`,
  },

  // ── Shanghai ───────────────────────────────────────────────
  shanghai: {
    label: "Shanghai International Circuit",
    country: "China", laps: 56, length: "5.451 km",
    record: { time: "1:32.238", driver: "M. Schumacher", year: 2004 },
    s1: 0.33, s2: 0.60,
    path: `M 90,30 L 210,30 Q 260,30 262,72 L 262,92
           Q 262,112 242,118 L 212,122 Q 195,125 188,138
           L 182,152 Q 180,168 195,172 L 235,175
           Q 262,176 262,192 L 50,192 Q 28,192 28,175
           L 28,155 Q 28,138 45,132 L 72,125
           Q 90,118 90,100 L 90,30 Z`,
  },

  // ── Miami ──────────────────────────────────────────────────
  miami: {
    label: "Miami International Autodrome",
    country: "USA", laps: 57, length: "5.412 km",
    record: { time: "1:29.708", driver: "M. Verstappen", year: 2023 },
    s1: 0.30, s2: 0.62,
    path: `M 75,35 L 222,35 Q 255,35 258,65 L 258,92
           Q 258,108 242,112 L 220,115 Q 205,116 200,128
           L 196,148 Q 194,162 205,165 L 235,168
           Q 260,170 260,185 L 60,185 Q 35,185 35,168
           L 35,148 Q 35,132 50,128 L 68,124
           Q 82,120 82,105 L 82,75 Q 82,52 75,35 Z`,
  },

  // ── Monaco ─────────────────────────────────────────────────
  monaco: {
    label: "Circuit de Monaco",
    country: "Monaco", laps: 78, length: "3.337 km",
    record: { time: "1:12.909", driver: "L. Hamilton", year: 2021 },
    s1: 0.32, s2: 0.65,
    path: `M 90,28 L 195,28 Q 220,28 235,45 L 248,62
           Q 258,78 252,95 L 238,108 Q 222,118 200,122
           L 175,125 Q 158,126 150,138 L 145,158
           Q 142,172 128,178 L 108,182 Q 88,182 80,168
           L 72,150 Q 68,132 75,118 L 85,100
           Q 96,84 90,68 L 84,48 Q 78,32 90,28 Z`,
  },

  // ── Gilles Villeneuve (Canada) ─────────────────────────────
  villeneuve: {
    label: "Circuit Gilles Villeneuve",
    country: "Canada", laps: 70, length: "4.361 km",
    record: { time: "1:13.078", driver: "R. Barrichello", year: 2004 },
    s1: 0.35, s2: 0.65,
    path: `M 90,30 L 210,30 Q 240,30 240,55 L 240,80
           Q 240,98 222,100 L 195,102 Q 178,102 175,115
           L 175,148 Q 175,165 160,168 L 130,170
           Q 115,170 112,158 L 110,140 Q 108,125 95,122
           L 68,118 Q 50,115 50,98 L 50,58
           Q 50,30 90,30 Z`,
  },

  // ── Catalunya (Spain) ──────────────────────────────────────
  catalunya: {
    label: "Circuit de Barcelona-Catalunya",
    country: "Spain", laps: 66, length: "4.657 km",
    record: { time: "1:18.149", driver: "M. Verstappen", year: 2021 },
    s1: 0.35, s2: 0.65,
    path: `M 70,38 L 205,38 Q 248,38 250,72 L 250,100
           Q 250,118 232,124 L 210,128 Q 192,130 185,145
           L 182,162 Q 180,178 162,180 L 108,180
           Q 88,180 82,162 L 78,145 Q 74,128 60,122
           L 45,115 Q 32,105 32,88 L 32,70
           Q 32,38 70,38 Z`,
  },

  // ── Red Bull Ring (Austria) ────────────────────────────────
  red_bull_ring: {
    label: "Red Bull Ring",
    country: "Austria", laps: 71, length: "4.318 km",
    record: { time: "1:05.619", driver: "C. Leclerc", year: 2020 },
    s1: 0.40, s2: 0.70,
    path: `M 120,30 L 200,30 Q 240,30 242,65 L 242,100
           Q 242,120 222,128 L 195,135 Q 178,140 175,160
           L 173,178 Q 120,178 118,160 L 115,140
           Q 112,120 90,112 L 65,102 Q 48,92 48,72
           L 48,55 Q 50,30 120,30 Z`,
  },

  // ── Silverstone ────────────────────────────────────────────
  silverstone: {
    label: "Silverstone Circuit",
    country: "UK", laps: 52, length: "5.891 km",
    record: { time: "1:27.097", driver: "M. Verstappen", year: 2020 },
    s1: 0.35, s2: 0.65,
    path: `M 80,35 L 185,32 Q 228,30 248,58 L 262,80
           Q 270,100 255,120 L 232,135 Q 215,145 198,155
           L 178,165 Q 158,175 135,175 L 108,172
           Q 78,168 58,148 L 42,125 Q 30,102 38,78
           L 50,55 Q 62,35 80,35 Z`,
  },

  // ── Hungaroring ────────────────────────────────────────────
  hungaroring: {
    label: "Hungaroring",
    country: "Hungary", laps: 70, length: "4.381 km",
    record: { time: "1:16.627", driver: "L. Hamilton", year: 2020 },
    s1: 0.35, s2: 0.65,
    path: `M 92,35 L 178,35 Q 215,35 228,62 L 235,90
           Q 238,110 220,122 L 198,130 Q 180,135 172,150
           L 168,168 Q 165,182 150,183 L 125,183
           Q 108,183 105,168 L 100,150 Q 92,135 75,130
           L 55,122 Q 38,112 38,90 L 38,65
           Q 38,35 92,35 Z`,
  },

  // ── Spa-Francorchamps ──────────────────────────────────────
  spa: {
    label: "Circuit de Spa-Francorchamps",
    country: "Belgium", laps: 44, length: "7.004 km",
    record: { time: "1:46.286", driver: "V. Bottas", year: 2018 },
    s1: 0.28, s2: 0.58,
    path: `M 70,35 L 195,30 Q 245,28 252,58 L 255,78
           Q 256,98 238,110 L 215,120 Q 195,128 185,145
           L 178,165 Q 175,180 158,182 L 128,182
           Q 100,182 82,168 L 60,148 Q 35,122 38,92
           L 42,65 Q 48,35 70,35 Z`,
  },

  // ── Zandvoort ──────────────────────────────────────────────
  zandvoort: {
    label: "Circuit Zandvoort",
    country: "Netherlands", laps: 72, length: "4.259 km",
    record: { time: "1:11.097", driver: "L. Hamilton", year: 2021 },
    s1: 0.35, s2: 0.68,
    path: `M 105,35 L 188,35 Q 228,35 238,68 L 240,95
           Q 240,118 220,128 L 195,135 Q 178,140 175,158
           L 173,178 L 110,178 Q 95,168 92,152
           L 90,132 Q 88,115 68,105 L 48,92
           Q 35,78 40,58 Q 48,35 105,35 Z`,
  },

  // ── Monza ──────────────────────────────────────────────────
  monza: {
    label: "Autodromo Nazionale Monza",
    country: "Italy", laps: 53, length: "5.793 km",
    record: { time: "1:21.046", driver: "R. Barrichello", year: 2004 },
    s1: 0.28, s2: 0.60,
    path: `M 80,30 L 220,30 Q 255,30 258,60 L 258,80
           Q 258,95 242,100 L 215,105 Q 198,107 192,120
           L 188,140 Q 186,158 200,162 L 228,165
           Q 255,167 255,182 L 50,182 Q 30,182 30,165
           L 30,148 Q 30,132 48,128 L 72,122
           Q 88,116 88,100 L 88,60 Q 88,32 80,30 Z`,
  },

  // ── Baku ───────────────────────────────────────────────────
  baku: {
    label: "Baku City Circuit",
    country: "Azerbaijan", laps: 51, length: "6.003 km",
    record: { time: "1:43.009", driver: "C. Leclerc", year: 2019 },
    s1: 0.30, s2: 0.58,
    path: `M 75,28 L 228,28 Q 260,28 262,55 L 262,78
           Q 262,95 245,100 L 222,105 Q 205,108 200,122
           L 198,145 Q 197,160 210,163 L 240,165
           Q 262,166 262,180 L 55,180 Q 32,180 32,163
           L 32,145 Q 32,128 48,124 L 68,120
           Q 82,116 82,100 L 82,55 Q 80,28 75,28 Z`,
  },

  // ── Marina Bay (Singapore) ─────────────────────────────────
  marina_bay: {
    label: "Marina Bay Street Circuit",
    country: "Singapore", laps: 62, length: "4.940 km",
    record: { time: "1:35.867", driver: "K. Räikkönen", year: 2018 },
    s1: 0.33, s2: 0.65,
    path: `M 88,32 L 205,32 Q 242,32 245,60 L 245,88
           Q 245,108 225,115 L 200,120 Q 182,124 178,140
           L 175,158 Q 174,172 158,175 L 118,175
           Q 98,175 92,160 L 85,140 Q 78,122 62,118
           L 45,112 Q 32,102 32,85 L 32,60
           Q 32,32 88,32 Z`,
  },

  // ── COTA (USA) ─────────────────────────────────────────────
  americas: {
    label: "Circuit of the Americas",
    country: "USA", laps: 56, length: "5.513 km",
    record: { time: "1:36.169", driver: "C. Leclerc", year: 2019 },
    s1: 0.35, s2: 0.65,
    path: `M 95,30 L 205,30 Q 250,30 255,62 L 258,92
           Q 258,115 238,125 L 212,133 Q 194,138 188,155
           L 185,172 Q 183,185 165,185 L 115,185
           Q 95,185 88,170 L 80,152 Q 72,135 58,128
           L 40,118 Q 28,105 28,85 L 28,62
           Q 28,30 95,30 Z`,
  },

  // ── Hermanos Rodriguez (Mexico) ───────────────────────────
  rodriguez: {
    label: "Autodromo Hermanos Rodriguez",
    country: "Mexico", laps: 71, length: "4.304 km",
    record: { time: "1:17.774", driver: "V. Bottas", year: 2021 },
    s1: 0.35, s2: 0.68,
    path: `M 82,32 L 208,32 Q 248,32 250,65 L 250,95
           Q 250,115 232,122 L 205,128 Q 188,132 182,148
           L 180,168 Q 178,182 160,183 L 118,183
           Q 100,183 98,168 L 96,148 Q 92,132 75,126
           L 55,118 Q 38,108 38,88 L 38,65
           Q 38,32 82,32 Z`,
  },

  // ── Interlagos (Brazil) ────────────────────────────────────
  interlagos: {
    label: "Autodromo José Carlos Pace",
    country: "Brazil", laps: 71, length: "4.309 km",
    record: { time: "1:10.540", driver: "V. Bottas", year: 2018 },
    s1: 0.38, s2: 0.68,
    path: `M 90,35 L 195,35 Q 238,35 245,65 L 248,92
           Q 248,112 228,122 L 205,130 Q 188,136 182,152
           L 178,172 Q 175,185 155,185 L 108,185
           Q 85,185 78,168 L 72,148 Q 65,128 48,118
           L 30,105 Q 22,90 28,70 L 38,50
           Q 50,35 90,35 Z`,
  },

  // ── Las Vegas ─────────────────────────────────────────────
  las_vegas: {
    label: "Las Vegas Strip Circuit",
    country: "USA", laps: 50, length: "6.201 km",
    record: { time: "1:35.490", driver: "O. Piastri", year: 2024 },
    s1: 0.28, s2: 0.58,
    path: `M 68,32 L 232,32 Q 262,32 265,58 L 265,88
           Q 265,108 248,112 L 225,115 Q 210,116 205,128
           L 202,150 Q 200,165 215,168 L 242,170
           Q 262,170 262,185 L 55,185 Q 32,185 32,168
           L 32,150 Q 32,132 48,128 L 68,122
           Q 82,116 82,100 L 82,58 Q 80,32 68,32 Z`,
  },

  // ── Lusail (Qatar) ─────────────────────────────────────────
  losail: {
    label: "Losail International Circuit",
    country: "Qatar", laps: 57, length: "5.380 km",
    record: { time: "1:24.319", driver: "M. Verstappen", year: 2021 },
    s1: 0.35, s2: 0.65,
    path: `M 85,32 L 210,32 Q 252,32 255,65 L 255,98
           Q 255,120 235,128 L 208,135 Q 190,140 185,158
           L 182,175 Q 180,185 160,185 L 115,185
           Q 95,185 90,172 L 85,155 Q 80,138 62,128
           L 42,118 Q 28,105 28,85 L 28,62
           Q 28,32 85,32 Z`,
  },

  // ── Yas Marina (Abu Dhabi) ─────────────────────────────────
  yas_marina: {
    label: "Yas Marina Circuit",
    country: "Abu Dhabi", laps: 58, length: "5.281 km",
    record: { time: "1:26.103", driver: "M. Verstappen", year: 2021 },
    s1: 0.35, s2: 0.65,
    path: `M 78,35 L 208,35 Q 250,35 252,68 L 252,98
           Q 252,118 232,126 L 205,132 Q 188,136 182,152
           L 180,170 Q 178,183 158,183 L 112,183
           Q 92,183 85,168 L 78,148 Q 72,130 55,122
           L 38,112 Q 25,98 28,75 L 38,52
           Q 50,35 78,35 Z`,
  },

  // ── Imola ─────────────────────────────────────────────────
  imola: {
    label: "Autodromo Enzo e Dino Ferrari",
    country: "Italy", laps: 63, length: "4.909 km",
    record: { time: "1:15.484", driver: "M. Verstappen", year: 2022 },
    s1: 0.35, s2: 0.65,
    path: `M 92,35 L 188,35 Q 232,35 238,65 L 240,92
           Q 240,115 218,125 L 195,133 Q 178,138 172,155
           L 170,172 Q 168,183 150,183 L 118,183
           Q 98,183 92,168 L 85,148 Q 78,130 60,120
           L 42,108 Q 30,92 35,68 L 48,48
           Q 62,35 92,35 Z`,
  },
};

/**
 * Trouve le circuit correspondant à un objet Race de l'API.
 * @param {Race} race
 * @returns {object|null}
 */
export function getCircuitData(race) {
  const cId = race.Circuit.circuitId;
  // Correspondance directe
  if (CIRCUIT_DATA[cId]) return { ...CIRCUIT_DATA[cId], circuitId: cId };

  // Correspondances alternatives (l'API peut retourner des noms variés)
  const aliases = {
    "bahrain":            "bahrain",
    "jeddah":             "jeddah",
    "albert_park":        "albert_park",
    "suzuka":             "suzuka",
    "shanghai":           "shanghai",
    "miami":              "miami",
    "monaco":             "monaco",
    "villeneuve":         "villeneuve",
    "catalunya":          "catalunya",
    "red_bull_ring":      "red_bull_ring",
    "silverstone":        "silverstone",
    "hungaroring":        "hungaroring",
    "spa":                "spa",
    "zandvoort":          "zandvoort",
    "monza":              "monza",
    "baku":               "baku",
    "marina_bay":         "marina_bay",
    "americas":           "americas",
    "rodriguez":          "rodriguez",
    "interlagos":         "interlagos",
    "las_vegas":          "las_vegas",
    "losail":             "losail",
    "yas_marina":         "yas_marina",
    "imola":              "imola",
  };

  const key = aliases[cId];
  if (key && CIRCUIT_DATA[key]) return { ...CIRCUIT_DATA[key], circuitId: key };

  return null;
}
