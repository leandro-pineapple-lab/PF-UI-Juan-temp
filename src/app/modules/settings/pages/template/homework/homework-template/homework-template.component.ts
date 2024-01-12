import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HomeworkCategoryModel } from 'src/app/models/template/homework/homeworkCategory.model';
import { HomeworkCategoryDetailModel } from 'src/app/models/template/homework/homeworkCategoryDetails.model';
import { HomeworkTemplateModel } from 'src/app/models/template/homework/homeworkTemplate.model';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-homework-template',
  templateUrl: './homework-template.component.html',
  styleUrls: ['./homework-template.component.scss']
})
export class HomeworkTemplateComponent implements OnInit {

  homeworkTemplatesList: HomeworkTemplateModel[] = [];
  homeworkCategoriesList: HomeworkCategoryModel[] = [];
  selectedHomeworkTemplate: HomeworkTemplateModel = new HomeworkTemplateModel();
  showTemplateAddBody: boolean = false;
  editingPatientId: string;

  addHomeworkTemplateForm = new UntypedFormGroup({
    addHomeworkTemplateName: new UntypedFormControl("", [Validators.required])
  });

  get addHomeworkTemplateName()
  {
    return this.addHomeworkTemplateForm.get("addHomeworkTemplateName");
  }

  constructor(private templateService: TemplateService, private toastr: ToastrService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.editingPatientId = params['id'] || null;
      if (this.editingPatientId){
        this.getHomeworkTemplateInformation();
      }else{
        this.getHomeworkCategories();
        this.selectedHomeworkTemplate = new HomeworkTemplateModel();
      }
    });
  }

  async ngOnInit() {
    this.getHomeworkTemplates();
  }

  async getHomeworkTemplateInformation() {
    (await this.templateService.getHomeworkTemplate(this.editingPatientId)).subscribe({
      next: (response: any) => {
        this.homeworkCategoriesList = response.object.homeworkCategories;
        this.selectedHomeworkTemplate = response.object;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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

  async getHomeworkTemplates() {
    (await this.templateService.getHomeworkTemplates()).subscribe({
      next: (response: any) => {
        if (response.object && response.object.length > 0){
          this.homeworkTemplatesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async deleteHomeworkTemplate(patientId: string){
    (await this.templateService.deleteHomeworkTemplate(patientId)).subscribe({
      next: (response: any) => {
        this.getHomeworkTemplates();
        this.toastr.success("The selected homework has been successfully deleted", 'Success');
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addHomeworkTemplate(){
    if(!this.addHomeworkTemplateForm.valid){
      this.addHomeworkTemplateForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    this.selectedHomeworkTemplate.homeworkCategories = this.homeworkCategoriesList;
    (await this.templateService.addHomeworkTemplate(this.selectedHomeworkTemplate)).subscribe({
      next: (response: any) => {
        this.selectedHomeworkTemplate = new HomeworkTemplateModel();
        this.getHomeworkTemplates();
        if (this.homeworkCategoriesList.length > 0){
          for (let index = 0; index < this.homeworkCategoriesList.length; index++) {
            const element = this.homeworkCategoriesList[index];
            element.selected = false;
            if (element.isRowOpen){
              document.getElementById('btnHomeworkRowCollapse' + index)?.click();
            }

            if (element.homeworkCategoryDetails && element.homeworkCategoryDetails.length > 0){
              element.homeworkCategoryDetails.forEach(detail => {
                detail.selected = false;
                detail.answer = "";
                detail.answer2 = "";
                if (detail.checkboxList && detail.checkboxList.length > 0){
                  detail.checkboxList.forEach(checkbox => {
                    checkbox.selected = false;
                  });
                }
              }); 
            }

          }
        }

        this.toastr.success("The selected homework has been successfully created", 'Success');
        this.addHomeworkTemplateForm.reset();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
          return;
        }
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateHomeworkTemplate(){
    if(!this.addHomeworkTemplateForm.valid){
      this.addHomeworkTemplateForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    this.selectedHomeworkTemplate.homeworkCategories = this.homeworkCategoriesList;
    (await this.templateService.updateHomeworkTemplate(this.selectedHomeworkTemplate)).subscribe({
      next: (response: any) => {
        this.getHomeworkTemplates();
        this.toastr.success("The selected homework has been successfully updated", 'Success');
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
          return;
        }
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  setEmptyAnswer2(homeworkCategoryDetail: HomeworkCategoryDetailModel){
    if (homeworkCategoryDetail.answer.length == 0){
      homeworkCategoryDetail.answer2 = "";
    }
  }

  collapseSelectedRow(homeworkCategory: HomeworkCategoryModel, index: number){
    if (homeworkCategory.isRowOpen){
      if (homeworkCategory.homeworkCategoryDetails && homeworkCategory.homeworkCategoryDetails.length > 0){
        homeworkCategory.homeworkCategoryDetails.forEach(detail => {
          detail.selected = false;
          detail.answer = "";
          detail.answer2 = "";
          if (detail.checkboxList && detail.checkboxList.length > 0){
            detail.checkboxList.forEach(checkbox => {
              checkbox.selected = false;
            });
          }
        });
      }
      document.getElementById('btnHomeworkRowCollapse' + index)?.click();
    }
  }

  openHomeworkTemplateDeleteModal(homeworkTemplateDeleteModal: any, homeworkTemplateModel: HomeworkTemplateModel) {
    this.selectedHomeworkTemplate = homeworkTemplateModel;
    this.modalService.open(homeworkTemplateDeleteModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  editHomeworkTemplate(){
    let addUpdateCardBody: any = $('#templateAddBody');
    if(addUpdateCardBody.hasClass("collapse")){
      this.showTemplateAddBody = true;
      addUpdateCardBody.collapse("show");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
