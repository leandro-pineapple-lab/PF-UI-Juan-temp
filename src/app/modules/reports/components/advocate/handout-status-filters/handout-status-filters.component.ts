import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { HandoutStatusFilterModel } from 'src/app/models/report/advocate/handout-status/handout-status-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-handout-status-filters',
  templateUrl: './handout-status-filters.component.html',
  styleUrls: ['./handout-status-filters.component.scss']
})
export class HandoutStatusFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  providersList: SurgeonModel[] = [];

  @Input()
  reportFilters = new HandoutStatusFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private toastr: ToastrService, private userService: UserService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
    this.getProfessionalProviders();
    this.getMyFavoriteReports();
  }

  async getProfessionalProviders(){
    this.userService.getProfessionalProviders().subscribe({
      next: (response: any) => {
        if (response != null && response.object?.length > 0) {
          this.providersList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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
