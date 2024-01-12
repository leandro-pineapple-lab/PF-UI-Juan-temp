import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { AddFavoriteReportModalComponent } from '../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { FavoriteReportParamModel } from 'src/app/models/report/favorite-report/favorite-report-params.model';
import { ReportService } from 'src/app/services/report/report.service';
import { FavoriteReportsModalComponent } from '../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-duplicated-intake',
  templateUrl: './duplicated-intake.component.html',
  styleUrls: ['./duplicated-intake.component.scss']
})
export class DuplicatedIntakeComponent implements OnInit {

  anonymize = false;
  tableHeaders = AdvocateReportsTableUtils.duplicateDailyIntakeTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;
  logAccessDataModel = new LogAccessDataModel();
  favoriteReport = new FavoriteReportModel();
  showColumnVisibilityAndExcelButton = false;
  favoriteReports: FavoriteReportModel[] = [];

  constructor(private toastr: ToastrService, private advocateReportService: AdvocateReportService,
              private fileSaver: FileSaverService, private commonService: CommonService, private modalService: NgbModal,
              private reportService: ReportService, private activatedRoute: ActivatedRoute) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.setFavoriteReportFilters(params);
    });
    this.pagination.orderBy = 'Name';
    this.pagination.orderDirection = 'asc';
    this.getSystemParams();
    this.logAccessData();
    this.getMyFavoriteReports();
    this.getReports();
  }

  setFavoriteReportFilters(params: Params){
    const anoQueryParam = params['ano'];
    if (anoQueryParam){
      this.anonymize = anoQueryParam === 'true' ? true : false;
    }
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

  getMyFavoriteReports(){
    this.reportService.getMyFavoriteReports(this.logAccessDataModel.pageAccessedUrl).subscribe({
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

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_DUPLICATES_INTAKES;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getDuplicatedIntakesReport(this.pagination, this.anonymize).subscribe({
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
    });
  }

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Daily Intake Reports';
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = 'Duplicated Intakes';
    this.favoriteReport.link = this.logAccessDataModel.pageAccessedUrl;
    const favoriteReportParam: FavoriteReportParamModel = {
      id: 0,
      reportId: 0,
      description: 'Anonymize',
      key: 'ano',
      value: this.anonymize.toString()
    };
    this.favoriteReport.params = [favoriteReportParam];
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getMyFavoriteReports();
    })
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((dailyIntakeReport: any) => {
        return {
          "Name": dailyIntakeReport.patientName,
          "Email": dailyIntakeReport.email,
          "Status": dailyIntakeReport.origin,
          "Date Created": dailyIntakeReport.dateCreatedString,
          "Origin": dailyIntakeReport.origin,
          "Lead Type": dailyIntakeReport.leadType,
          "Is Patient": dailyIntakeReport.isPatient
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Duplicated Intakes Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
