export class FormModule {
    constructor(structure, order) {
        this.isSeparated = false;
        this.structure = structure;
        this.order = order;
    }
    getFormValue() {
        const entries = Object.entries(this.structure).map(([key, module]) => {
            return [key, module.value];
        });
        return Object.fromEntries(entries);
    }
    clear() {
        for (const k of this.order) {
            this.structure[k].clear();
        }
    }
    get inputs() {
        return this.order.map((o) => this.structure[o]);
    }
}
