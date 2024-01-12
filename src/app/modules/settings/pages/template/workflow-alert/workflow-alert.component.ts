import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { messagePatientSystemParams } from 'src/app/models/common/system-params/message-patient';
import { TableModel } from 'src/app/models/common/table/table.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { MessageTemplateFilterModel } from 'src/app/models/template/message/message-templateFilter.model';
import { WorkflowAlertFilterModel } from 'src/app/models/template/workflow-alert/workflow-alert.filter.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { CommonService } from 'src/app/services/common/common.service';
import { StatusService } from 'src/app/services/status/status.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { UserService } from 'src/app/services/user/user.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { tableHeaders } from 'src/app/shared/utils/workflow-alert.utils';

@Component({
  selector: 'app-workflow-alert',
  templateUrl: './workflow-alert.component.html',
  styleUrls: ['./workflow-alert.component.scss']
})
export class WorkflowAlertComponent implements OnInit {
  logAccessDataModel: LogAccessDataModel = new LogAccessDataModel();
  statusCodesList: StatusModel[] = [];
  teamsList: any[] = [];
  workflowAlertFilter: WorkflowAlertFilterModel = new WorkflowAlertFilterModel();
  workflowAlertModel = new WorkflowAlertModel();
  table: TableModel = new TableModel(tableHeaders);
  messageTemplatesList: MessageTemplateModel[] = [];
  messagePatientSystemParams = messagePatientSystemParams;
  professionalUserProviders: ProfessionalUserModel[] = [];
  loading = true;
  showSMS = true;
  useNewHW = true;

