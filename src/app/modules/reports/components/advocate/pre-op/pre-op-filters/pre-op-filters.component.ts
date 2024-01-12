import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { PreOpFilterModel } from 'src/app/models/report/advocate/pre-op/pre-op-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportsModalComponent } from '../../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { AddFavoriteReportModalComponent } from '../../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'src/app/services/report/report.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pre-op-filters',
  templateUrl: './pre-op-filters.component.html',
  styleUrls: ['./pre-op-filters.component.scss']
})
export class PreOpFiltersComponent implements OnInit {

  advocatesList: string[] = [];
  subStatusList = [
    {
      id: 10,
      name: 'Pre-Op pending'
    },
    {
      id: 20,
      name: 'Surgery date pending'
    },
    {
      id: 30,
      name: 'Surgery pending'
    },
  ];
  surgeonsList: SurgeonModel[] = [];
  insuranceCompaniesList: any[] = [];
  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  @Input()
  reportFilters = new PreOpFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private advocateService: AdvocateService, private toastr: ToastrService, private userService: UserService,
              private insuranceCompanyService: InsuranceCompanyService, private modalService: NgbModal, private reportService: ReportService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    await Promise.all([this.getAdvocates(), this.getSurgeons(), this.getInsuranceCompanies()]);
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getMyFavoriteReports();
    this.getReport();
  }

  async getAdvocates(){
    this.advocatesList = (await firstValueFrom(this.advocateService.getProfessionalAdvocateNames()) as string[]);
  }

  async getInsuranceCompanies() {
    const response = (await firstValueFrom(this.insuranceCompanyService.getInsuranceCompanies()) as any[]);
    if (response != null && response.length > 0) {
      this.insuranceCompaniesList = response;
    }
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Pre-Op Reports';
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = 'Pre-Op';
    this.favoriteReport.link = this.reportsLink;
    this.favoriteReport.params = FavoriteReportUtils.convertToFavoriteReportParams(this.reportFilters);
    this.rewriteFavoriteParamValues();
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getMyFavoriteReports();
    });
  }

  rewriteFavoriteParamValues() {
    const selectedSubStatus = this.subStatusList.find(x => x.id == this.reportFilters.subStatus.value);
    const subStatus = this.favoriteReport.params.find(x => x.key === "ssc");
    if (subStatus && selectedSubStatus){
      subStatus.value = selectedSubStatus.id.toString();
      subStatus.displayValue = selectedSubStatus.name;
    }
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
