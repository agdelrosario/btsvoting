module.exports = {
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
  // async rewrites() {
  //     return [
  //       {
  //         source: '/api/:path*',
  //         destination: `${process.env.HOST}/api/:path*`,
  //       },
  //     ]
  //   },
  // env: {
  //   customKey: 'my-value',
  // },
  // env: {
  //   host: 'http://localhost:3000',
  // },
};