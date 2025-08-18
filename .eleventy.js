// .eleventy.js
module.exports = function (eleventyConfig) {
  // Keep only shared static files as passthrough
  eleventyConfig.addPassthroughCopy({ "style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "script.js": "script.js" });

  // Optional alias so you can use `layout: post`
  eleventyConfig.addLayoutAlias("post", "post.liquid");

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
};
