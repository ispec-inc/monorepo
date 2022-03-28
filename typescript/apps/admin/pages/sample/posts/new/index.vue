<template>
  <div>
    <h2 class="mb-6">Create Post</h2>
    <v-card :loading="service.isAwaiting" :disabled="service.isAwaiting">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="title" :rules="rules" label="title" />
          <v-text-field v-model="body" :rules="rules" label="body" />
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            :disabled="!valid || service.isAwaiting"
            @click="submit"
            >submit</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
// .post-create-page {}
</style>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import UseSubscription from '~/components/mixins/use-subscription'
import ErrorModel from '~/core/models/error'
import { SamplePostCreateRepositoryImpl } from '~/core/repositories/sample/post/create'
import { SampleCreatePageService } from '~/core/services/sample/create'
import { GlobalEventBus } from '~/surface/event-bus/global'

@Component({
  components: {},
})
export default class PostCreatePage extends mixins(UseSubscription) {
  readonly service = new SampleCreatePageService({
    create: new SamplePostCreateRepositoryImpl(),
  })

  valid = false

  title = ''
  body = ''

  readonly rules: Array<(value: string) => string | boolean> = [
    (v: string): string | boolean => !!v || 'required',
  ]

  submit(): void {
    this.service
      .create(1, this.title, this.body)
      .then(() => {
        this.$router.push(this.$pagesPath.sample.posts.$url())
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'success',
          message: '投稿の作成に成功しました',
        })
      })
      .catch((err) => {
        const { message } = new ErrorModel(err)
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'error',
          message,
        })
      })
  }
}
</script>
