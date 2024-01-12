import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { PullThroughFilterModel } from 'src/app/models/report/monthly/pull-through/pull-through-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';

@Component({
  selector: 'app-pull-through',
  templateUrl: './pull-through.component.html',
  styleUrls: ['./pull-through.component.scss']
})
export class PullThroughComponent implements OnInit {

  reportFilters = new PullThroughFilterModel();
  lastYearsList: number[] = [];
  yearsToShow = 6;

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();

  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MonthlyReportsTableUtils.pullThroughTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  excelHelper: ExcelHelper;

  constructor(private reportService: ReportService, private toastr: ToastrService,
              private commonService: CommonService, private monthlyReportService: MonthlyReportService,
              private fileSaver: FileSaverService, private activatedRoute: ActivatedRoute) {
                this.excelHelper = new ExcelHelper(this.fileSaver);
              }

  ngOnInit(): void {
    this.lastYearsList = this.monthlyReportService.getLastYearsList(this.yearsToShow);
    this.activatedRoute.queryParams.subscribe(params => {
      this.setFavoriteReportFilters(params);
    });
    this.favoriteReport.link = this.reportsLink;
    this.getMyFavoriteReports();
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setFavoriteReportFilters(params: Params){
    const yearQueryParam = params['year'];
    if (yearQueryParam){
      this.reportFilters.year.value = yearQueryParam;
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PULL_THROUGH;
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

  getReports(exportToExcel = false){
    this.monthlyReportService.getPullThrough(this.reportFilters).subscribe({
      next: (response: any) => {
        if (exportToExcel){
          this.allReportsList = response;
          this.exportExcel();
          return;
        }
        this.table.data = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((pullThrough: any) => {
        return {
          "": pullThrough.type,
          "Jan": pullThrough.januaryValue,
          "Feb": pullThrough.februaryValue,
          "Mar": pullThrough.marchValue,
          "Apr": pullThrough.aprilValue,
          "May": pullThrough.mayValue,
          "Jun": pullThrough.juneValue,
          "Jul": pullThrough.julyValue,
          "Aug": pullThrough.augustValue,
          "Sep": pullThrough.septemberValue,
          "Oct": pullThrough.octoberValue,
          "Nov": pullThrough.novemberValue,
          "Dec": pullThrough.decemberValue,
          "Total": pullThrough.total,
          "Q1": pullThrough.quantity1,
          "Q2": pullThrough.quantity2,
          "Q3": pullThrough.quantity3,
          "Q4": pullThrough.quantity4,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Pull Through Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
