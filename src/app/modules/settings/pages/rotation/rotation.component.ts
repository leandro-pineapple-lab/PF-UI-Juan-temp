import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { SurgeonRotationModel } from 'src/app/models/practice/surgeonRotation.model';
import { SurgeonService } from 'src/app/services/surgeon/surgeon.service';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class SettingsRotationComponent implements OnInit {

  closeResult: string = '';
  selectedSurgeonRotation: SurgeonRotationModel = new SurgeonRotationModel();
  surgeonRotationsList: SurgeonRotationModel[] = [];
  surgeonsList: SurgeonModel[] = [];
  constructor(private surgeonService: SurgeonService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getSurgeonsAndSurgeonRotations();
  }

  async getSurgeonsAndSurgeonRotations() {
    await this.getSurgeonRotations();
    await this.getSurgeons();
  }

  async getSurgeonRotations() {
    (await this.surgeonService.getSurgeonRotations()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.surgeonRotationsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getSurgeons() {
    (await this.surgeonService.getSurgeons()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.surgeonsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openUpdateRotationConfirmationModal(rotationUpdateModal: any, surgeonRotation: SurgeonRotationModel){
    this.selectedSurgeonRotation = surgeonRotation;
    this.modalService.open(rotationUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  async updateRotation(){
    if (this.selectedSurgeonRotation.surgeonsList[0].resourceId == 0) {
      this.selectedSurgeonRotation.showSelectedSurgeonErrorMessage = true;
      this.toastr.error('Surgeon Required.', 'Error');
      return;
    }
    this.selectedSurgeonRotation.showSelectedSurgeonErrorMessage = false;
    this.selectedSurgeonRotation.surgeonsList.map(surgeon => {
      surgeon.fullName = this.surgeonsList.find(x => x.resourceId == surgeon.resourceId)?.fullName;
    });
    (await this.surgeonService.updateRotation(this.selectedSurgeonRotation)).subscribe({
      next: (response: any) => {
          this.toastr.success('Rotation successfully updated.', 'Success');
          this.selectedSurgeonRotation = new SurgeonRotationModel();
          this.modalService.dismissAll();
          this.getSurgeonsAndSurgeonRotations();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error', {
          timeOut: 2000
        });
      }
    });
  }

}
