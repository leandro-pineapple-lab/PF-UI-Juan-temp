import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostOpClassFilterModel } from 'src/app/models/report/advocate/post-op-class/post-op-class-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-post-op-class-filters',
  templateUrl: './post-op-class-filters.component.html',
  styleUrls: ['./post-op-class-filters.component.scss']
})
export class PostOpClassFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new PostOpClassFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
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

  getReport(){
    this.getReportsEvent.emit();
  }

}
