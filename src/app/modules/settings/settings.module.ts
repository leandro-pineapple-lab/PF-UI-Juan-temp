import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SecurityAccessSettingsDirective } from 'src/app/directives/user/security-access-settings.directive';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
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
import { WorkflowAlertFormComponent } from './pages/template/workflow-alert/workflow-alert-form/workflow-alert-form.component';
import { WorkflowAlertGenerateComponent } from './pages/template/workflow-alert/workflow-alert-form/workflow-alert-generate/workflow-alert-generate.component';
import { WorkflowAlertIfComponent } from './pages/template/workflow-alert/workflow-alert-form/workflow-alert-if/workflow-alert-if.component';
import { WorkflowAlertScopeComponent } from './pages/template/workflow-alert/workflow-alert-form/workflow-alert-scope/workflow-alert-scope.component';
import { WorkflowAlertWhenComponent } from './pages/template/workflow-alert/workflow-alert-form/workflow-alert-when/workflow-alert-when.component';
import { WorkflowAlertListComponent } from './pages/template/workflow-alert/workflow-alert-list/workflow-alert-list.component';
import { WorkflowAlertComponent } from './pages/template/workflow-alert/workflow-alert.component';
import { AccountSettingsComponent } from './pages/user/account-settings/account-settings.component';
import { OfficeLoginComponent } from './pages/user/office-login/office-login.component';

@NgModule({
  declarations: [
    InsuranceCompanyComponent,
    SettingsAdvocateComponent,
    SettingsOfficeComponent,
    SettingsHospitalComponent,
    SettingsStatusComponent,
    SettingsProcedureComponent,
    SettingsRotationComponent,
    SettingsTagComponent,
    SettingsHandoutCategoryComponent,
    SettingsHandoutSubcategoryComponent,
    MarketingBudgetComponent,
    MarketingCategoryComponent,
    MarketingSubcategoryComponent,
    MdReferralComponent,
    PictureComponent,
    SeminarComponent,
    SupportGroupComponent,
    VirtualGroupComponent,
    OfficeLoginComponent,
    SecurityAccessSettingsDirective,
    AccountSettingsComponent,
    InsuranceTemplateComponent,
    InsurancePrintComponent,
    HomeworkComponent,
    HomeworkTemplateComponent,
    MessageComponent,
    StandardTextComponent,
    WorkflowAlertComponent,
    WorkflowAlertListComponent,
    WorkflowAlertFormComponent,
    WorkflowAlertIfComponent,
    WorkflowAlertGenerateComponent,
    WorkflowAlertScopeComponent,
    WorkflowAlertWhenComponent,
    FavoriteReportsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
