import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { TagModel } from 'src/app/models/practice/tag.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { FormHelper } from 'src/app/shared/helpers/form-helper';
import { ifConditions } from 'src/app/shared/utils/workflow-alert.utils';

@Component({
  selector: 'app-workflow-alert-if',
  templateUrl: './workflow-alert-if.component.html',
  styleUrls: ['./workflow-alert-if.component.scss']
})
export class WorkflowAlertIfComponent implements OnInit {

  @Input()
  workflowAlertModel: WorkflowAlertModel;
  @Input()
  statusCodesList: StatusModel[] = [];
  @Input()
  useNewHW = false;

  tagsList: TagModel[] = [];
  ifStatus1List: {value: string, name: string}[] = ifConditions;
  ifStatus2List: {value: string, name: string}[] = ifConditions;
  ifStatus3List: {value: string, name: string}[] = ifConditions;
  insuranceCompaniesList: string[] = [];

  constructor(private toastr: ToastrService, private tagService: TagService, private insuranceCompanyService: InsuranceCompanyService) { }

  ngOnInit(): void {
    this.getTags();
    this.getInsuranceCompanies();
  }

  async getInsuranceCompanies() {
    (await this.insuranceCompanyService.getProspectAndProvidersInsuranceCompanies()).subscribe({
      next: (response: any) => {
        this.insuranceCompaniesList = response.map((x:any) => x.name);
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getTags() {
    const paging = new PagingModel();
    paging.allResults = true;
    (await this.tagService.getTags(paging)).subscribe({
      next: (response: any) => {
        this.tagsList = response.results;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  changeStatus(event: any){
    this.resetDefaultIfValues(event);
    if (!this.workflowAlertModel.ifCondition){
      this.workflowAlertModel.if2Condition = '';
      this.workflowAlertModel.if2Operator = '';
      this.workflowAlertModel.if3Condition = '';
      this.workflowAlertModel.if3Operator = '';
      return;
    }
    if (event.srcElement.id === 'statusCodes2Select' && !this.workflowAlertModel.if2StatusCodes){
      this.workflowAlertModel.if3Condition = '';
      this.workflowAlertModel.if3Operator = '';
    }
  }

  resetDefaultIfValues(event: any){
    if (event.target.id === 'statusCodesSelect'){
      this.workflowAlertModel.selectedIfExcludeTag = [];
      this.workflowAlertModel.ifExcludeTag = '';
      this.workflowAlertModel.ifStatusCodes = '';
      this.workflowAlertModel.selectedIf2ExcludeTag = [];
      this.workflowAlertModel.if2ExcludeTag = '';
      this.workflowAlertModel.if2StatusCodes = '';
      this.workflowAlertModel.selectedIf3ExcludeTag = [];
      this.workflowAlertModel.if3ExcludeTag = '';
      this.workflowAlertModel.if3StatusCodes = '';
      this.workflowAlertModel.ifInsuranceCo = '';
      this.workflowAlertModel.selectedInsCo1 = [];
      this.workflowAlertModel.if2InsuranceCo = '';
      this.workflowAlertModel.selectedInsCo2 = [];
      this.workflowAlertModel.if3InsuranceCo = '';
      this.workflowAlertModel.selectedInsCo3 = [];
    }
    if (event.target.id === 'statusCodes2Select'){
      this.workflowAlertModel.selectedIf2ExcludeTag = [];
      this.workflowAlertModel.if2ExcludeTag = '';
      this.workflowAlertModel.if2StatusCodes = '';
      this.workflowAlertModel.selectedIf3ExcludeTag = [];
      this.workflowAlertModel.if3ExcludeTag = '';
      this.workflowAlertModel.if3StatusCodes = '';
      this.workflowAlertModel.if2InsuranceCo = '';
      this.workflowAlertModel.selectedInsCo2 = [];
      this.workflowAlertModel.if3InsuranceCo = '';
      this.workflowAlertModel.selectedInsCo3 = [];
    }
    if (event.target.id === 'statusCodes3Select'){
      this.workflowAlertModel.selectedIf3ExcludeTag = [];
      this.workflowAlertModel.if3ExcludeTag = '';
      this.workflowAlertModel.if3StatusCodes = '';
      this.workflowAlertModel.if3InsuranceCo = '';
      this.workflowAlertModel.selectedInsCo3 = [];
    }
  }

  changeIfOperator(event: any){
    if(event.srcElement.id === 'ifOperator2Select' && this.workflowAlertModel.if2Operator === ''){
      this.workflowAlertModel.if2StatusCodes = '';
    }
    if(event.srcElement.id === 'ifOperator3Select' && this.workflowAlertModel.if3Operator === ''){
      this.workflowAlertModel.if3StatusCodes = '';
    }
  }

  preventInvalidValues(event: any){
    const isNegative = FormHelper.isInvalidKeyEntered(event);
    if (isNegative){
      event.preventDefault();
    }
  }

  changeSelectedTags(id: string){
    switch (id) {
      case 'hasTag1Select':
        this.workflowAlertModel.ifIncludeTag = this.workflowAlertModel.selectedIfIncludeTag.join("|");
        break;
      case 'hasTag2Select':
        this.workflowAlertModel.if2IncludeTag = this.workflowAlertModel.selectedIf2IncludeTag.join("|");
        break;
      case 'hasTag3Select':
        this.workflowAlertModel.if3IncludeTag = this.workflowAlertModel.selectedIf3IncludeTag.join("|");
        break;
      case 'hasNotTag1Select':
        this.workflowAlertModel.ifExcludeTag = this.workflowAlertModel.selectedIfExcludeTag.join("|");
        break;
      case 'hasNotTag2Select':
        this.workflowAlertModel.if2ExcludeTag = this.workflowAlertModel.selectedIf2ExcludeTag.join("|");
        break;
      case 'hasNotTag3Select':
        this.workflowAlertModel.if3ExcludeTag = this.workflowAlertModel.selectedIf3ExcludeTag.join("|");
        break;
    }
  }

  changeSelectedInsCo(id: string){
    switch (id) {
      case 'ifInsCo1Select':
        this.workflowAlertModel.ifInsuranceCo = this.workflowAlertModel.selectedInsCo1.join("|");
        break;
      case 'ifInsCo2Select':
        this.workflowAlertModel.if2InsuranceCo = this.workflowAlertModel.selectedInsCo2.join("|");
        break;
      case 'ifInsCo3Select':
        this.workflowAlertModel.if3InsuranceCo = this.workflowAlertModel.selectedInsCo3.join("|");
        break;
    }
  }
}
