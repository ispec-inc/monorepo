<template>
  <div>
    <h2 class="mb-6">Create Post</h2>
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
// .post-create-page {}
</style>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { SampleCreatePageService } from '~/core/service/sample/create'
import { SampleCreatePageUsecasesImpl } from '~/core/service/sample/create/usecases'
import { GlobalEventBus } from '~/surface/event-bus/global'

const SERVICE = new SampleCreatePageService(new SampleCreatePageUsecasesImpl())

@Component({
  components: {},
})
export default class PostCreatePage extends Vue {
  readonly service = SERVICE

  valid = false

  title = ''
  body = ''

  readonly rules: Array<(value: string) => string | boolean> = [
    (v: string): string | boolean => !!v || 'required',
  ]

  submit(): void {
    this.service.create(1, this.title, this.body).then(() => {
      this.$router.push(this.$pagesPath.sample.posts.$url())
      GlobalEventBus.getInstance().dispatchSnackbarEvent({
        type: 'success',
        message: '投稿の作成に成功しました',
      })
    })
  }

  get isAwaiting(): boolean {
    return this.service.isAwaiting
  }
}
</script>
