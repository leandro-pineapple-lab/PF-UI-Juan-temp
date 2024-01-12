import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ComplicationStatsFilterModel } from 'src/app/models/report/medical/complication-stats-filter.model';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-complication-stats-filters',
  templateUrl: './complication-stats-filters.component.html',
  styleUrls: ['./complication-stats-filters.component.scss']
})
export class ComplicationStatsFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];
  proceduresList: ProcedureModel[] = [];

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new ComplicationStatsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private procedureService: ProcedureService,
    private reportService: ReportService, private toastr: ToastrService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getProcedures()
    ]);
    this.getMyFavoriteReports();
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  async getProcedures(){
    const response = (await firstValueFrom(this.procedureService.getValidProcedures()) as any);
    if (response?.length > 0){
      this.proceduresList = response;
    }
  }

  getMyFavoriteReports(){
    this.favoriteReport.link = this.reportsLink;
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

  setSurgeryTypeCustomValue(){
    switch (this.reportFilters.surgeryType.value) {
      case 'B':
        this.reportFilters.surgeryType.customValue = 'Bariatric';
        break;
      case 'O':
        this.reportFilters.surgeryType.customValue = 'Other';
        break;
      case 'A':
        this.reportFilters.surgeryType.customValue = 'All';
        break;
    }
  }

}
