import Konva from "konva"
import { Ref } from "vue"
import { KonvaFilters } from '~/types/konva-filter'

type UseKonvaForImageResult = {
  initKonva(config: Konva.StageConfig): Konva.Stage
  setImageSrc(filters: KonvaFilters, src?: string): Promise<void>
  centeringImage(stage: Konva.Stage, image: Konva.Image, imageObj: HTMLImageElement): void
  stage: Ref<Konva.Stage | null>
  imageObj: Ref<HTMLImageElement | null>
  image: Ref<Konva.Image | null>
  layer: Ref<Konva.Layer>
}

export type UseKonvaForImage = {
  (): UseKonvaForImageResult
}

const useKonvaForImage: UseKonvaForImage = () => {
  const stage: Ref<Konva.Stage | null> = ref(null)
  const imageObj: Ref<HTMLImageElement | null> = ref(null)
  const image: Ref<Konva.Image | null> = ref(null)
  const layer: Ref<Konva.Layer> = ref(new Konva.Layer()) as Ref<Konva.Layer>

  const initKonva = (config: Konva.StageConfig): Konva.Stage => {
    const newStage = new Konva.Stage(config)
    stage.value = newStage
    stage.value.add(layer.value)

    return newStage
  }

  const setImageSrc = (filters: KonvaFilters, src?: string): Promise<void> => {
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
        image.value.filters(filters)

        console.log(image.value.getContext().getImageData(0, 0, image.value.width(), image.value.height()))
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

  const centeringImage = (stage: Konva.Stage, image: Konva.Image, imageObj: HTMLImageElement) => {
    const widthRatio = stage.width() / imageObj.width
    const heightRatio = stage.height() / imageObj.height
    const bestRatio = Math.min(widthRatio, heightRatio)
    image.scale({ x: bestRatio, y: bestRatio })

    image.position({
      x: stage.width() / 2 - imageObj.width * bestRatio / 2,
      y: stage.height() / 2 - imageObj.height * bestRatio / 2
    })
  }

  return {
    initKonva,
    setImageSrc,
    centeringImage,
    stage,
    imageObj,
    image,
    layer
  }
}

export default useKonvaForImage