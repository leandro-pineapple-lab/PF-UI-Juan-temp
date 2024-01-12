import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { PlannedSurgeryFilterModel } from 'src/app/models/report/advocate/planned-surgery/planned-surgery-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-planned-surgery-page',
  templateUrl: './planned-surgery-page.component.html',
  styleUrls: ['./planned-surgery-page.component.scss']
})
export class PlannedSurgeryPageComponent implements OnInit {

  tableHeaders = AdvocateReportsTableUtils.plannedSurgeriesTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  pagination = new LocalPagingModel();
  reportFilters = new PlannedSurgeryFilterModel();

  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, fileSaver: FileSaverService,
              private advocateReportService: AdvocateReportService) {
    this.excelHelper = new ExcelHelper(fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = "patientName",
    this.pagination.orderDirection = "asc";
    const currentDate = moment();
    this.reportFilters.surgeryFrom.value = currentDate.clone().toDate();
    this.reportFilters.surgeryTo.value = currentDate.add(20, "days").toDate();
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

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PLANNED_SURGERIES;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    console.log("🚀 ~ file: planned-surgery-page.component.ts:72 ~ PlannedSurgeryPageComponent ~ this.advocateReportService.getPlannedSurgeries ~ this.reportFilters:", this.reportFilters)
    this.advocateReportService.getPlannedSurgeries(this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          const allReportsList = response.object;
          this.pagination.sort(allReportsList);
          this.exportExcel(allReportsList);
          this.pagination.allResults = false;
          return;
        }

        this.table = cloneObject(this.table);
        this.table.data = response?.object;
      }
    });
  }

  refreshTable(){
    this.pagination.page = 1;
    this.getReports();
  }

  exportExcel(allReportsList: any[]){
    if (allReportsList && allReportsList.length > 0){
      const datePipe = new DatePipe('en-US');
      const excelResults = allReportsList.map((surgicalPipeline: any) => {
        return {
          "Patient Name": surgicalPipeline.patientName,
          "MRN": surgicalPipeline.accountNumber,
          "DOB": surgicalPipeline.birthDateString,
          "Age": surgicalPipeline.age,
          "PCP": surgicalPipeline.pcp,
          "Surgeon": surgicalPipeline.surgeon,
          "Procedure": surgicalPipeline.procedureName,
          "Surgery Date": datePipe.transform(surgicalPipeline.tentativeDate, 'dd/MM/yyyy'),
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Surgical Pipeline', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
