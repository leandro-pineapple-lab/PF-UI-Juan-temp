import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import { CompletedHomeworkReportFilterModel } from 'src/app/models/report/advocate/completed-homework/completed-homework-filter.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-completed-homework-filters',
  templateUrl: './completed-homework-filters.component.html',
  styleUrls: ['./completed-homework-filters.component.scss']
})
export class CompletedHomeworkFiltersComponent implements OnInit {

  @Input()
  reportFilters = new CompletedHomeworkReportFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();
  advocatesList: string[] = [];
  surgeonsList: SurgeonModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReports: FavoriteReportModel[] = [];
  favoriteReport = new FavoriteReportModel();

  constructor(private userService: UserService, private advocateService: AdvocateService,
              private toastr: ToastrService, private reportService: ReportService, private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.favoriteReport.link = this.reportsLink;
    await Promise.all([this.getSurgeons(), this.getAdvocates()]);
    this.activatedRoute.queryParams.subscribe(params => {
      FavoriteReportUtils.setFavoriteReportFiltersFromParams(params, this.reportFilters);
    });
    this.getMyFavoriteReports();
    this.getReport();
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
