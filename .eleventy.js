const yaml = require("js-yaml");

module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode("currentYear", () => new Date().getFullYear());
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addTemplateFormats("yaml");

  eleventyConfig.addExtension("yaml", {
    key: "yaml",
    compile: async (inputContent) => {
      const data = yaml.load(inputContent);
      return async () => {
        return data.bio || "";
      };
    },
    getData: async (inputPath) => {
      const fs = require("fs/promises");
      const content = await fs.readFile(inputPath, "utf-8");
      return yaml.load(content);
    },
  });

  eleventyConfig.addCollection("randomPeople", (collectionApi) => {
    const people = collectionApi.getFilteredByGlob("src/users/*.yaml");
    const shuffled = [...people];

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
