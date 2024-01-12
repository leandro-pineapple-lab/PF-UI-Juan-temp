import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MarketingCategoryModel } from 'src/app/models/referral/marketingCategory.model';
import { MarketingService } from 'src/app/services/marketing/marketing.service';

@Component({
  selector: 'app-marketing-category',
  templateUrl: './marketing-category.component.html',
  styleUrls: ['./marketing-category.component.scss']
})
export class MarketingCategoryComponent implements OnInit {

  categoriesList: MarketingCategoryModel[] = [];
  closeResult: string = "";
  selectedCategory: MarketingCategoryModel = new MarketingCategoryModel();
  newCategory: MarketingCategoryModel = new MarketingCategoryModel();

  constructor(private marketingService: MarketingService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    await this.getMarketingCategories();
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

  openDeleteConfirmationModal(categoryDeleteModal: any, category: MarketingCategoryModel) {
    this.selectedCategory = category;
    this.modalService.open(categoryDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateConfirmationModal(categoryUpdateModal: any, category: MarketingCategoryModel) {
    this.selectedCategory = category;
    this.modalService.open(categoryUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  async updateCategory(){
    (await this.marketingService.saveCategory(this.selectedCategory)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getMarketingCategories();
        this.selectedCategory = new MarketingCategoryModel();
        this.modalService.dismissAll();
        this.toastr.success("Category successfully updated.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async deleteCategory(categoryId: number){
    (await this.marketingService.deleteCategory(categoryId)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getMarketingCategories();
        this.selectedCategory = new MarketingCategoryModel();
        this.modalService.dismissAll();
        this.toastr.success("Category successfully deleted.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addCategory(){
    (await this.marketingService.saveCategory(this.newCategory)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;  
        }
        this.getMarketingCategories();
        this.toastr.success("Category successfully created.", 'Success');
        this.newCategory = new MarketingCategoryModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
