<template>
  <v-container>
    <!-- エラーメッセージ出力 -->
    <v-alert type="warning" :value="true" dismissible v-if="errMessage">{{ errMessage }}</v-alert>
    <v-list two-line class="transparent">
      <v-list-tile v-for="item in list" :key="item.id" :to="`/blog/${item.id}`" class="blog-list">
        <v-list-tile-avatar size="80">
          <img :src="item.thumb">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-html="item.desc"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <no-ssr><infinite-loading @infinite="infiniteHandler"><span slot="no-more">ー ここで終了 ー</span></infinite-loading></no-ssr>
  </v-container>
</template>
<style>
.blog-list a.v-list__tile.v-list__tile--link {
  height:120px;
}
.blog-list .v-list__tile__avatar {
  margin-right: 5px;
}
</style>
<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 0,
      list: [],
      errMessage: null
    }
  },
  // 初回表示データ取得
  asyncData ({ app, params, error }) {
    // ブログ一覧を取得
    return app.$axios.get(`/api/blog`, {
      params: {
        page: 1,
      },
    }).then((res) => {
      if (res.data.code === 404) {
        error({ statusCode: 404 })
        return
      }
      return { list: res.data.list, page: 1 }
    }).catch((e) => {
      error({ statusCode: 500 })
    })
  },
  methods: {
    infiniteHandler($state) {
      this.$axios.get(`/api/blog`, {
        params: {
          page: this.page + 1,
        },
      }).then(({ data }) => {
        if (data.code === 200) {    // 一覧データを取得した場合
          if (data.list.length > 0) {
            this.page++
            this.list.push(...data.list)
            $state.loaded()
          }
        } else {    // 取得データなしの場合は終了
          $state.complete()
        }
      }).catch((e) => {
        $state.complete()
        this.errMessage = e.message
      })
    }
  },
  // ##### スクロール位置を保存 #####
  mounted(){
    setTimeout(() => {
      window.scrollTo(0, this.$store.state.viewState.blogListYPos);
   }, 100);
  },
  beforeDestroy: function () {
    this.$store.dispatch('viewState/updateBlogListPos', window.pageYOffset)
  }
}
</script>