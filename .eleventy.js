const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode("currentYear", function () {
    return new Date().getFullYear();
  });
  // Add this line to copy your external assets
  eleventyConfig.addPassthroughCopy("src/assets");
  // 1. Recognize YAML as a template format
  eleventyConfig.addTemplateFormats("yaml");

  // 2. Define how to process YAML files
  eleventyConfig.addExtension("yaml", {
    key: "yaml",
    compile: async (inputContent) => {
      const data = yaml.load(inputContent);
      return async () => {
        // This returns the 'content' for the page (the bio)
        return data.bio || "";
      };
    },
    getData: async (inputPath) => {
      const fs = require("fs/promises");
      const content = await fs.readFile(inputPath, "utf-8");
      return yaml.load(content);
    },
  });

  // 2. The Randomized Collection
  eleventyConfig.addCollection("randomPeople", function (collectionApi) {
    // Grab all yaml files from the users folder
    const people = collectionApi.getFilteredByGlob("src/users/*.yaml");

    // Create a copy of the array to avoid mutating the original global collection
    let shuffled = [...people];

    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
  };
};
