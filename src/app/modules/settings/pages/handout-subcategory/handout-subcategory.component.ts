import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HandoutCategoryModel } from 'src/app/models/educational-material/handoutCategory.model';
import { HandoutSubCategoryModel } from 'src/app/models/educational-material/handoutSubCategory.model';
import { HandoutService } from 'src/app/services/handout/handout.service';

@Component({
  selector: 'app-handout-subcategory',
  templateUrl: './handout-subcategory.component.html',
  styleUrls: ['./handout-subcategory.component.scss']
})
export class SettingsHandoutSubcategoryComponent implements OnInit {

  selectedHandoutSubCategory: HandoutSubCategoryModel = new HandoutSubCategoryModel();
  newHandoutSubCategory: HandoutSubCategoryModel = new HandoutSubCategoryModel();
  handoutSubCategoriesList: HandoutSubCategoryModel[] = [];
  handoutCategoriesList: HandoutCategoryModel[] = [];
  closeResult: string;
  constructor(private modalService: NgbModal, private handoutService: HandoutService, private toastr: ToastrService) { }

  async ngOnInit() {
    await this.getHandoutCategoriesAndSubCategories();
  }

  async getHandoutCategoriesAndSubCategories() {
    await this.getHandoutCategories();
    await this.getHandoutSubCategories();
  }

  async getHandoutSubCategories() {
    (await this.handoutService.getHandoutSubCategories()).subscribe({
      next: (response: any) => {
       this.handoutSubCategoriesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getHandoutCategories(){
    (await this.handoutService.getHandoutCategories()).subscribe({
      next: (response: any) => {
       this.handoutCategoriesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openUpdateProcedureConfirmationModal(procedureToUpdateModal: any, handoutSubCategory: HandoutSubCategoryModel) {
    this.selectedHandoutSubCategory = new HandoutSubCategoryModel();
    this.selectedHandoutSubCategory.id = handoutSubCategory.id;
    this.selectedHandoutSubCategory.category = handoutSubCategory.category;
    this.selectedHandoutSubCategory.name = handoutSubCategory.name;
    this.selectedHandoutSubCategory.isActive = handoutSubCategory.isActive;
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

  async updateHandoutSubCategory() {
    if (!this.selectedHandoutSubCategory.isValid()) {
      this.toastr.error('Name is required. Please fill the required fields', 'Error', { timeOut: 3000 });
      this.selectedHandoutSubCategory.showErrorMessages();
      return;
    }
    this.selectedHandoutSubCategory.showNameRequiredMessage = false;
    this.selectedHandoutSubCategory.showCategoryRequiredMessage = false;
    (await this.handoutService.addUpdateHandoutSubCategory(this.selectedHandoutSubCategory)).subscribe({
      next: (response: any) => {
        this.selectedHandoutSubCategory = new HandoutSubCategoryModel();
        this.toastr.success('Handout SubCategory updated successfully', 'Success');
        this.getHandoutCategoriesAndSubCategories();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Name is required. Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error, 'Error');
        }
      }
    });
  }

  async addHandoutCategory() {
    if (!this.newHandoutSubCategory.isValid()) {
      this.toastr.error('Name and category are required. Please fill the required fields', 'Error', { timeOut: 3000 });
      return;
    }
    (await this.handoutService.addUpdateHandoutSubCategory(this.newHandoutSubCategory)).subscribe({
      next: (response: any) => {
        this.newHandoutSubCategory = new HandoutSubCategoryModel();
        this.toastr.success('Handout SubCategory created successfully', 'Success');
        this.getHandoutCategoriesAndSubCategories();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Name and Category are required. Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error, 'Error');
        }
      }
    });
  }

}
