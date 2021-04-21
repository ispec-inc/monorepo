import FormInputModule from './form-input'

export default class FormImageInputModule extends FormInputModule<string> {
  private _file: File | undefined = undefined

  public isFetching = false

  constructor(label: string, imageUrl: string, key: string) {
    super(label, '', 'image', key, 'required')
    this.setImageFile(imageUrl)
  }

  set file(value: File | undefined) {
    this._file = value

    if (value === undefined) {
      this.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target === null || e.target.result === null) {
        return
      }
      this.value = e.target.result.toString()
    }
    reader.readAsDataURL(value)
  }

  get file(): File | undefined {
    return this._file
  }

  setImageFile(url: string) {
    if (url === '') {
      this.file = undefined
      return
    }
    this.isFetching = true
    const fileName = url.split('/').slice(-1)[0]
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], fileName))
      .then((file) => {
        this.file = file
        this.isFetching = false
      })
  }

  clear() {
    this.file = undefined
  }
}
