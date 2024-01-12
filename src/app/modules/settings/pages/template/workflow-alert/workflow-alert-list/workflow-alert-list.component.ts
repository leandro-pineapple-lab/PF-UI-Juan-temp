import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { messagePatientSystemParams } from 'src/app/models/common/system-params/message-patient';
import { SystemParamsModel } from 'src/app/models/common/system-params/system-param.model';
import { TableModel } from 'src/app/models/common/table/table.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { WorkflowAlertFilterModel } from 'src/app/models/template/workflow-alert/workflow-alert.filter.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { TemplateService } from 'src/app/services/template/template.service';
import { whenAfterConditions, getIf1Rule, getIf2Rule, getIf3Rule, getIfCondition } from 'src/app/shared/utils/workflow-alert.utils';

@Component({
  selector: 'app-workflow-alert-list',
  templateUrl: './workflow-alert-list.component.html',
  styleUrls: ['./workflow-alert-list.component.scss']
})
export class WorkflowAlertListComponent implements OnInit, OnChanges {

  @Input()
  table: TableModel;
  @Input()
  workflowAlertFilter: WorkflowAlertFilterModel;
  @Input()
  messageTemplatesList: MessageTemplateModel[] = [];
  @Input()
  statusCodesList: StatusModel[] = [];
  @Input()
  teamsList: any[] = [];
  @Input()
  showSMS = true;
  @Input()
  professionalUserProviders: ProfessionalUserModel[] = [];
  @Output()
  workflowsListEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  editWorkflowEvent: EventEmitter<any> = new EventEmitter();

  selectedTooltip: WorkflowAlertModel;
  currentIfCondition = '';
  currentWhenCondition = '';
  currentEscalateTo = '';
  messagePatientSystemParams: SystemParamsModel[] = messagePatientSystemParams;

