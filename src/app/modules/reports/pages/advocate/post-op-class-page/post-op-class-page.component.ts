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
import { PostOpClassFilterModel } from 'src/app/models/report/advocate/post-op-class/post-op-class-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-post-op-class-page',
  templateUrl: './post-op-class-page.component.html',
  styleUrls: ['./post-op-class-page.component.scss']
})
export class PostOpClassPageComponent implements OnInit {

  reportFilters = new PostOpClassFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = AdvocateReportsTableUtils.postOpClassTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  excelHelper: ExcelHelper;

  constructor(private fileSaver: FileSaverService, private commonService: CommonService, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private advocateReportService: AdvocateReportService) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = "FirstName",
    this.pagination.orderDirection = "asc";
    const today = moment();
    this.reportFilters.classFrom.value = today.clone().subtract(1, "months").toDate();
    this.reportFilters.classTo.value = today.toDate();
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_CLASSES;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(){
    this.advocateReportService.getPostOpClassReport(this.pagination, this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.pagination.allResults){
            this.allReportsList = response.object?.results;
            this.exportExcel();
            return;
        }
        this.table.data = response?.object?.results;
        this.pagination.totalNumberOfRecords = response.object?.totalNumberOfRecords;
        this.pagination.calculatePaging();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const datePipe = new DatePipe('en-US');
      const excelResults = this.allReportsList.map((postOpClass: any) => {
        return {
          "First Name": postOpClass.firstName,
          "Last Name": postOpClass.lastName,
          'DOB': datePipe.transform(postOpClass.birthDate, 'dd/MM/yyyy'),
          'Status': postOpClass.status,
          'Pre-Op Class': datePipe.transform(postOpClass.preOpClassDate, 'dd/MM/yyyy'),
          'Post-Op Class': datePipe.transform(postOpClass.PostOpClassDate, 'dd/MM/yyyy')
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Report Classes', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }

}
