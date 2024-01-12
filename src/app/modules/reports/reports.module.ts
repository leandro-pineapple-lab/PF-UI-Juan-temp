import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ReportsRoutingModule } from './reports-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';
import { PreDLetterSentFiltersComponent } from './components/advocate/pre-d-letter-sent/pre-d-letter-sent-filters/pre-d-letter-sent-filters.component';
import { CountByStatusComponent } from './components/advocate/count-by-status/count-by-status.component';
import { CountByStatusFiltersComponent } from './components/advocate/count-by-status/count-by-status-filters/count-by-status-filters.component';
import { ClearanceVisitsFiltersComponent } from './components/advocate/clearance-visits/clearance-visits-filters/clearance-visits-filters.component';
import { ClearanceVisitsComponent } from './components/advocate/clearance-visits/clearance-visits.component';
import { CompletedHomeworkFiltersComponent } from './components/advocate/completed-homework/completed-homework-filters/completed-homework-filters.component';
import { CompletedHomeworkComponent } from './components/advocate/completed-homework/completed-homework.component';
import { DailyIntakeFiltersComponent } from './components/advocate/daily-intake/daily-intake-filters/daily-intake-filters.component';
import { DailyIntakeComponent } from './components/advocate/daily-intake/daily-intake.component';
import { DuplicatedIntakeComponent } from './components/advocate/duplicated-intake/duplicated-intake.component';
import { HomeworkStatusFiltersComponent } from './components/advocate/homework-status/homework-status-filters/homework-status-filters.component';
import { HomeworkStatusComponent } from './components/advocate/homework-status/homework-status.component';
import { InitialConsultsFiltersComponent } from './components/advocate/initial-consults/initial-consults-filters/initial-consults-filters.component';
import { InitialConsultsComponent } from './components/advocate/initial-consults/initial-consults.component';
import { InsuranceVerificationComponent } from './components/advocate/insurance-verification/insurance-verification.component';
import { PatientInsuranceFiltersComponent } from './components/advocate/patient-insurance/patient-insurance-filters/patient-insurance-filters.component';
import { PatientInsuranceComponent } from './components/advocate/patient-insurance/patient-insurance.component';
import { PreDLetterSentComponent } from './components/advocate/pre-d-letter-sent/pre-d-letter-sent.component';
import { PreOpFiltersComponent } from './components/advocate/pre-op/pre-op-filters/pre-op-filters.component';
import { PreOpComponent } from './components/advocate/pre-op/pre-op.component';
import { ProspectByStatusFiltersComponent } from './components/advocate/prospect-by-status/prospect-by-status-filters/prospect-by-status-filters.component';
import { ProspectByStatusComponent } from './components/advocate/prospect-by-status/prospect-by-status.component';
import { StopProcessFiltersComponent } from './components/advocate/stop-process/stop-process-filters/stop-process-filters.component';
import { StopProcessComponent } from './components/advocate/stop-process/stop-process.component';
import { AddFavoriteReportModalComponent } from './components/shared/add-favorite-report-modal/add-favorite-report-modal.component';
import { FavoriteReportsModalComponent } from './components/shared/favorite-reports-modal/favorite-reports-modal.component';
import { ReportActionsComponent } from './components/shared/report-actions/report-actions.component';
import { BariatricSurgeriesComponent } from './components/monthly/bariatric-surgeries/bariatric-surgeries.component';
import { LeadsByPayerFiltersComponent } from './components/monthly/leads-by-payer/leads-by-payer-filters/leads-by-payer-filters.component';
import { LeadsByPayerComponent } from './components/monthly/leads-by-payer/leads-by-payer.component';
import { PullThroughComponent } from './components/monthly/pull-through/pull-through.component';
import { SurgicalSummaryFiltersComponent } from './components/monthly/surgical-summary/surgical-summary-filters/surgical-summary-filters.component';
import { SurgicalSummaryComponent } from './components/monthly/surgical-summary/surgical-summary.component';
import { MonthlyNumbersPageComponent } from './pages/monthly/monthly-numbers-page/monthly-numbers-page.component';
import { SurgicalHxPageComponent } from './pages/marketing/surgical-hx-page/surgical-hx-page.component';
import { SurgicalHxFiltersComponent } from './components/marketing/surgical-hx-filters/surgical-hx-filters.component';
import { EmployerStatsPageComponent } from './pages/marketing/employer-stats-page/employer-stats-page.component';
import { EmployerPatientsPageComponent } from './pages/marketing/employer-patients-page/employer-patients-page.component';
import { EmployerPatientsFiltersComponent } from './components/marketing/employer-patients-filters/employer-patients-filters.component';
import { ComplicationStatsPageComponent } from './pages/medical/complication-stats-page/complication-stats-page.component';
import { ComplicationStatsFiltersComponent } from './components/medical/complication-stats-filters/complication-stats-filters.component';
import { PostOpClassPageComponent } from './pages/advocate/post-op-class-page/post-op-class-page.component';
import { PostOpClassFiltersComponent } from './components/advocate/post-op-class-filters/post-op-class-filters.component';
import { HandoutStatusPageComponent } from './pages/advocate/handout-status-page/handout-status-page.component';
import { HandoutStatusFiltersComponent } from './components/advocate/handout-status-filters/handout-status-filters.component';
import { LongHospitalStaysPageComponent } from './pages/medical/long-hospital-stays-page/long-hospital-stays-page.component';
import { LongHospitalStaysFiltersComponent } from './components/medical/long-hospital-stays-filters/long-hospital-stays-filters.component';
import { ComplicationsPageComponent } from './pages/medical/complications-page/complications-page.component';
import { ComplicationFiltersComponent } from './components/medical/complication-filters/complication-filters.component';
import { AppointmentsSummaryPageComponent } from './pages/medical/appointments-summary-page/appointments-summary-page.component';
import { AppointmentSummaryFiltersComponent } from './components/monthly/appointment-summary-filters/appointment-summary-filters.component';
import { WorkflowEfficiencyPageComponent } from './pages/advocate/workflow-efficiency-page/workflow-efficiency-page.component';
import { WorkflowEfficiencyFiltersComponent } from './components/advocate/workflow-efficiency-filters/workflow-efficiency-filters.component';
import { ReadmissionsPageComponent } from './pages/medical/readmissions-page/readmissions-page.component';
import { ReadmissionsFiltersComponent } from './components/medical/readmissions-filters/readmissions-filters.component';
import { PlannedSurgeryPageComponent } from './pages/advocate/planned-surgery-page/planned-surgery-page.component';
import { PlannedSurgeryFiltersComponent } from './components/advocate/planned-surgery-filters/planned-surgery-filters.component';
import { PatientDataAccessPageComponent } from './pages/advocate/patient-data-access-page/patient-data-access-page.component';
import { PatientDataAccessFiltersComponent } from './components/advocate/patient-data-access-filters/patient-data-access-filters.component';


