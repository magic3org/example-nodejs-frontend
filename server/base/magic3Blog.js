/**
 * Magic3ブログ機能クラス
 *
 * @author Naoki Hirata
 * @since  2019/2/26
 */
const Magic3Env = require(`${appRoot}/server/base/magic3Env`)
const CF_ENTRY_DEFAULT_IMAGE = 'entry_default_image' // 記事デフォルト画像
const CF_THUMB_TYPE = 'thumb_type' // サムネールタイプ定義
const PARSE_IMAGE_FORMAT_TYPE = /(.*?)\s*=\s*(\d+)(.*)\.(gif|png|jpg|jpeg|bmp)$/i // 画像フォーマットタイプ解析用
const BLOG_THUMB_DIR = '/etc/blog/thumb/' // ブログコンテンツ用サムネールディレクトリ

/**
   * 静的プロパティ
   */
//this.constructor.thumbTypeDefArray = [] // サムネールタイプ定義

class Magic3Blog {
  /**
   * アイキャッチ用画像のURLを取得
   *
   * @since  2019/2/26
   * @access public
   * @param  {string} filenames        作成済みファイル名(「;」区切り)
   * @param  {string} thumbType        サムネール画像タイプ(s,m,l)(タイプ指定の場合)
   * @param  {string} defaultImage     サムネール画像がない場合のデフォルト画像
   * @return {string}                  画像URL
   */
  static getEyecatchImageUrl (filenames, thumbType = '', defaultImage = '') {
    let thumbUrl = ''

    // 作成済みの画像ファイルがない場合は記事デフォルト画像を使用
    if (empty(filenames)) {
      if (empty(defaultImage)) { // デフォルト画像が設定されていない場合はシステムのデフォルト画像を取得
        filenames = Magic3Env.getBlogConfigValue(CF_ENTRY_DEFAULT_IMAGE)
      } else {
        thumbUrl = Magic3Env.getResourceUrl() + defaultImage
      }
    }

    if (!empty(filenames)) {
      let thumbFilename = ''

      // デフォルトファイル名取得
      let thumbFilenameArray = filenames.split(';')
      let defaultThumbFilename = thumbFilenameArray[thumbFilenameArray.length - 1] // 最大サイズをデフォルト画像とする

      // タイプ指定ありの場合は指定タイプの画像を取得
      if (!empty(thumbType)) {
        // サムネール画像タイプ定義を解析(初回のみ)
        if (empty(Magic3Blog.thumbTypeDefArray)) {
          const thumbTypeDef = Magic3Env.getBlogConfigValue(CF_THUMB_TYPE) // サムネールタイプ定義
          Magic3Blog.thumbTypeDefArray = this._parseFormatType(thumbTypeDef) // サムネールタイプ定義を解析
        }

        // 指定されたタイプの画像を取得
        const filenameTail = Magic3Blog.thumbTypeDefArray[thumbType]
        if (filenameTail) {
          // コンテンツIDを取得
          const filenameParts = defaultThumbFilename.split('_')
          const contentId = filenameParts[0]

          const thumbTypeFilename = contentId + '_' + filenameTail
          if (thumbFilenameArray.includes(thumbTypeFilename)) thumbFilename = thumbTypeFilename
        }
      }

      // 画像が取得できなかった場合はデフォルト画像を設定
      if (empty(thumbFilename)) thumbFilename = defaultThumbFilename

      // アイキャッチ用画像のURL作成
      thumbUrl = Magic3Env.getResourceUrl() + BLOG_THUMB_DIR + thumbFilename
    }

    return thumbUrl
  }
  /**
   * 画像フォーマットタイプを解析
   *
   * @since  2019/2/27
   * @access private
   * @param  {string} formatStr 画像フォーマット
   * @return {Object}           フォーマットタイプの連想配列
   */
  static _parseFormatType (formatStr) {
    // フォーマットを読み込む
    let typeArray = {}
    const lines = formatStr.split(';')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!empty(line)) {
        const matches = PARSE_IMAGE_FORMAT_TYPE.exec(line)
        if (matches) {
          const imageType = matches[1]
          const imageFormat = matches[2] + matches[3].toLowerCase() + '.' + matches[4].toLowerCase()
          if (!empty(imageType)) typeArray[imageType] = imageFormat
        }
      }
    }
    return typeArray
  }
}
module.exports = Magic3Blog
