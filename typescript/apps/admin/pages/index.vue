<template>
  <div>
    <div>トップ</div>
    <div>
      {{ articleList }}
    </div>
    <v-btn @click="addSuccessSnackbar">add success snackbar</v-btn>
    <v-btn @click="addErrorSnackbar">add error snackbar</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import articleModule from '@/store/article'
import { GlobalEventBus } from '~/surface/event-bus/global'

@Component({})
export default class TopPage extends Vue {
  created() {
    articleModule.fetch()
  }

  get articleList() {
    return articleModule.articles
  }

  addSuccessSnackbar() {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({ message: 'sample', type: 'success' })
  }

  addErrorSnackbar() {
    GlobalEventBus.getInstance().dispatchSnackbarEvent({ message: 'error', type: 'error' })
  }
}
</script>
