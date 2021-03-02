const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  performance: { hints: 'warning' },
  devServer: {
    inline: true,
    port: 3000,
    contentBase: path.resolve(__dirname, '..', './dist'),
    hot: true,
    historyApiFallback: true,
    compress: false,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          'style-loader',
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
      {
        test: /\.less$/,
        use: [
          'style-loader',
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
          { loader: 'less-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: 'css/[id].[chunkhash].css',
    }),
  ],
};
