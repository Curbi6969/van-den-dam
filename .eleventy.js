module.exports = function (eleventyConfig) {
  // Static assets copied verbatim into the build output
  eleventyConfig.addPassthroughCopy({ "src/resources": "resources" });
  eleventyConfig.addPassthroughCopy({ "src/site.js": "site.js" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk"]
  };
};
