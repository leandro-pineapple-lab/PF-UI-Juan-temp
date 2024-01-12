import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { MDReferralModel } from 'src/app/models/referral/md-referral.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ComplicationsFilterModel } from 'src/app/models/report/medical/complications-filter.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { MarketingService } from 'src/app/services/marketing/marketing.service';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-complication-filters',
  templateUrl: './complication-filters.component.html',
  styleUrls: ['./complication-filters.component.scss']
})
export class ComplicationFiltersComponent implements OnInit {

  filtersCollapsed = true;
  surgeonsList: SurgeonModel[] = [];
  proceduresList: ProcedureModel[] = [];
  hospitalsList: HospitalModel[] = [];
  mdReferralsList: MDReferralModel[] = [];

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new ComplicationsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private userService: UserService, private procedureService: ProcedureService, private reportService: ReportService,
    private hospitalService: HospitalService, private marketingService: MarketingService) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getSurgeons(),
      this.getProcedures(),
      this.getHospitals(),
      this.getMDReferrals()
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

  async getMDReferrals() {
    const pagination = new PagingModel();
    pagination.allResults = true;
    const response = (await firstValueFrom(this.marketingService.getMDReferrals(pagination, '', '')) as any);
    if (response){
      this.mdReferralsList = response.results;
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
