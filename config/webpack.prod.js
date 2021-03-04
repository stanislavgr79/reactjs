const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  performance: { hints: false },
  devServer: {
    contentBase: path.resolve(__dirname, '..', './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              sourceMap: true,
              url: true,
              importLoaders: 3,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'scoped-css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: true,
              sourceMap: true,
              url: true,
              importLoaders: 3,
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'scoped-css-loader' },
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          cssProcessor: require('cssnano'),
          preset: [
            'default',
            {
              calc: true,
              convertValues: true,
              discardComments: {
                removeAll: true,
              },
              discardDuplicates: true,
              discardEmpty: true,
              mergeRules: true,
              normalizeCharset: true,
              reduceInitial: true,
              svgo: true,
            },
          ],
        },
        canPrint: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        main: {
          chunks: 'all',
          name: 'site',
          test: 'main',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[id].[chunkhash].css',
    }),
  ],
};
