export class StatusModel {
    id: number;
    description: string = '';
    seq: number;
    ataGlance: boolean = true;
    showInHandouts: boolean = false;
    isDeletable: boolean = false;
    showIdRequiredMessage: boolean = false;
    showDescriptionRequiredMessage: boolean = false;
    showSequenceRequiredMessage: boolean = false;
    combinedStatus?: string = '';
    subStatusSeq?: number;

    isValid(): boolean {
        var isModelValid: boolean = true;

        if (this.id == undefined || isNaN(this.id) || this.id == 0){
            this.showIdRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showIdRequiredMessage = false;
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

        return isModelValid;
    }
}
