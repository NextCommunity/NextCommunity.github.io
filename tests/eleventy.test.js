"use strict";

/**
 * Tests for .eleventy.js
 *
 * We test:
 *  1. The `currentYear` shortcode
 *  2. The Fisher-Yates shuffle used in `randomPeople` collection
 *  3. The YAML template extension (compile + getData)
 */

const path = require("path");
const fs = require("fs");

// Load the eleventy config factory
const eleventyConfigFactory = require("../.eleventy.js");

/**
 * Build a minimal stub of the EleventyConfig API so we can capture
 * registered shortcodes, collections, template extensions and passthroughs
 * without running a real Eleventy build.
 */
function makeConfigStub() {
  const shortcodes = {};
  const collections = {};
  const extensions = {};
  const passthroughs = [];

  return {
    // Captures registered shortcodes
    addShortcode(name, fn) {
      shortcodes[name] = fn;
    },
    // Captures passthrough copy paths
    addPassthroughCopy(path) {
      passthroughs.push(path);
    },
    // Captures registered template formats (no-op for testing)
    addTemplateFormats() {},
    // Captures template extensions
    addExtension(name, options) {
      extensions[name] = options;
    },
    // Captures collection builders
    addCollection(name, fn) {
      collections[name] = fn;
    },
    // Exposed for assertions
    _shortcodes: shortcodes,
    _collections: collections,
    _extensions: extensions,
    _passthroughs: passthroughs,
  };
}

