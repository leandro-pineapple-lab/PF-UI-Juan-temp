import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OfficeModel } from 'src/app/models/practice/office.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { SurgeonModel } from 'src/app/models/practice/surgeon.model';
import { AdvocateService } from 'src/app/services/advocate/advocate.service';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { OfficeService } from 'src/app/services/office/office.service';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ReportService } from 'src/app/services/report/report.service';
import { StatusService } from 'src/app/services/status/status.service';
import { UserService } from 'src/app/services/user/user.service';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { AddFavoriteReportModalComponent } from '../../../shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { DailyIntakeReportFilterModel } from 'src/app/models/report/advocate/daily-intake/daily-intake-filter.model';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';
import moment from 'moment';
import { FavoriteReportsModalComponent } from '../../../shared/favorite-reports-modal/favorite-reports-modal.component';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-intake-filters',
  templateUrl: './daily-intake-filters.component.html',
  styleUrls: ['./daily-intake-filters.component.scss']
})
export class DailyIntakeFiltersComponent implements OnInit {

  filtersCollapsed = true;
  advocatesList: string[] = [];
  statusList: StatusModel[] = [];
  surgeonsList: SurgeonModel[] = [];
  officesList: OfficeModel[] = [];
  proceduresList: ProcedureModel[] = [];
  favoriteReport = new FavoriteReportModel();
  statesList: any[] = [];
  leadSourcesList: any[] = [];
  leadTypesList: any[] = [];
  serviceLinesList: any[] = [];
  marketingOnly = false;
  favoriteReports: FavoriteReportModel[] = [];
  reportsLink = UrlHelper.getPageAccessedUrl();

  @Input()
  reportFilters = new DailyIntakeReportFilterModel();
  @Output()
  hideFirstAppointmentEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private advocateService: AdvocateService, private toastr: ToastrService, private statusService: StatusService,
              private userService: UserService, private officeService: OfficeService, private insuranceCompanyService: InsuranceCompanyService,
              private procedureService: ProcedureService, private reportService: ReportService, private modalService: NgbModal,
              private activatedRoute: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const userInfo = this.userService.getUserInfo();
    this.marketingOnly = userInfo.MarketingOnly === "true";
    const currentDate = moment();
    if (this.marketingOnly){
      this.reportFilters.intakeFrom.value = new Date(currentDate.get("year"), 0, 1);
      this.reportFilters.intakeTo.value = currentDate.toDate();
      this.reportFilters.lastContactFrom.value = new Date(currentDate.get("year"), 0, 1);
      this.reportFilters.lastContactTo.value = currentDate.toDate();
      this.reportFilters.activeLeadsOnly.value = false;
    }else{
      this.reportFilters.intakeFrom.value = moment().subtract(6, "days").toDate();
      this.reportFilters.intakeTo.value = currentDate.toDate();
      this.reportFilters.activeLeadsOnly.value = true;
    }

    await Promise.all(
      [
        this.getAdvocates(),
        this.getStatusList(),
        this.getSurgeons(),
        this.getOffices(),
        this.getStates(),
        this.getLeadSources(),
        this.getLeadTypes(),
        this.getServiceLines(),
        this.getProcedures(),
      ]
    );
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

  async getProcedures(){
    const proceduresResponse = (await firstValueFrom(this.procedureService.getProceduresByCategory('SPR', true)) as ProcedureModel[]);
    if (proceduresResponse && proceduresResponse.length > 0){
      this.proceduresList = proceduresResponse;
    }
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

  async getOffices(){
    const officesResponse = (await firstValueFrom(this.officeService.getOffices()) as OfficeModel[]);
    if (officesResponse != null && officesResponse.length > 0) {
      this.officesList = officesResponse;
    }
  }

  async getLeadSources(){
    const leadSourcesResponse = (await firstValueFrom(this.procedureService.getLeadSources()) as any[]);
    if (leadSourcesResponse != null && leadSourcesResponse.length > 0) {
      this.leadSourcesList = leadSourcesResponse;
    }
  }

  async getLeadTypes(){
    const leadTypesResponse = (await firstValueFrom(this.procedureService.getLeadTypes()) as any[]);
    if (leadTypesResponse != null && leadTypesResponse.length > 0) {
      this.leadTypesList = leadTypesResponse;
    }
  }

  async getServiceLines(){
    const serviceLinesResponse = (await firstValueFrom(this.procedureService.getServiceLines()) as any[])
    if (serviceLinesResponse?.length > 0){
      this.serviceLinesList = serviceLinesResponse;
    }
  }

  async getStates() {
    const statesResponse = (await firstValueFrom(this.insuranceCompanyService.getStates()) as any[]);
    this.statesList = statesResponse;
  }

  async getStatusList(){
    const statusListResponse = (await firstValueFrom(this.statusService.getStatuses()) as StatusModel[]);
    if (statusListResponse != null && statusListResponse.length > 0) {
      this.statusList = statusListResponse;
    }
  }

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = 'Favorite Daily Intake Reports';
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = 'Daily Intake';
    this.favoriteReport.link = this.reportsLink;
    this.favoriteReport.params = FavoriteReportUtils.convertToFavoriteReportParams(this.reportFilters);
    this.rewriteFavoriteParamValues();
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getMyFavoriteReports();
    })
  }

  rewriteFavoriteParamValues() {
    const selectedOffice = this.officesList.find(x => x.id === this.reportFilters.office.value);
    const office = this.favoriteReport.params.find(x => x.key === "ofc");
    if (office){
      if (selectedOffice){
        office.value = selectedOffice.id;
        office.displayValue = selectedOffice.name;
      }
    }
    const selectedState = this.statesList.find(x => x.stateProvinceCD === this.reportFilters.state.value);//?.stateProvinceName ?? "";
    const state = this.favoriteReport.params.find(x => x.key === "state");
    if (state){
      if (selectedState){
        state.value = selectedState.stateProvinceCD;
        state.displayValue = selectedState.stateProvinceName;
      }
    }
    const selectedStatus = this.statusList.find(x => x.id == this.reportFilters.status.value);//?.description ?? "";
    const status = this.favoriteReport.params.find(x => x.key === "stat");
    if (status){
      if (selectedStatus){
        status.value = selectedStatus.id.toString();
        status.displayValue = selectedStatus.description;
      }
    }
  }

  getReport(){
    this.getReportsEvent.emit();
  }

  showHideFirstVisit(){
    const hideFirstVisit = (this.reportFilters.showFirstVisit.value as boolean) === true ? false : true;
    this.hideFirstAppointmentEvent.emit(hideFirstVisit);
  }

}
