export interface ResourceDetail {
    label: string;
    value: string;
    isUrl?: boolean;
}
export default class Resource {
    id: number;
    constructor(id: number);
    get itemName(): string;
}
