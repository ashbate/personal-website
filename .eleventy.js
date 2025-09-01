// .eleventy.js
module.exports = function (eleventyConfig) {
  // Keep only shared static files as passthrough
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "script.js": "script.js" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  // Add build time for sitemap
  eleventyConfig.addGlobalData("site", {
    buildTime: new Date(),
    url: "https://erenbatuhanes.com"
  });

  // Add collections for SEO
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByTag("post").sort((a, b) => {
      return a.date - b.date;
    });
  });

  // Optional alias so you can use `layout: post`
  eleventyConfig.addLayoutAlias("post", "post.liquid");

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};
