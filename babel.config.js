module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/react', '@babel/typescript', ['@babel/env', { modules: false }]];

  const plugins = [
    [
      'babel-plugin-react-scoped-css',
      {
        include: '.scoped.(sa|sc|c)ss$',
      },
    ],
    ['babel-plugin-styled-components'],
    'transform-class-properties',
  ];

  return {
    presets,
    plugins,
  };
};
