import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { EmployerPatientsFilterModel } from 'src/app/models/report/marketing/employer-patients-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MarketingReportService } from 'src/app/services/report/marketing/marketing-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MarketingReportsTableUtils } from 'src/app/shared/utils/report/marketing/marketing-report.table.utils';

@Component({
  selector: 'app-employer-patients-page',
  templateUrl: './employer-patients-page.component.html',
  styleUrls: ['./employer-patients-page.component.scss']
})
export class EmployerPatientsPageComponent implements OnInit {

  reportFilters = new EmployerPatientsFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();

  tableHeaders = MarketingReportsTableUtils.employerPatientsTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private toastr: ToastrService,
    private fileSaver: FileSaverService, private marketingReportService: MarketingReportService) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = 'PatientName';
    this.pagination.orderDirection = 'asc';
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_EMPLOYERS_PATIENTS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.setPaginationOrder();
    this.marketingReportService.getEmployerPatients(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        this.table.headers = this.reportFilters.reportLevel.value === 'S' ? MarketingReportsTableUtils.employerPatientsTotalsTableHeaders :
                              MarketingReportsTableUtils.employerPatientsTableHeaders;
        if (this.pagination.allResults){
            this.allReportsList = response?.object?.results;
            this.exportExcel();
            return;
        }
        this.table.data = response?.object?.results;
        this.pagination.totalNumberOfRecords = response?.object?.totalNumberOfRecords;
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

  setPaginationOrder(){
    if (this.reportFilters.reportLevel.value === 'S' && this.pagination.orderBy !== 'Employer' && this.pagination.orderBy !== 'Total'){
      this.pagination.orderBy = 'Employer';
      this.pagination.orderDirection = 'asc';
    }else{
      if (this.reportFilters.reportLevel.value !== 'S' && this.pagination.orderBy === 'Total'){
        this.pagination.orderBy = 'PatientName';
        this.pagination.orderDirection = 'asc';
      }
    }
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((employerPatients: any) => {
        return this.getExcelHeaders(employerPatients);
      });
      this.excelHelper.exportToExcel(excelResults, 'Patients by Employer and/or Zip Code', this.table.headers.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }

  getExcelHeaders(employerPatients: any){
    if (this.reportFilters.reportLevel.value === 'S'){
      return {
        'Employer': employerPatients.employer,
        'Total': employerPatients.total
      }
    }
    return {
      "Patient": employerPatients.patientName,
      "DOB": employerPatients.birthDateString,
      'Employer': employerPatients.employer,
      '1st Contact': employerPatients.firstContactString,
      'Ini. Weight': employerPatients.initialWeight,
      'Last Visit': employerPatients.lastVisitString,
      'Surgery': employerPatients.surgery,
      'Surgery Date': employerPatients.surgeryDateString,
      'is Patient': employerPatients.isPatient,
      'Status': employerPatients.status,
      'How Hear From Us': employerPatients.referralSource
    }
  }

}
