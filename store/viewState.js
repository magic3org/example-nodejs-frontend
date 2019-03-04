export const state = () => ({
  pageTitle: '', // 画面タイトル
  blogListYPos: 0
})

export const mutations = {
  /**
   * サイト情報初期化
   *
   * @since  2019/3/4
   * @access private
   * @param  {Object} state     ストア状態
   * @param  {Object} data      更新データ
   */
  INIT_SITE_INFO: function (state, { data }) {
    state.pageTitle = data.title
  },
  /**
   * ブログ一覧のスクロール位置保存
   *
   * @since  2019/3/4
   * @access private
   * @param  {Object} state     ストア状態
   * @param  {number} yPos      スクロール位置Y座標
   */
  SET_BLOG_LIST_POS: function (state, { yPos }) {
    state.blogListYPos = yPos
  }
}

export const actions = {
  /**
   * ブログ一覧のスクロール位置保存
   *
   * @since  2019/3/4
   * @access public
   * @param  {function} commit    コミット用関数
   * @param  {number}   yPos      スクロール位置Y座標
   */
  updateBlogListPos ({ commit }, yPos) {
    commit('SET_BLOG_LIST_POS', { yPos: yPos })
  }
}
