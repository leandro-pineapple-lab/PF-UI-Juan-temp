import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { Ng9PasswordStrengthBarModule } from 'ng9-password-strength-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


@NgModule({
  declarations: [
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    Ng9PasswordStrengthBarModule
  ],
  providers: [
    NgbActiveModal
  ]
})
export class UserModule { }
