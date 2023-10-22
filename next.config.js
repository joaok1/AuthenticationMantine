module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false, // ou "fs-extra" se você precisar
        stream: require.resolve('stream-browserify'),
        zlib: require.resolve('browserify-zlib'),
      };
      return config;
    },
    i18n,
    experimental: {
      newNextLinkBehavior: true,
    },
  };