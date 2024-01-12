import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { HomeworkCategoryModel } from 'src/app/models/template/homework/homeworkCategory.model';
import { InsuranceCompanyTemplateModel } from 'src/app/models/template/insurance/insuranceCompanyTemplate.model';
import { RequirementModel } from 'src/app/models/template/insurance/requirement.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { TemplateService } from 'src/app/services/template/template.service';

@Component({
  selector: 'app-insurance-template',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceTemplateComponent implements OnInit {

  insuranceCompaniesList: any[] = [];
  insuranceCompanyTemplatesList: InsuranceCompanyTemplateModel[] = [];
  homeworkCategoriesList: HomeworkCategoryModel[] = [];
  newInsuranceTemplate: InsuranceCompanyTemplateModel = new InsuranceCompanyTemplateModel();
  selectedInsuranceTemplate: InsuranceCompanyTemplateModel = new InsuranceCompanyTemplateModel();
  showInsuranceTemplateAddBody: boolean = false;
  active: number = 1;
  phoneMask = createMask<string>('999-999-9999');

  constructor(private templateService: TemplateService, private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService, private router: Router, private modalService: NgbModal) { }

  addInsuranceTemplateForm = new UntypedFormGroup({
    addInsuranceTemplateDescription: new UntypedFormControl("", [Validators.required]),
    addInsuranceTemplatePlanType: new UntypedFormControl("", [Validators.required]),
    addInsuranceName: new UntypedFormControl("", Validators.required),
    addInsuranceNameOther: new UntypedFormControl(""),
    addInsuranceTemplateGroupNumber: new UntypedFormControl(""),
  });

  get addInsuranceTemplateDescription()
  {
    return this.addInsuranceTemplateForm.get("addInsuranceTemplateDescription");
  }

  get addInsuranceName()
  {
    return this.addInsuranceTemplateForm.get("addInsuranceName");
  }

  get addInsuranceNameOther()
  {
    return this.addInsuranceTemplateForm.get("addInsuranceNameOther");
  }

  get addInsuranceTemplatePlanType()
  {
    return this.addInsuranceTemplateForm.get("addInsuranceTemplatePlanType");
  }

  get addInsuranceTemplateGroupNumber()
  {
    return this.addInsuranceTemplateForm.get("addInsuranceTemplateGroupNumber");
  }

  async ngOnInit() {
    console.log(this.newInsuranceTemplate);
    this.getInsuranceCompanies();
    this.getHomeworkCategories();
    this.getInsuranceTemplates();
  }

  async getHomeworkCategories() {
    (await this.templateService.getHomeworkCategories()).subscribe({
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

  async getInsuranceCompanies() {
    (await this.insuranceCompanyService.getInsuranceCompanies()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.insuranceCompaniesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getInsuranceTemplates() {
    (await this.templateService.getInsuranceTemplates()).subscribe({
      next: (response: any) => {
        if (response.object && response.object.length > 0){
          this.insuranceCompanyTemplatesList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addTemplate(){
    if(!this.addInsuranceTemplateForm.valid){
      this.addInsuranceTemplateForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    this.newInsuranceTemplate.requirements = this.homeworkCategoriesList.filter(x => x.selected).map(y => <RequirementModel> ({
      notes: y.requirementText,
      categoryId: y.id
    }));
    (await this.templateService.addInsuranceTemplate(this.newInsuranceTemplate)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getInsuranceTemplates();
        this.toastr.success("Template successfully created", 'Success');
        this.newInsuranceTemplate = new InsuranceCompanyTemplateModel();
        this.getHomeworkCategories();
        this.addInsuranceTemplateForm.reset();
        let addUpdateCardBody: any = $('#insuranceTemplateAddUpdateBody');
        if(addUpdateCardBody.hasClass("collapse")){
          this.showInsuranceTemplateAddBody = false;
          addUpdateCardBody.collapse("hide");
        }
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  async updateTemplate(){
    if(!this.addInsuranceTemplateForm.valid){
      this.addInsuranceTemplateForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    this.newInsuranceTemplate.requirements = this.homeworkCategoriesList.filter(x => x.selected).map(y => <RequirementModel> ({
      notes: y.requirementText,
      categoryId: y.id
    }));
    (await this.templateService.updateInsuranceTemplate(this.newInsuranceTemplate)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getInsuranceTemplates();
        this.toastr.success("Template successfully created", 'Success');
        this.showCheckIconsOnTabs();
        let addUpdateCardBody: any = $('#insuranceTemplateAddUpdateBody');
        if(addUpdateCardBody.hasClass("collapse")){
          this.showInsuranceTemplateAddBody = false;
          addUpdateCardBody.collapse("hide");
        }
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  async deleteInsuranceTemplate(id: number){
    (await this.templateService.deleteInsuranceTemplate(id)).subscribe({
      next: (response: any) => {
        this.getInsuranceTemplates();
        this.toastr.success("Template successfully deleted", 'Success');
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  setCategoryText(category: HomeworkCategoryModel){
    if (category.selected){
      category.requirementText = "";
    }
  }

  searchInsurancePatients(insuranceCompanyId: number, groupNumber: string){
    const ins_id = insuranceCompanyId != null && insuranceCompanyId != 0 ? insuranceCompanyId : "";
    const group_number = groupNumber != null ? groupNumber : "";
    this.router.navigateByUrl('/prospects/search-prospect?ins=' + ins_id + "&group_number=" + group_number);
  }

  redirectToPrintPage(insuranceTemplate: InsuranceCompanyTemplateModel){
    localStorage.setItem("insuranceTemplate", JSON.stringify(insuranceTemplate));
    const url = this.router.serializeUrl(this.router.createUrlTree(['/insurance-print-template']));
    window.open(url, '_blank');
  }

  editInsuranceTemplate(insuranceCompanyTemplate: InsuranceCompanyTemplateModel){
    this.newInsuranceTemplate = new InsuranceCompanyTemplateModel();
    this.newInsuranceTemplate.id = insuranceCompanyTemplate.id;
    this.newInsuranceTemplate.insuranceCompany = insuranceCompanyTemplate.insuranceCompany;
    this.newInsuranceTemplate.description = insuranceCompanyTemplate.description;
    this.newInsuranceTemplate.allowable = insuranceCompanyTemplate.allowable;
    this.newInsuranceTemplate.coverage = insuranceCompanyTemplate.coverage;
    this.newInsuranceTemplate.groupNumber = insuranceCompanyTemplate.groupNumber;
    this.newInsuranceTemplate.requirements = insuranceCompanyTemplate.requirements;
    this.newInsuranceTemplate.planType = insuranceCompanyTemplate.planType;
    this.homeworkCategoriesList = this.homeworkCategoriesList.map(y => <HomeworkCategoryModel> ({
      selected: this.newInsuranceTemplate.requirements.some(x => x.categoryId === y.id),
      requirementText: this.newInsuranceTemplate.requirements.find(x => x.categoryId === y.id)?.notes,
      name: y.name,
      folder: y.folder,
      titleNote: y.titleNote,
      id: y.id,
      seq: y.seq
    }));
    this.showCheckIconsOnTabs();
    let addUpdateCardBody: any = $('#insuranceTemplateAddUpdateBody');
    if(addUpdateCardBody.hasClass("collapse")){
      this.showInsuranceTemplateAddBody = true;
      addUpdateCardBody.collapse("show");
    }
  }

  showCheckIconsOnTabs(){
    this.newInsuranceTemplate.showCoverageCheckIcon = Object.values(this.newInsuranceTemplate.coverage).some(x => x !== null && x !== "");
    this.newInsuranceTemplate.showAllowablesCheckIcon = Object.values(this.newInsuranceTemplate.allowable).some(x => x !== null);
    this.newInsuranceTemplate.showRequirementsCheckIcon = this.homeworkCategoriesList.some(x => x.selected);
  }

  openInsuranceTemplateDeleteModal(insuranceTemplateDeleteModal: any, insuranceCompanyTemplateModel: InsuranceCompanyTemplateModel) {
    this.selectedInsuranceTemplate = insuranceCompanyTemplateModel;
    this.modalService.open(insuranceTemplateDeleteModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  addNewInsuranceTemplate(){
    this.newInsuranceTemplate = new InsuranceCompanyTemplateModel();
    this.homeworkCategoriesList = this.homeworkCategoriesList.map(y => <HomeworkCategoryModel> ({
      selected: false,
      requirementText: "",
      name: y.name,
      folder: y.folder,
      titleNote: y.titleNote,
      id: y.id,
      seq: y.seq
    }));
  }

}
