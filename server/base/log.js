/**
 * ログ出力クラス
 *
 * システムからのログ出力を行う。開発時はコンソールにも出力する。
 *
 * @author Naoki Hirata
 * @since  2019/2/12
 */
const logger = require('./logger')

// loggerの関数に渡せるパラメータは1つのみ。テキストのメッセージかErrorオブジェクトを渡す
// オブジェクトの生成 new Error("some additional message")
exports.error = (message) => {
  logger.error(message)
}
exports.dbError = (errObj, code, optionMessage, optionObj) => {
  if (code) errObj.optionCode = '[db-' + code + ']' // オプションメッセーにコード番号追加
  if (optionMessage) errObj.optionMessage = optionMessage
  if (optionObj) errObj.optionObj = optionObj
  logger.error(errObj)
}
exports.warn = (message) => {
  logger.warn(message)
}
exports.validateError = (req, message) => {
  const url = req.protocol + ':/' + req.headers.host + req.baseUrl
  let msg = message + ' url: ' + url + ' '
  if (Object.keys(req.body).length) msg += JSON.stringify(req.body)
  //if (Object.keys(req.params).length) msg += JSON.stringify(req.params)
  if (Object.keys(req.query).length) msg += JSON.stringify(req.query)
  //console.log(req.body)
  //console.log(req.params)
  //console.log(req.query)

  logger.warn('[validate] ' + msg)
}
exports.info = (message) => {
  logger.info(message)
}
exports.debug = (message) => {
  logger.debug(message)
}
