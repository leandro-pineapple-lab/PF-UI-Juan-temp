import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { LongHospitalStaysFilterModel } from 'src/app/models/report/medical/long-hospital-stays-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MedicalReportService } from 'src/app/services/report/medical-report/medical-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MedicalReportsTableUtils } from 'src/app/shared/utils/report/medical/medical-report.table.utils';

@Component({
  selector: 'app-long-hospital-stays-page',
  templateUrl: './long-hospital-stays-page.component.html',
  styleUrls: ['./long-hospital-stays-page.component.scss']
})
export class LongHospitalStaysPageComponent implements OnInit {

  tableHeaders = MedicalReportsTableUtils.longHospitalStaysTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];

  pagination = new PagingModel();
  reportFilters = new LongHospitalStaysFilterModel();

  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private toastr: ToastrService, private medicalReportService: MedicalReportService, private fileSaver: FileSaverService) {
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_LONG_HOSPITAL_STAYS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.medicalReportService.getLongHospitalStays(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
          this.allReportsList = response?.object?.results;
          this.exportExcel();
          return;
        }
        this.table.data = response?.object?.results;
        this.pagination.totalNumberOfRecords = response?.object?.totalNumberOfRecords;
        this.pagination.calculatePaging();
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
      const datePipe = new DatePipe('en-US');
      const excelResults = this.allReportsList.map((longHospitalStays: any) => {
        return {
          "Patient Name": longHospitalStays.patientName,
          "DOB": datePipe.transform(longHospitalStays.birthDate, 'dd/MM/yyyy'),
          "Hospital": longHospitalStays.hospital,
          "Procedure": longHospitalStays.procedure,
          "Surgeon": longHospitalStays.surgeon,
          "Admission Date": datePipe.transform(longHospitalStays.admissionDate, 'dd/MM/yyyy'),
          "Surgery Date": datePipe.transform(longHospitalStays.surgeryDate, 'dd/MM/yyyy'),
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Long Hospital Stays Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
