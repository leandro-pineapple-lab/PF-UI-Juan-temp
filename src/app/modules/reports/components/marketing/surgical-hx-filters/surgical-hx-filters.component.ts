import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { SurgicalHxFilterModel } from 'src/app/models/report/marketing/surgical-hx-filter.model';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-surgical-hx-filters',
  templateUrl: './surgical-hx-filters.component.html',
  styleUrls: ['./surgical-hx-filters.component.scss']
})
export class SurgicalHxFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];
  proceduresList: ProcedureModel[] = [];

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new SurgicalHxFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private procedureService: ProcedureService,
    private toastr: ToastrService, private reportService: ReportService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getProcedures()
    ]);
    this.getMyFavoriteReports();
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

}
