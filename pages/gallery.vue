<template>
  <v-container>
    <!-- エラーメッセージ出力 -->
    <v-alert type="warning" :value="true" dismissible v-if="errMessage">{{ errMessage }}</v-alert>
    <v-layout row wrap>
      <v-flex v-for="item in list" :key="item.index" xs4 d-flex>
          <v-card flat tile class="d-flex" :to="`/blog/${item.id}`">
            <v-img :src="item.thumb" :lazy-src="item.thumb" aspect-ratio="1" class="grey lighten-2">
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
          </v-card>
      </v-flex>
      <no-ssr><infinite-loading @infinite="infiniteHandler"><span slot="no-more"></span><span slot="no-results"></span></infinite-loading></no-ssr>
    </v-layout>
  </v-container>
</template>
<style>
.blog-list a.v-list__tile.v-list__tile--link {
  height:120px;
}
.blog-list .v-list__tile__avatar {
  width: 100px;
}
</style>
<script>
import InfiniteLoading from 'vue-infinite-loading'
import moment from 'moment'

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
    return app.$axios.get('/api/blog/gallery', {
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
      this.$axios.get('/api/blog/gallery', {
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
  filters: {
    dateFormat: function (value) {
      if (!value) return ''
      return moment(value).format("YYYY年MM月DD日 HH:mm")
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