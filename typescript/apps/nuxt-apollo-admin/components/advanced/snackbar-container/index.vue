<template>
  <transition-group
    tag="div"
    name="snackbar"
    class="snackbar-container d-flex flex-column pa-5 align-end"
  >
    <template v-for="s of snackbarList">
      <v-alert
        :key="s.id"
        :type="s.type"
        width="400px"
        class="snackbar-item"
        elevation="2"
      >
        {{ s.message }}
      </v-alert>
    </template>
  </transition-group>
</template>

<style lang="scss" scoped>
.snackbar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  gap: 8px;
  pointer-events: none;
  z-index: 100;
}

.snackbar {
  &-item {
    transition: all 0.3s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateY(-20px);
  }

  &-leave-to {
    transform: translateX(20px);
  }

  &-leave-active {
    position: relative;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { v4 as uuidv4 } from 'uuid'
import { ISnackbarConteiner, SnackbarData } from '~/types/snackbar-container'

@Component({})
export default class SnackbarContainer
  extends Vue
  implements ISnackbarConteiner {
  private snackbarList: SnackbarData[] = []

  addSnackbar(
    data: Omit<SnackbarData, 'id' | 'duration'>,
    duration: number = 3000
  ): void {
    const id = uuidv4()
    this.snackbarList = [
      {
        id,
        duration,
        ...data
      }
    ].concat(this.snackbarList)

    setTimeout(() => {
      this.snackbarList = this.snackbarList.filter(s => s.id !== id)
    }, duration)
  }
}
</script>
