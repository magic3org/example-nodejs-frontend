const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')

// グローバルモジュールの作成
global.appRoot = require('app-root-path') // プロジェクトのルートパス
global.empty = require('is-empty')
global.striptags = require('striptags')

// サーバ実行環境取得
const config = require(`${appRoot}/server/env/config`)

// ##### ログの出力設定 #####
global.log = require(`${appRoot}/server/base/log`) // ログ出力モジュール

// ログ出力開始
// コンソール出力は、デフォルトのフォーマットとwinstonのフォーマットがあるので注意。
//if (process.env.NODE_ENV !== 'development') {     // 開発時はデフォルトのフォーマットでコンソールに出力し、開発時以外はwinstonのフォーマットでファイルにログを出力。
  const logger = require(`${appRoot}/server/base/logger`)// コンソールとファイルにwinstonのフォーマットでログを出力
//}

// デバッグ用コード
// Promiseの詳細なデバッグを情報を表示させたいときに記述
process.on('unhandledRejection', console.dir) // システムの停止が必要な致命的なエラー

// サーバ作成
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.use(bodyParser.json()) // JSONデータ(application/json)をパース

// DBの設定
const mysql = require('mysql2')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.dbHost,
  port: config.dbPort,
  database: config.dbName,
  user: config.dbUser,
  password: config.dbPassword
})
app.use(function (req, res, next) {
  req.pool = pool
  next()
})

// Magic3環境モジュール初期化
//global.magic3Env = new (require(`${appRoot}/server/base/magic3Env`))().init(pool)
require(`${appRoot}/server/base/magic3Env`).init(pool)

// ########## サーバ起動 ##########
app.set('port', port)

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

// ### ルーティング設定 ###
const api = require('./api/index')(app)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
