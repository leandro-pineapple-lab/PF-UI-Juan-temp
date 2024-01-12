export class HandoutCategoryModel {
    id: number = 0;
    handoutType: string = '';
    handoutTypeAbbreviation: string = '';
    name: string = '';
    isActive: boolean;
    showNameRequiredMessage: boolean = false;
    showHandoutTypeRequiredMessage: boolean = false;

    isValid(): boolean {
        return this.name.length > 0 && this.handoutType.length > 0;
    }

    showErrorMessages(){
        if (this.name.length == 0) {
            this.showNameRequiredMessage = true;
        }else{
            this.showNameRequiredMessage = false;
        }
        if (this.handoutType.length == 0) {
            this.showHandoutTypeRequiredMessage = true;
        }else{
            this.showHandoutTypeRequiredMessage = false;
        }
    }
}