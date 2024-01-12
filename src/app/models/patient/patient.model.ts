export class PatientModel {
    firstName: string = '';
    lastName: string = '';
    dateOfBirth: Date;
    age: number;
    gender: string = '';
    address: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';
    homePhone: string = '';
    cellPhone: string = '';
    workPhone: string = '';
    bestNumberToContact: string = 'Home';
    email: string = '';
    heightFt: number;
    heightIn: number;
    weight: number;
    preferredContact: string = '';
    referralSource: string = '';
    miscNotes: string = '';

    showFirstNameRequiredMessage: boolean = false;
    showLastNameRequiredMessage: boolean = false;
    showGenderRequiredMessage: boolean = false;
    showContactMethodRequiredMessage: boolean = false;
    showReferralSourceRequiredMessage: boolean = false;

    isValid(): boolean {
        var isModelValid: boolean = true;
        if (this.firstName.length == 0) {
            this.showFirstNameRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showFirstNameRequiredMessage = false;
        }
        if (this.lastName.length == 0) {
            this.showLastNameRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showLastNameRequiredMessage = false;
        }
        if (this.gender.length == 0){
            this.showGenderRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showGenderRequiredMessage = false;
        }
        if (this.preferredContact.length == 0) {
            this.showContactMethodRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showContactMethodRequiredMessage = false;
        }
        if (this.referralSource.length == 0) {
            this.showReferralSourceRequiredMessage = true;
            isModelValid = false;
        }else{
            this.showReferralSourceRequiredMessage = false;
        }

        return isModelValid;
    }

}