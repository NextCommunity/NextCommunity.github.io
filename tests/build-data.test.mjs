import { vi } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("build.js data file", () => {
  it("should export a function", () => {
    const buildData = require("../src/_data/build.js");
    expect(typeof buildData).toBe("function");
  });

  it("should return an object with timestamp, hash, and repoUrl", () => {
    const buildData = require("../src/_data/build.js");
    const result = buildData();

    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("hash");
    expect(result).toHaveProperty("repoUrl");
  });

  it("should return the correct repository URL", () => {
    const buildData = require("../src/_data/build.js");
    const result = buildData();

    expect(result.repoUrl).toBe(
      "https://github.com/NextCommunity/NextCommunity.github.io",
    );
  });

  it("should return a non-empty timestamp string", () => {
    const buildData = require("../src/_data/build.js");
    const result = buildData();

    expect(typeof result.timestamp).toBe("string");
    expect(result.timestamp.length).toBeGreaterThan(0);
  });

  it("should return a non-empty hash string", () => {
    const buildData = require("../src/_data/build.js");
    const result = buildData();

    expect(typeof result.hash).toBe("string");
    expect(result.hash.length).toBeGreaterThan(0);
  });
});
