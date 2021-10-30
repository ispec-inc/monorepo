---
to: "components/<%= path %>/<%= h.changeCase.paramCase(name) %>/index.vue"
---
<template>
  <div class="<%= h.changeCase.paramCase(name) %>"></div>
</template>

<style lang="scss" scoped>
// .<%= h.changeCase.paramCase(name) %> {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {}
})
export default class <%= h.changeCase.pascalCase(name) %> extends Vue {}
</script>
