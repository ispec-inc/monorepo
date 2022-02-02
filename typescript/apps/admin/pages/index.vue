<template>
  <div>
    <div>トップ</div>
    <div class="my-10">
      <div v-for="p of posts" :key="p.id" class="my-6">
        <div>「{{ p.title }}」</div>
        <div>{{ p.body }}</div>
      </div>
    </div>
    <v-btn @click="addSuccessSnackbar">add success snackbar</v-btn>
    <v-btn @click="addErrorSnackbar">add error snackbar</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { GlobalEventBus } from '~/surface/event-bus/global'
import { SampleListPageService } from '~/core/service/sample/list'
import { SampleListGatewayHubImpl } from '~/core/service/sample/list/hub'
import { ISamplePostModel } from '~/core/model/sample/interface'

const SERVICE = new SampleListPageService(new SampleListGatewayHubImpl())

@Component({})
export default class TopPage extends Vue {
  readonly service = SERVICE

  created(): void {
    this.service.fetch()
  }

  get posts(): ISamplePostModel[] {
    return this.service.filteredPosts
  }

  addSuccessSnackbar(): void {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'sample',
      type: 'success',
    })
  }

  addErrorSnackbar(): void {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({
      message: 'error',
      type: 'error',
    })
  }
}
</script>