  constructor(private templateService: TemplateService, private toastr: ToastrService, private commonService: CommonService,
    private statusService: StatusService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getProfessionalProviders(),
      this.getStatusCodes(),
      this.getTeams(),
      this.getMessageTemplates(),
      this.getWorkflowAlerts(),
      this.logAccessData(),
      this.getSystemParams(),
    ]).then(result => {
      this.loading = false;
    }).catch(error => {
      this.loading = false;
    });
  }

  async getSystemParams() {
    (await this.commonService.getSystemParams(messagePatientSystemParams)).subscribe({
      next: (response: any) => {
        const allowSMSParam = response.find((x: any) => x.page === 'messagePatient' && x.name === 'allowSMS');
        const useNewHWParam = response.find((x: any) => x.page === 'messagePatient' && x.name === 'useNewHW');
        this.showSMS = allowSMSParam.value === "yes" ? true : false;
        this.useNewHW = useNewHWParam.value === "yes" ? true : false;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getProfessionalProviders(){
    (await this.userService.getProfessionalProviders()).subscribe({
      next: (response: any) => {
        if (response && response?.object?.length > 0){
          this.professionalUserProviders = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getWorkflowAlerts(){
    await this.templateService.getWorkflowAlerts(this.workflowAlertFilter).subscribe({
      next: (response: any) => {
        if (response && response?.object?.length > 0){
          this.table.data = response.object;
        }else{
          this.table.data = [];
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getTeams() {
    (await this.userService.getTeams()).subscribe({
      next: (response: any) => {
        this.teamsList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getMessageTemplates() {
    const messageTemplateFilter = new MessageTemplateFilterModel();
    messageTemplateFilter.allResults = true;
    (await this.templateService.getMessageTemplates(new PagingModel(), messageTemplateFilter)).subscribe({
      next: (response: any) => {
        this.messageTemplatesList = response.results.map((messageTemplate: any) => {
          const messageTemplateToReturn = messageTemplate;
          messageTemplateToReturn.loadedOn = new Date(messageTemplate.loadedOn);
          return messageTemplateToReturn;
        });
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.WORKFLOW_ALERT;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  async getStatusCodes(){
    (await this.statusService.getStatusesWithSubStatus()).subscribe({
      next: (response: any) => {
        this.statusCodesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  editWorkflow(workflow: any){
    const selectedWorkflow = {...workflow} as WorkflowAlertModel;
    this.workflowAlertModel = new WorkflowAlertModel();
    this.workflowAlertModel.id = selectedWorkflow.id;
    this.workflowAlertModel.alertStaff1 = selectedWorkflow.alertStaff1;
    this.workflowAlertModel.alertStaff2 = selectedWorkflow.alertStaff2;
    this.workflowAlertModel.alternateEmail = selectedWorkflow.alternateEmail;
    this.workflowAlertModel.bucketId = selectedWorkflow.bucketId;
    this.workflowAlertModel.changeStatusTo = selectedWorkflow.changeStatusTo;
    this.workflowAlertModel.description = selectedWorkflow.description;
    this.workflowAlertModel.escalateAfter = selectedWorkflow.escalateAfter;
    this.workflowAlertModel.escalateIntervalType = selectedWorkflow.escalateIntervalType;
    this.workflowAlertModel.escalateTo = selectedWorkflow.escalateTo;
    this.workflowAlertModel.escalateTo2 = selectedWorkflow.escalateTo2;
    this.workflowAlertModel.handoutId = selectedWorkflow.handoutId;
    this.workflowAlertModel.if2Condition = selectedWorkflow.if2Condition;
    this.workflowAlertModel.if2ExcludeTag = selectedWorkflow.if2ExcludeTag;
    this.workflowAlertModel.if2IncludeTag = selectedWorkflow.if2IncludeTag;
    this.workflowAlertModel.if2InsuranceCo = selectedWorkflow.if2InsuranceCo;
    this.workflowAlertModel.if2Operator = selectedWorkflow.if2Operator.trim();
    this.workflowAlertModel.if2StatusCodes = selectedWorkflow.if2StatusCodes;
    this.workflowAlertModel.if3ExcludeTag = selectedWorkflow.if3ExcludeTag;
    this.workflowAlertModel.if3IncludeTag = selectedWorkflow.if3IncludeTag;
    this.workflowAlertModel.if3InsuranceCo = selectedWorkflow.if3InsuranceCo;
    this.workflowAlertModel.if3Operator = selectedWorkflow.if3Operator.trim();
    this.workflowAlertModel.if3StatusCodes = selectedWorkflow.if3StatusCodes;
    this.workflowAlertModel.if3Condition = selectedWorkflow.if3Condition;
    this.workflowAlertModel.ifCondition = selectedWorkflow.ifCondition;
    this.workflowAlertModel.ifExcludeTag = selectedWorkflow.ifExcludeTag;
    this.workflowAlertModel.ifIncludeTag = selectedWorkflow.ifIncludeTag;
    this.workflowAlertModel.ifStatusCodes = selectedWorkflow.ifStatusCodes;
    this.workflowAlertModel.includeExcludeSurgeon = selectedWorkflow.includeExcludeSurgeon.trim();
    this.workflowAlertModel.name = selectedWorkflow.name;
    this.workflowAlertModel.noAlertAssignment = selectedWorkflow.noAlertAssignment;
    this.workflowAlertModel.ruleMethod = this.getRuleMethod(selectedWorkflow);
    this.workflowAlertModel.templateId = selectedWorkflow.templateId;
    this.workflowAlertModel.thisSurgeonOnly = selectedWorkflow.thisSurgeonOnly;
    this.workflowAlertModel.whenCondition = selectedWorkflow.whenCondition;
    this.workflowAlertModel.whenInterval = selectedWorkflow.whenInterval;
    this.workflowAlertModel.whenIntervalMax = selectedWorkflow.whenIntervalMax;
    this.workflowAlertModel.whenIntervalType = selectedWorkflow.whenIntervalType;
    this.workflowAlertModel.whenRule = selectedWorkflow.whenRule;
    this.workflowAlertModel.whenStatusCode = selectedWorkflow.whenStatusCode;
    this.workflowAlertModel.whenSurgery = selectedWorkflow.whenSurgery;
    this.workflowAlertModel.whenVisitType = selectedWorkflow.whenVisitType;
    this.workflowAlertModel.selectedWhenVisitTypes = selectedWorkflow.whenVisitType.split("|");
    this.workflowAlertModel.selectedIfIncludeTag = selectedWorkflow.ifIncludeTag?.split("|");
    this.workflowAlertModel.selectedIf2IncludeTag = selectedWorkflow.if2IncludeTag?.split("|");
    this.workflowAlertModel.selectedIf3IncludeTag = selectedWorkflow.if3IncludeTag?.split("|");
    this.workflowAlertModel.selectedIfExcludeTag = selectedWorkflow.ifExcludeTag?.split("|");
    this.workflowAlertModel.selectedIf2ExcludeTag = selectedWorkflow.if2ExcludeTag?.split("|");
    this.workflowAlertModel.selectedIf3ExcludeTag = selectedWorkflow.if3ExcludeTag?.split("|");
    this.workflowAlertModel.selectedInsCo1 = selectedWorkflow.ifInsuranceCo?.split("|");
    this.workflowAlertModel.selectedInsCo2 = selectedWorkflow.if2InsuranceCo?.split("|");
    this.workflowAlertModel.selectedInsCo3 = selectedWorkflow.if3InsuranceCo?.split("|");
  }

  getRuleMethod(selectedWorkflow: WorkflowAlertModel){
    switch (selectedWorkflow.ruleMethod) {
      case 'Alert':
        return 'A';
      case 'Email':
        return 'E';
      case 'Internal Message':
        return 'I';
      case 'SMS':
        return 'S';
      case 'Status Change':
        return 'N';
      case 'Assign handout':
        return 'H';
      default:
        return 'A';
    }
  }
}
