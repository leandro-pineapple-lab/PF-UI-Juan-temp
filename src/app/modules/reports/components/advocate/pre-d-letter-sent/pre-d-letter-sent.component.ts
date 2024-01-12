import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { PreDLetterSentFilterModel } from 'src/app/models/report/advocate/pre-d-letter-sent/pre-d-letter-sent-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { FormatHelper } from 'src/app/shared/helpers/format-helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';

@Component({
  selector: 'app-pre-d-letter-sent',
  templateUrl: './pre-d-letter-sent.component.html',
  styleUrls: ['./pre-d-letter-sent.component.scss']
})
export class PreDLetterSentComponent implements OnInit {

  reportFilters = new PreDLetterSentFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = AdvocateReportsTableUtils.preDLetterSentTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private toastr: ToastrService, private advocateReportService: AdvocateReportService,
    private fileSaver: FileSaverService, private activatedRoute: ActivatedRoute) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "Name",
    this.pagination.orderDirection = "asc";
    const currentDate = moment();
    this.reportFilters.to.value = currentDate.toDate();
    this.reportFilters.from.value = currentDate.subtract(1, "months").toDate();
    this.activatedRoute.queryParams.subscribe(params => {
      this.setFavoriteReportFilters(params);
    });
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setFavoriteReportFilters(params: Params){
    const rangeTypeQueryParam = params['rgt'];
    if (rangeTypeQueryParam){
      this.reportFilters.rangeType.value = rangeTypeQueryParam;
    }

    const preDSentFromQueryParam = params['dtif'];
    if (preDSentFromQueryParam){
      this.reportFilters.from.value = FormatHelper.convertStringToDate(preDSentFromQueryParam);
    }

    const preDSentToQueryParam = params['dtit'];
    if (preDSentToQueryParam){
      this.reportFilters.to.value = FormatHelper.convertStringToDate(preDSentToQueryParam);
    }

    const surgeonQueryParam = params['surg'];
    if (surgeonQueryParam){
      this.reportFilters.surgeon.value = surgeonQueryParam;
    }

    const advocateQueryParam = params['adv'];
    if (advocateQueryParam){
      this.reportFilters.advocate.value = advocateQueryParam;
    }

    const anonymizeQueryParam = params['ano'];
    if (anonymizeQueryParam){
      this.reportFilters.anonymize.value = anonymizeQueryParam;
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

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PRE_D_LETTER_SENT;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getPreDLetterSent(this.pagination, this.reportFilters).subscribe({
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

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((preDLetterSent: any) => {
        return {
          "Name": preDLetterSent.patientName,
          "DOB": preDLetterSent.birthDateString,
          "Status Code": preDLetterSent.patientStatus,
          "First Visit Date": preDLetterSent.firstVisitString,
          "Surgeon": preDLetterSent.surgeonName,
          "Navigator": preDLetterSent.advocateName,
          "Insurance": preDLetterSent.insurance,
          "Pre_D Sent On": preDLetterSent.preDSentOnString,
          "Pre_D Status": preDLetterSent.preDStatus,
          "Pre_D Status On": preDLetterSent.preDStatusOnString,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Pre-D Letter Sent Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
