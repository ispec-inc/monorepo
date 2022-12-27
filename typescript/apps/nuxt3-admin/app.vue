<template>
  <v-container>
    <div class="d-flex align-center flex-column">
      <div class="d-flex align-center flex-row">
        <v-img width="300" :aspect-ratio="1" :src="imageUrl ?? ''" class="mr-4" />

        <div id="con" class="stage-container"></div>
      </div>

      <v-file-input
        ref="fileInputEl"
        @input="onInputImage"
        @click:clear="onClearImage"
        accept="image/png, image/jpeg, image/bmp"
        class="w-100"
        placeholder="画像を選択"
        prepend-icon="mdi-image"
        label="画像"
      ></v-file-input>

      <div class="d-flex flex-column align-start w-100">
        <div class="text-caption">色調</div>
        <v-slider v-model="imageHue" class="w-100" :min="0" :max="359" color="primary" track-color="black"></v-slider>
      </div>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.stage-container {
  width: 300px;
  height: 300px;
}
</style>

<script lang="ts" setup>
import Konva from 'konva';

const MAX_IMAGE_WIDTH = 300
const MAX_IMAGE_HEIGHT = 300

const fileInputEl = ref<HTMLInputElement | null>(null)
const { detectInputAndUpdateState, clearInput, imageUrl } = useFileInput(fileInputEl)
const { initKonva, setImageSrc, stage, imageObj, image } = useKonvaForImage()
const imageHue = computed({
  get: () => image.value?.hue() ?? 0,
  set: (v) => image.value?.hue(v)
})

onMounted(() => {
  initKonva({
    container: 'con',
    width: MAX_IMAGE_WIDTH,
    height: MAX_IMAGE_HEIGHT,
  })
})

async function onInputImage(): Promise<void> {
  detectInputAndUpdateState()
  if (imageUrl.value === null) {
    return
  }

  await setImageSrc(imageUrl.value)

  if (stage.value === null || imageObj.value === null || image.value === null) {
    return
  }

  const widthRatio = stage.value.width() / imageObj.value.width
  const heightRatio = stage.value.height() / imageObj.value.height
  const bestRatio = Math.min(widthRatio, heightRatio)
  image.value.scale({ x: bestRatio, y: bestRatio })

  image.value.position({
    x: stage.value.width() / 2 - imageObj.value.width * bestRatio / 2,
    y: stage.value.height() / 2 - imageObj.value.height * bestRatio / 2
  })
}

function onClearImage(): void {
  clearInput()
  setImageSrc()
}

</script>