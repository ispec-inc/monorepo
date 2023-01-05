import Konva from "konva"
import { Ref } from "vue"
import { KonvaFilter } from "~/types/konva-filter"
import rgbToHsv from '@fantasy-color/rgb-to-hsv'
import hsvToRgb from '@fantasy-color/hsv-to-rgb'

const ATTR_KEY = 'highlight'

type UseKonvaFilterHighlightResult = {
  highlight: Ref<number>
}

export type UseKonvaFilterHighlight = {
  (imageRef: Ref<Konva.Image | null>): UseKonvaFilterHighlightResult
}

const useKonvaFilterHighlight: UseKonvaFilterHighlight = (imageRef) => {
  const highlight = computed({
    get: () => {
      const value = imageRef.value?.getAttr(ATTR_KEY)

      return typeof value === 'number' ? value : 0
    },
    set: (v) => {
      imageRef.value?.setAttr(ATTR_KEY, v)
      imageRef.value?.cache()
    }
  })

  return {
    highlight
  }
}

export const HighlightFilter: KonvaFilter = function(imageData) {
  const pixels = imageData.width * imageData.height
  const value = typeof this.getAttr(ATTR_KEY) === 'number' ? Math.max(Math.min(this.getAttr(ATTR_KEY), 1), 0) : 0
  const data = imageData.data

  if (value === 0) {
    return this._filterUpToDate = false
  }

  for (let i = 0; i < pixels; i++) {
    const rIndex = i * 4
    const gIndex = i * 4 + 1
    const bIndex = i * 4 + 2

    const hsv = rgbToHsv({
      red: data[rIndex],
      green: data[gIndex],
      blue: data[bIndex]
    })

    if (hsv.value <= 50) {
      continue
    }

    const rgb = hsvToRgb({
      hue: hsv.hue,
      saturation: hsv.saturation,
      value: hsv.value * (1 - value)
    })

    imageData.data[rIndex] = rgb.red, 255
    imageData.data[gIndex] = rgb.green, 255
    imageData.data[bIndex] = rgb.blue, 255
  }

  this._filterUpToDate = false
}

export default useKonvaFilterHighlight