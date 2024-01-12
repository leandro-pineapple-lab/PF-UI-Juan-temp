import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableHeaderModel } from 'src/app/models/common/table/table-header.model';
import { TableModel } from 'src/app/models/common/table/table.model';
import { WorkflowEfficiencyFilterModel } from 'src/app/models/report/advocate/workflow-efficiency/workflow-efficiency-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { AdvocateReportService } from 'src/app/services/report/advocate/advocate-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AdvocateReportsTableUtils } from 'src/app/shared/utils/report/advocate/advocate-report.table.utils';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { cloneObject } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-workflow-efficiency-page',
  templateUrl: './workflow-efficiency-page.component.html',
  styleUrls: ['./workflow-efficiency-page.component.scss']
})
export class WorkflowEfficiencyPageComponent implements OnInit {

  reportFilters = new WorkflowEfficiencyFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;

  allReportsList = [];

  detailsPagination = new LocalPagingModel('detailsPaginationControls');
  detailsTableHeaders = AdvocateReportsTableUtils.workflowEfficiencyDetailsTableHeaders;
  detailsTable = new TableModel(this.detailsTableHeaders);

  summarySurgeonTableHeaders = AdvocateReportsTableUtils.workflowEfficiencySurgeonSummaryTableHeaders;
  summarySurgeonPagination = new LocalPagingModel('summarySurgeonPaginationControls');
  summarySurgeonTable = new TableModel(this.summarySurgeonTableHeaders);

  summaryInsCoTableHeaders = AdvocateReportsTableUtils.workflowEfficiencyInsCoSummaryTableHeaders;
  summaryInsCoPagination = new LocalPagingModel('summaryInsCoPaginationControls');
  summaryInsCoTable = new TableModel(this.summaryInsCoTableHeaders);

