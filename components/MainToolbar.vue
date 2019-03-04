<template>
  <v-toolbar dark color="primary" app fixed>
    <nuxt-link to="/"><v-toolbar-title class="white--text">{{ $store.state.viewState.pageTitle }}</v-toolbar-title></nuxt-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-tooltip bottom>
        <v-btn to="/gallery" class="primary" flat slot="activator">ギャラリー</v-btn>
        <span>ギャラリー</span>
      </v-tooltip>
    </v-toolbar-items>
  </v-toolbar>
</template>
