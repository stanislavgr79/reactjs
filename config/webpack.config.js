// const { merge } = require('webpack-merge');

// const commonConfig = require('./webpack.common.js');

// const getAddons = (addonsArgs) => {
//   const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

//   return addons.filter(Boolean).map((name) => require(`./addons/webpack.${name}.js`));
// };

// module.exports = ({ env, addon }) => {
//   const envConfig = require(`./webpack.${env}.js`);

//   return merge(commonConfig, envConfig, ...getAddons(addon));
// };

const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: ['@issr/babel-plugin'],
        },
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
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
              plugins: ['@issr/babel-plugin'],
            },
          },
        ],
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
  },
};

module.exports = [
  {
    ...commonConfig,
    target: 'node',
    entry: './server.jsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    plugins: [
      new NodemonPlugin({
        watch: path.resolve(__dirname, './dist'),
      }),
    ],
  },
  {
    ...commonConfig,
    entry: './client.jsx',
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'index.js',
    },
  },
];
