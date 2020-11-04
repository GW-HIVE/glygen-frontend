/**
 * Environment variables for Glygen. These variables have been assigned default values for development environment.
 * During docker deployment on tst, beta and prod these variables will get overwritten by respective values.
 * Do not use direct url's in the code.
 */
export const GLYGEN_ENV = process.env.REACT_APP_ENV || "dev";
export const GLYGEN_API = process.env.REACT_APP_API || "https://api.tst.glygen.org";
export const GLYGEN_DOMAIN =
	process.env.REACT_APP_DOMAIN || "https://glygen.org";
export const GLYGEN_DATA =
	process.env.REACT_APP_DATA || "https://data.glygen.org";
export const GLYGEN_SPARQL =
	process.env.REACT_APP_SPARQL || "https://sparql.glygen.org";
export const GLYGEN_BETA =
	process.env.REACT_APP_BETA || "https://beta.glygen.org";
export const GNOME_BROWSER =
	process.env.REACT_APP_GNOME_BROWSER ||
	"https://gnome.glyomics.org/restrictions/GlyGen.StructureBrowser.html";
export const GLYGEN_BASENAME = process.env.REACT_APP_BASENAME || "/";
