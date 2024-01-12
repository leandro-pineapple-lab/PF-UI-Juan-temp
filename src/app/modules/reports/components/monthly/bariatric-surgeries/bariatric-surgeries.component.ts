import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { BariatricSurgeryFilterModel } from 'src/app/models/report/monthly/bariatric-surgery/bariatric-surgery-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';

@Component({
  selector: 'app-bariatric-surgeries',
  templateUrl: './bariatric-surgeries.component.html',
  styleUrls: ['./bariatric-surgeries.component.scss']
})
export class BariatricSurgeriesComponent implements OnInit {

  reportFilters = new BariatricSurgeryFilterModel();
  currentSelectedYear = this.reportFilters.year.value;
  previousYear = ((this.currentSelectedYear as number) - 1);
  lastYearsList: number[] = this.monthlyReportService.lastYearsList;
  lastYearsAmountToShow = 6;
  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  allReportsList = [];
  excelHelper: ExcelHelper;
  tableHeaders = MonthlyReportsTableUtils.bariatricSurgicalSummaryTableHeaders;
  thisYearBariatricSurgerySummaryTable: TableModel = new TableModel(this.tableHeaders);
  surgerySummaryComparisonTable: TableModel = new TableModel(this.tableHeaders);
  table: TableModel = new TableModel(this.tableHeaders);

  constructor(private monthlyReportService: MonthlyReportService, private reportService: ReportService, private fileSaver: FileSaverService,
    private commonService: CommonService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_CASE_LOG_SUMMARY;
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

  getReports(exportToExcel = false, listToExport = ''){
    this.monthlyReportService.getBariatricSurgeries(this.reportFilters).subscribe({
      next: (response: any) => {
        if (exportToExcel){
          this.allReportsList = listToExport === 'selectedYear' ? response.thisYearBariatricSurgerySummary :
                                listToExport === 'yearComparison' ? response.bariatricSurgerySummaryComparison : [];
          this.exportExcel();
          return;
        }
        this.currentSelectedYear = this.reportFilters.year.value;
        this.previousYear = ((this.currentSelectedYear as number) - 1);
        this.thisYearBariatricSurgerySummaryTable.data = response.thisYearBariatricSurgerySummary;
        this.surgerySummaryComparisonTable.data = response.bariatricSurgerySummaryComparison;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((bariatricSurgery: any) => {
        return {
          "Month": bariatricSurgery.monthName,
          "RNY": bariatricSurgery.rnyValue,
          "Sleeve": bariatricSurgery.sleeveValue,
          "Revision": bariatricSurgery.revisionValue,
          "Total": bariatricSurgery.total
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Case Log Summary Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
