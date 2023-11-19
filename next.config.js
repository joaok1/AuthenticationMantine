const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: require.resolve('path-browserify') };
    return config;
  },
  experimental: {
    newNextLinkBehavior: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: 'standalone',
}
