import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { PatientDataAccessFilterModel } from 'src/app/models/report/advocate/data-access/patient-data-access-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { LogReportService } from 'src/app/services/report/log/log-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { LogReportsTableUtils } from 'src/app/shared/utils/report/log/log-report.table.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-patient-data-access-page',
  templateUrl: './patient-data-access-page.component.html',
  styleUrls: ['./patient-data-access-page.component.scss']
})
export class PatientDataAccessPageComponent implements OnInit {

  reportFilters = new PatientDataAccessFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;

  pagination = new PagingModel();
  dataAccessTableHeaders = LogReportsTableUtils.dataAccessTableHeaders;
  table = new TableModel(this.dataAccessTableHeaders);
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private logReportService: LogReportService, fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "AccessedOn";
    this.pagination.orderDirection = "desc";
    const currentDate = moment();
    this.reportFilters.accessFrom.value = currentDate.clone().subtract(30, "days").toDate();
    this.reportFilters.accessTo.value = currentDate.toDate();
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  getSystemParams() {
    this.commonService.getSystemParams(reportsSystemParams).subscribe({
      next: (response: any) => {
        const showColumnVisibilityAndExcelParam = response.find((x: any) => x.page === 'General' && x.name === 'showExportControls');
        this.showColumnVisibilityAndExcelButton = showColumnVisibilityAndExcelParam.value === "yes" ? true : false;
      }
    });
  }

  logAccessData() {
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_DATA_ACCESS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  refreshTable() {
    this.pagination.page = 1;
    this.getReports();
  }

  getReports() {
    this.logReportService.getDataAccess(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults) {
          const allReportsList = response?.object?.results;
          this.exportExcel(allReportsList);
          this.pagination.allResults = false;
          return;
        }

        this.table = cloneObject(this.table);
        this.table.data = response.object?.results;
        this.pagination.totalNumberOfRecords = response.object?.totalNumberOfRecords;
      }
    }).add(() => {
      if (this.pagination.page === 1){
        this.pagination.tableDataChange(this.pagination.page);
      }
    });
  }

  exportExcel(allReportsList: any[]){
    if (allReportsList?.length > 0){
      const datePipe = new DatePipe('en-US');
      const excelResults = allReportsList.map((dataAccess: any) => {
        return {
          "Date": datePipe.transform(dataAccess.accessedOn, 'd/M/yyyy h:mm:ss a'),
          "Patient": dataAccess.patientName,
          "Access By": dataAccess.accessedBy,
          "Page Accessed": dataAccess.accessedPage,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Data Access Report', this.dataAccessTableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
