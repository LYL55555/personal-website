/** 与 Pokemon-guest-quiz/game.py 对齐的计分逻辑；图鉴范围可选世代或全图鉴（PokéAPI） */

export const TOTAL_ROUNDS = 5;
export const BASE_SCORE = 50;
export const CONSOLATION_SCORE = 10;
export const SPEED_THRESHOLDS = [
  [5, 50],
  [10, 30],
  [15, 10],
];

/** max 为 null 时用 getNationalDexMax() 解析（全图鉴、Gen 9 截止） */
export const GENERATION_OPTIONS = [
  { id: "all", label: "All Pokémon (national dex)", min: 1, max: null },
  { id: "1", label: "Gen 1 — Kanto", min: 1, max: 151 },
  { id: "2", label: "Gen 2 — Johto", min: 152, max: 251 },
  { id: "3", label: "Gen 3 — Hoenn", min: 252, max: 386 },
  { id: "4", label: "Gen 4 — Sinnoh", min: 387, max: 493 },
  { id: "5", label: "Gen 5 — Unova", min: 494, max: 649 },
  { id: "6", label: "Gen 6 — Kalos", min: 650, max: 721 },
  { id: "7", label: "Gen 7 — Alola", min: 722, max: 809 },
  { id: "8", label: "Gen 8 — Galar", min: 810, max: 905 },
  { id: "9", label: "Gen 9 — Paldea+", min: 906, max: null },
];

export async function fetchJson(url, signal) {
  const res = await fetch(url, signal ? { signal } : undefined);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

let cachedNationalMax = null;

export async function getNationalDexMax(signal) {
  if (cachedNationalMax != null) return cachedNationalMax;
  const data = await fetchJson(
    "https://pokeapi.co/api/v2/pokemon-species?limit=1",
    signal,
  );
  if (typeof data.count !== "number" || data.count < 1) {
    throw new Error("Could not read national dex size from PokéAPI.");
  }
  cachedNationalMax = data.count;
  return cachedNationalMax;
}

export async function resolveGenerationRange(generationId, signal) {
  const national = await getNationalDexMax(signal);
  const opt = GENERATION_OPTIONS.find((o) => o.id === generationId);
  if (!opt) {
    return {
      min: 1,
      max: national,
      label: GENERATION_OPTIONS[0].label,
    };
  }
  const max = opt.max == null ? national : Math.min(opt.max, national);
  return { min: opt.min, max, label: opt.label };
}

const TYPE_EMOJI = {
  normal: "⚪",
  fire: "🔥",
  water: "💧",
  electric: "⚡",
  grass: "🌿",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌍",
  flying: "🦅",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  fairy: "🧚",
};

export function titleCaseName(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * PokéAPI `language.name` 为小写（如 zh-hant、zh-hans），需忽略大小写匹配。
 * 优先繁体，否则简体，否则回退英文显示名。
 */
export function extractLocalizedNames(speciesData, englishSlug) {
  const fallback = titleCaseName(englishSlug);
  let ja = fallback;
  let zhHant = null;
  let zhHans = null;
  for (const entry of speciesData.names || []) {
    const lang = (entry.language?.name || "").toLowerCase();
    if (lang === "ja") ja = entry.name;
    else if (lang === "zh-hant") zhHant = entry.name;
    else if (lang === "zh-hans") zhHans = entry.name;
  }
  const zh = zhHant ?? zhHans ?? fallback;
  return { ja, zh };
}

export function parsePokemonPayload(data, speciesData) {
  const statsDict = {};
  for (const s of data.stats || []) {
    const n = s.stat?.name;
    if (["hp", "attack", "defense", "speed"].includes(n)) {
      statsDict[n] = s.base_stat;
    }
  }
  const { ja, zh } = extractLocalizedNames(speciesData, data.name);
  return {
    name: data.name,
    nameJa: ja,
    nameZh: zh,
    types: (data.types || []).map((t) => t.type.name),
    height: data.height,
    weight: data.weight,
    abilities: (data.abilities || [])
      .slice(0, 2)
      .map((a) => a.ability.name.replace(/-/g, " ")),
    stats: statsDict,
    spriteUrl: data.sprites?.front_default || null,
  };
}

export async function fetchPokemonById(id, signal) {
  const data = await fetchJson(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    signal,
  );
  const speciesData = await fetchJson(data.species.url, signal);
  return parsePokemonPayload(data, speciesData);
}

function randomNationalId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const FETCH_SLOT_ATTEMPTS = 96;

async function fetchRandomUniquePokemon(min, max, seenLowerNames, signal) {
  for (let a = 0; a < FETCH_SLOT_ATTEMPTS; a++) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    const id = randomNationalId(min, max);
    try {
      const p = await fetchPokemonById(id, signal);
      const key = p.name.toLowerCase();
      if (seenLowerNames.has(key)) continue;
      return p;
    } catch (e) {
      if (e?.name === "AbortError") throw e;
      continue;
    }
  }
  throw new Error(
    "Could not load a unique Pokémon in this range. Check your connection or try another generation.",
  );
}

/** 返回 { correct, choices, correctIndex }；min/max 为图鉴编号闭区间 */
export async function buildRoundChoices(min, max, signal) {
  if (min > max) throw new Error("Invalid dex range.");
  const correct = await fetchRandomUniquePokemon(
    min,
    max,
    new Set(),
    signal,
  );
  const seen = new Set([correct.name.toLowerCase()]);
  const wrong = [];

  while (wrong.length < 3) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    const need = 3 - wrong.length;
    const batch = await Promise.all(
      Array.from({ length: need }, () =>
        fetchRandomUniquePokemon(min, max, seen, signal),
      ),
    );
    for (const p of batch) {
      const k = p.name.toLowerCase();
      if (!seen.has(k)) {
        seen.add(k);
        wrong.push(p);
        if (wrong.length >= 3) break;
      }
    }
  }

  const choices = [correct, ...wrong];

  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  const correctIndex = choices.findIndex(
    (p) => p.name.toLowerCase() === correct.name.toLowerCase(),
  );
  return { correct, choices, correctIndex };
}

