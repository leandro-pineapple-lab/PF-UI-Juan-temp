export class OfficeModel {
    id: string;
    name: string = '';
    city: string = '';
    stateCode: string = '';
    isCOE: boolean = true;
    zipCode: string = '';
    contactName: string = '';
    addressLine1: string = '';
    addressLine2: string = '';
    webSiteUrl: string = '';
    primaryEmailAddress: string = '';
    primaryPhoneNbr: string = '';
    tollFreePhoneNbr: string = '';
    afterHoursPhoneNbr: string = '';
    faxNbr: string = '';
    taxId: string = '';
    regionId: string = '';
    regionCode: string = '';
    businessName: string = '';
    isActive: boolean = true;
    showNameRequiredMessage: boolean = false;
    showAddressLineRequiredMessage: boolean = false;
    showCityRequiredMessage: boolean = false;
    showZipCodeRequiredMessage: boolean = false;
    showPrimaryPhoneRequiredMessage: boolean = false;
    showBusinessNameRequiredMessage: boolean = false;
    showTaxIdRequiredMessage: boolean = false;

    constructor(office?: OfficeModel) {
        this.id = office ? office.id : '';
        this.name = office ? office.name : '';
        this.city = office ? office.city : '';
        this.stateCode = office ? office.stateCode : '';
        this.isCOE = office ? office.isCOE : true;
        this.zipCode = office ? office.zipCode : '';
        this.contactName = office ? office.contactName : '';
        this.addressLine1 = office ? office.addressLine1 : '';
        this.addressLine2 = office ? office.addressLine2 : '';
        this.webSiteUrl = office ? office.webSiteUrl : '';
        this.primaryEmailAddress = office ? office.primaryEmailAddress : '';
        this.primaryPhoneNbr = office ? office.primaryPhoneNbr : '';
        this.tollFreePhoneNbr = office ? office.tollFreePhoneNbr : '';
        this.afterHoursPhoneNbr = office ? office.afterHoursPhoneNbr : '';
        this.faxNbr = office ? office.faxNbr : '';
        this.taxId = office ? office.taxId : '';
        this.regionId = office ? office.regionId : '';
        this.regionCode = office ? office.regionCode : '';
        this.businessName = office ? office.businessName : '';
        this.isActive = office ? office.isActive : true;
        this.showNameRequiredMessage = office ? office.showNameRequiredMessage : false;
        this.showAddressLineRequiredMessage = office ? office.showAddressLineRequiredMessage : false;
        this.showCityRequiredMessage = office ? office.showCityRequiredMessage : false;
        this.showZipCodeRequiredMessage = office ? office.showZipCodeRequiredMessage : false;
        this.showPrimaryPhoneRequiredMessage = office ? office.showPrimaryPhoneRequiredMessage : false;
        this.showBusinessNameRequiredMessage = office ? office.showBusinessNameRequiredMessage : false;
        this.showTaxIdRequiredMessage = office ? office.showTaxIdRequiredMessage : false;
    }

    isValid(): boolean {
        var isValid: boolean = true;
        if (this.name === null || this.name.length == 0) {
            this.showNameRequiredMessage = true;
            isValid = false;
        }else{
            this.showNameRequiredMessage = false;
        }
        if (this.addressLine1 === null || this.addressLine1.length == 0) {
            this.showAddressLineRequiredMessage = true;
            isValid = false;
        }else{
            this.showAddressLineRequiredMessage = false;
        }
        if (this.city === null || this.city.length == 0) {
            this.showCityRequiredMessage = true;
            isValid = false;
        }else{
            this.showCityRequiredMessage = false;
        }
        if (this.zipCode === null || this.zipCode.length == 0) {
            this.showZipCodeRequiredMessage = true;
            isValid = false;
        }else{
            this.showZipCodeRequiredMessage = false;
        }
        if (this.primaryPhoneNbr === null || this.primaryPhoneNbr.length == 0) {
            this.showPrimaryPhoneRequiredMessage = true;
            isValid = false;
        }else{
            this.showPrimaryPhoneRequiredMessage = false;
        }
        // if (this.taxId.length == 0) {
        //     this.showTaxIdRequiredMessage = true;
        //     isValid = false;
        // }else{
        //     this.showTaxIdRequiredMessage = false;
        // }
        if (this.businessName === null || this.businessName.length == 0) {
            this.showBusinessNameRequiredMessage = true;
            isValid = false;
        }else{
            this.showBusinessNameRequiredMessage = false;
        }
        return isValid;
    }
}