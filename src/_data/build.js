const { execSync } = require("child_process");

module.exports = () => {
  const now = new Date();

  // Format the date: "Jan 26, 2026, 07:51 AM"
  const timestamp = now.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  let gitHash = "development";
  try {
    // Get the short git hash (first 7 characters)
    gitHash = execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    console.warn("Could not fetch git hash, defaulting to 'development'");
  }

  return {
    timestamp,
    hash: gitHash,
    repoUrl: "https://github.com/NextCommunity/NextCommunity.github.io",
  };
};
