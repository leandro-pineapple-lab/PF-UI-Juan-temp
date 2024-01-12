import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { SurgeonService } from 'src/app/services/surgeon/surgeon.service';

@Component({
  selector: 'app-workflow-alert-scope',
  templateUrl: './workflow-alert-scope.component.html',
  styleUrls: ['./workflow-alert-scope.component.scss']
})
export class WorkflowAlertScopeComponent implements OnInit {

  @Input()
  workflowAlertModel: WorkflowAlertModel;

  surgeonsList: SurgeonModel[] = [];

  constructor(private surgeonService: SurgeonService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSurgeons();
  }

  getDefaultSurgeon(){
    if (!this.workflowAlertModel.includeExcludeSurgeon){
      this.workflowAlertModel.thisSurgeonOnly = '';
      return;
    }

    this.workflowAlertModel.thisSurgeonOnly = !this.workflowAlertModel.thisSurgeonOnly ? this.surgeonsList[0]?.fullName ?? '' : this.workflowAlertModel.thisSurgeonOnly;
  }

  async getSurgeons(){
    (await this.surgeonService.getSurgeons()).subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.surgeonsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }
}
