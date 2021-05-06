const { merge } = require('webpack-merge');
const express = require('express');

const app = express();

const commonConfig = require('./webpack.common.js');
const getAddons = (addonsArgs) => {
  const addons = Array.isArray(addonsArgs) ? addonsArgs : [addonsArgs];

  return addons.filter(Boolean).map((name) => require(`./addons/webpack.${name}.js`));
};

module.exports = ({ env, addon }) => {
  const envConfig = require(`./webpack.${env}.js`);
  // const webpackConfig =        ???????????????????????????????????????????????????????????????????????????
  if (env === 'dev') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler.compilers.find((c) => c.name === 'client')));
    app.use(webpackHotServerMiddleware(compiler));
  } else {
    const serverRenderer = require('../src/serverRenderer').default;

    app.use(express.static('public'));
    app.use(serverRenderer());
  }
  return app;
};
