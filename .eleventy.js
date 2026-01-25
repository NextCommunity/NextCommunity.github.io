const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
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
    }
  });

  // 3. Collection setup
  eleventyConfig.addCollection("people", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/users/*.yaml");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
