import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SelectModel } from 'src/app/models/common/select.model';
import { PatientDataAccessFilterModel } from 'src/app/models/report/advocate/data-access/patient-data-access-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { LogService } from 'src/app/services/log/log.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-patient-data-access-filters',
  templateUrl: './patient-data-access-filters.component.html',
  styleUrls: ['./patient-data-access-filters.component.scss']
})
export class PatientDataAccessFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel(this.reportsLink);

  accessedPagesList: SelectModel[] = [];
  accessedUsersList: SelectModel[] = [];

  @Input()
  reportFilters = new PatientDataAccessFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private logService: LogService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getAccessedPages(),
      this.getDataAccessUsers()
    ]);
    this.getMyFavoriteReports();
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

  async getAccessedPages() {
    const response = (await firstValueFrom(this.logService.getAccessedPages()) as any);
    if (response?.object?.length > 0) {
      this.accessedPagesList = response.object;
    }
  }

  async getDataAccessUsers() {
    const response = (await firstValueFrom(this.logService.getDataAccessUsers()) as any);
    if (response?.object?.length > 0) {
      this.accessedUsersList = response.object;
    }
  }

}
