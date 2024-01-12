import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { SurgicalHxFilterModel } from 'src/app/models/report/marketing/surgical-hx-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MarketingReportService } from 'src/app/services/report/marketing/marketing-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MarketingReportsTableUtils } from 'src/app/shared/utils/report/marketing/marketing-report.table.utils';

@Component({
  selector: 'app-surgical-hx-page',
  templateUrl: './surgical-hx-page.component.html',
  styleUrls: ['./surgical-hx-page.component.scss']
})
export class SurgicalHxPageComponent implements OnInit {

  tableHeaders = MarketingReportsTableUtils.surgicalHxTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  reportFilters = new SurgicalHxFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private toastr: ToastrService,
    private marketingReportService: MarketingReportService, private fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "PatientName",
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_SURGICAL_HX;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.marketingReportService.getSurgicalHx(this.pagination, this.reportFilters).subscribe({
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
      if (this.pagination.page === 1){
        this.pagination.tableDataChange(this.pagination.page);
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((surgicalHx: any) => {
        return {
          "Name": surgicalHx.patientName,
          "Age": surgicalHx.age,
          "Procedure": surgicalHx.procedure,
          "Surgeon": surgicalHx.surgeonName,
          "Surgery Date": surgicalHx.surgeryDateString,
          "Weight lbs - Start": surgicalHx.weightLbs,
          "BMI - Start": surgicalHx.bmi,
          "Last Visit": surgicalHx.lastVisitString,
          "Weight lbs - End": surgicalHx.weightLbs2,
          "BMI - End": surgicalHx.bmi2,
          "% Loss": surgicalHx.lossPercentage,
          "After Weeks": surgicalHx.afterWeeks,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Surgical Hx Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }
}
