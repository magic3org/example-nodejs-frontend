<template>
  <v-toolbar dark color="primary" app fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <nuxt-link to="/"><v-toolbar-title class="white--text">Title</v-toolbar-title></nuxt-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
       <v-tooltip bottom>
        <v-btn to="/list" class="primary" flat slot="activator"><v-icon>fa-list</v-icon></v-btn>
        <span>リスト表示</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn to="/upload" class="primary" flat slot="activator"><v-icon>fa-file-upload</v-icon></v-btn>
        <span>アップロード</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn to="/process" class="primary" flat slot="activator">プロセス起動</v-btn>
        <span>プロセス起動</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn to="/blog" class="primary" flat slot="activator">ブログ</v-btn>
        <span>ブログ</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn to="/hello" class="primary" flat slot="activator">会員専用</v-btn>
        <span>会員専用画面</span>
      </v-tooltip>
    </v-toolbar-items>

    <!-- モーダル画面のデザイン -->
    <v-dialog v-model="showDialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
      <v-card tile>
        <v-toolbar card dark color="primary">
          
          <v-toolbar-title>モーダル表示</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="showDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-content>
        履歴管理されないページ
        </v-content>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showDialog2" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">同意の確認</v-card-title>
        <v-card-text>●●に同意しますか?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="showDialog2 = false">同意しない</v-btn>
          <v-btn color="green darken-1" flat @click="showDialog2 = false">同意</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>
//import AboutModal from '~/components/AboutModal.vue'

export default {
  components: {
  },
  data () {
    return {
      showDialog: false,
      showDialog2: false
    }
  }
}
</script>
