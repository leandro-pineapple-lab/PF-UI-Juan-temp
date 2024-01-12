import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatusModel } from 'src/app/models/practice/status.model';
import { SubStatusModel } from 'src/app/models/practice/subStatus.model';
import { ProspectByStatusFilterModel } from 'src/app/models/report/advocate/prospect-by-status/prospect-by-status-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { ReportService } from 'src/app/services/report/report.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-prospect-by-status-filters',
  templateUrl: './prospect-by-status-filters.component.html',
  styleUrls: ['./prospect-by-status-filters.component.scss']
})
export class ProspectByStatusFiltersComponent implements OnInit {

  filtersCollapsed = true;
  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  advocatesList: string[] = [];
  statusList: StatusModel[] = [];
  subStatusesList: SubStatusModel[] = [];
  subStatusesByStatus: SubStatusModel[] = [];

  @Input()
  reportFilters = new ProspectByStatusFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private advocateService: AdvocateService, private toastr: ToastrService, private statusService: StatusService,
    private reportService: ReportService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
    this.getStatusList();
    this.getAdvocates();
    this.getSubStatusList();
    this.getMyFavoriteReports();
  }

  getAdvocates(){
    this.advocateService.getProfessionalAdvocateNames().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.advocatesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  getSubStatusList() {
    this.statusService.getSubStatuses().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.subStatusesList = response;
          if (this.reportFilters.status.value){
            this.setSubStatusList();
          }
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  setSubStatusList(){
    this.subStatusesByStatus = this.subStatusesList.filter(x => x.status.id == this.reportFilters.status.value);
    const selectedStatus = this.statusList.find(x => x.id == this.reportFilters.status.value);
    if (selectedStatus){
      this.reportFilters.status.customValue = selectedStatus.description;
    }
  }

  setSubStatusCustomValue(){
    const selectedSubStatus = this.subStatusesList.find(x => x.id == this.reportFilters.subStatus.value);
    if (selectedSubStatus){
      this.reportFilters.subStatus.customValue = selectedSubStatus.description;
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

}
