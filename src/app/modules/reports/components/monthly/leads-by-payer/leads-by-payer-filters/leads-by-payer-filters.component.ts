import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { LeadsByPayerFilterModel } from 'src/app/models/report/monthly/leads-by-payer/leads-by-payer-filter.model';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-leads-by-payer-filters',
  templateUrl: './leads-by-payer-filters.component.html',
  styleUrls: ['./leads-by-payer-filters.component.scss']
})
export class LeadsByPayerFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  lastYearsList = this.monthlyReportService.lastYearsList;
  surgeonsList: SurgeonModel[] = [];

  @Input()
  reportFilters = new LeadsByPayerFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private monthlyReportService: MonthlyReportService, private userService: UserService,
    private reportService: ReportService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await this.getSurgeons();
    this.favoriteReport.link = this.reportsLink;
    this.getMyFavoriteReports();
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getReport();
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  getMyFavoriteReports(){
    this.reportService.getMyFavoriteReports(this.reportsLink).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.favoriteReports = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  getReport(){
    this.getReportsEvent.emit();
  }
}
