import { vi } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe(".eleventy.js configuration", () => {
  let eleventyConfig;
  let configFn;

  beforeEach(() => {
    eleventyConfig = {
      shortcodes: {},
      templateFormats: [],
      extensions: {},
      passthroughCopies: [],
      collections: {},

      addShortcode(name, fn) {
        this.shortcodes[name] = fn;
      },
      addTemplateFormats(formats) {
        this.templateFormats.push(formats);
      },
      addExtension(ext, opts) {
        this.extensions[ext] = opts;
      },
      addPassthroughCopy(src) {
        this.passthroughCopies.push(src);
      },
      addCollection(name, fn) {
        this.collections[name] = fn;
      },
    };

    configFn = require("../.eleventy.js");
  });

  it("should export a function", () => {
    expect(typeof configFn).toBe("function");
  });

  it("should return correct directory configuration", () => {
    const result = configFn(eleventyConfig);

    expect(result).toEqual({
      dir: {
        input: "src",
        output: "_site",
        includes: "_includes",
      },
    });
  });

  describe("shortcodes", () => {
    it("should register a currentYear shortcode", () => {
      configFn(eleventyConfig);
      expect(eleventyConfig.shortcodes).toHaveProperty("currentYear");
    });

    it("currentYear should return the current year as a number", () => {
      configFn(eleventyConfig);
      const year = eleventyConfig.shortcodes.currentYear();
      expect(year).toBe(new Date().getFullYear());
    });
  });

  describe("template formats", () => {
    it("should register yaml as a template format", () => {
      configFn(eleventyConfig);
      expect(eleventyConfig.templateFormats).toContain("yaml");
    });
  });

  describe("YAML extension", () => {
    it("should register a yaml extension", () => {
      configFn(eleventyConfig);
      expect(eleventyConfig.extensions).toHaveProperty("yaml");
    });

    it("yaml extension should have compile and getData functions", () => {
      configFn(eleventyConfig);
      const yamlExt = eleventyConfig.extensions.yaml;
      expect(typeof yamlExt.compile).toBe("function");
      expect(typeof yamlExt.getData).toBe("function");
    });

    it("compile should extract bio from YAML content", async () => {
      configFn(eleventyConfig);
      const yamlExt = eleventyConfig.extensions.yaml;

      const yamlContent = "name: Alice\nbio: Hello world\nskills:\n  - JS";
      const renderFn = await yamlExt.compile(yamlContent);
      const output = await renderFn();

      expect(output).toBe("Hello world");
    });

    it("compile should return empty string when bio is missing", async () => {
      configFn(eleventyConfig);
      const yamlExt = eleventyConfig.extensions.yaml;

      const yamlContent = "name: Bob\nskills:\n  - Python";
      const renderFn = await yamlExt.compile(yamlContent);
      const output = await renderFn();

      expect(output).toBe("");
    });
  });

  describe("passthrough copy", () => {
    it("should copy src/assets to output", () => {
      configFn(eleventyConfig);
      expect(eleventyConfig.passthroughCopies).toContain("src/assets");
    });
  });

  describe("randomPeople collection", () => {
    it("should register a randomPeople collection", () => {
      configFn(eleventyConfig);
      expect(eleventyConfig.collections).toHaveProperty("randomPeople");
    });

    it("should return a shuffled copy of all user yaml files", () => {
      configFn(eleventyConfig);
      const collectionFn = eleventyConfig.collections.randomPeople;

      const mockPeople = [
        { data: { name: "Alice" } },
        { data: { name: "Bob" } },
        { data: { name: "Charlie" } },
      ];
      const collectionApi = {
        getFilteredByGlob: vi.fn(() => mockPeople),
      };

      const result = collectionFn(collectionApi);

      expect(collectionApi.getFilteredByGlob).toHaveBeenCalledWith(
        "src/users/*.yaml",
      );
      expect(result).toHaveLength(mockPeople.length);

      for (const person of mockPeople) {
        expect(result).toContain(person);
      }
    });

    it("should not mutate the original collection", () => {
      configFn(eleventyConfig);
      const collectionFn = eleventyConfig.collections.randomPeople;

      const original = [{ name: "A" }, { name: "B" }, { name: "C" }];
      const collectionApi = {
        getFilteredByGlob: vi.fn(() => original),
      };

      const result = collectionFn(collectionApi);
      expect(result).not.toBe(original);
    });
  });
});
