import FormGroupModule from './form-group';
import FormImageInputModule from './form-image-input';
import FormSwitchInputModule from './form-switch-input';
export default class FormModule {
    constructor(inputs) {
        this.inputs = inputs;
        this.inputs.forEach((input) => {
            if (input instanceof FormGroupModule) {
                if (this.tabs === undefined) {
                    this.tabs = [];
                }
                this.tabs.push(input.label);
            }
        });
    }
    clear() {
        for (const input of this.inputs) {
            input.clear();
        }
    }
    formValue() {
        let value = {};
        this.inputs.forEach((input) => {
            value = Object.assign(value, this.createFormValue(input));
        });
        return value;
    }
    createFormValue(input) {
        let value = {};
        if (input instanceof FormGroupModule) {
            input.inputs.forEach((childInput) => {
                value = Object.assign(value, this.createFormValue(childInput));
            });
        }
        else if (input instanceof FormImageInputModule) {
            value[input.key] = input.file;
        }
        else if (input instanceof FormSwitchInputModule) {
            value = Object.assign(value, input.getValueAll());
        }
        else {
            value[input.key] = input.value;
        }
        return value;
    }
    get isConstructedFormGroups() {
        return this.tabs !== undefined;
    }
}
