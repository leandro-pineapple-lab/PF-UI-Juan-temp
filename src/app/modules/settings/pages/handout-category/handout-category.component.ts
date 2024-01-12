import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HandoutCategoryModel } from 'src/app/models/educational-material/handoutCategory.model';
import { HandoutService } from 'src/app/services/handout/handout.service';

@Component({
  selector: 'app-handout-category',
  templateUrl: './handout-category.component.html',
  styleUrls: ['./handout-category.component.scss']
})
export class SettingsHandoutCategoryComponent implements OnInit {

  handoutCategoriesList: HandoutCategoryModel[] = [];
  newHandoutCategory: HandoutCategoryModel = new HandoutCategoryModel();
  selectedHandoutCategory: HandoutCategoryModel = new HandoutCategoryModel();
  closeResult: string;
  constructor(private handoutService: HandoutService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getHandoutCategories();
  }

  async getHandoutCategories() {
    (await this.handoutService.getHandoutCategories()).subscribe({
      next: (response: any) => {
       this.handoutCategoriesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openUpdateProcedureConfirmationModal(procedureToUpdateModal: any, handoutCategory: HandoutCategoryModel) {
    this.selectedHandoutCategory = new HandoutCategoryModel();
    this.selectedHandoutCategory.id = handoutCategory.id;
    this.selectedHandoutCategory.name = handoutCategory.name;
    this.selectedHandoutCategory.handoutType = handoutCategory.handoutTypeAbbreviation;
    this.selectedHandoutCategory.isActive = handoutCategory.isActive;
    this.modalService.open(procedureToUpdateModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
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

  async addHandoutCategory() {
    if (!this.newHandoutCategory.isValid()) {
      this.toastr.error('Handout Type and Category are required. Please fill the required fields', 'Error', { timeOut: 3000 });
      return;
    }
    (await this.handoutService.addUpdateHandoutCategory(this.newHandoutCategory)).subscribe({
      next: (response: any) => {
        this.newHandoutCategory = new HandoutCategoryModel();
        this.toastr.success('Handout Category created successfully', 'Success');
        this.getHandoutCategories();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Handout Type and Category are required. Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error, 'Error');
        }
      }
    });
  }

  async updateHandoutCategory(){
    if (!this.selectedHandoutCategory.isValid()) {
      this.toastr.error('Handout Type and Category are required. Please fill the required fields', 'Error', { timeOut: 3000 });
      this.selectedHandoutCategory.showErrorMessages();
      return;
    }
    this.selectedHandoutCategory.showNameRequiredMessage = false;
    this.selectedHandoutCategory.showHandoutTypeRequiredMessage = false;
    (await this.handoutService.addUpdateHandoutCategory(this.selectedHandoutCategory)).subscribe({
      next: (response: any) => {
        this.selectedHandoutCategory = new HandoutCategoryModel();
        this.toastr.success('Handout Category updated successfully', 'Success');
        this.getHandoutCategories();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Handout Type and Category are required. Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error, 'Error');
        }
      }
    });
  }

}
