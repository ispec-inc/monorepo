import { FormInputModule } from "./module";

export class FormImageInputModule extends FormInputModule<string> {
  private _isFetching: boolean
  private _file: File | undefined

  constructor(label: string, value: string, rules?: string[]) {
    super(label, value, 'image', rules || [])
    this._isFetching = false
    this.setImageFile(value)
  }

  get isFetching(): boolean {
    return this._isFetching
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

  clear(): void {
    this.file = undefined
  }

  private setImageFile(url: string) {
    if (url === '') {
      this.file = undefined
      return
    }
    this._isFetching = true
    const fileName = url.split('/').slice(-1)[0]
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => new File([blob], fileName))
      .then((file) => {
        this.file = file
        this._isFetching = false
      })
  }
}