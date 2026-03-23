const markdownIt = require("markdown-it");
const markdownItKatex = require("@traptitech/markdown-it-katex");

module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy(".nojekyll");

  // Configure markdown-it with KaTeX for server-side math rendering
  const md = markdownIt({ html: true, linkify: true, typographer: true }).use(
    markdownItKatex
  );
  eleventyConfig.setLibrary("md", md);

  // Date formatting filter
  eleventyConfig.addFilter("dateString", (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Substring filter for nav active-state detection
  eleventyConfig.addFilter("startsWith", (str, prefix) =>
    typeof str === "string" && str.startsWith(prefix)
  );

  // Blog post collection, newest-first
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("blog/posts/*.md")
      .sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
