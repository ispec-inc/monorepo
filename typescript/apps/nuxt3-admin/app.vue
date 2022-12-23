<template>
  <v-container>
    <div class="d-flex align-center flex-column">
      <v-img width="300" :aspect-ratio="1" :src="imageUrl ?? ''" />

      <v-file-input
        ref="fileInputEl"
        @input="detectInputAndUpdateState"
        @click:clear="clearInput"
        accept="image/png, image/jpeg, image/bmp"
        class="w-100"
        placeholder="画像を選択"
        prepend-icon="mdi-image"
        label="画像"
      ></v-file-input>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
const fileInputEl = ref<HTMLInputElement | null>(null)

const { detectInputAndUpdateState, clearInput, imageUrl } = useFileInput(fileInputEl)
</script>