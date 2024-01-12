import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { reportsSystemParams } from 'src/app/models/common/system-params/reports';
import { TableHeaderModel } from 'src/app/models/common/table/table-header.model';
import { TableModel } from 'src/app/models/common/table/table.model';
import { SurgicalSummaryFilterModel } from 'src/app/models/report/monthly/surgical-summary/surgical-summary-filter.model';
import { CommonService } from 'src/app/services/common/common.service';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { MonthlyReportsTableUtils } from 'src/app/shared/utils/report/monthly/monthly-report.table.utils';

@Component({
  selector: 'app-surgical-summary',
  templateUrl: './surgical-summary.component.html',
  styleUrls: ['./surgical-summary.component.scss']
})
export class SurgicalSummaryComponent implements OnInit {

  reportFilters = new SurgicalSummaryFilterModel();
  logAccessDataModel = new LogAccessDataModel();
  showColumnVisibilityAndExcelButton = false;
  tableHeaders = MonthlyReportsTableUtils.surgicalSummarySpecificYearTableHeaders;
  table: TableModel = new TableModel(this.tableHeaders);
  allReportsList = [];
  excelHelper: ExcelHelper;
  procedureTypes: {value: string, checked: boolean}[] = [
    { value: "Primary bariatric", checked: true },
    { value: "Revision bariatric", checked: true },
    { value: "Balloon", checked: true },
    { value: "Other bariatric", checked: true },
    { value: "General", checked: true },
    { value: "Other", checked: true }
  ];

  constructor(private fileSaver: FileSaverService, private commonService: CommonService, private toastr: ToastrService,
    private monthlyReportService: MonthlyReportService, private activatedRoute: ActivatedRoute) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.setFavoriteReportFilters(params);
    });
    this.getSystemParams();
    this.logAccessData();
    this.getReports();
  }

  setProcedureTypeValue(){
    const selectedProcedureTypes = this.procedureTypes.filter(x => x.checked);
    this.reportFilters.procedureType.value = '';
    if (selectedProcedureTypes?.length > 0){
      for (let index = 0; index < selectedProcedureTypes.length; index++) {
        this.reportFilters.procedureType.value += index === selectedProcedureTypes.length - 1 ?
                                                  selectedProcedureTypes[index].value : selectedProcedureTypes[index].value + ", ";
      }
    }
  }

  setFavoriteReportFilters(params: Params){
    const yearQueryParam = params['year'];
    if (yearQueryParam){
      this.reportFilters.year.value = yearQueryParam;
    }
    const showQueryParam = params['show'];
    if (showQueryParam){
      this.reportFilters.reportType.value = showQueryParam === 'All' ? 'A' : showQueryParam === 'Detail by Surgeon' ? 'S' : 'H';
    }
    const procedureTypeQueryParam = params['proctype'];
    if (procedureTypeQueryParam){
      const procedureTypesArray = (procedureTypeQueryParam as string).split(',');
      if (procedureTypesArray?.length > 0){
        this.procedureTypes.map(x => x.checked = false);
        for (const procedureType of procedureTypesArray) {
          let procedureTypeItem = this.procedureTypes.find(x => x.value === procedureType);
          if (procedureTypeItem){
            procedureTypeItem.checked = true;
          }
        }
        this.setProcedureTypeValue();
      }
    }
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
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_PATIENT_COUNT_BY_STATUS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  getReports(exportExcel = false){
    this.monthlyReportService.getSurgicalSummary(this.reportFilters).subscribe({
      next: (response: any) => {
        let tableHeaders = this.reportFilters.year.value == 5 ?
                 cloneDeep(MonthlyReportsTableUtils.surgicalSummaryLastYearsTableHeaders) : cloneDeep(MonthlyReportsTableUtils.surgicalSummarySpecificYearTableHeaders);
        tableHeaders[0].name = this.reportFilters.reportType.value === 'A' ? '' :
        this.reportFilters.reportType.value === 'S' ? 'Surgeon' : 'Hospital';
        if (exportExcel){
          this.allReportsList = response;
          this.exportExcel(tableHeaders);
          return;
        }
        this.table.headers = tableHeaders;
        this.table.data = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  exportExcel(tableHeaders: TableHeaderModel[]) {
    const excelResults = this.allReportsList.map((surgicalSummary: any) => {
      return this.getExcelHeaders(surgicalSummary);
    });
    this.excelHelper.exportToExcel(excelResults, 'Surgical Summary Report', tableHeaders.filter(x => x.name !== 'Action').map(x => x.name));
  }

  getExcelHeaders(surgicalSummary: any){
    const typeHeader = this.reportFilters.reportType.value === 'A' ? '' :
    this.reportFilters.reportType.value === 'S' ? 'Surgeon' : 'Hospital';
    if (this.reportFilters.year.value == 5){
      const fifthYearValue = moment().subtract(5, "years").year().toString();
      const fourthYearValue = moment().subtract(4, "years").year().toString();
      const thirdYearValue = moment().subtract(3, "years").year().toString();
      const secondYearValue = moment().subtract(2, "years").year().toString();
      const firstYearValue = moment().subtract(1, "years").year().toString();
      const thisYearValue = moment().year().toString();
      return {
        typeHeader: surgicalSummary.type,
        fifthYearValue: surgicalSummary.fifthYearValue,
        fourthYearValue: surgicalSummary.fourthYearValue,
        thirdYearValue: surgicalSummary.thirdYearValue,
        secondYearValue: surgicalSummary.secondYearValue,
        firstYearValue: surgicalSummary.firstYearValue,
        thisYearValue: surgicalSummary.thisYearValue,
        "Total": surgicalSummary.total
      }
    }else{
      return {
        typeHeader: surgicalSummary.type,
        "Jan": surgicalSummary.januaryValue,
        "Feb": surgicalSummary.februaryValue,
        "Mar": surgicalSummary.marchValue,
        "Apr": surgicalSummary.aprilValue,
        "May": surgicalSummary.mayValue,
        "Jun": surgicalSummary.juneValue,
        "Jul": surgicalSummary.julyValue,
        "Aug": surgicalSummary.augustValue,
        "Sep": surgicalSummary.septemberValue,
        "Oct": surgicalSummary.octoberValue,
        "Nov": surgicalSummary.novemberValue,
        "Dec": surgicalSummary.decemberValue,
        "Total": surgicalSummary.total
      };
    }
  }

}
