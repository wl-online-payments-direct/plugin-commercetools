const {
  createWebpackConfigForDevelopment,
} = require('@commercetools-frontend/mc-scripts/webpack');

// Create the default config
const config = createWebpackConfigForDevelopment();

// Customize the config
config.module.rules = config.module.rules.concat(
  {
    test: /\.css$/,
    use: [require.resolve('style-loader'), require.resolve('css-loader')],
  },
  {
    test: /\.md$/,
    use: [require.resolve('markdown-loader')],
  },
  {
    test: /\.(?:js|mjs|cjs)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env', { targets: 'defaults' }]],
      },
    },
  }
);

// Export the config
module.exports = config;
