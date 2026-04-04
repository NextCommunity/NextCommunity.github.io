"use strict";

// Mock child_process so we can control git output
jest.mock("child_process");

describe("src/_data/build.js", () => {
  let buildFn;
  // Re-acquired after each resetModules() so it points to the active mock
  let execSync;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    // Re-require to get the fresh mock instance for this test
    ({ execSync } = require("child_process"));
  });

  describe("when git is available", () => {
    beforeEach(() => {
      execSync.mockReturnValue(Buffer.from("abc1234\n"));
      buildFn = require("../src/_data/build");
    });

    it("returns an object with timestamp, hash, and repoUrl", () => {
      const result = buildFn();
      expect(result).toHaveProperty("timestamp");
      expect(result).toHaveProperty("hash");
      expect(result).toHaveProperty("repoUrl");
    });

    it("returns the trimmed git short hash", () => {
      const result = buildFn();
      expect(result.hash).toBe("abc1234");
    });

    it("returns the correct repo URL", () => {
      const result = buildFn();
      expect(result.repoUrl).toBe(
        "https://github.com/NextCommunity/NextCommunity.github.io",
      );
    });

    it("returns a non-empty timestamp string", () => {
      const result = buildFn();
      expect(typeof result.timestamp).toBe("string");
      expect(result.timestamp.length).toBeGreaterThan(0);
    });

    it("timestamp matches the en-US locale medium date + short time format", () => {
      const result = buildFn();
      // e.g. "Jan 26, 2026, 07:51 AM"
      expect(result.timestamp).toMatch(
        /^[A-Za-z]{3} \d{1,2}, \d{4},\s+\d{1,2}:\d{2}\s+(AM|PM)$/,
      );
    });

    it("returns a fresh timestamp that includes the current year", () => {
      const result = buildFn();
      const currentYear = new Date().getFullYear().toString();
      expect(result.timestamp).toContain(currentYear);
    });
  });

  describe("when git is not available", () => {
    beforeEach(() => {
      execSync.mockImplementation(() => {
        throw new Error("git: command not found");
      });
      buildFn = require("../src/_data/build");
    });

    it("falls back to 'development' for hash when git fails", () => {
      const warnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      const result = buildFn();
      expect(result.hash).toBe("development");
      warnSpy.mockRestore();
    });

    it("logs a warning when git hash cannot be fetched", () => {
      const warnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      buildFn();
      expect(warnSpy).toHaveBeenCalledWith(
        "Could not fetch git hash, defaulting to 'development'",
      );
      warnSpy.mockRestore();
    });

    it("still returns timestamp and repoUrl when git fails", () => {
      const warnSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      const result = buildFn();
      expect(result).toHaveProperty("timestamp");
      expect(result).toHaveProperty("repoUrl");
      warnSpy.mockRestore();
    });
  });

  describe("each call returns a fresh result", () => {
    it("invokes execSync with the expected git command", () => {
      execSync.mockReturnValue(Buffer.from("deadbee\n"));
      buildFn = require("../src/_data/build");
      buildFn();
      expect(execSync).toHaveBeenCalledWith("git rev-parse --short HEAD");
    });
  });
});
