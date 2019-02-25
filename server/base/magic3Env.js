/**
 * Magic3環境取得クラス
 *
 * DBからのデータを使用してMagic3環境の情報を取得する
 *
 * @author Naoki Hirata
 * @since  2019/2/10
 */
const BaseDb = require(`${appRoot}/server/base/baseDb`)

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
  init (pool) {
    // 初期化は1回のみ
    if (this.isInit) return this

    this.pool = pool

    // Magic3のシステム情報取得
    this._getServerInfo((err, results) => {
      if (err) {
        log.error('#magic3Env: Magic3システム情報取得エラー')
        return
      }

      // Magic3システム定義値取得
      let configArray = []
      for (var i in results) {
        let configId = results[i].sc_id
        if (configId === 'server_url') {
          this.rootUrl = results[i].sc_value
          this.resourceUrl = results[i].sc_value + '/resource'
        } else if (configId === 'server_dir') {
          this.rootDir = results[i].sc_value
          this.resourceDir = results[i].sc_value + '/resource'
        }
        configArray[results[i].sc_id] = results[i].sc_value
      }
      this.configArray = configArray

      // 初期化完了
      this.isInit = true
      log.info('#magic3Env: 初期化終了')
    })
    return this
  }
  /**
   * Magic3ルートURL取得
   *
   * @since  2019/2/10
   * @access public
   * @return {string} URL
   */
  getRootUrl () {
    return this.rootUrl
  }
  /**
   * Magic3ルートディレクトリ取得
   *
   * @since  2019/2/10
   * @access public
   * @return {string} ディレクトリパス
   */
  getResourceUrl () {
    return this.resourceUrl
  }
  /**
   * Magic3システム定義データ取得
   *
   * @since  2019/2/10
   * @access private
   * @param  {callback} callback コールバック関数
   */
  _getServerInfo (callback) {
    // DB接続オブジェクト取得
    const baseDb = new BaseDb(this.pool)

    const sql = 'SELECT * FROM _system_config ORDER BY sc_id'
    baseDb.selectRecord(sql, [], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
}
module.exports = new Magic3Env()
