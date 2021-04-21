import FormInputModule from './form-input';
export default class FormImageInputModule extends FormInputModule {
    constructor(label, imageUrl, key) {
        super(label, '', 'image', key, 'required');
        this._file = undefined;
        this.isFetching = false;
        this.setImageFile(imageUrl);
    }
    set file(value) {
        this._file = value;
        if (value === undefined) {
            this.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target === null || e.target.result === null) {
                return;
            }
            this.value = e.target.result.toString();
        };
        reader.readAsDataURL(value);
    }
    get file() {
        return this._file;
    }
    setImageFile(url) {
        if (url === '') {
            this.file = undefined;
            return;
        }
        this.isFetching = true;
        const fileName = url.split('/').slice(-1)[0];
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => new File([blob], fileName))
            .then((file) => {
            this.file = file;
            this.isFetching = false;
        });
    }
    clear() {
        this.file = undefined;
    }
}
