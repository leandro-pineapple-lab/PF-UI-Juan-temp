import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatusModel } from 'src/app/models/practice/status.model';
import { CountByStatusFilterModel } from 'src/app/models/report/advocate/count-by-status/count-by-status-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-count-by-status-filters',
  templateUrl: './count-by-status-filters.component.html',
  styleUrls: ['./count-by-status-filters.component.scss']
})
export class CountByStatusFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  statusList: StatusModel[] = [];

  @Input()
  reportFilters = new CountByStatusFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private statusService: StatusService, private toastr: ToastrService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
    this.getMyFavoriteReports();
    this.getStatusList();
  }

  setStatusCustomValue(){
    const selectedStatus = this.statusList.find(x => x.id == this.reportFilters.status.value);
    if (selectedStatus){
      this.reportFilters.status.customValue = selectedStatus.description;
    }
  }

  getStatusList() {
    this.statusService.getStatuses().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.statusList = response;
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
