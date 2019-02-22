module.exports = app => {
  // ブログデータ取得
  app.use('/api/blog', require('./blog'))
}
