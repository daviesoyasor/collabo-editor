const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../../NodeEnv/collabo-socket/public'),
  transpileDependencies: [
    'vuetify'
  ]
}
