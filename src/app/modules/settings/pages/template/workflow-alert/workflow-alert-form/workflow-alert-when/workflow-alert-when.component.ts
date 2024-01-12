import { Component, Input, OnInit } from '@angular/core';
import { ValidationError } from 'class-validator';
import { ToastrService } from 'ngx-toastr';
import { BaseModel } from 'src/app/models/common/base.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { TemplateService } from 'src/app/services/template/template.service';
import { ErrorConstants } from 'src/app/shared/constants/error.constants';
import { FormHelper } from 'src/app/shared/helpers/form-helper';
import { whenAfterConditions } from 'src/app/shared/utils/workflow-alert.utils';

@Component({
  selector: 'app-workflow-alert-when',
  templateUrl: './workflow-alert-when.component.html',
  styleUrls: ['./workflow-alert-when.component.scss']
})
export class WorkflowAlertWhenComponent implements OnInit {

  @Input()
  workflowAlertModel: WorkflowAlertModel;
  @Input()
  statusCodesList: StatusModel[] = [];
  @Input()
  workflowRulesList: any[] = [];
  @Input()
  errorsList: ValidationError[] = [];

  defaultTextsList: any[] = [];
  appointmentsList: BaseModel[] = [];
  surgeriesList: BaseModel[] = [];
  whenAfterConditionsList: {value: string, name: string}[] = whenAfterConditions;
  FormHelper = FormHelper;
  ErrorConstants = ErrorConstants;

  constructor(private templateService: TemplateService, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getDefaultTexts(),
      this.getAppointments(),
      this.getSurgeries()
    ]);
  }

  async getDefaultTexts() {
    (await this.templateService.getDefaultTexts()).subscribe({
      next: (response: any) => {
        this.defaultTextsList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getAppointments() {
    (await this.templateService.getAppointments()).subscribe({
      next: (response: any) => {
        this.appointmentsList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getSurgeries() {
    (await this.templateService.getSurgeries()).subscribe({
      next: (response: any) => {
        this.surgeriesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  preventInvalidValues(event: any){
    const isNegative = FormHelper.isInvalidKeyEntered(event);
    if (isNegative){
      event.preventDefault();
    }
  }

  changeWhenSurgery(){
    if (this.workflowAlertModel.selectedWhenSurgery.includes('ALL')){
      this.workflowAlertModel.selectedWhenSurgery = this.workflowAlertModel.selectedWhenSurgery.filter(x => x === 'ALL');
      this.workflowAlertModel.whenSurgery = 'ALL';
    }else{
      this.workflowAlertModel.whenSurgery = this.workflowAlertModel.selectedWhenSurgery.join("|");
    }
  }

  changeWhenCondition(){
    this.workflowAlertModel.whenVisitType = '';
    this.workflowAlertModel.selectedWhenVisitTypes = [];
    this.workflowAlertModel.whenSurgery = '';
    this.workflowAlertModel.selectedWhenSurgery = [];
  }

  changeVisitType(){
    if (this.workflowAlertModel.selectedWhenVisitTypes.includes('ALL')){
      this.workflowAlertModel.selectedWhenVisitTypes = this.workflowAlertModel.selectedWhenVisitTypes.filter(x => x === 'ALL');
      this.workflowAlertModel.whenVisitType = 'ALL';
    }else{
      this.workflowAlertModel.whenVisitType = this.workflowAlertModel.selectedWhenVisitTypes.join("|");
    }
  }

}
