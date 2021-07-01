module.exports = {
  runtimeCompiler: true,
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
        config.module.rule('mjs').test(/\.mjs$/).type('javascript/auto').end();
      },
    },
  },
}