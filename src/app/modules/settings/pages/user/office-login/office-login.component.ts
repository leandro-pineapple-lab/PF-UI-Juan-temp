import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserFilterModel } from 'src/app/models/user/user-filter.model';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-office-login',
  templateUrl: './office-login.component.html',
  styleUrls: ['./office-login.component.scss']
})
export class OfficeLoginComponent implements OnInit {

  generatedPassword: string = "";
  showOfficeLoginAddBody: boolean = false;
  officeLoginModel: UserModel = new UserModel();
  selectedUser: UserModel = new UserModel();
  officeLoginFilterModel: UserFilterModel = new UserFilterModel();
  enableDisableUserModalAction: string = "";
  teamsList: any[] = [];
  usersList: UserModel[] = [];
  addOfficeLoginForm = new UntypedFormGroup({
    addOfficeLoginFirstName: new UntypedFormControl("", [Validators.required]),
    addOfficeLoginLastName: new UntypedFormControl("", [Validators.required]),
    addOfficeLoginUserName: new UntypedFormControl("", [Validators.required]),
    addOfficeLoginEmail: new UntypedFormControl(""),
  });

  get addOfficeLoginFirstName()
  {
    return this.addOfficeLoginForm.get("addOfficeLoginFirstName");
  }

  get addOfficeLoginLastName()
  {
    return this.addOfficeLoginForm.get("addOfficeLoginLastName");
  }

  get addOfficeLoginUserName()
  {
    return this.addOfficeLoginForm.get("addOfficeLoginUserName");
  }

  get addOfficeLoginEmail()
  {
    return this.addOfficeLoginForm.get("addOfficeLoginEmail");
  }

  constructor(private userService: UserService, private toastr: ToastrService, private modalService: NgbModal, private router: Router) { }

  async ngOnInit() {
    if (this.userService.getSecurityAccess() !== "N"){
      await this.getTeams();
      await this.getUserAccounts();
    }
  }

  async getUserAccounts() {
    (await this.userService.getUserAccounts(this.officeLoginFilterModel)).subscribe({
      next: (response: any) => {
        this.usersList = response;
      },
      error: (e: any) => {
        this.toastr.error(e, "Error");
      }
    });
  }

  async getTeams() {
    (await this.userService.getTeams()).subscribe({
      next: (response: any) => {
        this.teamsList = response;
      },
      error: (e: any) => {
        this.toastr.error(e, "Error");
      }
    });
  }

  async searchUsers(){
    await this.getUserAccounts();
  }

  async addAccount(){
    this.generatedPassword = "";
    if(!this.addOfficeLoginForm.valid){
      this.addOfficeLoginForm.markAllAsTouched();
      this.toastr.error("Please check the entered information", 'Error');
      return;
    }
    (await this.userService.addAccount(this.officeLoginModel)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, "Error");
          return;
        }
        this.generatedPassword = response.object.generatedPassword;
        this.officeLoginModel = new UserModel();
        this.addOfficeLoginForm.reset();
        this.getUserAccounts();
        this.toastr.success("Account successfully created", 'Success');
      },
      error: (e: any) => {
        this.toastr.error("Please check the entered information.", "Error");
      }
    });
  }

  openEnableDisableUserAccountConfirmationModal(userEnableDisableModal: any, user: UserModel, action: string) {
    this.enableDisableUserModalAction = action;
    this.selectedUser = new UserModel();
    this.selectedUser.userName = user.userName;
    this.selectedUser.name = user.userName;
    this.selectedUser.firstName = user.firstName;
    this.selectedUser.lastName = user.lastName;
    this.selectedUser.email = user.email;
    this.modalService.open(userEnableDisableModal, {ariaLabelledBy: 'modal-basic-title'});
  }

  async enableDisableUserAccount(){
    if (this.enableDisableUserModalAction === "disable"){
      (await this.userService.disableAccount(this.selectedUser.userName)).subscribe({
        next: (response: any) => {
          this.selectedUser = new UserModel();
          this.getUserAccounts();
          this.modalService.dismissAll();
          this.toastr.success("Account successfully disabled", 'Success');
        },
        error: (e: any) => {
          this.toastr.error(e, "Error");
        }
      });
      return;
    }
    if (this.enableDisableUserModalAction === "enable"){
      (await this.userService.enableAccount(this.selectedUser)).subscribe({
        next: (response: any) => {
          this.selectedUser = new UserModel();
          this.getUserAccounts();
          this.modalService.dismissAll();
          this.toastr.success("Account successfully enabled", 'Success');
        },
        error: (e: any) => {
          this.toastr.error(e, "Error");
        }
      });
      return;
    }
    if (this.enableDisableUserModalAction === "activate"){
      (await this.userService.activateAccount(this.selectedUser)).subscribe({
        next: (response: any) => {
          this.selectedUser = new UserModel();
          this.getUserAccounts();
          this.modalService.dismissAll();
          this.toastr.success("Account successfully activated", 'Success');
        },
        error: (e: any) => {
          this.toastr.error(e, "Error");
        }
      });
      return;
    }
  }

  editUserAccountInformation(userName: string){
    this.router.navigateByUrl('/account-settings?user_name=' + userName);
  }

}
