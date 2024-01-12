export class HospitalModel {
    id: string;
    name: string = '';
    phoneNumber: string = '';
    taxId: string = '';
    npi: string = '';
    stateProvince: string = '';
    isActive: boolean = true;
    showNameRequiredMessage: boolean = false;

    isValid(): boolean {
        return this.name.length > 0 && this.name.trim().length > 0;
    }
}