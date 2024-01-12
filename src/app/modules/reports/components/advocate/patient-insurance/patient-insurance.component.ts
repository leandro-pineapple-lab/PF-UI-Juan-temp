import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { PatientInsuranceFilterModel } from 'src/app/models/report/advocate/patient-insurance/patient-insurance-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { StatusService } from 'src/app/services/status/status.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-patient-insurance',
  templateUrl: './patient-insurance.component.html',
  styleUrls: ['./patient-insurance.component.scss']
})
export class PatientInsuranceComponent implements OnInit {

  reportFilters = new PatientInsuranceFilterModel();
  showColumnVisibilityAndExcelButton = false;
  logAccessDataModel = new LogAccessDataModel();
  tableHeaders = AdvocateReportsTableUtils.patientInsuranceTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;
  statusList: any[] = [];

  constructor(private commonService: CommonService, private toastr: ToastrService, private advocateReportService: AdvocateReportService,
    private fileSaver: FileSaverService, private activatedRoute: ActivatedRoute, private statusService: StatusService) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  async ngOnInit(): Promise<void> {
    this.pagination.orderBy = "Name",
    this.pagination.orderDirection = "asc";
    this.getSystemParams();
    this.logAccessData();
    await this.getStatusList();

    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
      let statusParam = params['stat'];
      if (statusParam){
        const statusArray = (statusParam as string).split('|');
        this.statusList.map(x => x.checked = false);
        for (const status of statusArray) {
          let statusItem = this.statusList.find(x => x.description === status);
          if (statusItem){
            statusItem.checked = true;
          }
        }
        this.reportFilters.status.value = this.statusList.filter(x => x.checked).map(x => x.id);
      }
    });
    this.getReports();
  }

  async getStatusList() {
    this.statusList = (await firstValueFrom(this.statusService.getStatuses()) as any);
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PRE_OP;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getPatientInsurance(this.pagination, this.reportFilters).subscribe({
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
      this.pagination.allResults = false;
      if (this.pagination.page === 1){
        this.pagination.tableDataChange(this.pagination.page);
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((patientInsurance: any) => {
        return {
          "Name": patientInsurance.patientName,
          "DOB": patientInsurance.birthDateString,
          "Insurance": patientInsurance.insuranceCompany,
          "Status": patientInsurance.status
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Patient Insurance Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
