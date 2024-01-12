import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { HandoutStatusFilterModel } from 'src/app/models/report/advocate/handout-status/handout-status-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-handout-status-page',
  templateUrl: './handout-status-page.component.html',
  styleUrls: ['./handout-status-page.component.scss']
})
export class HandoutStatusPageComponent implements OnInit {

  reportFilters = new HandoutStatusFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = AdvocateReportsTableUtils.handoutStatusTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private toastr: ToastrService, fileSaver: FileSaverService,
    private activatedRoute: ActivatedRoute, private advocateReportService: AdvocateReportService) {
    this.excelHelper = new ExcelHelper(fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = "PatientName",
    this.pagination.orderDirection = "asc";
    const today = moment();
    this.reportFilters.assignedFrom.value = today.clone().subtract(1, "weeks").toDate();
    this.reportFilters.assignedTo.value = today.toDate();
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
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_HANDOUT_STATUS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getHandoutStatus(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response?.object?.results;
          this.exportExcel();
          return;
        }
        this.table.data = response?.object?.results;
        this.pagination.totalNumberOfRecords = response?.object?.totalNumberOfRecords;
        this.pagination.calculatePaging();
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
    const datePipe = new DatePipe('en-US');
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((handoutStatus: any) => {
        return {
          "Name": handoutStatus.patientName,
          "Title": handoutStatus.title,
          "Date Assigned": datePipe.transform(handoutStatus.assignedDate, 'dd/MM/yyyy'),
          "Assigned By": handoutStatus.assignedBy,
          "Opened": handoutStatus.opened,
          "Completed": handoutStatus.completed,
          "Completed On": datePipe.transform(handoutStatus.completedOn, 'dd/MM/yyyy')
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Handout Status Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
