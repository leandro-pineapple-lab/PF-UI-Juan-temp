import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { PlannedSurgeryFilterModel } from 'src/app/models/report/advocate/planned-surgery/planned-surgery-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-planned-surgery-filters',
  templateUrl: './planned-surgery-filters.component.html',
  styleUrls: ['./planned-surgery-filters.component.scss']
})
export class PlannedSurgeryFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel(this.reportsLink);

  @Input()
  reportFilters = new PlannedSurgeryFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private reportService: ReportService) { }

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
    this.favoriteReport.link = this.reportsLink;
    this.reportService.getMyFavoriteReports(this.reportsLink).subscribe({
      next: (response: any) => {
        if (response && response.length > 0) {
          this.favoriteReports = response;
        }
      }
    });
  }

}
