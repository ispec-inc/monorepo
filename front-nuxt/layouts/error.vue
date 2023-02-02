<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types'

@Component({})
export default class ErrorLayout extends Vue {
  @Prop() error!: NuxtError

  readonly pageNotFound = '404 Not Found'
  readonly otherError = 'An error occurred'

  head(): { title: string } {
    return {
      title:
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError,
    }
  }
}
</script>
