const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = path.join(__dirname, '..', './dist');

module.exports = [
  {
    name: 'client',
    mode: 'development',
    target: 'web',
    entry: './config/express/client',
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
        '@resources': path.resolve(path.join(__dirname, '..', 'src', 'resources')),
      },
    },
    output: {
      path: dist,
      filename: 'js/[name].[chunkhash].client.js',
      chunkFilename: 'js/[name].[chunkhash].chunk-client.js',
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
          test: /\.scss$/,
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
      }),
    ],
    devtool: 'source-map',
  },
  {
    name: 'server',
    mode: 'development',
    target: 'node',
    entry: './config/express/server',
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
        '@resources': path.resolve(path.join(__dirname, '..', 'src', 'resources')),
      },
    },
    output: {
      path: dist,
      filename: 'js/[name].[chunkhash].server.js',
      chunkFilename: 'js/[name].[chunkhash].chunk-server.js',
      libraryTarget: 'commonjs2',
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
          test: /\.scss$/,
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
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', './src/index.html'),
      }),
    ],
    devtool: 'source-map',
  },
];
