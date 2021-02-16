const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  output: {
    filename: 'js/bundle.js',
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
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
