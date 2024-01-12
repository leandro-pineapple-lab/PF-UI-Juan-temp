import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  model: UserModel = new UserModel();

  constructor(private elementRef: ElementRef, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isUserAuthenticated();
  }

  isUserAuthenticated() {
    if (this.userService.isUserAuthenticated()) {
      this.router.navigateByUrl('/search-prospect');
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2a94d6';
  }

  async login() {
    (await this.userService.login(this.model)).subscribe({
      next: (response: any) => {
        if (!response.errorMessage){
          this.userService.setLocalStorageAccountInfo(response);
          this.userService.loginRedirection();
          this.toastr.success('Login Successful', 'Success');
        }else{
          this.toastr.error(response.errorMessage, 'Error');
        }
      },
      error: (e) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

}
