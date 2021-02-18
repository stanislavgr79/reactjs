module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/react', '@babel/typescript', ['@babel/env', { modules: false }]];

  return {
    presets,
  };
};
