import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { MonthlyNumbersFilterModel } from 'src/app/models/report/monthly/monthly-numbers/monthly-numbers-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';

@Component({
  selector: 'app-monthly-numbers-page',
  templateUrl: './monthly-numbers-page.component.html',
  styleUrls: ['./monthly-numbers-page.component.scss']
})
export class MonthlyNumbersPageComponent implements OnInit {

  reportFilters = new MonthlyNumbersFilterModel();
  currentSelectedYear: number = (this.reportFilters.year.value as number);
  previousYear = ((this.reportFilters.year.value as number) - 1);
  lastYearsList: number[] = this.monthlyReportService.lastYearsList;
  yearsToShow = 6;
  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MonthlyReportsTableUtils.monthlyStatsTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  previousYearComparisonTable: TableModel = new TableModel(this.tableHeaders);
  allReportsList: any[] = [];
  excelHelper: ExcelHelper;

  constructor(private reportService: ReportService, private toastr: ToastrService,
    private commonService: CommonService, private monthlyReportService: MonthlyReportService,
    private fileSaver: FileSaverService, private activatedRoute: ActivatedRoute) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.favoriteReport.link = this.reportsLink;
    this.getMyFavoriteReports();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_MONTHLY_STATS;
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
    this.monthlyReportService.getMonthlyStats(this.reportFilters).subscribe({
      next: (response: any) => {
        if (exportToExcel){
          const {previousYearStats, selectedYearStats} = response;
          const parsed = parseInt(this.currentSelectedYear.toString());
          this.allReportsList = selectedYearStats.map((x: any) => {
            return {
              ...x,
              year: parsed
            }
          });
          if (previousYearStats?.length > 0){
            const previousYearMap = previousYearStats.map((x: any) => {
              return {
                ...x,
                year: this.previousYear
              }
            });
            this.allReportsList = [...this.allReportsList, ...previousYearMap];
          }
          this.exportExcel();
          return;
        }
        this.currentSelectedYear = (this.reportFilters.year.value as number);
        this.previousYear = (this.currentSelectedYear - 1);
        this.table.data = response.selectedYearStats.filter((x: any) => x !== null);
        this.previousYearComparisonTable.data = response.previousYearStats.filter((x: any) => x !== null);
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelTableHeaders = cloneDeep(this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      excelTableHeaders.unshift('Year');
      const excelResults = this.allReportsList.map((monthlyStat: any) => {
        return {
          "Year": monthlyStat.year,
          "": monthlyStat.stat,
          "Jan": monthlyStat.januaryValue,
          "Feb": monthlyStat.februaryValue,
          "Mar": monthlyStat.marchValue,
          "Apr": monthlyStat.aprilValue,
          "May": monthlyStat.mayValue,
          "Jun": monthlyStat.juneValue,
          "Jul": monthlyStat.julyValue,
          "Aug": monthlyStat.augustValue,
          "Sep": monthlyStat.septemberValue,
          "Oct": monthlyStat.octoberValue,
          "Nov": monthlyStat.novemberValue,
          "Dec": monthlyStat.decemberValue,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Monthly Stats Report', excelTableHeaders);
    }
  }

}
