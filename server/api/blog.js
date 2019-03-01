const express = require('express')
const router = express.Router()
const BlogDb = require(`${appRoot}/server/db/blogDb`)
const macroConvert = require(`${appRoot}/server/base/macroConvert`)
const Magic3Env = require(`${appRoot}/server/base/magic3Env`)
const Magic3Blog = require(`${appRoot}/server/base/magic3Blog`)
const { query, validationResult } = require('express-validator/check')
const truncate = require('truncate')
const MAX_DESC_LENGTH = 20 // 説明文最大長

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

        // アイキャッチ画像取得
        const thumbUrl = Magic3Blog.getEyecatchImageUrl(result[i].be_thumb_filename, 'l', row.be_thumb_src/* 画像がない場合のデフォルト画像 */)

        // 記事概要
        let desc = ''
        if (!empty(result[i].be_thumb_description)) desc = result[i].be_description

        if (empty(desc)) {
          desc = truncate(striptags(result[i].be_html), MAX_DESC_LENGTH) // HTMLタグ削除、最大長設定
        }
        list.push({ id: row.be_id, name: row.be_name, desc: desc, thumb: thumbUrl })
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
