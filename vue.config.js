const { defineConfig } = require('@vue/cli-service')
const Timestamp = new Date().getTime()
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  productionSourceMap: false,
  configureWebpack: {
    output: {
    filename: `js/[name].${Timestamp}.js`,
    chunkFilename: `js/[name].${Timestamp}.js`
    },
    },
})
