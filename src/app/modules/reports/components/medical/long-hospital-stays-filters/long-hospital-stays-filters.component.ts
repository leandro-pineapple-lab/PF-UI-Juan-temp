import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { LongHospitalStaysFilterModel } from 'src/app/models/report/medical/long-hospital-stays-filter.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-long-hospital-stays-filters',
  templateUrl: './long-hospital-stays-filters.component.html',
  styleUrls: ['./long-hospital-stays-filters.component.scss']
})
export class LongHospitalStaysFiltersComponent implements OnInit {

  surgeonsList: SurgeonModel[] = [];
  proceduresList: ProcedureModel[] = [];
  hospitalsList: HospitalModel[] = [];

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  hospitalStaysDurationList = [
    {value: 4, text: '> 4 days'},
    {value: 5, text: '> 5 days'},
    {value: 6, text: '> 6 days'},
    {value: 7, text: '> 7 days'},
    {value: 10, text: '> 10 days'},
    {value: 14, text: '> 14 days'},
    {value: 28, text: '> 28 days'},
  ];

  @Input()
  reportFilters = new LongHospitalStaysFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private procedureService: ProcedureService, private reportService: ReportService,
    private toastr: ToastrService, private hospitalService: HospitalService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getProcedures(),
      this.getHospitals()
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

  async getHospitals() {
    const response = (await firstValueFrom(this.hospitalService.getHospitals()) as any);
    if (response?.length > 0){
      this.hospitalsList = response;
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

}
