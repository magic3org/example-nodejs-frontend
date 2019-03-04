export const actions = {
  /**
   * 初期データ取得(nuxtServerInit()はindex.jsのみ実行可能)
   *
   * @since  2019/3/3
   * @access public
   * @param  {function} commit データコミット用関数
   * @param  {Object}   req    リクエストオブジェクト
   */
  async nuxtServerInit ({ commit }, { req }) {
    // ユーザ情報取得
    if (req.session && req.session.authUser) {
      commit('userInfo/SET_USER', req.session.authUser)
    }

    // ストア初期化データ取得
    const { data } = await this.$axios.get('/api/site/info') // サイト情報取得
    commit('viewState/INIT_SITE_INFO', { data: data })
  },
  launch ({ commit }) {
    return fetch('/api/process/launch', {
      // クライアントのクッキーをサーバーに送信
      credentials: 'same-origin',
      method: 'GET'
    }).then(() => {
      console.log('process end...')
    })
  }
}
