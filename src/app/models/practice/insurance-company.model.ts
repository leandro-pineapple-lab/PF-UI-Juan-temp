export class InsuranceCompanyModel {
    id: number;
    name: string = '';
    other: string = '';
    parentName: string = '';
    street: Date;
    street2: string = '';
    city: Date;
    state: string = '';
    zip: string = '';
    phone: string = '';
    type: string = '';

    isValid(): boolean {
        return this.name.length > 0;
    }
}
  