import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { EmployerStatsFilterModel } from 'src/app/models/report/marketing/employer-stats-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { PatientService } from 'src/app/services/patient/patient.service';
import { MarketingReportService } from 'src/app/services/report/marketing/marketing-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { MarketingReportsTableUtils } from 'src/app/shared/utils/report/marketing/marketing-report.table.utils';

@Component({
  selector: 'app-employer-stats-page',
  templateUrl: './employer-stats-page.component.html',
  styleUrls: ['./employer-stats-page.component.scss']
})
export class EmployerStatsPageComponent implements OnInit {

  reportFilters = new EmployerStatsFilterModel();
  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  employersList: string[] = [];
  employersListFiltered: string[] = [];
  selectedEmployers: string[] = [];

  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MarketingReportsTableUtils.employerStatsTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);

  totalStatsHeaders = MarketingReportsTableUtils.employerTotalStatsTableHeaders;
  tableTotalStats: TableModel = new TableModel(this.totalStatsHeaders);

  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    limitSelection: 20,
    allowSearchFilter: true,
    allowRemoteDataSearch: true
  };

  constructor(private patientService: PatientService, private toastr: ToastrService, private reportService: ReportService,
    private activatedRoute: ActivatedRoute, private commonService: CommonService, private fileSaver: FileSaverService,
    private marketingReportService: MarketingReportService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  async ngOnInit(): Promise<void> {
    this.pagination.orderBy = 'PatientName';
    this.pagination.orderDirection = 'asc';
    this.getEmployers();
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getSystemParams();
    this.logAccessData();
    this.getMyFavoriteReports();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_EMPLOYER_STATS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  async getEmployers() {
    const employersListResponse = (await firstValueFrom(this.patientService.getEmployers()) as string[]);
    this.employersList = employersListResponse;
  }

  onFilterChange(filter: any){
    if (filter.length >= 3){
      this.employersListFiltered = this.employersList.filter(x => x.toLowerCase().includes(filter.toLowerCase()));
    }else{
      this.employersListFiltered = [];
    }
  }

  getReports(){
    this.marketingReportService.getEmployerStats(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
            this.allReportsList = response.object?.item1?.results;
            this.exportExcel();
            return;
        }
        this.table.data = response.object?.item1?.results;
        this.pagination.totalNumberOfRecords = response.object?.item1?.totalNumberOfRecords;

        if (this.table.data?.length > 0){
          this.tableTotalStats.data = [response.object?.item2];
        }
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
      const excelResults = this.allReportsList.map((patientStats: any) => {
        return {
          "Patient": patientStats.patientName,
          "DOB": patientStats.birthDateString,
          'yearsAgoBariatric': patientStats.yearsAgoBariatric,
          'penultimateAgoBariatric': patientStats.penultimateYearBariatric,
          'previousYearBariatric': patientStats.previousYearBariatric,
          'currentYearBariatric': patientStats.currentYearBariatric,
          'yearsAgoOther': patientStats.yearsAgoOther,
          'penultimateYearOther': patientStats.penultimateYearOther,
          'previousYearOther': patientStats.previousYearOther,
          'currentYearOther': patientStats.currentYearOther
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Employer Stats Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }

  getMyFavoriteReports(){
    this.favoriteReport.link = this.reportsLink;
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
}
