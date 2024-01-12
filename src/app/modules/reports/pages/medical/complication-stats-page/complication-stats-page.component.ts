import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { ComplicationStatsFilterModel } from 'src/app/models/report/medical/complication-stats-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MedicalReportService } from 'src/app/services/report/medical-report/medical-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MedicalReportsTableUtils } from 'src/app/shared/utils/report/medical/medical-report.table.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-complication-stats-page',
  templateUrl: './complication-stats-page.component.html',
  styleUrls: ['./complication-stats-page.component.scss']
})
export class ComplicationStatsPageComponent implements OnInit {

  tableHeaders = MedicalReportsTableUtils.complicationStatsTableHeaders;
  totalsTableHeaders = cloneDeep(MedicalReportsTableUtils.complicationStatsTableHeaders);
  table: TableModel = new TableModel(this.tableHeaders);
  totalsTable: TableModel = new TableModel(this.totalsTableHeaders);
  allReportsList: any[] = [];

  pagination = new LocalPagingModel();
  reportFilters = new ComplicationStatsFilterModel();

  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private toastr: ToastrService,
    private medicalReportService: MedicalReportService, private fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.totalsTableHeaders[0].name = '';
    this.pagination.orderBy = "Surgeon",
    this.pagination.orderDirection = "asc";
    const currentDate = moment();
    this.reportFilters.surgeryFrom.value = currentDate.clone().subtract(12, "months").toDate();
    this.reportFilters.surgeryTo.value = currentDate.toDate();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_COMPLICATION_STATS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.medicalReportService.getComplicationStats(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response.object;
          const totalsOfTotals = this.allReportsList.pop();
          this.pagination.sort(this.allReportsList);
          this.allReportsList.push(totalsOfTotals);
          this.exportExcel();
          this.pagination.allResults = false;
          return;
        }

        if (response?.object?.length > 0){
          this.totalsTable.data = [response.object.pop()];
          this.table = cloneObject(this.table);
          this.table.data = response.object;
        }else{
          this.table = cloneObject(this.table);
          this.table.data = response.object;
          this.totalsTable.data = [];
        }
      }
    });
  }

  refreshTable(){
    this.pagination.page = 1;
    this.getReports();
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((complicationStats: any) => {
        return {
          "Surgeon": complicationStats.surgeonName,
          "# Surgeries": complicationStats.cntSurg,
          "# Short Term Complications": complicationStats.cntSTComplication,
          "# Long Term Complications": complicationStats.cntLTComplication,
          "% Complications": complicationStats.complicationPercentage,
          "# Patient Deaths": complicationStats.cntDeath,
          "% Deaths": complicationStats.deathPercentage,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Complications Stats', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }
}
