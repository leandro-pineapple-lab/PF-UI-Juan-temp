export class MDReferralModel {
    id: number;
    firstName: string = '';
    lastName: string = '';
    title: string = '';
    physicianName: string = '';
    practiceName: string = '';
    specialty: string = '';
    phone: string = '';
    fax: string = '';
    address: string = '';
    city: string = '';
    state: string = '';
    zip: string = '';
    email: string = '';
    contactName: string = '';

    isValid(): boolean {
        return this.firstName.length > 0 && this.lastName.length > 0;
    }
}
