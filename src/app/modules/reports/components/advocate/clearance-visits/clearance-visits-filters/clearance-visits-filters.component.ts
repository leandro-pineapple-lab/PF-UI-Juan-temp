import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { ClearanceVisitsFilterModel } from 'src/app/models/report/advocate/clearance-visits/clearance-visits-filter.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-clearance-visits-filters',
  templateUrl: './clearance-visits-filters.component.html',
  styleUrls: ['./clearance-visits-filters.component.scss']
})
export class ClearanceVisitsFiltersComponent implements OnInit {

  advocatesList: string[] = [];
  surgeonsList: SurgeonModel[] = [];
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();
  favoriteReport = new FavoriteReportModel();
  @Input()
  reportFilters = new ClearanceVisitsFilterModel();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private advocateService: AdvocateService, private toastr: ToastrService, private userService: UserService,
    private modalService: NgbModal, private reportService: ReportService) { }

  ngOnInit(): void {
    this.favoriteReport.link = this.reportsLink;
    this.getAdvocates();
    this.getSurgeons();
    this.getMyFavoriteReports();
  }

  getAdvocates(){
    this.advocateService.getProfessionalAdvocateNames().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.advocatesList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  getSurgeons(){
    this.userService.getProfessionalProviders().subscribe({
      next: (response: any) => {
        if (response != null && response.object?.length > 0) {
          this.surgeonsList = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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
