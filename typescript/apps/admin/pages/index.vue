<template>
  <div>
    <v-btn @click="addSuccessSnackbar">add success snackbar</v-btn>
    <v-btn @click="addErrorSnackbar">add error snackbar</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { GlobalEventBus } from '~/surface/event-bus/global'

@Component({})
export default class TopPage extends Vue {
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
