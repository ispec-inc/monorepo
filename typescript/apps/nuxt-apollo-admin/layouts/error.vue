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
import { NuxtError } from '@nuxt/types'

@Component({})
export default class Error extends Vue {
  @Prop() error?: NuxtError

  pageNotFound: string = '404 Not Found'
  otherError: string = 'An error occurred'

  head(): { title: string } {
    const title = this.error?.statusCode === 404
      ? this.pageNotFound
      : this.otherError

    return {
      title
    }
  }
}
</script>
