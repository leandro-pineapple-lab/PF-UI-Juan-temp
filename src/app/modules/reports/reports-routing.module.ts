import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { ClearanceVisitsComponent } from './components/advocate/clearance-visits/clearance-visits.component';
import { CompletedHomeworkComponent } from './components/advocate/completed-homework/completed-homework.component';
import { CountByStatusComponent } from './components/advocate/count-by-status/count-by-status.component';
import { DailyIntakeComponent } from './components/advocate/daily-intake/daily-intake.component';
import { DuplicatedIntakeComponent } from './components/advocate/duplicated-intake/duplicated-intake.component';
import { HomeworkStatusComponent } from './components/advocate/homework-status/homework-status.component';
import { InitialConsultsComponent } from './components/advocate/initial-consults/initial-consults.component';
import { InsuranceVerificationComponent } from './components/advocate/insurance-verification/insurance-verification.component';
import { PatientInsuranceComponent } from './components/advocate/patient-insurance/patient-insurance.component';
import { PreDLetterSentComponent } from './components/advocate/pre-d-letter-sent/pre-d-letter-sent.component';
import { PreOpComponent } from './components/advocate/pre-op/pre-op.component';
import { ProspectByStatusComponent } from './components/advocate/prospect-by-status/prospect-by-status.component';
import { StopProcessComponent } from './components/advocate/stop-process/stop-process.component';
import { BariatricSurgeriesComponent } from './components/monthly/bariatric-surgeries/bariatric-surgeries.component';
import { LeadsByPayerComponent } from './components/monthly/leads-by-payer/leads-by-payer.component';
import { PullThroughComponent } from './components/monthly/pull-through/pull-through.component';
import { SurgicalSummaryComponent } from './components/monthly/surgical-summary/surgical-summary.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { MonthlyNumbersPageComponent } from './pages/monthly/monthly-numbers-page/monthly-numbers-page.component';
import { SurgicalHxPageComponent } from './pages/marketing/surgical-hx-page/surgical-hx-page.component';
import { EmployerStatsPageComponent } from './pages/marketing/employer-stats-page/employer-stats-page.component';
import { EmployerPatientsPageComponent } from './pages/marketing/employer-patients-page/employer-patients-page.component';
import { ComplicationStatsPageComponent } from './pages/medical/complication-stats-page/complication-stats-page.component';
import { PostOpClassPageComponent } from './pages/advocate/post-op-class-page/post-op-class-page.component';
import { HandoutStatusPageComponent } from './pages/advocate/handout-status-page/handout-status-page.component';
import { LongHospitalStaysPageComponent } from './pages/medical/long-hospital-stays-page/long-hospital-stays-page.component';
import { ComplicationsPageComponent } from './pages/medical/complications-page/complications-page.component';
import { AppointmentsSummaryPageComponent } from './pages/medical/appointments-summary-page/appointments-summary-page.component';
import { WorkflowEfficiencyPageComponent } from './pages/advocate/workflow-efficiency-page/workflow-efficiency-page.component';
import { ReadmissionsPageComponent } from './pages/medical/readmissions-page/readmissions-page.component';
import { PlannedSurgeryPageComponent } from './pages/advocate/planned-surgery-page/planned-surgery-page.component';
import { PatientDataAccessPageComponent } from './pages/advocate/patient-data-access-page/patient-data-access-page.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      //ADVOCATE
      {
        path: 'daily-intake',
        component: DailyIntakeComponent
      },
      {
        path: 'homework-status',
        component: HomeworkStatusComponent
      },
      {
        path: 'duplicated-intakes',
        component: DuplicatedIntakeComponent
      },
      {
        path: 'completed-homeworks',
        component: CompletedHomeworkComponent
      },
      {
        path: 'initial-consults',
        component: InitialConsultsComponent
      },
      {
        path: 'pre-op',
        component: PreOpComponent
      },
      {
        path: 'clearance-visits',
        component: ClearanceVisitsComponent
      },
      {
        path: 'insurance-verification',
        component: InsuranceVerificationComponent
      },
      {
        path: 'patient-insurance',
        component: PatientInsuranceComponent
      },
      {
        path: 'stop-process',
        component: StopProcessComponent
      },
      {
        path: 'prospects-by-status',
        component: ProspectByStatusComponent
      },
      {
        path: 'pre-d-letter-sent',
        component: PreDLetterSentComponent
      },
      {
        path: 'post-op-classes',
        component: PostOpClassPageComponent
      },
      {
        path: 'count-by-status',
        component: CountByStatusComponent
      },
      {
        path: 'handout-status',
        component: HandoutStatusPageComponent
      },
      {
        path: 'workflow-efficiency',
        component: WorkflowEfficiencyPageComponent
      },
      {
        path: 'planned-surgery',
        component: PlannedSurgeryPageComponent
      },

      //MARKETING
      {
        path: 'surgical-hx',
        component: SurgicalHxPageComponent
      },
      {
        path: 'employer-stats',
        component: EmployerStatsPageComponent
      },
      {
        path: 'patients-by-employer',
        component: EmployerPatientsPageComponent
      },

      //MEDICAL
      {
        path: 'complication-stats',
        component: ComplicationStatsPageComponent
      },
      {
        path: 'readmissions',
        component: ReadmissionsPageComponent
      },
      {
        path: 'long-hospital-stays',
        component: LongHospitalStaysPageComponent
      },
      {
        path: 'complications',
        component: ComplicationsPageComponent
      },
      {
        path: 'data-access',
        component: PatientDataAccessPageComponent
      },

      //MONTHLY
      {
        path: 'pull-through',
        component: PullThroughComponent
      },
      {
        path: 'surgical-summary',
        component: SurgicalSummaryComponent
      },
      {
        path: 'case-log-summary',
        component: BariatricSurgeriesComponent
      },
      {
        path: 'appointments',
        component: AppointmentsSummaryPageComponent
      },
      {
        path: 'leads-by-payer',
        component: LeadsByPayerComponent
      },
      {
        path: 'monthly-stats',
        component: MonthlyNumbersPageComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
