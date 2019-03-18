# Magic3フロントエンドサンプル

既存のMagic3システム(v3.0.4以降)と連携したNode.jsベースのフロントエンドシステムのサンプルです。  
Magic3で管理しているブログ記事が表示できます。  
Vue.js, Nuxt.js, Vuetify.js, MySQL接続等使用。

![result](https://github.com/magic3org/example-nodejs-frontend/blob/images/screen1.png)
![result](https://github.com/magic3org/example-nodejs-frontend/blob/images/screen2.png)

## Configration
Edit db connection to Magic3 Database in server/env/development.json file.  
server/env/development.jsonファイルを編集して、連携するMagic3のDBへ接続する設定にしてください。

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
