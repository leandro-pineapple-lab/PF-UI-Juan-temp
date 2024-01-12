export class TagModel {
    name: string = '';
    isDeletable: boolean = false;
    isValid(): boolean {
        return this.name.length > 0;
    }
}