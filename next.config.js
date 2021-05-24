const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
// const withSass = require('@zeit/next-sass');
// const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withPlugins([withBundleAnalyzer, withImages], {
  future: {
    webpack5: true,
  },
  react: {
    useSuspense: false,
    wait: true,
  },
  // module.exports = withPlugins([withBundleAnalyzer, withImages, withSass, withCSS], {
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push(
    //   {
    //     test: /\.tsx?$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //   },
    //   {
    //     test: /\.js$/,
    //     use: ['source-map-loader'],
    //     enforce: 'pre',
    //   },
      {
        test: /\.(ico|jpg|jpeg|png|gif|webp|png)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'resources/images',
          },
        },
      },
      {
        test: /\.css$/,
        use: [
            // 'style-loader',
          {
            loader: 'css-loader?url=false',
            options: {
              import: true,
              sourceMap: true,
              url: true,
              importLoaders: 2,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'scoped-css-loader' },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
            // 'style-loader',
          {
            loader: 'css-loader?url=false',
            options: {
              import: true,
              sourceMap: true,
              url: true,
              importLoaders: 3,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'scoped-css-loader' },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    );
    return config;
  },
});
