# Magic3フロントエンドサンプル

既存のMagic3システム(v3.0.4以降)と連携したNode.jsベースのフロントエンドシステムのサンプルです。  
Magic3で管理しているブログ記事が表示できます。  
Vue.js, Nuxt.js, Vuetify.js, MySQL接続等使用。

<img src="https://github.com/magic3org/example-nodejs-frontend/blob/images/screen1.png" width="400"> <img src="https://github.com/magic3org/example-nodejs-frontend/blob/images/screen2.png" width="400">

## Configration
### DB接続(Database connect)
server/env/development.jsonファイルを編集して、連携するMagic3のDBへ接続する設定にしてください。
Edit db connection to Magic3 Database in server/env/development.json file.  

### サーバ接続用URL(Server connect URL)
nuxt.config.jsをAxion項目の「baseURL」修正してサーバ接続用のURLを設定します。
Editing axios parameter in nuxt.config, setup the URL to the server.

## Build Setup

``` bash
# install dependencies
$ npm install

# build for production and launch server
$ npm run build
$ npm start
```
