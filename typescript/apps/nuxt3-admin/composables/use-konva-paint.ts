import Konva from "konva"
import { Ref } from "vue"

export namespace KonvaPaintModeEnum {
  export const Values = {
    white: 1,
    black: 2,
    eraser: 3,
  } as const

  export type Type = typeof Values[keyof typeof Values]
}

type UseKonvaPaintResult = {
  mode: Readonly<Ref<KonvaPaintModeEnum.Type>>
  setup(stage: Konva.Stage): void
  clear(): void
  changePaintMode(value: KonvaPaintModeEnum.Type): void
}


export type UseKonvaPaint = {
  (): UseKonvaPaintResult
}

const useKonvaPaint: UseKonvaPaint = () => {
  const isPaint = ref(false)
  const mode = ref<KonvaPaintModeEnum.Type>(KonvaPaintModeEnum.Values.white)
  const lastLine = ref<Konva.Line | null>(null)
  const layer: Ref<Konva.Layer> = ref(new Konva.Layer()) as Ref<Konva.Layer>

  const setup = (stage: Konva.Stage) => {
    stage.add(layer.value)

    stage.on('mousedown touchstart', function (e) {
      isPaint.value = true;
      const pos = stage.getPointerPosition();

      if (pos === null) {
        return
      }

      const line = new Konva.Line({
        stroke: mode.value === KonvaPaintModeEnum.Values.black ? '#000' : '#fff',
        strokeWidth: 8,
        globalCompositeOperation:
          mode.value === KonvaPaintModeEnum.Values.eraser ? 'destination-out' : 'source-over',
        lineCap: 'round',
        lineJoin: 'round',
        points: [pos.x, pos.y, pos.x, pos.y],
      })

      lastLine.value = line

      layer.value.add(line)
    });

    stage.on('mouseup touchend', function () {
      isPaint.value = false
    });

    stage.on('mousemove touchmove', function (e) {
      if (!isPaint.value) {
        return;
      }

      e.evt.preventDefault();

      const pos = stage.getPointerPosition()

      if (pos === null || lastLine.value === null) {
        return
      }

      const newPoints = lastLine.value.points().concat([pos.x, pos.y]);
      lastLine.value.points(newPoints)
    })
  }

  const clear = () => {
    layer.value.destroyChildren()
  }

  const changePaintMode = (value: KonvaPaintModeEnum.Type) => {
    mode.value = value
  }

  return {
    mode,
    setup,
    clear,
    changePaintMode
  }
}

export default useKonvaPaint