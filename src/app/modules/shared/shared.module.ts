import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertComponent } from 'src/app/modules/shared/components/alert/alert.component';
import { TitleComponent } from 'src/app/modules/shared/components/title/title.component';
import { TableComponent } from './components/table/table.component';
import { FooterComponent } from 'src/app/modules/shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { ChangePasswordModalComponent } from './components/modal/change-password-modal/change-password-modal.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { ProspectsComponent } from './components/navigation-links/prospects/prospects.component';
import { AdvocateReportsComponent } from './components/navigation-links/reports/advocate-reports/advocate-reports.component';
import { MonthlyReportsComponent } from './components/navigation-links/reports/monthly-reports/monthly-reports.component';
import { ReportsComponent } from './components/navigation-links/reports/reports.component';
import { SettingsComponent } from './components/navigation-links/settings/settings.component';
import { MarketingReportsComponent } from './components/navigation-links/reports/marketing-reports/marketing-reports.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MedicalReportsComponent } from './components/navigation-links/reports/medical-reports/medical-reports.component';
import { DynamicPipe } from './pipes/dynamic/dynamic.pipe';
import { PercentageSignPipe } from './pipes/percentage-sign/percentage-sign.pipe';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    TableComponent,
    AlertComponent,
    TitleComponent,
    TopBarComponent,
    FooterComponent,
    SidebarComponent,
    ProspectsComponent,
    SettingsComponent,
    ReportsComponent,
    AdvocateReportsComponent,
    MonthlyReportsComponent,
    ChangePasswordModalComponent,
    MarketingReportsComponent,
    MedicalReportsComponent,
    DynamicPipe,
    PercentageSignPipe,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    InputMaskModule,
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
  ],
  exports: [
    FileSizePipe,
    DynamicPipe,
    InputMaskModule,
    TableComponent,
    AlertComponent,
    TitleComponent,
    ChangePasswordModalComponent,
    NgbModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule,
    CKEditorModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    FormsModule,
    BsDatepickerModule,
    NgMultiSelectDropDownModule,
    ToastrModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
