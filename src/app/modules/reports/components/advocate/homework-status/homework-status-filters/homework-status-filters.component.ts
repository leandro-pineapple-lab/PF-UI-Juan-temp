import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { HomeworkStatusUtils } from 'src/app/shared/utils/report/advocate/homework-status.utils';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportsModalComponent } from '../../../shared/favorite-reports-modal/favorite-reports-modal.component';

@Component({
  selector: 'app-homework-status-filters',
  templateUrl: './homework-status-filters.component.html',
  styleUrls: ['./homework-status-filters.component.scss']
})
export class HomeworkStatusFiltersComponent implements OnInit {

  filtersCollapsed = true;
  advocatesList: string[] = [];
  surgeonsList: SurgeonModel[] = [];
  hospitalsList: HospitalModel[] = [];
  pendingItemsList = HomeworkStatusUtils.pendingItemsList;
  statusList = HomeworkStatusUtils.statusList;
  noActivityList = HomeworkStatusUtils.noActivityList;
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  constructor(private userService: UserService, private advocateService: AdvocateService,
              private toastr: ToastrService, private hospitalService: HospitalService,
              private reportService: ReportService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getSurgeons();
    this.getAdvocates();
    this.getValidHospitals();
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

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Daily Intake Reports';
  }

  getValidHospitals(){
    this.hospitalService.getValidHospitals().subscribe({
      next: (response: any) => {
        if (response != null && response.length > 0) {
          this.hospitalsList = response;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
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

}
