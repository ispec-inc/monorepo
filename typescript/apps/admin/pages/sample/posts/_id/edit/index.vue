<template>
  <div>
    <h2 class="mb-6">Edit Post</h2>
    <v-card :loading="isAwaiting" :disabled="isAwaiting">
      <v-card-text>
        <v-form v-model="valid">
          <v-text-field v-model="title" :rules="rules" label="title" />
          <v-text-field v-model="body" :rules="rules" label="body" />
        </v-form>
        <v-card-actions>
          <v-spacer />
          <v-btn
            class="primary"
            :disabled="!valid || isAwaiting"
            @click="submit"
            >submit</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
// .post-edit-page {}
</style>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import UseSubscription from '~/components/mixins/use-subscription'
import { SampleUpdatePageService } from '~/core/service/sample/update'
import { SampleUpdatePageUsecasesImpl } from '~/core/service/sample/update/usecases'
import { GlobalEventBus } from '~/surface/event-bus/global'

const SERVICE = new SampleUpdatePageService(new SampleUpdatePageUsecasesImpl())

@Component({
  components: {},
})
export default class PostEditPage extends mixins(UseSubscription) {
  readonly service = SERVICE

  valid = false

  title = ''
  body = ''

  readonly rules: Array<(value: string) => string | boolean> = [
    (v: string): string | boolean => !!v || 'required',
  ]

  get id(): number {
    return Number(this.$route.params.id)
  }

  created(): void {
    this.subscription.add(
      this.service.errorStream.subscribe((message) => {
        GlobalEventBus.getInstance().dispatchSnackbarEvent({
          type: 'error',
          message,
        })
      })
    )

    this.service.fetch(this.id).then((model) => {
      if (model) {
        this.title = model.title
        this.body = model.body
        return
      }

      this.$router.push(this.$pagesPath.sample.posts.$url())
    })
  }

  submit(): void {
    this.service.update(this.id, this.title, this.body).then(() => {
      this.$router.push(this.$pagesPath.sample.posts.$url())
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'success',
        message: '投稿の更新に成功しました',
      })
    })
  }

  get isAwaiting(): boolean {
    return this.service.isAwaiting
  }
}
</script>
