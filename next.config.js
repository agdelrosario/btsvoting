module.exports = {
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://btsvoting.org/:path*',
        },
      ]
    },
  // env: {
  //   customKey: 'my-value',
  // },
  // env: {
  //   host: 'http://localhost:3000',
  // },
};