describe(".eleventy.js", () => {
  let config;
  let stub;

  beforeEach(() => {
    stub = makeConfigStub();
    config = eleventyConfigFactory(stub);
  });

  // ─── Return value ────────────────────────────────────────────────────────────

  describe("return value", () => {
    it("returns a dir configuration object", () => {
      expect(config).toEqual({
        dir: {
          input: "src",
          output: "_site",
          includes: "_includes",
        },
      });
    });
  });

  // ─── currentYear shortcode ───────────────────────────────────────────────────

  describe("currentYear shortcode", () => {
    it("registers a shortcode named 'currentYear'", () => {
      expect(stub._shortcodes).toHaveProperty("currentYear");
    });

    it("returns the current 4-digit year as a number", () => {
      const year = stub._shortcodes.currentYear();
      expect(year).toBe(new Date().getFullYear());
    });

    it("returns a number, not a string", () => {
      const year = stub._shortcodes.currentYear();
      expect(typeof year).toBe("number");
    });
  });

  // ─── Passthrough copy ────────────────────────────────────────────────────────

  describe("passthrough copy", () => {
    it("copies src/assets directory", () => {
      expect(stub._passthroughs).toContain("src/assets");
    });
  });

  // ─── randomPeople collection – Fisher-Yates shuffle ─────────────────────────

  describe("randomPeople collection (Fisher-Yates shuffle)", () => {
    /**
     * Build a fake collectionApi whose getFilteredByGlob returns a
     * deterministic array of objects so we can reason about the shuffle.
     */
    function makeCollectionApi(items) {
      return {
        getFilteredByGlob: jest.fn().mockReturnValue(items),
      };
    }

    it("registers a collection named 'randomPeople'", () => {
      expect(stub._collections).toHaveProperty("randomPeople");
    });

    it("returns an array", () => {
      const api = makeCollectionApi([{ id: 1 }, { id: 2 }, { id: 3 }]);
      const result = stub._collections.randomPeople(api);
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns all original items (no elements dropped or duplicated)", () => {
      const original = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
      ];
      const api = makeCollectionApi(original);
      const result = stub._collections.randomPeople(api);

      // Same length
      expect(result).toHaveLength(original.length);

      // Same set of ids
      const resultIds = result.map((x) => x.id).sort((a, b) => a - b);
      const originalIds = original.map((x) => x.id).sort((a, b) => a - b);
      expect(resultIds).toEqual(originalIds);
    });

    it("does not mutate the original array returned by getFilteredByGlob", () => {
      const original = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const api = makeCollectionApi(original);

      // Capture a snapshot before calling the collection builder
      const snapshot = [...original];
      stub._collections.randomPeople(api);

      expect(original).toEqual(snapshot);
    });

    it("calls getFilteredByGlob with the users YAML glob", () => {
      const api = makeCollectionApi([]);
      stub._collections.randomPeople(api);
      expect(api.getFilteredByGlob).toHaveBeenCalledWith("src/users/*.yaml");
    });

    it("returns an empty array when no items match the glob", () => {
      const api = makeCollectionApi([]);
      const result = stub._collections.randomPeople(api);
      expect(result).toEqual([]);
    });

    it("returns a single-item array unchanged", () => {
      const api = makeCollectionApi([{ id: 42 }]);
      const result = stub._collections.randomPeople(api);
      expect(result).toEqual([{ id: 42 }]);
    });

    it("produces a different order at least occasionally over many runs", () => {
      // Run 20 shuffles on a 10-element array and check that not every
      // result is identical (the probability of 20 identical shuffles is
      // astronomically small).
      const original = Array.from({ length: 10 }, (_, i) => ({ id: i }));
      const api = makeCollectionApi(original);

      const results = new Set();
      for (let i = 0; i < 20; i++) {
        const shuffled = stub._collections.randomPeople(api);
        results.add(shuffled.map((x) => x.id).join(","));
      }

      // At least 2 distinct orderings should appear
      expect(results.size).toBeGreaterThan(1);
    });
  });

  // ─── YAML template extension ─────────────────────────────────────────────────

  describe("yaml template extension", () => {
    let extension;

    beforeEach(() => {
      extension = stub._extensions.yaml;
    });

    it("registers an extension for the 'yaml' key", () => {
      expect(extension).toBeDefined();
      expect(extension.key).toBe("yaml");
    });

    describe("compile()", () => {
      it("returns a function", async () => {
        const result = await extension.compile("name: Alice\nbio: Hello");
        expect(typeof result).toBe("function");
      });

      it("returned function resolves to the bio field", async () => {
        const render = await extension.compile("name: Alice\nbio: Hello World");
        const output = await render();
        expect(output).toBe("Hello World");
      });

      it("returned function resolves to empty string when bio is absent", async () => {
        const render = await extension.compile("name: Alice");
        const output = await render();
        expect(output).toBe("");
      });

      it("handles multiline bio", async () => {
        const yaml = `name: Bob\nbio: "Line one. Line two."`;
        const render = await extension.compile(yaml);
        const output = await render();
        expect(output).toBe("Line one. Line two.");
      });
    });

    describe("getData()", () => {
      it("reads and parses a YAML file from disk", async () => {
        // Create a temporary YAML fixture
        const tmpFile = path.join(
          __dirname,
          "__fixtures__",
          "test-user.yaml",
        );
        fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
        fs.writeFileSync(
          tmpFile,
          "name: Test User\nbio: Bio text\ngithub: testuser\n",
          "utf-8",
        );

        try {
          const data = await extension.getData(tmpFile);
          expect(data).toMatchObject({
            name: "Test User",
            bio: "Bio text",
            github: "testuser",
          });
        } finally {
          fs.unlinkSync(tmpFile);
        }
      });

      it("returns an object with all YAML fields", async () => {
        const tmpFile = path.join(
          __dirname,
          "__fixtures__",
          "test-user2.yaml",
        );
        fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
        fs.writeFileSync(
          tmpFile,
          "name: Jane\nlocation: NYC\nskills:\n  - JS\n  - Python\n",
          "utf-8",
        );

        try {
          const data = await extension.getData(tmpFile);
          expect(data.name).toBe("Jane");
          expect(data.location).toBe("NYC");
          expect(data.skills).toEqual(["JS", "Python"]);
        } finally {
          fs.unlinkSync(tmpFile);
        }
      });
    });
  });
});
