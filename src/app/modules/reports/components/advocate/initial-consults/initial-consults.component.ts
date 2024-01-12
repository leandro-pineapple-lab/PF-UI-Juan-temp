import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { InitialConsultsFilterModel } from 'src/app/models/report/advocate/initial-consults/initial-consults-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';

@Component({
  selector: 'app-initial-consults',
  templateUrl: './initial-consults.component.html',
  styleUrls: ['./initial-consults.component.scss']
})
export class InitialConsultsComponent implements OnInit {

  reportFilters = new InitialConsultsFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();

  tableHeaders = AdvocateReportsTableUtils.initialConsultsTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private toastr: ToastrService, private advocateReportService: AdvocateReportService,
    private fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = "Name";
    this.pagination.orderDirection = "asc";
    const currentDate = moment();
    this.reportFilters.initialConsultTo.value = currentDate.toDate();
    this.reportFilters.initialConsultFrom.value = currentDate.subtract(3, "months").toDate();
    this.getSystemParams();
    this.logAccessData();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_INITIAL_CONSULTS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getInitialConsultsReport(this.pagination, this.reportFilters).subscribe({
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
      const excelResults = this.allReportsList.map((initialConsult: any) => {
        return {
          "Name": initialConsult.patientName,
          "DOB": initialConsult.birthDateString,
          "Visit Date": initialConsult.visitDateString,
          "Surgeon": initialConsult.surgeonName,
          "Advocate": initialConsult.advocateName
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Initial Consults Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }
}
