import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StatusModel } from 'src/app/models/practice/status.model';
import { SubStatusModel } from 'src/app/models/practice/subStatus.model';
import { StatusService } from 'src/app/services/status/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class SettingsStatusComponent implements OnInit {

  closeResult: string = '';
  selectedStatus: StatusModel = new StatusModel();
  selectedSubStatus: SubStatusModel = new SubStatusModel();
  isStatusCodeTabActivated: boolean = true;
  isSubStatusCodeTabActivated: boolean = false;
  statusesList: StatusModel[] = [];
  subStatusesList: SubStatusModel[] = [];

  constructor(private statusService: StatusService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getStatusesAndSubStatuses();
  }

  async getStatusesAndSubStatuses(){
    await this.getStatuses();
    await this.getSubStatuses();
  }

  async getStatuses(){
    (await this.statusService.getStatuses()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.statusesList = response;
          this.selectedSubStatus.status.id = this.statusesList[0].id;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getSubStatuses(){
    (await this.statusService.getSubStatuses()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.subStatusesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openDeleteStatusConfirmationModal(statusToDeleteModal: any, status: StatusModel) {
    this.selectedStatus = status;
    this.modalService.open(statusToDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateStatusConfirmationModal(statusToUpdateModal: any, status: StatusModel) {
    this.selectedStatus = status;
    this.modalService.open(statusToUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteSubStatusConfirmationModal(subStatusToDeleteModal: any, subStatus: SubStatusModel) {
    this.selectedSubStatus = subStatus;
    this.modalService.open(subStatusToDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateSubStatusConfirmationModal(statusToUpdateModal: any, subStatus: SubStatusModel) {
    this.selectedSubStatus = subStatus;
    this.modalService.open(statusToUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async deleteStatus(){
    (await this.statusService.deleteStatus(this.selectedStatus.id)).subscribe({
      next: (response: any) => {
        this.getStatuses();
        this.toastr.success('Status successfully deleted.', 'Success');
        this.modalService.dismissAll();
        this.selectedStatus = new StatusModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateStatus(){
    await this.updateStatusRequest();
  }

  async updateStatusRequest() {
    if (this.selectedStatus.description.length > 0 && this.selectedStatus.seq > 0) {
      (await this.statusService.updateStatus(this.selectedStatus)).subscribe({
        next: (response: any) => {
          if (this.selectedStatus.id != 0){
            this.toastr.success('Status successfully updated.', 'Success');
            this.modalService.dismissAll();
          }else{
            this.toastr.success('Status successfully created.', 'Success');
          }
          this.getStatusesAndSubStatuses();
          this.selectedStatus = new StatusModel();
        },
        error: (e: any) => {
          this.toastr.error(e.error, 'Error');
        }
      });
    }else{
      this.toastr.error('Description and Sequence are required. Please fill the required fields.', 'Error');
    }
  }

  async addStatus() {
    if (this.selectedStatus.isValid()){
      await this.addStatusRequest();
    }else{
      this.toastr.error('Id, Description and Sequence are required. Please fill the required fields.', 'Error');
    }
  }

  async addStatusRequest() {
    (await this.statusService.addStatus(this.selectedStatus)).subscribe({
      next: (response: any) => {
        this.toastr.success('Status successfully created.', 'Success');
        this.getStatusesAndSubStatuses();
        this.selectedStatus = new StatusModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
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

  activateStatusCodeTab($event: any) {
    if (!this.isStatusCodeTabActivated) {
      this.isStatusCodeTabActivated = true;
      this.isSubStatusCodeTabActivated = false;
      $event.srcElement.classList.add('active');
      (document.getElementById('btnSubStatus') as any).classList.remove('active');
    }
  }

  activateSubStatusCodeTab($event: any) {
    if (!this.isSubStatusCodeTabActivated) {
      this.isStatusCodeTabActivated = false;
      this.isSubStatusCodeTabActivated = true;
      $event.srcElement.classList.add('active');
      (document.getElementById('btnStatus') as any).classList.remove('active');
    }
  }

  async addSubStatus() {
    if (this.selectedSubStatus.isValid()){
      await this.addSubStatusRequest();
    }else{
      this.toastr.error('Id, Description and Sequence are required. Please fill the required fields.', 'Error');
    }
  }

  async addSubStatusRequest() {
    (await this.statusService.addSubStatus(this.selectedSubStatus)).subscribe({
      next: (response: any) => {
        this.toastr.success('SubStatus successfully created.', 'Success');
        this.getStatusesAndSubStatuses();
        this.selectedSubStatus = new SubStatusModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error', {
          timeOut: 5000
        });
      }
    });
  }

  async updateSubStatus(){
    await this.updateSubStatusRequest();
  }

  async updateSubStatusRequest() {
    if (this.selectedSubStatus.description.length > 0 && this.selectedSubStatus.seq > 0) {
      (await this.statusService.updateSubStatus(this.selectedSubStatus)).subscribe({
        next: (response: any) => {
          this.toastr.success('Sub-Status successfully updated.', 'Success');
          this.modalService.dismissAll();
          this.getStatusesAndSubStatuses();
          this.selectedSubStatus = new SubStatusModel();
        },
        error: (e: any) => {
          this.toastr.error(e.error, 'Error');
        }
      });
    }else{
      this.toastr.error('Description and Sequence are required. Please fill the required fields.', 'Error');
    }
  }

  async deleteSubStatus(){
    (await this.statusService.deleteSubStatus(this.selectedSubStatus.id)).subscribe({
      next: (response: any) => {
        this.getStatusesAndSubStatuses();
        this.toastr.success('SubStatus successfully deleted.', 'Success');
        this.modalService.dismissAll();
        this.selectedSubStatus = new SubStatusModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
