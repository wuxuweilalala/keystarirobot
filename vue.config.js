const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
     config.resolve.alias
         .set('@', resolve('src')).end()
      const dir = path.resolve(__dirname, 'src/assets/icons')
      config.module
          .rule('svg-sprite')
          .test(/\.svg$/)
          .include.add(dir).end() // 包含 icons 目录
          .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
          .use('svgo-loader').loader('svgo-loader')
      config.plugin('svg-sprite-loader').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
      config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  },

};
