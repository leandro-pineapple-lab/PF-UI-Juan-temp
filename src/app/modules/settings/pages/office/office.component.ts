import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { OfficeModel } from 'src/app/models/practice/office.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { OfficeService } from 'src/app/services/office/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class SettingsOfficeComponent implements OnInit {

  officesList: OfficeModel[] = [];
  statesList: any[] = [];
  regionsList: any[] = [];
  selectedOffice: OfficeModel = new OfficeModel();
  phoneMask = createMask<string>('999-999-9999');
  showOfficeAddUpdateBody: boolean = false;
  constructor(private officeService: OfficeService, private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.getOffices();
    await this.getStates();
  }

  async getOffices(){
    (await this.officeService.getOffices()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.officesList = response;
          this.regionsList = response.filter((x: any) => x.isActive)
          .map((x: any) => {
            return {
              id: x.id,
              name: x.name
            }
          });
          this.selectedOffice.regionId = this.regionsList[0].id;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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

  async deleteOffice(officeId: string){
    (await this.officeService.delete(officeId)).subscribe({
      next: (response: any) => {
        this.toastr.success('Office successfully deleted', 'Success');
        this.getOffices();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async enableOffice(officeId: string){
    (await this.officeService.enable(officeId)).subscribe({
      next: (response: any) => {
        this.toastr.success('Office successfully enabled', 'Success');
        this.getOffices();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  editOffice(office: OfficeModel){
    let addUpdateCardBody: any = $('#officeAddUpdateBody');
    if(addUpdateCardBody.hasClass("collapse")){
      this.showOfficeAddUpdateBody = true;
      addUpdateCardBody.collapse("show");
    }
    this.selectedOffice = new OfficeModel(office);
  }

  async addUpdateOffice(){
    if (this.selectedOffice.isValid()) {
      var emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (this.selectedOffice.primaryEmailAddress && !emailRegex.test(this.selectedOffice.primaryEmailAddress)) {
        this.toastr.error('Enter Valid email address.', 'Error');
        return;
      }
      (await this.officeService.addUpdateOffice(this.selectedOffice)).subscribe({
        next: (response: any) => {
          if (!this.selectedOffice.id){
            this.toastr.success('Facility successfully created.', 'Success');
            this.selectedOffice = new OfficeModel();
          }else{
            this.toastr.success('Facility successfully updated.', 'Success');
          }
          this.getOffices();
        },
        error: (e: any) => {
          if (e.error.errors){
            if (e.error.errors.PrimaryEmailAddress){
              this.toastr.error(e.error.errors.PrimaryEmailAddress, 'Error');
            }else{
              this.toastr.error('Please fill the required fields.', 'Error');
            }
          }else{
            this.toastr.error(e.error, 'Error', {
              timeOut: 3000
            });
          }
        }
      });
    }
    else{
      this.toastr.error('Please fill the required fields.', 'Error');
    }
  }

  addNewOffice(){
    this.selectedOffice = new OfficeModel();
    this.selectedOffice.regionId = this.regionsList[0].id;
  }

}
