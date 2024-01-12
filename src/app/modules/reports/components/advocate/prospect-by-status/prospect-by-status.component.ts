import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { ProspectByStatusFilterModel } from 'src/app/models/report/advocate/prospect-by-status/prospect-by-status-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-prospect-by-status',
  templateUrl: './prospect-by-status.component.html',
  styleUrls: ['./prospect-by-status.component.scss']
})
export class ProspectByStatusComponent implements OnInit {

  reportFilters = new ProspectByStatusFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();

  tableHeaders = AdvocateReportsTableUtils.prospectByStatusTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private toastr: ToastrService, private advocateReportService: AdvocateReportService,
    private fileSaver: FileSaverService, private activatedRoute: ActivatedRoute) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "Name";
    this.pagination.orderDirection = "asc";
    const currentDate = moment();
    this.reportFilters.intakeTo.value = currentDate.toDate();
    this.reportFilters.intakeFrom.value = currentDate.subtract(6, "months").toDate();
    this.activatedRoute.queryParams.subscribe(params => {
      this.setFavoriteReportFilters(params);
    });
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setFavoriteReportFilters(params: Params){
    FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
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
    this.advocateReportService.getProspectByStatusReport(this.pagination, this.reportFilters).subscribe({
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
      const excelResults = this.allReportsList.map((prospect: any) => {
        return {
          "Name": prospect.patientName,
          "DOB": prospect.birthDateString,
          "Advocate": prospect.advocateName,
          "Status Code": prospect.patientStatus,
          "SubStatus": prospect.subStatusDescription,
          "Date Created": prospect.dateCreatedString,
          "Last Contact": prospect.lastContactString,
          "Insurance": prospect.insurance,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Prospects by Status Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
