import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PatientInsuranceFilterModel } from 'src/app/models/report/advocate/patient-insurance/patient-insurance-filter.model';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { FavoriteReportsModalComponent } from '../../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AddFavoriteReportModalComponent } from '../../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { ReportService } from 'src/app/services/report/report.service';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-patient-insurance-filters',
  templateUrl: './patient-insurance-filters.component.html',
  styleUrls: ['./patient-insurance-filters.component.scss']
})
export class PatientInsuranceFiltersComponent implements OnInit {

  insuranceCompaniesList: any[] = [];
  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  statusList: any[] = [];
  @Input()
  reportFilters = new PatientInsuranceFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private insuranceCompanyService: InsuranceCompanyService, private toastr: ToastrService,
      private modalService: NgbModal, private reportService: ReportService) { }

  ngOnInit(): void {
    this.getInsuranceCompanies();
    this.getMyFavoriteReports();
  }

  changeCheckedStatus(statusId: any): void {
    const selectedStatus = this.statusList.find(x => x.id === statusId);
    if (selectedStatus){
      selectedStatus.checked = !selectedStatus.checked;
    }
  }

  getInsuranceCompanies() {
    this.insuranceCompanyService.getInsuranceCompanies().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.insuranceCompaniesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Patient Insurance Reports';
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = 'Patient Insurance';
    this.favoriteReport.link = this.reportsLink;
    this.favoriteReport.params = FavoriteReportUtils.convertToFavoriteReportParams(this.reportFilters);
    this.setStatusListParam();
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getMyFavoriteReports();
    });
  }

  setStatusListParam() {
    const checkedStatuses = this.statusList.filter(status => status.checked);
    if (checkedStatuses?.length > 0){
      const checkedStatusNames = checkedStatuses.map(status => status.description);
      const statusParam = this.favoriteReport.params.find(x => x.key === "stat");
      if (statusParam){
        statusParam.value = checkedStatusNames.join("|");
      }
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
    const selectedStatusIds = this.statusList.filter(x => x.checked).map(x => (x.id as number));
    this.reportFilters.status.value = selectedStatusIds;
    this.getReportsEvent.emit();
  }

}
