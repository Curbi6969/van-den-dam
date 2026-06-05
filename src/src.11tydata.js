// Directory data file: applies to every template under src/.
// Forces flat "<name>.html" output (e.g. contact.njk -> contact.html) so the
// built URLs match the existing internal links (href="contact.html", etc.)
// instead of Eleventy's default pretty "<name>/index.html".
module.exports = {
  permalink: (data) => `${data.page.fileSlug || "index"}.html`
};
