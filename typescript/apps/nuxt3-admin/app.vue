<template>
  <v-container>
    <div class="d-flex align-center flex-column pa-12">
      <div class="d-flex align-end flex-row mb-10">
        <v-img width="300" :aspect-ratio="1" :src="imageUrl ?? ''" class="mr-4 image-container" />

        <div class="d-flex flex-column align-start">
          <div class="d-flex justify-space-between w-100">
            <v-btn-toggle v-model="paintMode" mandatory variant="outlined" class="mb-2">
              <v-btn size="small" :value="KonvaPaintModeEnum.Values.white">
                <v-icon>mdi-circle-outline</v-icon>
              </v-btn>

              <v-btn size="small" :value="KonvaPaintModeEnum.Values.black">
                <v-icon>mdi-circle</v-icon>
              </v-btn>

              <v-btn size="small" :value="KonvaPaintModeEnum.Values.eraser">
                <v-icon>mdi-eraser</v-icon>
              </v-btn>
            </v-btn-toggle>

            <v-btn variant="outlined" size="small" height="48" class="clear-button" @click="clearPaint">
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
          <div id="con" class="stage-container image-container"></div>
        </div>
      </div>

      <v-file-input
        ref="fileInputEl"
        @click:clear="onClearImage"
        @update:model-value="onInputImage"
        accept="image/png, image/jpeg, image/bmp"
        class="w-100"
        placeholder="画像を選択"
        prepend-icon="mdi-image"
        label="画像"
      ></v-file-input>

      <div class="d-flex flex-column w-100 mt-15 manipulation-menu">
        <div class="d-flex flex-column align-start">
          <div class="text-caption">色調</div>
          <v-slider v-model="imageHue" class="w-100" :min="0" :max="359" color="primary" track-color="black" />
        </div>
        <div class="d-flex flex-column align-start">
          <div class="text-caption">明るさ</div>
          <v-slider v-model="imageBrightness" class="w-100" :min="-1" :max="1" :step="0.01" color="primary" track-color="black" />
        </div>
        <div class="d-flex flex-column align-start">
          <div class="text-caption">ハイライト</div>
          <v-slider v-model="highlight" class="w-100" :min="0" :max="1" :step="0.01" color="primary" track-color="black" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped lang="scss">
.stage-container {
  width: 300px;
  height: 300px;
}

.manipulation-menu {
  gap: 12px;
}

.image-container {
  border: solid 1px black;
}

.clear-button {
  border-color: rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>

<script lang="ts" setup>
import Konva from 'konva';
import { KonvaPaintModeEnum } from '~/composables/use-konva-paint';

const MAX_IMAGE_WIDTH = 300
const MAX_IMAGE_HEIGHT = 300
const FILTERS = [Konva.Filters.Brighten, Konva.Filters.HSL, HighlightFilter]

const fileInputEl = ref<HTMLInputElement | null>(null)
const { detectInputAndUpdateState, clearInput, imageUrl } = useFileInput(fileInputEl)
const { initKonva, setImageSrc, centeringImage, stage, imageObj, image } = useKonvaForImage()
const { mode, setup: setupPaintTool, changePaintMode, clear: clearPaint } = useKonvaPaint()
const { highlight } = useKonvaFilterHighlight(image)

const imageHue = computed({
  get: () => image.value?.hue() ?? 0,
  set: (v) => image.value?.hue(v)
})

const imageBrightness = computed({
  get: () => image.value?.brightness() ?? 0,
  set: (v) => image.value?.brightness(v)
})

const paintMode = computed({
  get: () => mode.value,
  set: (v) => changePaintMode(v)
})

onMounted(() => {
  const stage = initKonva({
    container: 'con',
    width: MAX_IMAGE_WIDTH,
    height: MAX_IMAGE_HEIGHT,
  })

  setupPaintTool(stage)
})

async function onInputImage(fs: File[]): Promise<void> {
  clearPaint()
  clearInput()

  if (fs.length === 0) {
    setImageSrc([])
    return
  }

  detectInputAndUpdateState()
  if (imageUrl.value === null) {
    return
  }

  await setImageSrc(FILTERS, imageUrl.value)

  if (stage.value === null || imageObj.value === null || image.value === null) {
    return
  }

  centeringImage(stage.value, image.value, imageObj.value)
}

function onClearImage(): void {
  clearInput()
  clearPaint()
  setImageSrc([])
}

</script>