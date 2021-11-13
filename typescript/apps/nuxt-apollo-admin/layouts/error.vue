<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class error extends Vue {
  @Prop() error: Object

  pageNotFound: string = '404 Not Found'
  otherError: string = 'An error occurred'

  head(): void {
    const title = this.error.statusCode === 404
      ? this.pageNotFound
      : this.otherError

    return {
      title
    }
  }
}
</script>
