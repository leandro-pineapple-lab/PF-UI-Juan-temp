export class ProcedureModel {
    name: string = '';
    previousName: string = '';
    previousCategory: string = '';
    cptCode: string = '';
    category: string = 'B';
    subCategory: string = 'Primary bariatric';
    postOpReminder: boolean = false;
    showOnIntake: boolean = false;
    bariatricSurgery: boolean = false;
    showNameRequiredMessage: boolean = false;

    isValid(): boolean {
        var isValid: boolean = true;
        if (this.name.length == 0) {
            this.showNameRequiredMessage = true;
            isValid = false;
        }else{
            this.showNameRequiredMessage = false;
        }
        return isValid;
    }
}