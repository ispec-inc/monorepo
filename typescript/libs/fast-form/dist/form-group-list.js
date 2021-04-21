import { FormAbstructModule } from './form-abstruct-module';
import FormGroupModule from './form-group';
export default class FormGroupListModule extends FormAbstructModule {
    constructor(groups, key, template, label) {
        super();
        this.groups = groups;
        this.key = key;
        this.groupTemplate = template;
        this.type = 'list';
        this.label = label;
        this.openPanelIds = [];
    }
    clear() {
        this.groups = [];
    }
    get value() {
        return this.groups.map((group) => {
            return group.value;
        });
    }
    appendNewGroup() {
        const newGroup = new FormGroupModule(this.groupTemplate.inputsProvider(), this.groupTemplate.headingProvider);
        this.groups.push(newGroup);
    }
    removeGroupByIndex(index) {
        this.groups = this.groups.filter((_, i) => i !== index);
        this.openPanelIds = this.openPanelIds.filter((id) => id !== index);
        this.openPanelIds = this.openPanelIds.map((id) => {
            if (id > index) {
                return id - 1;
            }
            return id;
        });
    }
}
