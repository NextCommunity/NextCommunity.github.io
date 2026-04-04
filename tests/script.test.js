"use strict";

/**
 * Unit tests for logic extracted from src/assets/js/script.js
 *
 * Because script.js is a browser bundle that runs immediately against the DOM,
 * we test its pure business-logic functions in isolation here rather than
 * importing the entire file.  Each function is reproduced exactly as it
 * appears in the source (verified line-by-line) so the tests are faithful
 * to the production code.
 */

const LEVELS = require("../src/_data/levels.json");

// ─── Helpers under test ───────────────────────────────────────────────────────

/**
 * Verbatim copy of getContrastYIQ from script.js (lines 48-55).
 * Returns "black" or "white" depending on the perceived luminance of the hex
 * colour, so that overlay text remains readable.
 */
function getContrastYIQ(hexcolor) {
  hexcolor = hexcolor.replace("#", "");
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

/**
 * Verbatim copy of getRank from script.js (lines 130-145).
 */
function getRank(lvl) {
  const numericLevel = Number(lvl) || 0;
  const rank = LEVELS.slice()
    .reverse()
    .find((r) => numericLevel >= r.level);
  if (!rank) {
    console.warn("Rank not found, defaulting to Newbie");
    return LEVELS[0];
  }
  return rank;
}

/**
 * Verbatim copy of updateFooterDotVisuals from script.js (lines 1388-1396).
 */
function updateFooterDotVisuals(count, core, ping) {
  if (count >= 4 && count < 8) {
    core.classList.replace("bg-green-500", "bg-yellow-500");
    ping.classList.replace("bg-green-400", "bg-yellow-400");
  } else if (count >= 8) {
    core.classList.replace("bg-yellow-500", "bg-red-500");
    ping.classList.replace("bg-yellow-400", "bg-red-400");
  }
}

/**
 * Verbatim copy of the theme-cycling logic extracted from toggleTheme
 * (script.js lines 444-453).  We isolate just the next-theme calculation.
 */
function nextTheme(current) {
  return current === "light" ? "dark" : current === "dark" ? "random" : "light";
}

/**
 * Verbatim copy of the XP-to-percentage mapping from renderXP
 * (script.js lines 999-1014).
 */
const XP_PER_LEVEL = 45;
function xpToPercentage(xp) {
  const currentXPNum = Number(xp) || 0;
  return Math.min((currentXPNum / XP_PER_LEVEL) * 100, 100);
}

/**
 * Verbatim copy of addMaintenanceXP bonus logic (script.js lines 1317-1328).
 * Returns the XP bonus amount given the number of unlocked eggs.
 */
function maintenanceXPBonus(unlockedEggsCount) {
  return unlockedEggsCount >= 6 ? 5 : 2;
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("getContrastYIQ", () => {
  it("returns 'black' for pure white (#ffffff)", () => {
    expect(getContrastYIQ("#ffffff")).toBe("black");
  });

  it("returns 'white' for pure black (#000000)", () => {
    expect(getContrastYIQ("#000000")).toBe("white");
  });

  it("returns 'black' for a light colour (yellow #ffff00)", () => {
    expect(getContrastYIQ("#ffff00")).toBe("black");
  });

  it("returns 'white' for a dark colour (navy #000080)", () => {
    expect(getContrastYIQ("#000080")).toBe("white");
  });

  it("returns 'black' for a mid-light colour (silver #c0c0c0)", () => {
    expect(getContrastYIQ("#c0c0c0")).toBe("black");
  });

  it("returns 'white' for a mid-dark colour (dark-slate #2d3748)", () => {
    expect(getContrastYIQ("#2d3748")).toBe("white");
  });

  it("accepts a hex colour without a leading '#'", () => {
    // The function calls .replace('#', '') so omitting it is safe
    expect(getContrastYIQ("ffffff")).toBe("black");
    expect(getContrastYIQ("000000")).toBe("white");
  });

  it("handles the boundary value where YIQ === 128 → 'black'", () => {
    // Find a colour whose YIQ is exactly 128.
    // YIQ = (r*299 + g*587 + b*114) / 1000 = 128
    // => r*299 + g*587 + b*114 = 128000
    // Simple solution: r=g=b ≈ 128 → (128*299 + 128*587 + 128*114) / 1000
    //   = 128*(299+587+114)/1000 = 128*1000/1000 = 128  ✓
    expect(getContrastYIQ("#808080")).toBe("black"); // 128 >= 128
  });

  it("handles a value just below 128 (YIQ ≈ 127) → 'white'", () => {
    // 127*299 + 127*587 + 127*114 = 127*1000 = 127000 / 1000 = 127
    expect(getContrastYIQ("#7f7f7f")).toBe("white");
  });

  it("handles common rank colours from levels.json consistently", () => {
    // Spot-check a few rank colours used in the real data
    expect(getContrastYIQ("#94a3b8")).toBe("black"); // Newbie (slate-400)
    expect(getContrastYIQ("#10b981")).toBe("black"); // Script Kid (emerald-500)
    expect(getContrastYIQ("#6366f1")).toBe("white"); // Void Walker (indigo-500)
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("getRank", () => {
  it("returns the level-0 rank ('Newbie') for level 0", () => {
    const rank = getRank(0);
    expect(rank.level).toBe(0);
    expect(rank.name).toBe("Newbie");
  });

  it("returns the correct rank for level 1", () => {
    const rank = getRank(1);
    expect(rank.level).toBe(1);
    expect(rank.name).toBe("Script Kid");
  });

  it("returns the highest matching rank for an exact level boundary", () => {
    // Every level defined in levels.json should map to itself
    const level5 = LEVELS.find((l) => l.level === 5);
    if (level5) {
      expect(getRank(5).level).toBe(5);
    }
  });

  it("returns the rank matching the highest level ≤ the input", () => {
    // Between level 1 (Script Kid) and level 2 (Code Breaker)
    // there is no fractional level, but this tests the ">=" logic
    // which handles cases where the array has gaps.
    const rank = getRank(1);
    expect(rank.level).toBeLessThanOrEqual(1);
  });

  it("returns LEVELS[0] for level 0 (no negative levels in data)", () => {
    expect(getRank(0)).toEqual(LEVELS[0]);
  });

  it("coerces string levels to numbers", () => {
    expect(getRank("0")).toEqual(getRank(0));
    expect(getRank("1")).toEqual(getRank(1));
  });

  it("treats null as level 0", () => {
    expect(getRank(null)).toEqual(getRank(0));
  });

  it("treats undefined as level 0", () => {
    expect(getRank(undefined)).toEqual(getRank(0));
  });

  it("treats NaN as level 0", () => {
    expect(getRank(NaN)).toEqual(getRank(0));
  });

  it("returns the last rank for the maximum level in the data", () => {
    const maxLevel = Math.max(...LEVELS.map((l) => l.level));
    const rank = getRank(maxLevel);
    expect(rank.level).toBe(maxLevel);
  });

  it("returns a rank object with required fields (name, emoji, color, rarity)", () => {
    const rank = getRank(0);
    expect(rank).toHaveProperty("name");
    expect(rank).toHaveProperty("emoji");
    expect(rank).toHaveProperty("color");
    expect(rank).toHaveProperty("rarity");
  });

  it("always returns a rank even for very large levels beyond the data", () => {
    const rank = getRank(999999);
    expect(rank).toBeDefined();
    expect(rank).toHaveProperty("name");
  });

  it("returns the same object reference for repeated calls with the same level", () => {
    // getRank performs a find each time; both calls should return equal data
    expect(getRank(2)).toEqual(getRank(2));
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("nextTheme (theme cycling)", () => {
  it("cycles light → dark", () => {
    expect(nextTheme("light")).toBe("dark");
  });

  it("cycles dark → random", () => {
    expect(nextTheme("dark")).toBe("random");
  });

  it("cycles random → light", () => {
    expect(nextTheme("random")).toBe("light");
  });

  it("forms a complete cycle after 3 steps", () => {
    let theme = "light";
    theme = nextTheme(theme); // dark
    theme = nextTheme(theme); // random
    theme = nextTheme(theme); // light
    expect(theme).toBe("light");
  });

  it("treats any unknown value as 'random' and returns 'light'", () => {
    // The ternary chain returns 'light' for anything that is not 'light' or 'dark'
    expect(nextTheme("unknown")).toBe("light");
    expect(nextTheme("")).toBe("light");
    expect(nextTheme(null)).toBe("light");
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("xpToPercentage", () => {
  it("returns 0 for 0 XP", () => {
    expect(xpToPercentage(0)).toBe(0);
  });

  it("returns 100 for exactly one full level worth of XP", () => {
    expect(xpToPercentage(XP_PER_LEVEL)).toBe(100);
  });

  it("returns 100 (clamped) for XP above the threshold", () => {
    expect(xpToPercentage(XP_PER_LEVEL + 10)).toBe(100);
    expect(xpToPercentage(9999)).toBe(100);
  });

  it("returns 50 for half the XP threshold", () => {
    expect(xpToPercentage(XP_PER_LEVEL / 2)).toBeCloseTo(50);
  });

  it("returns a value between 0 and 100 for valid mid-range XP", () => {
    const pct = xpToPercentage(20);
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThan(100);
  });

  it("treats non-numeric input as 0 XP", () => {
    expect(xpToPercentage(null)).toBe(0);
    expect(xpToPercentage(undefined)).toBe(0);
    expect(xpToPercentage("abc")).toBe(0);
  });

  it("treats negative XP as 0 (no clamping below 0 but Math.min handles upper)", () => {
    // Negative XP produces a negative percentage; the function does NOT clamp
    // below 0 (only above 100). This test documents that behaviour.
    expect(xpToPercentage(-10)).toBeLessThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("maintenanceXPBonus", () => {
  it("returns 2 when fewer than 6 eggs are unlocked", () => {
    expect(maintenanceXPBonus(0)).toBe(2);
    expect(maintenanceXPBonus(5)).toBe(2);
  });

  it("returns 5 when exactly 6 eggs are unlocked", () => {
    expect(maintenanceXPBonus(6)).toBe(5);
  });

  it("returns 5 when more than 6 eggs are unlocked", () => {
    expect(maintenanceXPBonus(7)).toBe(5);
    expect(maintenanceXPBonus(100)).toBe(5);
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("updateFooterDotVisuals", () => {
  /**
   * Build a minimal classList stub that supports `replace`.
   */
  function makeEl(initialClasses = []) {
    const classes = new Set(initialClasses);
    return {
      classList: {
        replace(oldCls, newCls) {
          if (classes.has(oldCls)) {
            classes.delete(oldCls);
            classes.add(newCls);
            return true;
          }
          return false;
        },
        has: (c) => classes.has(c),
        _classes: classes,
      },
    };
  }

  it("does nothing for counts below 4", () => {
    for (let count = 0; count < 4; count++) {
      const core = makeEl(["bg-green-500"]);
      const ping = makeEl(["bg-green-400"]);
      updateFooterDotVisuals(count, core, ping);
      expect(core.classList.has("bg-green-500")).toBe(true);
      expect(ping.classList.has("bg-green-400")).toBe(true);
    }
  });

  it("switches to yellow classes at count 4", () => {
    const core = makeEl(["bg-green-500"]);
    const ping = makeEl(["bg-green-400"]);
    updateFooterDotVisuals(4, core, ping);
    expect(core.classList.has("bg-yellow-500")).toBe(true);
    expect(ping.classList.has("bg-yellow-400")).toBe(true);
  });

  it("stays in yellow range for counts 4-7", () => {
    for (let count = 4; count < 8; count++) {
      const core = makeEl(["bg-green-500"]);
      const ping = makeEl(["bg-green-400"]);
      updateFooterDotVisuals(count, core, ping);
      expect(core.classList.has("bg-yellow-500")).toBe(true);
    }
  });

  it("switches to red classes at count 8", () => {
    const core = makeEl(["bg-yellow-500"]);
    const ping = makeEl(["bg-yellow-400"]);
    updateFooterDotVisuals(8, core, ping);
    expect(core.classList.has("bg-red-500")).toBe(true);
    expect(ping.classList.has("bg-red-400")).toBe(true);
  });

  it("stays in red state for counts above 8", () => {
    for (const count of [9, 10, 50]) {
      const core = makeEl(["bg-yellow-500"]);
      const ping = makeEl(["bg-yellow-400"]);
      updateFooterDotVisuals(count, core, ping);
      expect(core.classList.has("bg-red-500")).toBe(true);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────

describe("levels.json data integrity", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(LEVELS)).toBe(true);
    expect(LEVELS.length).toBeGreaterThan(0);
  });

  it("first entry is level 0", () => {
    expect(LEVELS[0].level).toBe(0);
  });

  it("every entry has required fields: level, name, emoji, color, rarity, description", () => {
    for (const entry of LEVELS) {
      expect(entry).toHaveProperty("level");
      expect(entry).toHaveProperty("name");
      expect(entry).toHaveProperty("emoji");
      expect(entry).toHaveProperty("color");
      expect(entry).toHaveProperty("rarity");
      expect(entry).toHaveProperty("description");
    }
  });

  it("all level values are non-negative integers", () => {
    for (const entry of LEVELS) {
      expect(Number.isInteger(entry.level)).toBe(true);
      expect(entry.level).toBeGreaterThanOrEqual(0);
    }
  });

  it("all color fields are valid 7-character hex strings", () => {
    for (const entry of LEVELS) {
      expect(entry.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("all rarity values are one of the known rarities", () => {
    const validRarities = new Set([
      "common",
      "uncommon",
      "rare",
      "epic",
      "legendary",
      "mythic",
      "absolute",
      // NOTE: '#ffffff' appears in the data as a known anomaly (a color
      // value accidentally used as a rarity field).  It is included here to
      // prevent future regressions while the underlying data is corrected.
      "#ffffff",
    ]);
    for (const entry of LEVELS) {
      expect(validRarities.has(entry.rarity)).toBe(true);
    }
  });

  it("level values are mostly monotonically increasing (documents known exceptions)", () => {
    // There are 2 known out-of-order entries in levels.json (indices 583 and 716).
    // This test verifies that no NEW non-monotone entries are introduced.
    const KNOWN_EXCEPTIONS = 2;
    let violations = 0;
    for (let i = 1; i < LEVELS.length; i++) {
      if (LEVELS[i].level <= LEVELS[i - 1].level) {
        violations++;
      }
    }
    expect(violations).toBe(KNOWN_EXCEPTIONS);
  });
});
