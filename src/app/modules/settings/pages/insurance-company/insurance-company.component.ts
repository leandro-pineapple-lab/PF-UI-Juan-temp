import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { InsuranceCompanyModel } from 'src/app/models/practice/insurance-company.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';

@Component({
  selector: 'app-insurance-company',
  templateUrl: './insurance-company.component.html',
  styleUrls: ['./insurance-company.component.scss']
})
export class InsuranceCompanyComponent implements OnInit {

  insuranceCompaniesList: any[] = [];
  statesList: any[] = [];
  insuranceCompanyModel: InsuranceCompanyModel = new InsuranceCompanyModel();
  phoneMask = createMask<string>('999-999-9999');
  showInsuranceAddUpdateBody: boolean = false;
  constructor(private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.getStates();
    await this.getInsuranceCompanies();
  }

  async getStates(){
    (await this.insuranceCompanyService.getStates()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.statesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getInsuranceCompanies(){
    (await this.insuranceCompanyService.getInsuranceCompanies()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.insuranceCompaniesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addUpdateInsuranceCompany(){
    (this.insuranceCompanyModel.phone as any) = $('#txtInsurancePhone').val() != null && $('#txtInsurancePhone').val() != '' && $('#txtInsurancePhone').val() != undefined ?
                                          $('#txtInsurancePhone').val() : '';
    if (this.insuranceCompanyModel.isValid()) {
      (await this.insuranceCompanyService.addUpdateInsuranceCompany(this.insuranceCompanyModel)).subscribe({
        next: (response: any) => {
          if (this.insuranceCompanyModel.id === undefined || this.insuranceCompanyModel.id === null || this.insuranceCompanyModel.id === 0){
            this.toastr.success('Insurance Company successfully created.', 'Success');
            this.insuranceCompanyModel = new InsuranceCompanyModel();
          }else{
            this.toastr.success('Insurance Company successfully updated.', 'Success');
          }
          this.getInsuranceCompanies();
        },
        error: (e: any) => {
          this.toastr.error(e.error, 'Error');
        }
      });
    }else{
      this.toastr.error('Name is required.', 'Error');
    }
  }

  editInsuranceCompany(insuranceCompany: any){
    this.insuranceCompanyModel.name = insuranceCompany.name;
    this.insuranceCompanyModel.parentName = insuranceCompany.parentName || '';
    this.insuranceCompanyModel.street = insuranceCompany.street;
    this.insuranceCompanyModel.street2 = insuranceCompany.street2;
    this.insuranceCompanyModel.state = insuranceCompany.state;
    this.insuranceCompanyModel.id = insuranceCompany.id;
    this.insuranceCompanyModel.city = insuranceCompany.city;
    this.insuranceCompanyModel.zip = insuranceCompany.zip;
    $('#txtInsurancePhone').val(insuranceCompany.phone);
    this.insuranceCompanyModel.type = insuranceCompany.type && insuranceCompany.type != 'PRIVATEINS' ? insuranceCompany.type : '';

    let addUpdateCardBody: any = $('#insuranceAddUpdateBody');
    if(addUpdateCardBody.hasClass("collapse")){
      this.showInsuranceAddUpdateBody = true;
      addUpdateCardBody.collapse("show");
    }
  }

  resetInsuranceCompanyModel(){
    this.insuranceCompanyModel = new InsuranceCompanyModel();
    $('#txtInsurancePhone').val('');
  }

}