export function formatMultilingual(name, nameJa, nameZh) {
  return `${titleCaseName(name)} (🇯🇵 ${nameJa} / 🇨🇳 ${nameZh})`;
}

export function typesLine(types) {
  const parts = types.map(
    (t) => `${TYPE_EMOJI[t] || "❓"} ${titleCaseName(t)}`,
  );
  return `🏷️ Type(s): ${parts.join(", ")}`;
}

export function statBar(value, maxVal = 255, barLength = 15) {
  const filled = Math.min(
    barLength,
    Math.max(0, Math.floor((value / maxVal) * barLength)),
  );
  return `[${"█".repeat(filled)}${"░".repeat(barLength - filled)}]`;
}

export function getSpeedLevel(seconds) {
  if (seconds < 5) return "🚀 LIGHTNING FAST!";
  if (seconds < 10) return "⚡ Very Quick!";
  if (seconds < 15) return "👍 Good Speed";
  return "🐌 Take your time";
}

export function calculateTimeBonus(timeTaken) {
  for (const [threshold, bonus] of SPEED_THRESHOLDS) {
    if (timeTaken < threshold) return { bonus, speedLabel: getSpeedLevel(timeTaken) };
  }
  return { bonus: 0, speedLabel: getSpeedLevel(timeTaken) };
}

export function getPerformanceRating(score, totalRounds) {
  if (score >= totalRounds * 80) {
    return {
      title: "⭐⭐⭐ POKÉMON MASTER!",
      msg: "Incredible! You're a true Pokémon expert!",
    };
  }
  if (score >= totalRounds * 60) {
    return {
      title: "⭐⭐ Expert Trainer!",
      msg: "Great job! You know your Pokémon well!",
    };
  }
  if (score >= totalRounds * 40) {
    return {
      title: "⭐ Good Trainer!",
      msg: "Nice work! Keep learning and training!",
    };
  }
  return {
    title: "Beginner Trainer",
    msg: "Keep practicing! You'll get better!",
  };
}
