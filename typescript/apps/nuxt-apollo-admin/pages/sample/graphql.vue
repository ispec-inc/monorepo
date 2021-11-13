<template>
  <div>
    <div>
      <v-card class="mb-4">
        <v-card-title>GraphQL Sample Page</v-card-title>
        <v-divider></v-divider>
        <div>
          <v-card-text v-for="article in articles" :key="article.id">
            <div class="body-1">title: {{ article.title }}</div>
            <div class="body-1">body: {{ article.body }}</div>
          </v-card-text>
        </div>
      </v-card>
    </div>

    <div>
      <v-card class="mb-4">
        <v-card-title>登録</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <resource-form
            :form="form"
            :is-post="true"
            @submit="submit"
          ></resource-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import 'vue-apollo'
import getArticles from '~/apollo/queries/articles.gql'
import CreateArticle from '~/apollo/mutations/articles.gql'
import { ArticleForm } from '~/form-providers/article-form'
import ResourceForm from '~/components/common/resource-form.vue'
import BeforeUnloadGuardMixin from '~/components/mixins/beforeunload-guard'

@Component({
  components: {
    ResourceForm,
  },
})
export default class GraphqlPage extends mixins(BeforeUnloadGuardMixin) {
  articles: {}[] = []

  form = ArticleForm.provideModule()

  created() {
    this.$apollo
      .query({
        query: getArticles,
      })
      .then((res) => {
        this.articles = res.data.articles
      })
  }

  submit(value: ArticleForm.AsObject) {
    try {
      const res = this.$apollo.mutate({
        mutation: CreateArticle,
        variables: {
          title: value.title,
          body: value.body,
        },
      })
      if (res) {
        console.log(res)
      } else {
        console.log('no res')
      }
    } catch (err) {
      console.log(err)
    }

    location.reload()
  }
}
</script>
