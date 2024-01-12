import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  model: UserModel = new UserModel();
  requirePasswordChange: boolean = localStorage.getItem("requirePasswordChange") === "true" ? true : false;
  hasLowerCase: boolean = false;
  hasUpperCase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialCharacter: boolean = false;
  isPasswordStrong: boolean = false;
  passwordsMatch: boolean = false;
  revealNewPassword: boolean = false;
  revealConfirmPassword: boolean = false;
  passwordStrength: any;
  barLabel: string = "Password strength:";
  passwordStrengthColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  thresholds = [80, 60, 40, 20];
  showChangePasswordButton: boolean = true;
  showErrorMessage: boolean = false;
  changePasswordErrorMessage: string = '';
  errorMessage: string = '';
  passwordChanged: boolean = false;
  isAllowedToChangePassword: boolean = false;
  successMessage: string = '';

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private route: Router, private elementRef: ElementRef, private toastr: ToastrService) {
    this.activatedRoute.queryParams.subscribe(params => {
        this.model.userId = params['u'];
        this.model.encExpirationDate = params['ts'];
        if ((this.requirePasswordChange) || (this.model.userId != null && this.model.encExpirationDate != null)) {
          this.isAllowedToChangePassword = true;
        }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  ngOnInit(): void {
  }

  revealUnrevealNewPassword(){
    if (!this.revealNewPassword){
      (document.getElementById('txtNewPassword') as HTMLElement).setAttribute('type', 'text');
      this.revealNewPassword = true;
    }else{
      (document.getElementById('txtNewPassword') as HTMLElement).setAttribute('type', 'password');
      this.revealNewPassword = false;
    }
  }

  revealUnrevealConfirmPassword(){
    if (!this.revealConfirmPassword){
      (document.getElementById('txtConfirmPassword') as HTMLElement).setAttribute('type', 'text');
      this.revealConfirmPassword = true;
    }else{
      (document.getElementById('txtConfirmPassword') as HTMLElement).setAttribute('type', 'password');
      this.revealConfirmPassword = false;
    }
  }

  checkPasswordValidations(){
    if (/[a-z]/.test(this.model.password)){
      this.hasLowerCase = true;
    }else{
      this.hasLowerCase = false;
    }
    if (/[A-Z]/.test(this.model.password)){
      this.hasUpperCase = true;
    }else{
      this.hasUpperCase = false;
    }
    if (/\d/.test(this.model.password)){
      this.hasNumber = true;
    }else{
      this.hasNumber = false;
    }
    if (/[`!@#$&()]/.test(this.model.password)){
      this.hasSpecialCharacter = true;
    }else{
      this.hasSpecialCharacter = false;
    }
    if (this.model.password.length > 0 && this.model.confirmPassword.length > 0 && this.model.password == this.model.confirmPassword){
      this.passwordsMatch = true;
    }else{
      this.passwordsMatch = false;
    }
    if (this.hasLowerCase && this.hasUpperCase && this.hasNumber && this.hasSpecialCharacter && this.model.password.length >= 8){
      this.isPasswordStrong = true;
      this.showChangePasswordButton = true;
    }else{
      this.isPasswordStrong = false;
      this.showChangePasswordButton = false;
    }
  }

  checkPasswordsMatch(){
    if (this.model.password.length > 0 && this.model.confirmPassword.length > 0 && this.model.password == this.model.confirmPassword){
      this.passwordsMatch = true;
    }else{
      this.passwordsMatch = false;
    }
  }

  async changePassword(){
    if (!this.isPasswordStrong){
      this.showErrorMessage = true;
      this.changePasswordErrorMessage = 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number and one special character.';
    }else{
      (await this.userService.changePassword(this.model)).subscribe({
        next: (response) => {
          if (this.requirePasswordChange){
            this.toastr.success("Your password has been successfully changed", 'Error');
            setTimeout(() => {
              localStorage.clear();
              this.route.navigateByUrl('');
            }, 3000);
            return;
          }

          this.passwordChanged = true;
          this.successMessage = 'The password for ' + this.model.userId + ' has been reset.';
        },
        error: (e) => {
          this.showErrorMessage = true;
          this.changePasswordErrorMessage = e.error;
        }
      });
    }
  }
}
