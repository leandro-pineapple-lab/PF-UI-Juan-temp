import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class SettingsHospitalComponent implements OnInit {

  showHospitalAddBody: boolean = false;
  closeResult: string = '';
  selectedHospital: HospitalModel = new HospitalModel();
  newHospital: HospitalModel = new HospitalModel();
  hospitalsList: HospitalModel[] = [];
  statesList: any[] = [];
  phoneMask = createMask<string>('999-999-9999');
  isSelectedHospitalChanged: boolean = false;
  constructor(private hospitalService: HospitalService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getHospitals();
    await this.getStates();
  }

  async getHospitals() {
    (await this.hospitalService.getHospitals()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.hospitalsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStates() {
    (await this.hospitalService.getStates()).subscribe({
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

  openUpdateConfirmationModal(hospitalUpdateModal: any, hospital: HospitalModel) {
    this.selectedHospital = hospital;
    this.selectedHospital.isActive = hospital.isActive == true || hospital.isActive.toString() == 'true' ? true : false;
    this.modalService.open(hospitalUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async updateHospital(){
    (await this.hospitalService.updateHospital(this.selectedHospital)).subscribe({
      next: (response: any) => {
          this.toastr.success('Hospital successfully updated.', 'Success');
          this.selectedHospital = new HospitalModel();
          this.modalService.dismissAll();
          this.getHospitals();
      },
      error: (e: any) => {
        if (e.error.errors){
          if (e.error.errors.Name){
            this.toastr.error(e.error.errors.Name, 'Error');
          }
        }else{
          this.toastr.error(e.error, 'Error', {
            timeOut: 3000
          });
        }
      }
    });
  }

  async addHospital(){
    if (!this.newHospital.isValid()){
      this.newHospital.showNameRequiredMessage = true;
      this.toastr.error('Please fill the required fields', 'Error');
      return;
    }
    this.newHospital.showNameRequiredMessage = false;
    (await this.hospitalService.addHospital(this.newHospital)).subscribe({
      next: (response: any) => {
          this.toastr.success('Hospital successfully created.', 'Success');
          this.newHospital = new HospitalModel();
          this.getHospitals();
      },
      error: (e: any) => {
        if (e.error.errors){
          if (e.error.errors.Name){
            this.toastr.error(e.error.errors.Name, 'Error');
          }
        }else{
          this.toastr.error(e.error, 'Error', {
            timeOut: 3000
          });
        }
      }
    });
  }

}
