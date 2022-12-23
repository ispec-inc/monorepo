import { Ref } from "vue"

type UseFileInputResult = {
  detectInputAndUpdateState(): void
  clearInput(): void
  file: Ref<File | null>
  imageUrl: Ref<string | null>
}

export type UseFileInput = {
  (inputElementRef: Ref<HTMLInputElement | null>): UseFileInputResult
}

const useFileInput: UseFileInput = (inputElementRef) => {
  const file = ref<File | null>(null)
  const imageUrl = computed<string | null>(() => {
    return file.value === null ? null : URL.createObjectURL(file.value)
  })

  const detectInputAndUpdateState = () => {
    if (inputElementRef.value === null) {
      return
    }

    const files = inputElementRef.value.files

    if (files === null) {
      return
    }

    if (files.length < 1) {
      return
    }

    const f = files[0]
    file.value = f
  }

  const clearInput = () => {
    file.value = null
  }

  return {
    detectInputAndUpdateState,
    clearInput,
    file,
    imageUrl
  }
}

export default useFileInput