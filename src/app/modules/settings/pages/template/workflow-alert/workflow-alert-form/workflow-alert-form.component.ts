import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ValidationError, validate } from 'class-validator';
import { ToastrService } from 'ngx-toastr';
import { StatusModel } from 'src/app/models/practice/status.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { TemplateService } from 'src/app/services/template/template.service';
import { ErrorConstants } from 'src/app/shared/constants/error.constants';
import { FormHelper } from 'src/app/shared/helpers/form-helper';

@Component({
  selector: 'app-workflow-alert-form',
  templateUrl: './workflow-alert-form.component.html',
  styleUrls: ['./workflow-alert-form.component.scss']
})
export class WorkflowAlertFormComponent implements OnInit, OnChanges {

  @Input()
  messageTemplatesList: MessageTemplateModel[] = [];
  @Input()
  teamsList: any[] = [];
  @Input()
  statusCodesList: StatusModel[] = [];
  @Input()
  workflowRulesList: any[] = [];
  @Input()
  workflowAlertModel: WorkflowAlertModel;
  @Input()
  professionalUserProviders: ProfessionalUserModel[] = [];
  @Input()
  useNewHW = false;
  @Output()
  workflowSaveEvent: EventEmitter<void> = new EventEmitter();

  errorsList: ValidationError[] = [];
  FormHelper = FormHelper;
  ErrorConstants = ErrorConstants;
  formCollapsed = true;

  constructor(private templateService: TemplateService, private toastr: ToastrService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['workflowAlertModel']?.currentValue?.id){
      this.showAddUpdateForm();
    }
  }

  showAddUpdateForm(){
    let addUpdateCardBody: any = $('#formCardBody');
      if(addUpdateCardBody.hasClass("collapse")){
        this.errorsList = [];
        this.formCollapsed = false;
        addUpdateCardBody.collapse("show");
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async addRule(){
    this.errorsList = [];
    const ruleErrors = await validate(this.workflowAlertModel);
    if (ruleErrors?.length > 0){
      this.errorsList = ruleErrors;
      this.toastr.error('Please enter the required fields', 'Error');
      return;
    }
    await this.templateService.addWorkflowRule(this.workflowAlertModel).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.workflowSaveEvent.emit();
        this.workflowAlertModel = new WorkflowAlertModel();
        this.toastr.success("Workflow rule has been successfully created");
      },
      error: (e: any) => {
        if (e.error.errors){
          if (e.error.errors.Name){
            this.toastr.error(e.error.errors.Name, 'Error');
            return
          }
          if (e.error.errors.Description){
            this.toastr.error(e.error.errors.Description, 'Error');
            return
          }
          if (e.error.errors.WhenCondition){
            this.toastr.error(e.error.errors.WhenCondition, 'Error');
            return
          }
          if (e.error.errors.AlternateEmail){
            this.toastr.error(e.error.errors.AlternateEmail, 'Error');
            return
          }
        }
      }
    });
  }

  async addNewRule(){
    this.workflowAlertModel = new WorkflowAlertModel();
    this.showAddUpdateForm();
  }

  async updateRule(){
    this.errorsList = [];
    const ruleErrors = await validate(this.workflowAlertModel);
    if (ruleErrors?.length > 0){
      this.errorsList = ruleErrors;
      this.toastr.error('Please enter the required fields', 'Error');
      return;
    }
    await this.templateService.updateWorkflowRule(this.workflowAlertModel).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.workflowSaveEvent.emit();
        this.toastr.success("Workflow rule has been successfully updated");
      },
      error: (e: any) => {
        if (e.error.errors){
          if (e.error.errors.Name){
            this.toastr.error(e.error.errors.Name, 'Error');
            return
          }
          if (e.error.errors.Description){
            this.toastr.error(e.error.errors.Description, 'Error');
            return
          }
          if (e.error.errors.WhenCondition){
            this.toastr.error(e.error.errors.WhenCondition, 'Error');
            return
          }
          if (e.error.errors.AlternateEmail){
            this.toastr.error(e.error.errors.AlternateEmail, 'Error');
            return
          }
        }
      }
    });
  }

}
