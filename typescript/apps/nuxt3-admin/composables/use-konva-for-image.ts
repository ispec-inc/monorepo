import Konva from "konva"
import { Ref } from "vue"

type UseKonvaForImageResult = {
  initKonva(config: Konva.StageConfig): void
  setImageSrc(src?: string): Promise<void>
  stage: Ref<Konva.Stage | null>
  imageObj: Ref<HTMLImageElement | null>
  image: Ref<Konva.Image | null>
}

export type UseKonvaForImage = {
  (): UseKonvaForImageResult
}

const useKonvaForImage: UseKonvaForImage = () => {
  const stage: Ref<Konva.Stage | null> = ref(null)
  const imageObj: Ref<HTMLImageElement | null> = ref(null)
  const image: Ref<Konva.Image | null> = ref(null)
  const layer: Ref<Konva.Layer> = ref(new Konva.Layer()) as Ref<Konva.Layer>

  const initKonva = (config: Konva.StageConfig) => {
    stage.value = new Konva.Stage(config)
    stage.value.add(layer.value)
  }

  const setImageSrc = (src?: string): Promise<void> => {
    image.value?.destroy()

    return new Promise((resolve, reject) => {
      if (stage.value === null) {
        return
      }

      imageObj.value = new Image()
      imageObj.value.crossOrigin = ""
      const konvaImage = new Konva.Image({ image: imageObj.value })
      image.value = konvaImage
      layer.value.add(image.value as Konva.Image)

      imageObj.value.onload = (() => {
        if (image.value === null) {
          return reject()
        }
        image.value.cache()
        image.value.filters([Konva.Filters.HSL])
        resolve()
      })
      imageObj.value.onerror = ((e) => {
        reject(e)
      })

      if (src) {
        imageObj.value.src = src
      } else {
        imageObj.value.removeAttribute('src')
      }
    })
  }

  return {
    initKonva,
    setImageSrc,
    stage,
    imageObj,
    image,
  }
}

export default useKonvaForImage