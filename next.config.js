module.exports = {
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  // env: {
  //   customKey: 'my-value',
  // },
  // env: {
  //   host: 'http://localhost:3000',
  // },
};