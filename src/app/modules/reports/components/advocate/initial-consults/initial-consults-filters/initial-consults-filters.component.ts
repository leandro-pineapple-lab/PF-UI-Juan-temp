import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { InitialConsultsFilterModel } from 'src/app/models/report/advocate/initial-consults/initial-consults-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { UserService } from 'src/app/services/user/user.service';
import { FavoriteReportsModalComponent } from '../../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { AddFavoriteReportModalComponent } from '../../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { ReportService } from 'src/app/services/report/report.service';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-initial-consults-filters',
  templateUrl: './initial-consults-filters.component.html',
  styleUrls: ['./initial-consults-filters.component.scss']
})
export class InitialConsultsFiltersComponent implements OnInit {

  advocatesList: string[] = [];
  surgeonsList: SurgeonModel[] = [];
  favoriteReport = new FavoriteReportModel();
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  @Input()
  reportFilters = new InitialConsultsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private advocateService: AdvocateService, private userService: UserService, private toastr: ToastrService,
     private modalService: NgbModal, private reportService: ReportService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.favoriteReport.link = this.reportsLink;
    await Promise.all([
      this.getSurgeons(),
      this.getAdvocates()
    ]);
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getMyFavoriteReports();
    this.getReport();
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

  async getAdvocates(){
    this.advocatesList = (await firstValueFrom(this.advocateService.getProfessionalAdvocateNames()) as string[]);
  }

  async getSurgeons(){
    const response = (await firstValueFrom(this.userService.getProfessionalProviders()) as any);
    if (response != null && response.object?.length > 0){
      this.surgeonsList = response.object;
    }
  }

  getReport(){
    this.getReportsEvent.emit();
  }

}
