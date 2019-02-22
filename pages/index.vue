<template>
<v-container>
  <div>
    <v-btn color="success">Success</v-btn>
    <v-btn color="error">Error</v-btn>
    <v-btn color="warning">Warning</v-btn>
    <v-btn color="info">Info</v-btn>
    テキスト表示
    
    <v-icon>fa-lock</v-icon>
    <v-btn icon><v-icon>arrow_right</v-icon></v-btn>
    <v-btn icon><v-icon>fa-lock</v-icon></v-btn>
    <v-btn icon><v-icon>mdi-anchor</v-icon></v-btn>
    |<v-icon>anchor</v-icon>
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
  // ライフライクルイベント
  beforeCreate () {
    console.log('#beforeCreate - サーバクライアント共通イベント')
  },
  created () {
    console.log('#created - サーバクライアント共通イベント')
  },
  mounted(){
    console.log('#mounted - クライアント専用イベント')
    //alert(this.$store.state.authUser); // or console.log(this.number) or {{ number }} in template
  },
}
</script>