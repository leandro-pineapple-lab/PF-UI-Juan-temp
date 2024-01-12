import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { WorkflowEfficiencyFilterModel } from 'src/app/models/report/advocate/workflow-efficiency/workflow-efficiency-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-workflow-efficiency-filters',
  templateUrl: './workflow-efficiency-filters.component.html',
  styleUrls: ['./workflow-efficiency-filters.component.scss']
})
export class WorkflowEfficiencyFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel(this.reportsLink);
  surgeonsList: SurgeonModel[] = [];
  insuranceCompaniesList: any[] = [];

  @Input()
  reportFilters = new WorkflowEfficiencyFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private insuranceCompanyService: InsuranceCompanyService,
    private reportService: ReportService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getInsuranceCompanies()
    ]);
    this.getMyFavoriteReports();
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  async getInsuranceCompanies() {
    const response = (await firstValueFrom(this.insuranceCompanyService.getInsuranceCompanies()) as any[]);
    if (response != null && response.length > 0) {
      this.insuranceCompaniesList = response;
    }
  }

  getMyFavoriteReports(){
    this.reportService.getMyFavoriteReports(this.reportsLink).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.favoriteReports = response;
        }
      }
    });
  }

  getReport(){
    this.getReportsEvent.emit();
  }

}
