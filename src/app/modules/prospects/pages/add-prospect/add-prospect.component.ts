import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { PatientModel } from 'src/app/models/patient/patient.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { MarketingService } from 'src/app/services/marketing/marketing.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ReferralService } from 'src/app/services/referral/referral.service';

@Component({
  selector: 'app-add-prospect',
  templateUrl: './add-prospect.component.html',
  styleUrls: ['./add-prospect.component.scss']
})
export class AddProspectComponent implements OnInit {

  newPatient: PatientModel = new PatientModel();
  pagination: PagingModel = new PagingModel();
  statesList: any[] = [];
  referralSourcesList: any[] = [];
  patientsList: any[] = [];
  showAddProspectForm: boolean = false;
  phoneMask = createMask<string>('999-999-9999');
  constructor(private patientService: PatientService, private toastr: ToastrService, private insuranceCompanyService: InsuranceCompanyService,
                private referralService: ReferralService, private marketingService: MarketingService) { }

  async ngOnInit() {
    await this.getStatesAndReferralSources();
  }

  async getStatesAndReferralSources() {
    await this.getStates();
    await this.getReferralSources();
  }

  async getStates() {
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

  async getReferralSources() {
    (await this.marketingService.getCategories()).subscribe({
      next: (response: any) => {
        if (response != null && response.object.length > 0) {
          this.referralSourcesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async checkForDuplicates() {
    if (this.newPatient.firstName.length == 0 && this.newPatient.lastName.length == 0) {
      this.toastr.error('Please enter at least first or last name');
      return;
    }
    this.showAddProspectForm = false;
    (await this.patientService.getPatientsByFirstAndLastName(this.pagination, this.newPatient.firstName, this.newPatient.lastName)).subscribe({
      next: (response: any) => {
        if (response.results != null && response.results.length > 0) {
          this.patientsList = response.results;
          this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
        }else{
          this.showAddProspectForm = true;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error.message, 'Error');
      }
    });
  }

  async onTableDataChange(event: any) {
    this.pagination.page = event;
    await this.checkForDuplicates();
  }

  async onTableSizeChange(event: any) {
    await this.checkForDuplicates();
  }

  async addProspect() {
    if (!this.newPatient.isValid()) {
      this.toastr.error('Please fill the required fields.', 'Error');
      return;
    }
    this.newPatient.showFirstNameRequiredMessage = false;
    this.newPatient.showLastNameRequiredMessage = false;
    this.newPatient.showContactMethodRequiredMessage = false;
    this.newPatient.showGenderRequiredMessage = false;
    this.newPatient.showReferralSourceRequiredMessage = false;
    (await this.patientService.addPatient(this.newPatient)).subscribe({
      next: (response: any) => {
        this.toastr.success('Prospect created successfully.', 'Success');
        this.newPatient = new PatientModel();
        this.patientsList = [];
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error.message, 'Error');
        }
      }
    });
  }

}
