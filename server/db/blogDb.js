const BaseDb = require(`${appRoot}/server/base/baseDb`)
const SystemDef = require(`${appRoot}/server/base/systemDef`)
const defaultLang = 'ja'

class BlogDb extends BaseDb {
  // ブログ記事取得
  getEntry (entryId, callback) {
    const sql = 'SELECT * FROM blog_entry LEFT JOIN blog_id ON be_blog_id = bl_id AND bl_deleted = false ' +
                'WHERE be_deleted = false ' + // 削除されていない
                  'AND be_history_index >= 0 ' + // 正規(Regular)記事を対象
                  'AND be_id = ? ' +
                  'AND be_language_id = ? '
    this.selectRecord(sql, [entryId, defaultLang], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
  // ブログ記事一覧取得
  getEntryList (page, order, callback) {
    // 一覧の先頭オフセット位置を取得
    const limit = SystemDef.LIST_COUNT
    let offset = limit * (page - 1)
    if (offset < 0) offset = 0

    let sql = 'SELECT * FROM blog_entry LEFT JOIN blog_id ON be_blog_id = bl_id AND bl_deleted = false ' +
                'LEFT JOIN _login_user ON be_regist_user_id = lu_id AND lu_deleted = false ' +
                'WHERE be_deleted = false ' + // 削除されていない
                  'AND be_history_index >= 0 ' + // 正規(Regular)記事を対象
                  'AND be_language_id = ? '

    let ord = ''
    if (order) ord = 'DESC '
    sql += 'ORDER BY be_regist_dt ' + ord + 'LIMIT ' + limit + ' offset ' + offset // 投稿順

    this.selectRecord(sql, [defaultLang], (err, result) => {
      if (err) {
        return callback(true)
      }
      callback(false, result)
    })
  }
}
module.exports = BlogDb
