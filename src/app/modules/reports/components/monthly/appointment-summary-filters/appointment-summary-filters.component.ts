import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AppointmentSummaryFilterModel } from 'src/app/models/report/medical/appointment-summary-filter.model';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-appointment-summary-filters',
  templateUrl: './appointment-summary-filters.component.html',
  styleUrls: ['./appointment-summary-filters.component.scss']
})
export class AppointmentSummaryFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];

  lastYearsList = this.monthlyReportService.lastYearsList;

  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel(this.reportsLink);

  @Input()
  reportFilters = new AppointmentSummaryFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private monthlyReportService: MonthlyReportService, private userService: UserService, private reportService: ReportService) { }

  async ngOnInit(): Promise<void> {
    await this.getSurgeons();
    this.getMyFavoriteReports();
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  getMyFavoriteReports(){
    this.reportService.getMyFavoriteReports(this.favoriteReport.link).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.favoriteReports = response;
        }
      }
    });
  }

  setProviderDisplayValue(){
    const selectedProvider = this.surgeonsList.find(x => x.id == this.reportFilters.provider.value);
    if (selectedProvider){
      this.reportFilters.provider.customValue = selectedProvider.fullName;
    }
  }

}
