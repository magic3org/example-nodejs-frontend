/**
 * マクロ変換クラス
 *
 * テキストのマクロ表記を変換する
 *
 * @author Naoki Hirata
 * @since  2019/2/10
 */
const Magic3Env = require(`${appRoot}/server/base/magic3Env`)
const MAGIC3_ROOT_URL = /\[#M3_ROOT_URL#\]/g

class MacroConvert {
  /**
   * Magic3マクロ変換
   *
   * @since  2019/2/10
   * @access public
   * @param  {string} src 変換元データ
   * @return {string}     変換後データ
   */
  getMagic3Content (src) {
    const magic3Url = Magic3Env.getRootUrl()
    let dest = src.replace(MAGIC3_ROOT_URL, magic3Url)
    return dest
  }
}
module.exports = new MacroConvert()
