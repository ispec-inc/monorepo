<template>
  <v-container class="info-container py-6">
    <v-row
      v-for="item of items"
      :key="item.label"
      no-gutters
      class="info-container__row"
    >
      <v-col class="subtitle-2 font-weight-bold">
        {{ item.label }}:
      </v-col>
      <v-col class="subtitle-2 font-weight-regular">
        <template v-if="item.isUrl">
          <a :href="item.value">{{ item.value }}</a>
        </template>
        <template v-else>
          {{ item.value }}
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.info-container {
  max-width: 600px;

  &__row:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Resource } from '@monorepo/fast-form'

@Component({})
export default class SimpleData extends Vue {
  @Prop({ type: Array, default: [] }) readonly items!: Resource[]
}
</script>
