const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.less',
      '.css',
      '.scss',
      '.json',
      '.eot',
      '.svg',
      '.ttf',
      '.woff',
      '.png',
      '.jpg',
    ],
    alias: {
      '@components': path.resolve(path.join(__dirname, '..', 'src', 'components')),
      '@pages': path.resolve(path.join(__dirname, '..', 'src', 'pages')),
      '@resources': path.resolve(path.join(__dirname, '..', 'src', 'resources')),
      '@redux': path.resolve(path.join(__dirname, '..', 'src', 'redux')),
      '@helpers': path.resolve(path.join(__dirname, '..', 'src', 'helpers')),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
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
        test: /\.(eot|otf|ttf|woff|woff2|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'resources/fonts',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
};
