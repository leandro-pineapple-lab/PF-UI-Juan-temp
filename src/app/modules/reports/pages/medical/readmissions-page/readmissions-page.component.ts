import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { ReadmissionsFilterModel } from 'src/app/models/report/medical/readmissions-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MedicalReportService } from 'src/app/services/report/medical-report/medical-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MedicalReportsTableUtils } from 'src/app/shared/utils/report/medical/medical-report.table.utils';

@Component({
  selector: 'app-readmissions-page',
  templateUrl: './readmissions-page.component.html',
  styleUrls: ['./readmissions-page.component.scss']
})
export class ReadmissionsPageComponent implements OnInit {

  reportFilters = new ReadmissionsFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MedicalReportsTableUtils.readmissionsTableHeaders;
  table = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination = new LocalPagingModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private medicalReportService: MedicalReportService, fileSaver: FileSaverService) {
      this.excelHelper = new ExcelHelper(fileSaver);
    }

  ngOnInit(): void {
    this.pagination.orderBy = "patientName",
    this.pagination.orderDirection = "asc";
    const today = moment();
    this.reportFilters.surgeryFrom.value = today.clone().subtract(1, "years").toDate();
    this.reportFilters.surgeryTo.value = today.toDate();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_ADMISSIONS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.medicalReportService.getReadmissions(this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response?.object;
          this.exportExcel();
          this.pagination.allResults = false;
          return;
        }
        this.table = Object.assign({}, this.table);
        this.table.data = response?.object;
      }
    }).add(() => {
      if (this.pagination.page === 1){
        this.pagination.tableDataChange(this.pagination.page);
      }
    });
  }

  refreshTable(){
    this.pagination.page = 1;
    this.getReports();
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const datePipe = new DatePipe('en-US');
      const excelResults = this.allReportsList.map((readmission: any) => {
        return {
          "Patient Name": readmission.patientName,
          "DOB": readmission.birthDate,
          "Hospital": readmission.hospital,
          "Procedure": readmission.procedure,
          "Surgeon": readmission.surgeon,
          "Surgery Date": datePipe.transform(readmission.surgeryDate, 'dd/MM/yyyy'),
          "Admission Date": datePipe.transform(readmission.admissionDate, 'dd/MM/yyyy'),
          "Reason for Readmission": readmission.readmissionReason,
          "Linked to Bariatric": readmission.linkedToBariatric
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Readmissions Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
