import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { AdvocateModel } from 'src/app/models/practice/advocate.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';

@Component({
  selector: 'app-advocate',
  templateUrl: './advocate.component.html',
  styleUrls: ['./advocate.component.scss']
})
export class SettingsAdvocateComponent implements OnInit {
  advocatesList: AdvocateModel[] = [];
  staffUsersList: AdvocateModel[] = [];
  phoneMask = createMask<string>('999-999-9999');
  newAdvocate: AdvocateModel = new AdvocateModel();
  updatedAdvocate: AdvocateModel = new AdvocateModel();
  advocateName: string = '';

  constructor(private advocateService: AdvocateService, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.getAdvocates();
    await this.getStaffUsers();
  }

  async getAdvocates(){
    (await this.advocateService.getAdvocates()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.advocatesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStaffUsers(){
    (await this.advocateService.getStaffUsers()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.staffUsersList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addAdvocate(){
    this.newAdvocate.userId = this.newAdvocate.name;
    if (this.newAdvocate.isValid()) {
      (await this.advocateService.addUpdateAdvocate(this.newAdvocate)).subscribe({
        next: (response: any) => {
          this.toastr.success('Advocate successfully created', 'Success');
          this.newAdvocate = new AdvocateModel();
          this.getAdvocates();
          this.getStaffUsers();
        },
        error: (e: any) => {
          this.toastr.error(e.error, 'Error');
        }
      });
    }else{
      this.toastr.error('Name is required.', 'Error');
    }
  }

  async updateAdvocate(advocate: AdvocateModel){
    if (advocate.userId.length > 0 && advocate.name.length > 0) {
      (await this.advocateService.addUpdateAdvocate(advocate)).subscribe({
        next: (response: any) => {
          this.toastr.success('Advocate successfully updated', 'Success');
          this.getAdvocates();
          this.getStaffUsers();
        },
        error: (e: any) => {
          this.toastr.error(e.error, 'Error');
        }
      });
    }else{
      this.toastr.error('Name is required.', 'Error');
    }
  }

  async deleteAdvocate(advocate: any){
    (await this.advocateService.delete(advocate)).subscribe({
      next: (response: any) => {
        this.toastr.success('Advocate successfully removed', 'Success');
        this.getAdvocates();
        this.getStaffUsers();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
