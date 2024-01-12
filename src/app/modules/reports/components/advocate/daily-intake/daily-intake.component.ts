import { Component, OnInit } from '@angular/core';
import { DailyIntakeReportFilterModel } from 'src/app/models/report/advocate/daily-intake/daily-intake-filter.model';
import { ToastrService } from 'ngx-toastr';
import { TableModel } from 'src/app/models/common/table/table.model';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { FileSaverService } from 'ngx-filesaver';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';

@Component({
  selector: 'app-daily-intake',
  templateUrl: './daily-intake.component.html',
  styleUrls: ['./daily-intake.component.scss']
})
export class DailyIntakeComponent implements OnInit {

  tableHeaders = AdvocateReportsTableUtils.dailyIntakeTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  pagination: PagingModel = new PagingModel();
  reportFilters = new DailyIntakeReportFilterModel();
  excelHelper: ExcelHelper;

  constructor(private toastr: ToastrService, private fileSaver: FileSaverService,
              private advocateReportService: AdvocateReportService) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.pagination.orderBy = 'DateCreated';
    this.pagination.orderDirection = "asc";
  }

  getReports(){
    this.advocateReportService.getDailyIntakeReport(this.pagination, this.reportFilters).subscribe({
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

  paginationChange(){
    this.getReports();
  }

  exportExcel(){
    if (this.allReportsList && this.allReportsList.length > 0){
      const excelResults = this.allReportsList.map((dailyIntakeReport: any) => {
        return {
          "Name": dailyIntakeReport.patientName,
          "Lead Type": dailyIntakeReport.leadType,
          "Source": dailyIntakeReport.origin,
          "Date Created": dailyIntakeReport.dateCreatedString,
          "Last Contact": dailyIntakeReport.lastContactString,
          "Next Contact": dailyIntakeReport.nextContactString,
          "Lag (days)": dailyIntakeReport.lagDays,
          "Advocate": dailyIntakeReport.advocateName,
          "How Hear from us": dailyIntakeReport.howHearFromUs,
          "Confirmed Referral": dailyIntakeReport.confirmedReferralName,
          "Active": dailyIntakeReport.isActive,
          "Status": dailyIntakeReport.patientStatus,
          "City": dailyIntakeReport.leadCity,
          "State": dailyIntakeReport.leadState,
          "Surgeon": dailyIntakeReport.surgeonName,
          "Interest in Procedure": dailyIntakeReport.plannedProcedure,
          "Service Line": dailyIntakeReport.serviceLine
        }
      });
      this.excelHelper.exportToExcel(excelResults, 'Daily Intake Report', this.tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
      this.pagination.allResults = false;
    }
  }

  hideFirstAppointment(event: boolean){
    const firstVisitHeader = this.tableHeaders.find(x => x.orderColumnName === 'NextContact');
    if (firstVisitHeader){
      firstVisitHeader.hide = event;
    }
  }

}
