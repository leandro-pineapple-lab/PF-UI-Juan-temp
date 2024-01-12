import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { CountByStatusFilterModel } from 'src/app/models/report/advocate/count-by-status/count-by-status-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-count-by-status',
  templateUrl: './count-by-status.component.html',
  styleUrls: ['./count-by-status.component.scss']
})
export class CountByStatusComponent implements OnInit {

  reportFilters = new CountByStatusFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = AdvocateReportsTableUtils.countByStatusTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private toastr: ToastrService, private advocateReportService: AdvocateReportService,
    private fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "Status",
    this.pagination.orderDirection = "asc";
    this.reportFilters.intakeFrom.value = new Date(2017, 0, 1);
    this.reportFilters.intakeTo.value = moment().subtract(moment().day()).toDate();
    const today: moment.Moment = moment();
    this.reportFilters.statusFrom.value = today.clone().subtract(1, "months") .startOf('month').toDate();
    this.reportFilters.statusTo.value = today.clone().subtract(1, 'months').endOf('month').toDate();
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setTableHeaderDates(){
    const statusOnTableHeader = this.tableHeaders.find(x => x.orderColumnName === 'StatusOn');
    if (statusOnTableHeader){
      statusOnTableHeader.name = 'Status on ' + (moment(this.reportFilters.statusFrom.value as Date).format('MM/DD/YYYY').toString());
    }
    const statusOnToTableHeader = this.tableHeaders.find(x => x.orderColumnName === 'StatusOnTo');
    if (statusOnToTableHeader){
      statusOnToTableHeader.name = 'Status on ' + (moment(this.reportFilters.statusTo.value as Date).format('MM/DD/YYYY').toString());
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PATIENT_COUNT_BY_STATUS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getCountByStatus(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response.results;
          this.exportExcel();
          return;
        }
        this.setTableHeaderDates();
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
      const tableHeadersClone = cloneDeep(this.tableHeaders); //[...this.tableHeaders];
      const statusOnTableHeader = tableHeadersClone.find((x: any) => x.orderColumnName === 'StatusOn');
      if (statusOnTableHeader){
        statusOnTableHeader.name = 'Status on ' + (moment(this.reportFilters.statusFrom.value as Date).format('MM/DD/YYYY').toString());
      }
      const statusOnToTableHeader = tableHeadersClone.find((x: any) => x.orderColumnName === 'StatusOnTo');
      if (statusOnToTableHeader){
        statusOnToTableHeader.name = 'Status on ' + (moment(this.reportFilters.statusTo.value as Date).format('MM/DD/YYYY').toString());
      }
      const excelResults = this.allReportsList.map((statusCount: any) => {
        return {
          "Status": statusCount.status,
          "SubStatus": statusCount.subStatus,
          [(statusOnTableHeader?.name as string)]: statusCount.statusOnCount,
          [(statusOnToTableHeader?.name as string)]: statusCount.statusOnToCount,
          "Had status during date range": statusCount.hadStatusDuringRangeCount,
          "Got status during date range": statusCount.gotStatusDuringRangeCount,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Patient Status Count Report', tableHeadersClone.filter((x: any) => x.name !== 'Action').map((x: any) => x.name));
    }
  }

}
