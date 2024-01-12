import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReadmissionsFilterModel } from 'src/app/models/report/medical/readmissions-filter.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-readmissions-filters',
  templateUrl: './readmissions-filters.component.html',
  styleUrls: ['./readmissions-filters.component.scss']
})
export class ReadmissionsFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];
  proceduresList: ProcedureModel[] = [];
  hospitalsList: HospitalModel[] = [];

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new ReadmissionsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private userService: UserService,
    private procedureService: ProcedureService, private hospitalService: HospitalService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getProcedures(),
      this.getHospitals()
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

  async getHospitals() {
    const response = (await firstValueFrom(this.hospitalService.getHospitals()) as any);
    if (response?.length > 0){
      this.hospitalsList = response;
    }
  }

}
