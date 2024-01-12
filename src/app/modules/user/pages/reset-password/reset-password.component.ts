import { Component, ElementRef, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordEmailSent: boolean = false;
  model: UserModel = new UserModel();
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private elementRef: ElementRef, private userService: UserService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  async sendResetPasswordEmail(){
    if (this.model.userName == null || this.model.userName == '') {
      this.showErrorMessage = true;
      this.errorMessage = "User Name is required";
    }else {
      (await this.userService.resetPasswordRequest(this.model)).subscribe({
          next: (response) => {
            this.resetPasswordEmailSent = true;
          },
          error: (e) => {
            this.showErrorMessage = true;
            this.errorMessage = e.error;
          }
        });
      }
    }
}
