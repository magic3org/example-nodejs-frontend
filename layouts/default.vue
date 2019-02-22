<template>
  <v-app>
    <MainToolbar/>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import MainToolbar from '~/components/MainToolbar.vue'

export default {
  components: {
    MainToolbar,
  },
  mounted() {
    // 戻るボタンで戻った場合、スクロース位置を再現する
    if (process.client && window) {
      window.history.scrollRestoration = 'auto';
    }
  }
}
</script>