@NgModule({
  declarations: [
    FavoriteReportsModalComponent,
    ReportActionsComponent,
    DailyIntakeComponent,
    AddFavoriteReportModalComponent,
    DailyIntakeFiltersComponent,
    HomeworkStatusComponent,
    HomeworkStatusFiltersComponent,
    DuplicatedIntakeComponent,
    CompletedHomeworkComponent,
    CompletedHomeworkFiltersComponent,
    InitialConsultsComponent,
    InitialConsultsFiltersComponent,
    PreOpComponent,
    PreOpFiltersComponent,
    ClearanceVisitsComponent,
    ClearanceVisitsFiltersComponent,
    InsuranceVerificationComponent,
    PatientInsuranceComponent,
    PatientInsuranceFiltersComponent,
    StopProcessComponent,
    StopProcessFiltersComponent,
    ProspectByStatusComponent,
    ProspectByStatusFiltersComponent,
    PreDLetterSentComponent,
    PreDLetterSentFiltersComponent,
    CountByStatusComponent,
    CountByStatusFiltersComponent,
    PullThroughComponent,
    SurgicalSummaryComponent,
    SurgicalSummaryFiltersComponent,
    BariatricSurgeriesComponent,
    LeadsByPayerComponent,
    LeadsByPayerFiltersComponent,
    MonthlyNumbersPageComponent,
    SurgicalHxPageComponent,
    SurgicalHxFiltersComponent,
    EmployerStatsPageComponent,
    EmployerPatientsPageComponent,
    EmployerPatientsFiltersComponent,
    ComplicationStatsPageComponent,
    ComplicationStatsFiltersComponent,
    PostOpClassPageComponent,
    PostOpClassFiltersComponent,
    HandoutStatusPageComponent,
    HandoutStatusFiltersComponent,
    LongHospitalStaysPageComponent,
    LongHospitalStaysFiltersComponent,
    ComplicationsPageComponent,
    ComplicationFiltersComponent,
    AppointmentsSummaryPageComponent,
    AppointmentSummaryFiltersComponent,
    WorkflowEfficiencyPageComponent,
    WorkflowEfficiencyFiltersComponent,
    ReadmissionsPageComponent,
    ReadmissionsFiltersComponent,
    PlannedSurgeryPageComponent,
    PlannedSurgeryFiltersComponent,
    PatientDataAccessPageComponent,
    PatientDataAccessFiltersComponent,
  ],
  imports: [
    ReportsRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    NgbActiveModal
  ],
  exports: [
    FavoriteReportsModalComponent,
    DailyIntakeComponent,
    AddFavoriteReportModalComponent,
    DailyIntakeFiltersComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
