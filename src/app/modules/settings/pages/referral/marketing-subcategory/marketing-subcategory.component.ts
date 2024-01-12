import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MarketingCategoryModel } from 'src/app/models/referral/marketingCategory.model';
import { MarketingSubCategoryModel } from 'src/app/models/referral/marketingSubCategory.model';
import { MarketingService } from 'src/app/services/marketing/marketing.service';

@Component({
  selector: 'app-marketing-subcategory',
  templateUrl: './marketing-subcategory.component.html',
  styleUrls: ['./marketing-subcategory.component.scss']
})
export class MarketingSubcategoryComponent implements OnInit {
  subCategoriesList: MarketingSubCategoryModel[] = [];
  categoriesList: MarketingCategoryModel[] = [];
  closeResult: string = "";
  selectedSubCategory: MarketingSubCategoryModel = new MarketingSubCategoryModel();
  newSubCategory: MarketingSubCategoryModel = new MarketingSubCategoryModel();
  constructor(private marketingService: MarketingService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getMarketingCategories();
    await this.getMarketingSubCategories();
  }

  async getMarketingCategories() {
    (await this.marketingService.getCategories()).subscribe({
      next: (response: any) => {
        if (response.object != null && response.object.length > 0) {
          this.categoriesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getMarketingSubCategories() {
    (await this.marketingService.getSubCategories()).subscribe({
      next: (response: any) => {
        if (response.object != null && response.object.length > 0) {
          this.subCategoriesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openDeleteConfirmationModal(subCategoryDeleteModal: any, category: MarketingSubCategoryModel) {
    this.selectedSubCategory = category;
    this.modalService.open(subCategoryDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateConfirmationModal(subCategoryUpdateModal: any, category: MarketingSubCategoryModel) {
    this.selectedSubCategory = category;
    this.modalService.open(subCategoryUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  async updateSubCategory(){
    (await this.marketingService.saveSubCategory(this.selectedSubCategory)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getMarketingSubCategories();
        this.selectedSubCategory = new MarketingSubCategoryModel();
        this.modalService.dismissAll();
        this.toastr.success("Category successfully updated.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async deleteSubCategory(subCategoryId: number){
    (await this.marketingService.deleteSubCategory(subCategoryId)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getMarketingSubCategories();
        this.selectedSubCategory = new MarketingSubCategoryModel();
        this.modalService.dismissAll();
        this.toastr.success("SubCategory successfully deleted.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addSubCategory(){
    (await this.marketingService.saveSubCategory(this.newSubCategory)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;  
        }
        this.getMarketingSubCategories();
        this.toastr.success("SubCategory successfully created.", 'Success');
        this.newSubCategory = new MarketingSubCategoryModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
