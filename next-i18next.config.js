const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["en", "de", "pt"],
  },
  localePath: path.resolve("./public/locales"),
};
