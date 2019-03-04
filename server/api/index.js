module.exports = app => {
  // サイト情報取得
  app.use('/api/site', require('./site'))

  // ブログデータ取得
  app.use('/api/blog', require('./blog'))
}
