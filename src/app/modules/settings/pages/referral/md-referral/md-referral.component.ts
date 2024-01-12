import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { MDReferralModel } from 'src/app/models/referral/md-referral.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { MarketingService } from 'src/app/services/marketing/marketing.service';

@Component({
  selector: 'app-md-referral',
  templateUrl: './md-referral.component.html',
  styleUrls: ['./md-referral.component.scss']
})
export class MdReferralComponent implements OnInit {
  showReferralAddBody: boolean = false;
  showReferralList: boolean = false;
  newMDReferral: MDReferralModel = new MDReferralModel();
  selectedMDReferral: MDReferralModel = new MDReferralModel();
  mdReferralsList: MDReferralModel[] = [];
  phoneMask = createMask<string>('999-999-9999');
  statesList: any[] = [];
  pagination: PagingModel = new PagingModel();
  firstNameFilter: string = "";
  lastNameFilter: string = "";
  showingFrom = 1;
  showingTo = this.pagination.tableSize;
  closeResult: string = "";

  constructor(private marketingService: MarketingService, private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getMDReferrals();
    await this.getStates();
  }

  async getMDReferrals() {
    (await this.marketingService.getMDReferrals(this.pagination, this.firstNameFilter, this.lastNameFilter)).subscribe({
      next: (response: any) => {
        if (response != null && response.results.length > 0) {
          this.mdReferralsList = response.results;
          this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
          this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ? this.pagination.totalNumberOfRecords :
                            (this.pagination.page * this.pagination.tableSize);
        }else{
          this.mdReferralsList = response.results;
          this.pagination.totalNumberOfRecords = 0;

          this.toastr.error("No MD Referral found with the entered first or last name", 'Error');
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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

  async addMDReferral(){
    if (!this.newMDReferral.isValid()){
      this.toastr.error("First name and Last name are required.", 'Error');
      return;
    }
    (await this.marketingService.addMDReferral(this.newMDReferral)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getMDReferrals();
        this.toastr.success("MD Referral successfully created.", 'Success');
        this.newMDReferral = new MDReferralModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateMDReferral(){
    if (this.selectedMDReferral.firstName.length == 0 || this.selectedMDReferral.lastName.length == 0){
      this.toastr.error("First name and Last name are required.", 'Error');
      return;
    }
    (await this.marketingService.updateMDReferral(this.selectedMDReferral)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.selectedMDReferral = new MDReferralModel();
        this.getMDReferrals();
        this.toastr.success("MD Referral successfully updated.", 'Success');
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error.message, 'Error');
        this.getMDReferrals();
      }
    });
  }

  async cleanMDReferral(){
    this.newMDReferral = new MDReferralModel();
  }

  openDeleteConfirmationModal(mdReferralDeleteModal: any, mdReferral: MDReferralModel) {
    this.selectedMDReferral = mdReferral;
    this.modalService.open(mdReferralDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateConfirmationModal(mdReferralUpdateModal: any, mdReferral: MDReferralModel) {
    this.selectedMDReferral = mdReferral;
    this.modalService.open(mdReferralUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  async deleteMDReferral(mdReferralId: number){
    (await this.marketingService.deleteMDReferral(mdReferralId)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.selectedMDReferral = new MDReferralModel();
        this.getMDReferrals();
        this.toastr.success("MD Referral successfully deleted.", 'Success');
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async onTableDataChange(event: any) {
    this.showingTo = (event * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (event * this.pagination.tableSize);
    this.showingFrom = event == 1 ? 1 : ((event - 1) * (this.pagination.tableSize)) + 1;
    this.pagination.page = event;
    await this.getMDReferrals();
  }

  async onTableSizeChange(event: any) {
    this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (this.pagination.page * this.pagination.tableSize);
    this.showingFrom = this.pagination.page == 1 ? 1 : ((this.pagination.page - 1) * (this.pagination.tableSize)) + 1;
    await this.getMDReferrals();
  }

}
