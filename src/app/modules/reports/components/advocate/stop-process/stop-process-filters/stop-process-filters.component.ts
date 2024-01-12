import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StopProcessFilterModel } from 'src/app/models/report/advocate/stop-process/stop-process-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-stop-process-filters',
  templateUrl: './stop-process-filters.component.html',
  styleUrls: ['./stop-process-filters.component.scss']
})
export class StopProcessFiltersComponent implements OnInit, AfterViewInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new StopProcessFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
  }

  ngAfterViewInit(): void {
    this.getMyFavoriteReports();
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

}
