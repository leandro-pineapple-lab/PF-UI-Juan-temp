export class MarketingCategoryModel {
    id: number = 0;
    name: string = '';

    isValid(): boolean {
        return this.name.length > 0;
    }
}