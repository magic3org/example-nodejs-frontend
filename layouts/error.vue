<template>
  <v-container fill-height>
    <v-layout align-center justify-center column>
      <h1 v-if="error.statusCode === 404">Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['error'],
  //layout: 'blog' // you can set a custom layout for the error page
}
</script>