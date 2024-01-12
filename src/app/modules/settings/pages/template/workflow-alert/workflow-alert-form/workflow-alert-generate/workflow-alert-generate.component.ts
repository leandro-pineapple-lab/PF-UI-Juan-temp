import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TableModel } from 'src/app/models/common/table/table.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { HandoutService } from 'src/app/services/handout/handout.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormHelper } from 'src/app/shared/helpers/form-helper';
import { messageTemplatesTableHeaders } from 'src/app/shared/utils/message-template.utils';
import { methodOptions } from 'src/app/shared/utils/workflow-alert.utils';
import { MethodOption } from 'src/types/types';

@Component({
  selector: 'app-workflow-alert-generate',
  templateUrl: './workflow-alert-generate.component.html',
  styleUrls: ['./workflow-alert-generate.component.scss']
})
export class WorkflowAlertGenerateComponent implements OnInit, OnChanges {

  @Input()
  messageTemplatesList: MessageTemplateModel[] = [];
  @Input()
  workflowAlertModel: WorkflowAlertModel;
  @Input()
  teamsList: any[] = [];
  @Input()
  statusCodesList: StatusModel[] = [];
  @Input()
  professionalUserProviders: ProfessionalUserModel[] = [];

  messageTemplatesTable: TableModel = new TableModel(messageTemplatesTableHeaders);
  professionalUserProviders1: ProfessionalUserModel[] = [];
  professionalUserProviders2: ProfessionalUserModel[] = [];
  professionalsToEscalate1: ProfessionalUserModel[] = [];
  professionalsToEscalate2: ProfessionalUserModel[] = [];
  handoutsList: any[] = [];
  methodOption: MethodOption;
  methodOptions = methodOptions;
  selectedMessageTemplate = '';

  constructor(private modalService: NgbModal, private userService: UserService, private toastr: ToastrService,
              private handoutService: HandoutService) { }

  ngOnInit(): void {
    this.getHandouts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['professionalUserProviders']?.currentValue){
      this.professionalUserProviders = changes['professionalUserProviders']?.currentValue;
      this.professionalUserProviders1 = this.professionalUserProviders;
      this.professionalUserProviders2 = this.professionalUserProviders;
      this.professionalsToEscalate1 = this.professionalUserProviders;
      this.professionalsToEscalate2 = this.professionalUserProviders;
    }
    if (changes['messageTemplatesList'] && !changes['messageTemplatesList'].firstChange) {
      this.methodOption = this.methodOptions[0];
      this.messageTemplatesTable.data = (this.messageTemplatesList as any).filter((x: any) => x.deliveryMethod === this.methodOption.name);
    }
    if (changes['workflowAlertModel'] && !changes['workflowAlertModel'].firstChange){
      const selectedMethodOption = methodOptions.find(x => x.value === this.workflowAlertModel.ruleMethod);
      if (selectedMethodOption){
        this.methodOption = selectedMethodOption;
        this.messageTemplatesTable.data = (this.messageTemplatesList as any).filter((x: any) => x.deliveryMethod === this.methodOption.name);
      }
    }
  }

  getSelectedDeliveryMethodTemplates() {
    this.selectedMessageTemplate = '';
    this.workflowAlertModel.templateId = 0;
    if (this.methodOption.name){
      this.messageTemplatesTable.data = (this.messageTemplatesList as any).filter((x: any) => x.deliveryMethod === this.methodOption.name);
    }
    this.workflowAlertModel.ruleMethod = this.methodOption.value;
  }

  openMessageTemplatesModal(templatesModal: any) {
    this.modalService.open(templatesModal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
  }

  selectMessageTemplate($event: any){
    this.selectedMessageTemplate = $event.title;
    this.workflowAlertModel.templateId = $event.id;
  }

  async getHandouts(){
    (await this.handoutService.getHandouts()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.handoutsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  professionalChange($event: any){
    if (this.workflowAlertModel.alertStaff1 && $event.target.id === 'assignAlertToSelect'){
      this.professionalUserProviders2 = this.professionalUserProviders.filter(professional => professional.userId !== this.workflowAlertModel.alertStaff1);
    }
    if (this.workflowAlertModel.alertStaff2 && $event.target.id === 'assignAlertToSelect2'){
      this.professionalUserProviders1 = this.professionalUserProviders.filter(professional => professional.userId !== this.workflowAlertModel.alertStaff2);
    }
    if (this.workflowAlertModel.escalateTo && $event.target.id === 'escalateToSelect'){
      this.professionalsToEscalate2 = this.professionalUserProviders.filter(professional => professional.userId !== this.workflowAlertModel.escalateTo);
    }
    if (this.workflowAlertModel.escalateTo2 && $event.target.id === 'escalateTo2Select'){
      this.professionalsToEscalate1 = this.professionalUserProviders.filter(professional => professional.userId !== this.workflowAlertModel.escalateTo2);
    }
  }

  preventInvalidValues(event: any){
    const isNegative = FormHelper.isInvalidKeyEntered(event);
    if (isNegative){
      event.preventDefault();
    }
  }
}
