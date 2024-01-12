import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { ComplicationsFilterModel } from 'src/app/models/report/medical/complications-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MedicalReportService } from 'src/app/services/report/medical-report/medical-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MedicalReportsTableUtils } from 'src/app/shared/utils/report/medical/medical-report.table.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-complications-page',
  templateUrl: './complications-page.component.html',
  styleUrls: ['./complications-page.component.scss']
})
export class ComplicationsPageComponent implements OnInit {

  tableHeaders = MedicalReportsTableUtils.complicationsTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList: any[] = [];
  pagination = new LocalPagingModel();
  reportFilters = new ComplicationsFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private medicalReportService: MedicalReportService, fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "procedure",
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
      }
    });
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_COMPLICATIONS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.medicalReportService.getComplications(this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response.object;
          this.pagination.sort(this.allReportsList);
          this.exportExcel();
          return;
        }
        this.table = cloneObject(this.table);
        this.table.data = response.object;
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const datePipe = new DatePipe('en-US');
      const excelResults = this.allReportsList.map((complication: any) => {
        return {
          "Procedure": complication.procedure,
          "Surgery Date": datePipe.transform(complication.surgeryDate, 'dd/MM/yyyy'),
          "Complication Date": datePipe.transform(complication.complicationDate, 'dd/MM/yyyy'),
          "Complication": complication.complication,
          "Intervention": complication.intervention,
          "Surgeon": complication.surgeon,
          "Hospital": complication.hospital,
          "Patient Name": complication.patientName,
          "DOB": datePipe.transform(complication.birthDate, 'dd/MM/yyyy'),
          "Employer": complication.employer,
          "MD Referral": complication.referral,
          "Status": complication.status,
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Complications Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }

}
