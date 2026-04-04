/**
 * config.js — Shared Phaser configuration defaults for all NextCommunity games.
 * Loaded before any game module so every game can reference GAME_CONFIG.
 */

// CDN URL for the pinned Phaser version used site-wide
const PHASER_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.90.0/phaser.min.js";

// Rarity order and weights used by Dev Duel scoring
const RARITY_WEIGHTS = {
  common: 1,
  uncommon: 2,
  rare: 3,
  epic: 5,
  legendary: 8,
  mythic: 13,
  absolute: 21,
};

// CSS variable colour names per rarity (matches style.css)
const RARITY_COLORS = {
  common: "#94a3b8",
  uncommon: "#10b981",
  rare: "#3b82f6",
  epic: "#a855f7",
  legendary: "#fbbf24",
  mythic: "#ef4444",
  absolute: "#ffffff",
};

// Fallback generic tech skills used when no profile skills are available
const GENERIC_SKILLS = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "React",
  "Node.js",
  "CSS",
  "HTML",
  "SQL",
  "Docker",
  "Linux",
  "Git",
  "C++",
  "Java",
  "AWS",
  "Next.js",
  "GraphQL",
  "MongoDB",
  "Kubernetes",
];

/**
 * Reads the current site theme from the document root class.
 * Returns an object of useful colour strings for Phaser text/backgrounds.
 */
function getGameTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    bg: isDark ? "#05070a" : "#f0f4f8",
    bgCard: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    muted: isDark ? "#94a3b8" : "#4a5568",
    accent: isDark ? "#38bdf8" : "#3b82f6",
    isDark,
  };
}

/**
 * Deterministically assigns a rarity tier to a skill name string.
 * Uses a simple hash so the same skill always gets the same rarity.
 */
function skillRarity(skillName) {
  let hash = 0;
  for (let i = 0; i < skillName.length; i++) {
    hash = (hash * 31 + skillName.charCodeAt(i)) >>> 0;
  }
  const rarities = [
    "common",
    "common",
    "common",
    "uncommon",
    "uncommon",
    "rare",
    "epic",
    "legendary",
    "mythic",
    "absolute",
  ];
  return rarities[hash % rarities.length];
}

/**
 * Returns a base Phaser game config object.
 * Games pass their own scene and any extra overrides.
 *
 * @param {object} overrides  Fields that replace defaults (e.g. width, scene).
 */
function buildGameConfig(overrides) {
  return Object.assign(
    {
      type: Phaser.CANVAS,
      transparent: false,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Math.min(window.innerWidth, 900),
        height: Math.min(window.innerHeight, 600),
      },
    },
    overrides || {},
  );
}

// Export for testing (Node.js / Vitest)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PHASER_CDN_URL,
    RARITY_WEIGHTS,
    RARITY_COLORS,
    GENERIC_SKILLS,
    skillRarity,
    getGameTheme,
    buildGameConfig,
  };
}