  excelHelper: ExcelHelper;

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService,
    private advocateReportService: AdvocateReportService, fileSaver: FileSaverService) {
    this.excelHelper = new ExcelHelper(fileSaver);
  }

  ngOnInit(): void {
    this.summarySurgeonPagination.orderBy = 'surgeon';
    this.summarySurgeonPagination.orderDirection = 'asc';
    this.summaryInsCoPagination.orderBy = 'surgeon';
    this.summaryInsCoPagination.orderDirection = 'asc';
    this.detailsPagination.orderBy = 'surgeon';
    this.detailsPagination.orderDirection = 'asc';
    const currentDate = moment();
    this.reportFilters.contactFrom.value = currentDate.clone().subtract(12, "months").toDate();
    this.reportFilters.contactTo.value = currentDate.toDate();
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
      this.setStartDetailsHeader();
    });
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setStartDetailsHeader() {
    const consultDateHeader = this.detailsTableHeaders.find(x => x.name === 'Consult. Date');
    const prospectSinceHeader = this.detailsTableHeaders.find(x => x.name === 'Prospect Since');
    if (consultDateHeader && prospectSinceHeader) {
      consultDateHeader.hide = this.reportFilters.startType.value === 'L' ? true : false;
      prospectSinceHeader.hide = this.reportFilters.startType.value === 'L' ? false : true;
    }
  }

  refreshTable() {
    this.summarySurgeonPagination.page = 1;
    this.summaryInsCoPagination.page = 1;
    this.detailsPagination.page = 1;
    this.getReports();
  }

  getSystemParams() {
    this.commonService.getSystemParams(reportsSystemParams).subscribe({
      next: (response: any) => {
        const insFromHWSheet = response.find((x: any) => x.page === 'RptWorkflowEfficiency' && x.name === 'GetInsuranceFromHWSheet');
        const startingPoint = response.find((x: any) => x.page === 'RptWorkflowEfficiency' && x.name === 'StartingPoint');
        const showColumnVisibilityAndExcelParam = response.find((x: any) => x.page === 'General' && x.name === 'showExportControls');
        this.showColumnVisibilityAndExcelButton = showColumnVisibilityAndExcelParam.value === "yes" ? true : false;
      }
    });
  }

  logAccessData() {
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_WORKFLOW_EFFICIENCY;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports() {
    this.advocateReportService.getWorkflowEfficiency(this.reportFilters).subscribe({
      next: (response: any) => {
        if (this.summarySurgeonPagination.allResults || this.detailsPagination.allResults || this.summaryInsCoPagination.allResults) {
          this.allReportsList = this.detailsPagination.allResults ? response?.object?.item1 :
                                this.summarySurgeonPagination.allResults ? response?.object?.item2 :
                                response?.object?.item3;
          const tableHeaders = this.detailsPagination.allResults ? cloneDeep(this.detailsTableHeaders) :
                                this.summarySurgeonPagination.allResults ? cloneDeep(this.summarySurgeonTableHeaders) :
                                cloneDeep(this.summaryInsCoTableHeaders);
          this.exportExcel(tableHeaders);
          this.summarySurgeonPagination.allResults = false;
          this.summaryInsCoPagination.allResults = false;
          this.detailsPagination.allResults = false;
          return;
        }

        const data1 = response?.object?.item1;
        const data2 = response?.object?.item2;
        const data3 = response?.object?.item3;

        this.detailsTable = cloneObject(this.detailsTable);
        this.summarySurgeonTable = cloneObject(this.summarySurgeonTable);
        this.summaryInsCoTable = cloneObject(this.summaryInsCoTable);

        this.setTableInformation(this.detailsTable, data1);
        this.setTableInformation(this.summarySurgeonTable, data2);
        this.setTableInformation(this.summaryInsCoTable, data3);

        this.setStartDetailsHeader();
      }
    }).add(() => {
      if (this.summaryInsCoPagination.page === 1){
        this.summaryInsCoPagination.tableDataChange(this.summaryInsCoPagination.page);
      }
      if (this.summarySurgeonPagination.page === 1){
        this.summarySurgeonPagination.tableDataChange(this.summarySurgeonPagination.page);
      }
      if (this.detailsPagination.page === 1){
        this.detailsPagination.tableDataChange(this.detailsPagination.page);
      }
    });
  }

  setTableInformation(tableModel: TableModel, dataItem: any) {
    tableModel.data = dataItem;
  }

  exportExcel(tableHeaders: TableHeaderModel[]) {
    const excelResults = this.allReportsList.map((workflowEfficiency: any) => {
      return this.getExcelHeaders(workflowEfficiency);
    });
    this.excelHelper.exportToExcel(excelResults, 'Workflow Efficiency Report', tableHeaders.filter(x => x.name !== 'Action' && !x.hide).map(x => x.name));
  }

  getExcelHeaders(workflowEfficiency: any) {
    if (this.detailsPagination.allResults) {
      const datePipe = new DatePipe('en-US');
      return {
        "Surgeon": workflowEfficiency.surgeon,
        "Insurance Type": workflowEfficiency.insuranceType,
        "Insurance Co": workflowEfficiency.insuranceCo,
        ...(!this.detailsTableHeaders.find(x => x.name === 'Prospect Since')?.hide &&
          { "Prospect Since": datePipe.transform(workflowEfficiency.prospectSince, 'dd/MM/yyyy') }),
        ...(!this.detailsTableHeaders.find(x => x.name === 'Consult. Date')?.hide &&
          { "Consult. Date": datePipe.transform(workflowEfficiency.consultDate, 'dd/MM/yyyy') }),
        "Days To First Visit": workflowEfficiency.daysToFirstVisit,
        "Days to Clearance": workflowEfficiency.daysToClearance,
        "Days to PreOp": workflowEfficiency.daysToPreOp,
        "Days to Surgery": workflowEfficiency.daysToSurgery,
        "Patient Name": workflowEfficiency.patientName,
        "DOB": datePipe.transform(workflowEfficiency.birthDate, 'dd/MM/yyyy'),
      }
    } else {
      return {
        ...(this.summarySurgeonPagination.allResults && { "Surgeon": workflowEfficiency.surgeon }),
        ...(this.summaryInsCoPagination.allResults && { "Payer": workflowEfficiency.payer }),
        "Days to First Visit": workflowEfficiency.daysToFirstVisit,
        "Days to Clearance": workflowEfficiency.daysToClearance,
        "Days to PreOp": workflowEfficiency.daysToPreOp,
        "Days to Surgery": workflowEfficiency.daysToSurgery,
        "# Patients": workflowEfficiency.patientsAmount,
      };
    }
  }

}
