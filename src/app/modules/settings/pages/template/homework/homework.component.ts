import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeworkCategoryModel } from 'src/app/models/template/homework/homeworkCategory.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss']
})
export class HomeworkComponent implements OnInit {

  homeworkCategoriesList: HomeworkCategoryModel[] = [];
  selectedHomework: HomeworkCategoryModel = new HomeworkCategoryModel();
  constructor(private templateService: TemplateService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getHomeworkCategories();
  }

  async getHomeworkCategories() {
    (await this.templateService.getHomeworkCategoriesWithDetails()).subscribe({
      next: (response: any) => {
        if (response.object && response.object.length > 0){
          this.homeworkCategoriesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openHomeworkEnableDisableModal(homeworkDisableEnableModal: any, homeworkCategoryModel: HomeworkCategoryModel) {
    this.selectedHomework = homeworkCategoryModel;
    this.modalService.open(homeworkDisableEnableModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  async disableHomework(id: number){
    (await this.templateService.disableHomeworkCategory(id)).subscribe({
      next: (response: any) => {
        this.toastr.success("The selected homework category has been successfully disabled", 'Error');
        this.getHomeworkCategories();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async enableHomework(id: number){
    (await this.templateService.enableHomeworkCategory(id)).subscribe({
      next: (response: any) => {
        this.toastr.success("The selected homework category has been successfully enabled", 'Error');
        this.getHomeworkCategories();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
