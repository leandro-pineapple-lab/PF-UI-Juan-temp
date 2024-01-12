import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { TableModel } from 'src/app/models/common/table/table.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { CommonService } from 'src/app/services/common/common.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-favorite-reports',
  templateUrl: './favorite-reports.component.html',
  styleUrls: ['./favorite-reports.component.scss']
})
export class FavoriteReportsComponent implements OnInit {

  logAccessDataModel: LogAccessDataModel = new LogAccessDataModel();
  table: TableModel = new TableModel(FavoriteReportUtils.tableHeaders);
  professionalUserProviders: ProfessionalUserModel[] = [];
  selectedProfessional = '';
  selectedReportId = 0;
  loading = true;
  selectedReport: FavoriteReportModel = new FavoriteReportModel();
  changeValueToOptions = FavoriteReportUtils.changeValueToOptions;
  action = '';
  @ViewChild('updateDeleteModal') updateDeleteModal!: ElementRef;
  pagination: PagingModel = new PagingModel();

  constructor(private reportService: ReportService, private toastr: ToastrService, private commonService: CommonService,
    private userService: UserService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    this.pagination.orderBy = 'Title';
    this.pagination.orderDirection = 'asc';
    const authUser = this.userService.getUserInfo();
    this.selectedProfessional = authUser ? authUser.UserId : '';

    this.route.queryParams.subscribe(async params => {
      const reportId = params['reportId'];
      if (reportId){
        this.selectedReportId = parseInt(reportId);
      }
    });

    await Promise.all([
      this.getAllProfessionalProviders(),
      this.getFavoriteReports()
    ]);
    this.logAccessData();
  }

  async getAllProfessionalProviders(){
    try {
      const professionalProvidersResponse: any = await this.userService.getAllProfessionalProviders();
      if (professionalProvidersResponse && professionalProvidersResponse?.object?.length > 0){
        this.professionalUserProviders = professionalProvidersResponse.object;
      }
    } catch (e: any) {
      this.toastr.error(e.error, 'Error');
    }
  }

  paginationChange(){
    this.getFavoriteReports();
  }

  async getFavoriteReports(){
    this.reportService.getFavoriteReports(this.pagination, this.selectedProfessional, this.selectedReportId).subscribe({
      next: (response: any) => {
        this.table.data = response.results;
        this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
        if (this.selectedReportId != 0){
          const selectedReport = this.table.data.find(x => x.id === this.selectedReportId);
          if (selectedReport){
            this.openUpdateDeleteModal(selectedReport, 'update');
          }
        }
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

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.FAVORITE_REPORTS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  openUpdateDeleteModal(event: any, mode: string){
    this.selectedReport = new FavoriteReportModel();
    this.selectedReport = {...event};
    this.selectedReport.params = event.params;
    this.selectedReport.params.forEach(param => param.changeValueTo = undefined);
    this.selectedReport.isReportValid = true;
    this.action = mode;
    this.modalService.open(this.updateDeleteModal, { size: 'lg', ariaLabelledBy: 'modal-basic-title' });
  }

  async deleteFavoriteReport() {
    await this.reportService.deleteFavoriteReport(this.selectedReport.id).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getFavoriteReports();
        this.modalService.dismissAll();
        this.toastr.success("Favorite report has been successfully deleted!", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateFavoriteReport() {
    if (!this.selectedReport.title || this.selectedReport.title.trim().length === 0){
      this.selectedReport.isReportValid = false;
      this.toastr.error("Please fill the required fields.");
      return;
    }

    await this.reportService.updateReport(this.selectedReport).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getFavoriteReports();
        this.modalService.dismissAll();
        this.toastr.success("Favorite report has been successfully updated!", 'Success');
      },
      error: (e: any) => {
        if (e.error.errors && e.error.errors.Title){
          this.toastr.error(e.error.errors.Title, 'Error');
          return;
        }
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  runReport(event: any){
    if (event.action === 'run'){
      const {params} = event.item;
      if(!params){
        this.router.navigateByUrl('reports/' + event.item.link);
      }
      const reportQueryParams = this.buildReportQueryParams(params);
      this.router.navigateByUrl('reports/' + event.item.link + reportQueryParams);
    }
  }

  buildReportQueryParams(params: any[]){
    let queryParams = "";
    for (let index = 0; index < params.length; index++) {
      if (index === 0){
        queryParams += `?${params[index].key}=${params[index].value}`;
      }else{
        queryParams += `&${params[index].key}=${params[index].value}`;
      }
    }
    return queryParams;
  }

  getAllReports(uri: string){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    });
  }
}
