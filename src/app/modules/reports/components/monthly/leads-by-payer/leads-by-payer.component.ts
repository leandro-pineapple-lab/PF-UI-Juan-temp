import { Component, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { LeadsByPayerFilterModel } from 'src/app/models/report/monthly/leads-by-payer/leads-by-payer-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-leads-by-payer',
  templateUrl: './leads-by-payer.component.html',
  styleUrls: ['./leads-by-payer.component.scss']
})
export class LeadsByPayerComponent implements OnInit {

  reportFilters = new LeadsByPayerFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MonthlyReportsTableUtils.leadsByPayerTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  totalsTable: TableModel = new TableModel(this.tableHeaders);
  pagination = new LocalPagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private monthlyReportService: MonthlyReportService,
              private fileSaver: FileSaverService) {
                this.excelHelper = new ExcelHelper(this.fileSaver);
              }

  ngOnInit(): void {
    this.pagination.orderBy = 'payer';
    this.pagination.orderDirection = 'asc';
    const totalsTableHeaders = cloneDeep(this.tableHeaders);
    totalsTableHeaders[0].name = '';
    this.totalsTable.headers = totalsTableHeaders;
    this.getSystemParams();
    this.logAccessData();
  }

  getSystemParams() {
    this.commonService.getSystemParams(reportsSystemParams).subscribe({
      next: (response: any) => {
        const showColumnVisibilityAndExcelParam = response.find((x: any) => x.page === 'General' && x.name === 'showExportControls');
        this.showColumnVisibilityAndExcelButton = showColumnVisibilityAndExcelParam.value === "yes" ? true : false;
      }
    });
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_MONTHLY_LEAD_PAYER;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  refreshTable(){
    this.pagination.page = 1;
    this.getReports();
  }

  getReports(exportExcel = false){
    this.monthlyReportService.getLeadsByPayer(this.reportFilters).subscribe({
      next: (response: any) => {
        if (exportExcel){
          this.exportExcel(response);
          this.pagination.allResults = false;
          return;
        }
        this.totalsTable.data = [response.pop()];
        this.table = cloneObject(this.table);
        this.table.data = response;
      }
    });
  }

  sortTableData(){
    const { orderBy, orderDirection } = this.pagination;

    if (orderBy && orderDirection) {
      this.table.data.sort((a: any, b: any) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        const fallbackValue = (value: any) => {
          return typeof value === 'undefined' ? 0 : value;
        };

        if (orderBy !== 'payer') {
          const aValueNumber = parseInt(fallbackValue(aValue));
          const bValueNumber = parseInt(fallbackValue(bValue));
          return orderDirection === 'asc' ? aValueNumber - bValueNumber : bValueNumber - aValueNumber;
        }

        if (orderDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }
  }

  exportExcel(allReportsList: any[]){
    if (allReportsList && allReportsList.length > 0){
      const excelResults = allReportsList.map((leadPayer: any) => {
        return {
          "Payer": leadPayer.payer,
          "Jan": leadPayer.januaryValue,
          "Feb": leadPayer.februaryValue,
          "Mar": leadPayer.marchValue,
          "Apr": leadPayer.aprilValue,
          "May": leadPayer.mayValue,
          "Jun": leadPayer.juneValue,
          "Jul": leadPayer.julyValue,
          "Aug": leadPayer.augustValue,
          "Sep": leadPayer.septemberValue,
          "Oct": leadPayer.octoberValue,
          "Nov": leadPayer.novemberValue,
          "Dec": leadPayer.decemberValue,
          "Total": leadPayer.total,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Leads by Payer Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
