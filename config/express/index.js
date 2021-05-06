const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const config = require('../webpack.config.fake.js');
const app = express();

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler.compilers.find((c) => c.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(6060, () => {
  console.log('Server started: http://localhost:6060/');
});
