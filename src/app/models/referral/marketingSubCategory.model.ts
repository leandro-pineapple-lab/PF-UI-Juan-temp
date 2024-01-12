import { MarketingCategoryModel } from "./marketingCategory.model";
export class MarketingSubCategoryModel {
    id: number = 0;
    name: string = '';
    category: MarketingCategoryModel = new MarketingCategoryModel();

    isValid(): boolean {
        return this.name.length > 0;
    }
}