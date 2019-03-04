const express = require('express')
const router = express.Router()
const Magic3Env = require(`${appRoot}/server/base/magic3Env`)
const CF_SITE_NAME = 'site_name' // サイト名

router.get('/info', function (req, res) {
  const title = Magic3Env.getSiteConfigValue(CF_SITE_NAME) // システム名称
  res.json({ ok: true, title: title })
})
module.exports = router
