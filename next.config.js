const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: 'standalone',
};
