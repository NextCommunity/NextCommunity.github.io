import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  PHASER_CDN_URL,
  RARITY_WEIGHTS,
  RARITY_COLORS,
  GENERIC_SKILLS,
  skillRarity,
} = require("../src/assets/js/games/config");

describe("config.js", () => {
  describe("PHASER_CDN_URL", () => {
    it("should be a valid CDN URL for Phaser 3.90.0", () => {
      expect(PHASER_CDN_URL).toBe(
        "https://cdnjs.cloudflare.com/ajax/libs/phaser/3.90.0/phaser.min.js",
      );
    });
  });

  describe("RARITY_WEIGHTS", () => {
    it("should contain all seven rarity tiers", () => {
      const tiers = [
        "common",
        "uncommon",
        "rare",
        "epic",
        "legendary",
        "mythic",
        "absolute",
      ];
      for (const tier of tiers) {
        expect(RARITY_WEIGHTS).toHaveProperty(tier);
      }
    });

    it("should have ascending weights", () => {
      const ordered = [
        RARITY_WEIGHTS.common,
        RARITY_WEIGHTS.uncommon,
        RARITY_WEIGHTS.rare,
        RARITY_WEIGHTS.epic,
        RARITY_WEIGHTS.legendary,
        RARITY_WEIGHTS.mythic,
        RARITY_WEIGHTS.absolute,
      ];
      for (let i = 1; i < ordered.length; i++) {
        expect(ordered[i]).toBeGreaterThan(ordered[i - 1]);
      }
    });

    it("should have correct specific values", () => {
      expect(RARITY_WEIGHTS.common).toBe(1);
      expect(RARITY_WEIGHTS.uncommon).toBe(2);
      expect(RARITY_WEIGHTS.rare).toBe(3);
      expect(RARITY_WEIGHTS.epic).toBe(5);
      expect(RARITY_WEIGHTS.legendary).toBe(8);
      expect(RARITY_WEIGHTS.mythic).toBe(13);
      expect(RARITY_WEIGHTS.absolute).toBe(21);
    });
  });

  describe("RARITY_COLORS", () => {
    it("should have a hex color for every rarity tier", () => {
      const tiers = Object.keys(RARITY_WEIGHTS);
      for (const tier of tiers) {
        expect(RARITY_COLORS[tier]).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  describe("GENERIC_SKILLS", () => {
    it("should contain 20 skills", () => {
      expect(GENERIC_SKILLS).toHaveLength(20);
    });

    it("should contain known tech skills", () => {
      expect(GENERIC_SKILLS).toContain("JavaScript");
      expect(GENERIC_SKILLS).toContain("Python");
      expect(GENERIC_SKILLS).toContain("Docker");
    });

    it("should contain only unique entries", () => {
      const unique = new Set(GENERIC_SKILLS);
      expect(unique.size).toBe(GENERIC_SKILLS.length);
    });
  });

  describe("skillRarity()", () => {
    it("should return a valid rarity tier", () => {
      const validTiers = [
        "common",
        "uncommon",
        "rare",
        "epic",
        "legendary",
        "mythic",
        "absolute",
      ];
      const result = skillRarity("JavaScript");
      expect(validTiers).toContain(result);
    });

    it("should be deterministic (same input → same output)", () => {
      const first = skillRarity("React");
      const second = skillRarity("React");
      expect(first).toBe(second);
    });

    it("should return consistent results for all generic skills", () => {
      for (const skill of GENERIC_SKILLS) {
        const a = skillRarity(skill);
        const b = skillRarity(skill);
        expect(a).toBe(b);
      }
    });

    it("should handle empty string without error", () => {
      const result = skillRarity("");
      expect(typeof result).toBe("string");
    });

    it("should handle single character", () => {
      const result = skillRarity("A");
      expect(typeof result).toBe("string");
    });

    it("should produce different results for different skills", () => {
      const results = GENERIC_SKILLS.map(skillRarity);
      const unique = new Set(results);
      expect(unique.size).toBeGreaterThan(1);
    });
  });
});
