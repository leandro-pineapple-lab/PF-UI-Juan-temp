import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { AppointmentSummaryFilterModel } from 'src/app/models/report/medical/appointment-summary-filter.model';
import { MonthToStringPipe } from 'src/app/modules/shared/pipes/month-to-string.pipe';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';

@Component({
  selector: 'app-appointments-summary-page',
  templateUrl: './appointments-summary-page.component.html',
  styleUrls: ['./appointments-summary-page.component.scss']
})
export class AppointmentsSummaryPageComponent implements OnInit {

  tableHeaders = MonthlyReportsTableUtils.appointmentSummaryTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  appointmentSummaryComparisonTableHeaders = cloneDeep(this.tableHeaders);
  appointmentSummaryComparisonTable: TableModel = new TableModel(this.appointmentSummaryComparisonTableHeaders);
  allReportsList: any[] = [];

  reportFilters = new AppointmentSummaryFilterModel();
  currentSelectedYear = (this.reportFilters.year.value as number);
  previousYear = ((this.reportFilters.year.value as number) - 1);

  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private commonService: CommonService, private activatedRoute: ActivatedRoute, private monthlyReportService: MonthlyReportService,
    fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(fileSaver);
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
      this.currentSelectedYear = (this.reportFilters.year.value as number);
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

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_APPOINTMENTS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(exportToExcel = false, listToExport = ''){
    this.monthlyReportService.getAppointmentsSummary(this.reportFilters).subscribe({
      next: (response: any) => {
        if (exportToExcel){
          this.allReportsList = listToExport === 'selectedYear' ? response.object?.item1 :
                                listToExport === 'previousYear' ? response.object?.item2 : [];
          this.exportExcel();
          return;
        }

        this.currentSelectedYear = (this.reportFilters.year.value as number);
        this.previousYear = (this.currentSelectedYear - 1);
        this.table.data = response.object?.item1;
        this.appointmentSummaryComparisonTable.data = response.object?.item2;
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const monthToStringPipe = new MonthToStringPipe();
      const excelResults = this.allReportsList.map((appointmentSummary: any) => {
        return {
          "Month": monthToStringPipe.transform(appointmentSummary.month, 'short'),
          "Confirmed+Completed": appointmentSummary.confAndCompletedAmount,
          "Confirmed": appointmentSummary.confirmedAmount,
          "Completed": appointmentSummary.completedAmount,
          "Postponed": appointmentSummary.postponedAmount,
          "Cancelled": appointmentSummary.cancelledAmount,
          "No show": appointmentSummary.noShowAmount,
          "Total Appointments": appointmentSummary.appointmentsAmount,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Appointment Summary Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }
}
