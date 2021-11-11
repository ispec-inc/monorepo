<template>
  <div>
    <div>GraphQL Sample Page</div>
    <div>
      {{ articles }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import 'vue-apollo'
import { getArticles } from '~/apollo/articles.gql'

@Component({
  apollo: {
    articles: {
      query: getArticles,
      prefetch: true,
    },
  },
})
export default class GraphqlPage extends Vue {
  articles: {}[] = []

  created() {
    console.log(this.articles)
  }
}
</script>
