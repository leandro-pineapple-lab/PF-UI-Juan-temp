import { HandoutCategoryModel } from "./handoutCategory.model";

export class HandoutSubCategoryModel {
    id: number;
    name: string = '';
    category: HandoutCategoryModel = new HandoutCategoryModel();
    isActive: boolean;
    showNameRequiredMessage: boolean = false;
    showCategoryRequiredMessage: boolean = false;

    isValid(): boolean {
        return this.name.length > 0 && this.category && this.category.id != 0;
    }

    showErrorMessages(){
        if (this.name.length == 0) {
            this.showNameRequiredMessage = true;
        }else{
            this.showNameRequiredMessage = false;
        }
        if (!this.category || this.category.id == 0) {
            this.showCategoryRequiredMessage = true;
        }else{
            this.showCategoryRequiredMessage = false;
        }
    }
}