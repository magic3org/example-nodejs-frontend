/**
 * Magic3環境取得クラス
 *
 * DBからのデータを使用してMagic3環境の情報を取得する
 *
 * @author Naoki Hirata
 * @since  2019/2/10
 */
const BaseDb = require(`${appRoot}/server/base/baseDb`)
const async = require('async')
const defaultLang = 'ja'

class Magic3Env {
  /**
   * 初期化処理
   *
   * システム起動時に一度だけ実行する処理
   *
   * @since  2019/2/10
   * @access public
   * @param  {Object} pool DB接続取得用のpoolオブジェクト
   * @return {Object}      このオブジェクトの参照
   */
  static init (pool) {
    const self = Magic3Env

    // 初期化は1回のみ
    if (self.isInit) return

    self.pool = pool

    async.waterfall([
      function (callback) {
        // Magic3のシステム情報取得
        self._getServerInfo((err, results) => {
          if (err) {
            log.error('#magic3Env: Magic3システム情報取得エラー')
            return
          }

          // Magic3システム定義値取得
          let configArray = {}
          for (var i in results) {
            let configId = results[i].sc_id
            if (configId === 'server_url') {
              self.rootUrl = results[i].sc_value
              self.resourceUrl = results[i].sc_value + '/resource'
            } else if (configId === 'server_dir') {
              self.rootDir = results[i].sc_value
              self.resourceDir = results[i].sc_value + '/resource'
            }
            configArray[results[i].sc_id] = results[i].sc_value
          }
          self.configArray = configArray

          log.info('#magic3Env: システム定義取得')
          callback(null)
        })
      },
      function (callback) {
        // Magic3サイト定義取得
        self._getSiteConfig((err, results) => {
          if (err) {
            log.error('#magic3Env: Magic3サイト定義取得エラー')
            return
          }

          // Magic3システム定義値取得
          let configArray = {}
          for (var i in results) {
            configArray[results[i].sd_id] = results[i].sd_value
          }
          self.siteConfigArray = configArray

          log.info('#magic3Env: サイト定義取得')
          callback(null)
        })
      },
      function (callback) {
        // Magic3ブログ定義取得
        self._getBlogConfig((err, results) => {
          if (err) {
            log.error('#magic3Env: Magic3ブログ定義取得エラー')
            return
          }

          // Magic3システム定義値取得
          let configArray = {}
          for (var i in results) {
            configArray[results[i].bg_id] = results[i].bg_value
          }
          self.blogConfigArray = configArray

          log.info('#magic3Env: ブログ定義取得')
          callback(null)
        })
      }
    ], function (err, results) {
      if (err) throw err

      // 初期化完了
      self.isInit = true // 初期化完了
      log.info('#magic3Env: 初期化終了')
    })
    return self
  }
  /**
   * Magic3ルートURL取得
   *
   * @since  2019/2/10
   * @access public
   * @return {string} URL
   */
  static getRootUrl () {
    return Magic3Env.rootUrl
  }
  /**
   * Magic3ルートディレクトリ取得
   *
   * @since  2019/2/10
   * @access public
   * @return {string} ディレクトリパス
   */
  static getResourceUrl () {
    return Magic3Env.resourceUrl
  }
  /**
   * サイト定義値取得
   *
   * @since  2019/3/3
   * @access public
   * @param {string} id 定義ID
   * @return {string} 定義値
   */
  static getSiteConfigValue (id) {
    let value = Magic3Env.siteConfigArray[id]
    if (!value) value = ''
    return value
  }
  /**
   * ブログ定義値取得
   *
   * @since  2019/2/26
   * @access public
   * @param {string} id 定義ID
   * @return {string} 定義値
   */
  static getBlogConfigValue (id) {
    let value = Magic3Env.blogConfigArray[id]
    if (!value) value = ''
    return value
  }
  /**
   * Magic3システム定義データ取得
   *
   * @since  2019/2/10
   * @access private
   * @param  {function} callback コールバック関数
   */
  static _getServerInfo (callback) {
    // DB接続オブジェクト取得
    const self = Magic3Env
    const baseDb = new BaseDb(self.pool)

    const sql = 'SELECT * FROM _system_config ORDER BY sc_id'
    baseDb.selectRecord(sql, [], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
  /**
  * Magic3サイト定義データ取得
  *
  * @since  2019/3/3
  * @access private
  * @param  {function} callback コールバック関数
  */
  static _getSiteConfig (callback) {
    // DB接続オブジェクト取得
    const self = Magic3Env
    const baseDb = new BaseDb(self.pool)

    const sql = 'SELECT sd_id,sd_value FROM _site_def ' +
                'WHERE sd_deleted = false ' +
                'AND sd_language_id = ? ' +
                'ORDER BY sd_id'
    baseDb.selectRecord(sql, [defaultLang], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
  /**
   * Magic3ブログ定義取得
   *
   * @since  2019/2/25
   * @access private
   * @param  {function} callback コールバック関数
   */
  static _getBlogConfig (callback) {
    // DB接続オブジェクト取得
    const self = Magic3Env
    const baseDb = new BaseDb(self.pool)

    const sql = 'SELECT * FROM blog_config ORDER BY bg_id'
    baseDb.selectRecord(sql, [], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
}
module.exports = Magic3Env
