import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableModel } from 'src/app/models/common/table/table.model';
import { CompletedHomeworkReportFilterModel } from 'src/app/models/report/advocate/completed-homework/completed-homework-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';

@Component({
  selector: 'app-completed-homework',
  templateUrl: './completed-homework.component.html',
  styleUrls: ['./completed-homework.component.scss']
})
export class CompletedHomeworkComponent implements OnInit {

  tableHeaders = AdvocateReportsTableUtils.completedHomeworkTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  reportFilters = new CompletedHomeworkReportFilterModel();
  excelHelper: ExcelHelper;
  showColumnVisibilityAndExcelButton = false;

  constructor(private advocateReportService: AdvocateReportService, private toastr: ToastrService, private commonService: CommonService,
              private fileSaver: FileSaverService) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.reportFilters.orderedSince.value = moment().subtract(6, "months").toDate();
    this.pagination.orderBy = 'Name';
    this.pagination.orderDirection = "asc";
    this.getSystemParams();
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

  getReports(){
    this.advocateReportService.getCompletedHomeworks(this.pagination, this.reportFilters).subscribe({
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
      const excelResults = this.allReportsList.map((dailyIntakeReport: any) => {
        return {
          "Name": dailyIntakeReport.patientName,
          "Status": dailyIntakeReport.patientStatus,
          "Insurance Type": dailyIntakeReport.insuranceType,
          "Procedure": dailyIntakeReport.procedureName,
          "Surgeon": dailyIntakeReport.surgeonName,
          "Advocate": dailyIntakeReport.advocateName,
          "Completed On": dailyIntakeReport.mostRecentDateString
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Completed Homeworks Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
    }
  }

}
