const express = require('express')
const router = express.Router()
const BlogDb = require(`${appRoot}/server/db/blogDb`)
const macroConvert = require(`${appRoot}/server/base/macroConvert`)
const { query, validationResult } = require('express-validator/check')

router.get('/', [
  // エラーチェック定義
  query('page').isInt()
], function (req, res) {
  // 入力エラーの場合はログを残して終了
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    log.validateError(req, JSON.stringify(errors.array())) // バリデーションエラーをログに残す
    return res.status(422).json({ errors: errors.array() })
  }

  // DBからデータ取得
  const blogDb = new BlogDb(req.pool)
  blogDb.getEntryList(req.query['page'], 1/* 降順 */, (err, result) => {
    if (err) {
      log.error('データ取得エラー コード=' + err)
      return
    }
    if (result.length > 0) {
      const list = []
      for (let i = 0; i < result.length; i++) {
        let row = result[i]

        let thumbUrl = ''
        if (row.be_thumb_src) thumbUrl = magic3Env.getResourceUrl() + row.be_thumb_src
        list.push({ id: row.be_id, name: row.be_name, thumb: thumbUrl })
      }
      // 取得データを返す
      res.json({ code: 200, list: list })
    } else {
      res.json({ code: 404 })
    }
  })
})
router.get('/detail/:id', function (req, res) {
  const blogDb = new BlogDb(req.pool)

  // ブログIDからブログ記事取得
  blogDb.getEntry(req.params.id, (err, result) => {
    if (err) {
      log.error('データ取得エラー コード=' + err)
      return
    }
    if (result.length > 0) {
      // コンテンツのマクロを変換
      let html = macroConvert.getMagic3Content(result[0].be_html)

      // 取得データを返す
      res.json({ code: 200, id: result[0].be_id, name: result[0].be_name, html: html, html_ext: result[0].be_html_ext, regist_dt: result[0].be_regist_dt })
    } else {
      res.json({ code: 404 })
    }
  })
})
module.exports = router
