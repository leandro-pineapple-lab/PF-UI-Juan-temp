import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { SurgicalSummaryFilterModel } from 'src/app/models/report/monthly/surgical-summary/surgical-summary-filter.model';
import { MonthlyReportService } from 'src/app/services/report/monthly/monthly-report.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-surgical-summary-filters',
  templateUrl: './surgical-summary-filters.component.html',
  styleUrls: ['./surgical-summary-filters.component.scss']
})
export class SurgicalSummaryFiltersComponent implements OnInit {

  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();
  reportsLink = UrlHelper.getPageAccessedUrl();
  lastYearsList: number[] = [];
  lastYearsAmountToShow = 6;

  @Input()
  procedureTypes: {value: string, checked: boolean}[] = [];
  @Input()
  reportFilters = new SurgicalSummaryFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private reportService: ReportService, private toastr: ToastrService,
    private monthlyReportService: MonthlyReportService) { }

  ngOnInit(): void {
    this.lastYearsList = this.monthlyReportService.getLastYearsList(this.lastYearsAmountToShow);
    this.favoriteReport.link = this.reportsLink;
    this.setProcedureTypeValue();
    this.getMyFavoriteReports();
  }

  setStatusCustomValue(){
    switch (this.reportFilters.reportType.value) {
      case 'A':
        this.reportFilters.reportType.customValue = 'All';
        break;
      case 'S':
        this.reportFilters.reportType.customValue = 'Detail by Surgeon';
        break;
      case 'H':
        this.reportFilters.reportType.customValue = 'Detail by Facility';
        break;
    }
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

  getMyFavoriteReports(){
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

  getReport(){
    this.getReportsEvent.emit();
  }

}
