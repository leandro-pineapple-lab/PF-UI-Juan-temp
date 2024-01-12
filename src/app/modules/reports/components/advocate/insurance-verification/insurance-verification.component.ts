import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { TableModel } from 'src/app/models/common/table/table.model';
import { AdvocateModel } from 'src/app/models/practice/advocate.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportsModalComponent } from '../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { AddFavoriteReportModalComponent } from '../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { ReportService } from 'src/app/services/report/report.service';
import { FavoriteReportParamModel } from 'src/app/models/report/favorite-report/favorite-report-params.model';
import { CommonService } from 'src/app/services/common/common.service';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insurance-verification',
  templateUrl: './insurance-verification.component.html',
  styleUrls: ['./insurance-verification.component.scss']
})
export class InsuranceVerificationComponent implements OnInit {

  advocateName = '';
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = AdvocateReportsTableUtils.insuranceVerificationTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;
  advocatesList: AdvocateModel[] = [];
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel();

  constructor(private advocateService: AdvocateService, private toastr: ToastrService, private fileSaver: FileSaverService,
    private modalService: NgbModal, private reportService: ReportService, private commonService: CommonService,
    private advocateReportService: AdvocateReportService, private activatedRoute: ActivatedRoute) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let advocateParam = params['adv'];
      if (advocateParam){
        this.advocateName = advocateParam;
      }
    });
    this.pagination.orderBy = 'Payer';
    this.pagination.orderDirection = 'asc';
    this.getSystemParams();
    this.logAccessData();
    this.getAdvocates();
    this.getMyFavoriteReports();
    this.getReports();
  }

  getSystemParams() {
    this.commonService.getSystemParams(reportsSystemParams).subscribe({
      next: (response: any) => {
        const showColumnVisibilityAndExcelParam = response.find((x: any) => x.page === 'General' && x.name === 'showExportControls');
        this.showColumnVisibilityAndExcelButton = showColumnVisibilityAndExcelParam.value === "yes" ? true : false;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_INSURANCE_VERIFICATION;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
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

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Insurance Verification Reports';
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = 'Insurance Verification';
    this.favoriteReport.link = this.reportsLink;
    const favoriteReportParam: FavoriteReportParamModel = {
      id: 0,
      reportId: 0,
      description: 'Advocate',
      key: 'adv',
      value: this.advocateName
    };
    this.favoriteReport.params = [favoriteReportParam];
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getMyFavoriteReports();
    });
  }

  getReports(){
    this.advocateReportService.getInsuranceVerification(this.pagination, this.advocateName).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response.results;
          this.exportExcel();
          return;
        }
        this.table.data = response.results;
        this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    }).add(() => {
      this.pagination.allResults = false;
      if (this.pagination.page === 1){
        this.pagination.tableDataChange(this.pagination.page);
      }
    });;
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((insuranceCompanyVerification: any) => {
        return {
          "Payer": insuranceCompanyVerification.payer,
          "# Patients": insuranceCompanyVerification.patientsAmount,
          "Min Request Date": insuranceCompanyVerification.minRequestDateString,
          "Max Request Date": insuranceCompanyVerification.maxRequestDateString
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Insurance Verification Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
