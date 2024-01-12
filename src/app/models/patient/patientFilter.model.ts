export class PatientFilterModel {
    firstName: string = '';
    lastName: string = '';
    dateOfBirth: Date;
    advocate: string = '';
    whatsNextUntil: Date;
    showAllTasks: boolean = false;
    email: string = '';
    phone: string = '';
    active: string = '1';
    surgeon: string = '';
    officeId: string = '';
    leadFrom: Date;
    leadTo: Date;
    serviceLine: string = '';
    leadType: string = '';
    leadSource: string = '';
    insuranceCompany: string = '';
    groupNumber: string = '';
    lastEncounterFrom: Date;
    lastEncounterTo: Date;
    status: string = '';
    statuses: Array<any> = [];
    selectedStatuses: string = '';
    allResults: boolean = false;

    hasFilters(): boolean {
        return this.firstName.length > 0 || this.lastName.length > 0 || this.dateOfBirth != null || this.advocate.length > 0 || this.whatsNextUntil != null ||
                this.showAllTasks || this.email.length > 0 || this.phone.length > 0 || this.active != '1' || this.surgeon.length > 0 || this.officeId.length > 0 ||
                this.leadFrom != null || this.leadTo != null || this.serviceLine.length > 0 || this.leadType.length > 0 || this.leadSource.length > 0 ||
                this.insuranceCompany.length > 0 || this.groupNumber.length > 0 || this.lastEncounterFrom != null || this.lastEncounterTo != null || this.status.length > 0 ||
                this.statuses.length > 0;
    }

    constructor(stats: Array<any> = []) {
        this.statuses = stats;
    }
}
  