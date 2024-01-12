import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { EmployerPatientsFilterModel } from 'src/app/models/report/marketing/employer-patients-filter.model';
import { ReportService } from 'src/app/services/report/report.service';
import { FormHelper } from 'src/app/shared/helpers/form-helper';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-employer-patients-filters',
  templateUrl: './employer-patients-filters.component.html',
  styleUrls: ['./employer-patients-filters.component.scss']
})
export class EmployerPatientsFiltersComponent implements OnInit {

  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  FormHelper = FormHelper;

  @Input()
  reportFilters = new EmployerPatientsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  zip = '';
  maxZipFiltersAmount = 5;
  zipsList: string[] = [];

  constructor(private reportService: ReportService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.reportFilters.zip.value){
      this.zipsList = (this.reportFilters.zip.value as string[]);
    }
    this.favoriteReport.link = this.reportsLink;
    this.getMyFavoriteReports();
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

  addZipFilter() {
    if (this.zip){
      this.zipsList.push(this.zip);
      this.reportFilters.zip.value = this.zipsList;
      this.zip = '';
    }
  }

  removeZip(index: number){
    this.zipsList.splice(index, 1);
  }
}
