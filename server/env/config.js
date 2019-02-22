/**
 * サーバ設定モジュール
 *
 * サーバ起動の環境値がproductionかdevelopmentかによって設定ファイルを読み分ける
 *
 * @author Naoki Hirata
 * @since  2019/2/19
 */
const fs = require('fs')

const PRODUCTION_CONFIG = `${appRoot}/server/env/production.json`
const DEVELOPMENT_CONFIG = `${appRoot}/server/env/development.json`

const init = () => {
  let configFile = DEVELOPMENT_CONFIG
  if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(PRODUCTION_CONFIG)) configFile = PRODUCTION_CONFIG
  }
  return require(configFile)
}
module.exports = init()
