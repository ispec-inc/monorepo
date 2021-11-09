---
to: "pages/<%= path %>/index.vue"
---
<template>
  <div class="<%= h.changeCase.paramCase(name) %>-page"></div>
</template>

<style lang="scss" scoped>
// .<%= h.changeCase.paramCase(name) %>-page {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class <%= h.changeCase.pascalCase(name) %>Page extends Vue {}
</script>
