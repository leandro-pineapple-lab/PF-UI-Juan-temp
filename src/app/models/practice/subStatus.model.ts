import { StatusModel } from "./status.model";

export class SubStatusModel {
    id: number;
    description: string = '';
    seq: number;
    subCode: number;
    status: StatusModel = new StatusModel();
    isDeletable: boolean = false;

    showStatusRequiredMessage: boolean = false;
    showSequenceRequiredMessage: boolean = false;
    showDescriptionRequiredMessage: boolean = false;
    showSubCodeRequiredMessage: boolean = false;

    isValid(): boolean {
        var isModelValid: boolean = true;

        if (this.status.id == undefined || isNaN(this.status.id) || this.status.id == 0){
            this.showStatusRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showStatusRequiredMessage = false;
        }
        if (this.description.length == 0){
            this.showDescriptionRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showDescriptionRequiredMessage = false;
        }
        if (this.seq == undefined || isNaN(this.seq) || this.seq == 0){
            this.showSequenceRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showSequenceRequiredMessage = false;
        }
        if (this.subCode == undefined || isNaN(this.subCode) || this.subCode == 0){
            this.showSubCodeRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showSubCodeRequiredMessage = false;
        }

        return isModelValid;
    }
}