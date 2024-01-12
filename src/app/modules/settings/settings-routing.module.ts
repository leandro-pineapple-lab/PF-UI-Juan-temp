import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { SettingsAdvocateComponent } from './pages/advocate/advocate.component';
import { SeminarComponent } from './pages/event/seminar/seminar.component';
import { SupportGroupComponent } from './pages/event/support-group/support-group.component';
import { VirtualGroupComponent } from './pages/event/virtual-group/virtual-group.component';
import { FavoriteReportsComponent } from './pages/favorite-reports/favorite-reports.component';
import { SettingsHandoutCategoryComponent } from './pages/handout-category/handout-category.component';
import { SettingsHandoutSubcategoryComponent } from './pages/handout-subcategory/handout-subcategory.component';
import { SettingsHospitalComponent } from './pages/hospital/hospital.component';
import { InsuranceCompanyComponent } from './pages/insurance-company/insurance-company.component';
import { SettingsOfficeComponent } from './pages/office/office.component';
import { SettingsProcedureComponent } from './pages/procedure/procedure.component';
import { MarketingBudgetComponent } from './pages/referral/marketing-budget/marketing-budget.component';
import { MarketingCategoryComponent } from './pages/referral/marketing-category/marketing-category.component';
import { MarketingSubcategoryComponent } from './pages/referral/marketing-subcategory/marketing-subcategory.component';
import { MdReferralComponent } from './pages/referral/md-referral/md-referral.component';
import { SettingsRotationComponent } from './pages/rotation/rotation.component';
import { SettingsStatusComponent } from './pages/status/status.component';
import { SettingsTagComponent } from './pages/tag/tag.component';
import { HomeworkTemplateComponent } from './pages/template/homework/homework-template/homework-template.component';
import { HomeworkComponent } from './pages/template/homework/homework.component';
import { InsurancePrintComponent } from './pages/template/insurance/insurance-print/insurance-print.component';
import { InsuranceTemplateComponent } from './pages/template/insurance/insurance.component';
import { MessageComponent } from './pages/template/message/message.component';
import { PictureComponent } from './pages/template/picture/picture.component';
import { StandardTextComponent } from './pages/template/standard-text/standard-text.component';
import { WorkflowAlertComponent } from './pages/template/workflow-alert/workflow-alert.component';
import { AccountSettingsComponent } from './pages/user/account-settings/account-settings.component';
import { OfficeLoginComponent } from './pages/user/office-login/office-login.component';

const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      {
        path: 'insurance-company',
        component: InsuranceCompanyComponent
      },
      {
        path: 'advocate',
        component: SettingsAdvocateComponent
      },
      {
        path: 'office',
        component: SettingsOfficeComponent
      },
      {
        path: 'hospital',
        component: SettingsHospitalComponent
      },
      {
        path: 'status',
        component: SettingsStatusComponent
      },
      {
        path: 'procedure',
        component: SettingsProcedureComponent
      },
      {
        path: 'rotation',
        component: SettingsRotationComponent
      },
      {
        path: 'tag',
        component: SettingsTagComponent
      },
      {
        path: 'handout-category',
        component: SettingsHandoutCategoryComponent
      },
      {
        path: 'handout-subcategory',
        component: SettingsHandoutSubcategoryComponent
      },
      {
        path: 'marketing-budget',
        component: MarketingBudgetComponent
      },
      {
        path: 'marketing-category',
        component: MarketingCategoryComponent
      },
      {
        path: 'marketing-subcategory',
        component: MarketingSubcategoryComponent
      },
      {
        path: 'md-referral',
        component: MdReferralComponent
      },
      {
        path: 'template-picture',
        component: PictureComponent
      },
      {
        path: 'template-message',
        component: MessageComponent
      },
      {
        path: 'event-seminar',
        component: SeminarComponent
      },
      {
        path: 'event-support-group',
        component: SupportGroupComponent
      },
      {
        path: 'event-virtual-group',
        component: VirtualGroupComponent
      },
      {
        path: 'office-login',
        component: OfficeLoginComponent
      },
      {
        path: 'account',
        component: AccountSettingsComponent
      },
      {
        path: 'account/:user_name',
        component: AccountSettingsComponent
      },
      {
        path: 'insurance-template',
        component: InsuranceTemplateComponent
      },
      {
        path: 'insurance-print-template',
        component: InsurancePrintComponent
      },
      {
        path: 'homework-template',
        component: HomeworkTemplateComponent
      },
      {
        path: 'homework-template/:id',
        component: HomeworkTemplateComponent
      },
      {
        path: 'workflow-alert',
        component: WorkflowAlertComponent
      },
      {
        path: 'homework',
        component: HomeworkComponent
      },
      {
        path: 'standard-text',
        component: StandardTextComponent
      },
      {
        path: 'favorite-reports',
        component: FavoriteReportsComponent
      },
      {
        path: 'favorite-reports/:reportId',
        component: FavoriteReportsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
