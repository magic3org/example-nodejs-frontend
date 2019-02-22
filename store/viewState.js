export const state = () => ({
  blogListYPos: 0
})

export const mutations = {
  SET_BLOG_LIST_POS: function (state, { yPos }) {
    state.blogListYPos = yPos
  }
}

export const actions = {
  updateBlogListPos ({ commit }, yPos) {
    commit('SET_BLOG_LIST_POS', { yPos: yPos })
  }
}
