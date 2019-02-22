<template>
<v-container>
  <div>
    <h2 class="subtitle">
      {{ blogname }}
    </h2>
    <div v-html="bloghtml"></div>
  </div>
  <v-footer app>
    <v-layout justify-center row wrap>
      <v-flex primary lighten-1 py-3 text-xs-center white--text xs12>
        &copy;2018 — <strong>Sample</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</v-container>
</template>
<script>
export default {
  validate ({ params }) {
    // ブログIDは数値のみ許可
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      blogid: '',
      blogname: '',
      bloghtml: '',
      formError: null
    }
  },
  // 画面表示データ取得
  asyncData ({ app, params, error }) {
    // IDでブログ記事を取得
    return app.$axios.get(`/api/blog/detail/${params.id}`).then((res) => {
      if (res.data.code === 404) {
        error({ statusCode: 404 })
        return
      }
      return { status: res.data.ok, blogid: res.data.id, blogname: res.data.name, bloghtml: res.data.html }
    }).catch((e) => {
      error({ statusCode: 500 })
    })
  },
}
</script>