  constructor(private templateService: TemplateService, private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['professionalUserProviders']?.currentValue){
      this.professionalUserProviders = changes['professionalUserProviders'].currentValue;
    }
  }

  getWhenCondition(workflowAlert: WorkflowAlertModel): string | undefined {
    this.currentWhenCondition = '';
    const selectedWhenCondition = whenAfterConditions.find(x => x.value === workflowAlert.whenCondition);
    let whenCondition = (selectedWhenCondition === null || selectedWhenCondition === undefined) ? '' : selectedWhenCondition.displayName ?
    selectedWhenCondition.displayName : selectedWhenCondition.name;
    const whenRule = this.getWhenRule(workflowAlert);
    this.currentWhenCondition += whenCondition ? ' ' + whenRule : whenRule;
    return this.currentWhenCondition ?? '';
  }

  getIfCondition(workflowAlert: WorkflowAlertModel, condition: string, conditionNumber: number) {
    this.currentIfCondition = getIfCondition(condition);
    switch (conditionNumber) {
      case 1:
        const ifRule = getIf1Rule(workflowAlert, this.statusCodesList);
        return this.currentIfCondition += ifRule;
        case 2:
          const ifRule2 = getIf2Rule(workflowAlert, this.statusCodesList);
        return this.currentIfCondition += ifRule2;
      case 3:
        const ifRule3 = getIf3Rule(workflowAlert, this.statusCodesList);
        return this.currentIfCondition += ifRule3;
    }
    return this.currentIfCondition;
  }

  getRuleMethod(workflowAlert: any) {
    let ruleMethodInfo = "";
    if (workflowAlert.ruleMethod === "Alert"){
      const team = this.teamsList.find(x => x.id === workflowAlert.bucketID);
      ruleMethodInfo = team?.name ? "Generate alert assigned to " + team?.name : "Generate alert assigned";
    }
    if (workflowAlert.ruleMethod === "Email"){
      ruleMethodInfo = "Send email to patient";
      if (workflowAlert.alternateEmail){
        ruleMethodInfo += " or " + workflowAlert.alternateEmail + " if invalid email";
      }
    }
    if (workflowAlert.ruleMethod === "Internal Message"){
      ruleMethodInfo = "Send internal message to patient";
    }
    if (workflowAlert.ruleMethod === "SMS"){
      ruleMethodInfo = "Send text message to patient";
    }
    if (workflowAlert.ruleMethod === "Status Change"){
      ruleMethodInfo = "Change Status";
    }
    if (workflowAlert.ruleMethod === "Assign handout"){
      ruleMethodInfo = "Assign Handout";
    }

    return ruleMethodInfo;
  }

  getWhenRule(workflowAlert: WorkflowAlertModel): string {
    let whenRule = "";
    if (workflowAlert.whenCondition === "Stat") {
      let selectedStatus = workflowAlert.whenStatusCode.indexOf("|") === -1 ? this.statusCodesList.find(x => x.id === parseInt(workflowAlert.whenStatusCode)) :
                          this.statusCodesList.find(x => x.combinedStatus === workflowAlert.whenStatusCode);
      whenRule += selectedStatus != null ? ' = ' + selectedStatus.description : '';
    }
    if (workflowAlert.whenCondition === "SURG"){
      whenRule += " " + workflowAlert.whenSurgery.replace("|", ", ");
      whenRule += whenRule.endsWith("|") ? whenRule.slice(0, -2) : whenRule;
    }
    if (workflowAlert.whenCondition === "APPT" && workflowAlert.whenVisitType?.length > 0) {
      whenRule += " " + workflowAlert.whenVisitType.replace("|", ", ");
      whenRule += whenRule.endsWith("|") ? whenRule.slice(0, -2) : whenRule;
    }
    if (workflowAlert.whenCondition === "RULE") {
      whenRule += " = " + workflowAlert.name;
    }
    if (workflowAlert.whenCondition === "CT1" && workflowAlert.whenStatusCode?.length > 0) {
      whenRule += " " + workflowAlert.whenStatusCode + " days";
    }
    if (workflowAlert.thisSurgeonOnly?.length > 0) {
      whenRule += "(" + workflowAlert.thisSurgeonOnly + ")";
    }
    return whenRule;
  }

  getMessageTemplate(workflowAlert: WorkflowAlertModel) {
    let messageTemplateInfo = "using template ";
    const messageTemplate = this.messageTemplatesList.find(x => x.id === workflowAlert.templateId);
    messageTemplateInfo += messageTemplate?.title;
    return messageTemplateInfo;
  }

  getMessageEscalateToTemplate(workflowAlert: WorkflowAlertModel) {
    this.currentEscalateTo = '';
    if (!workflowAlert.escalateTo){
      return this.currentEscalateTo;
    }

    const escalateToUser = this.professionalUserProviders.find(x => x.userId === workflowAlert.escalateTo);
    this.currentEscalateTo = escalateToUser ? escalateToUser.fullName : workflowAlert.escalateTo;
    if (workflowAlert.escalateTo2){
      const escalateToUser2 = this.professionalUserProviders.find(x => x.userId === workflowAlert.escalateTo2);
      this.currentEscalateTo += escalateToUser2 ? ' and ' + escalateToUser2.fullName : ' and ' + workflowAlert.escalateTo2;
    }
    const dayType = workflowAlert.escalateIntervalType === 'C' ? 'calendar days' : 'business days';
    this.currentEscalateTo += " after " + workflowAlert.escalateAfter + " " + dayType;
    return this.currentEscalateTo;
  }

  onTooltipActive(item: any) {
    this.selectedTooltip = item;
  }

  async deleteWorkflowAlert(workflowAlertId: number) {
    await this.templateService.deleteWorkflowAlert(workflowAlertId).subscribe({
      next: (response: any) => {
        this.getWorkflowsEvent();
        this.modalService.dismissAll();
        this.toastr.success("Workflow Alert has been successfully deleted!", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  getWorkflowsEvent() {
    this.workflowsListEvent.emit();
  }

  editWorkflowRule(workflowAlert: any){
    this.editWorkflowEvent.emit(workflowAlert);
  }
}
