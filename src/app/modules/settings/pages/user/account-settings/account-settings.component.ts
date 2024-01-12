import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createMask } from '@ngneat/input-mask';
import { ToastrService } from 'ngx-toastr';
import { accountSettingsSystemParams } from 'src/app/models/common/system-params/account-settings';
import { PictureModel } from 'src/app/models/template/picture.model';
import { UserModel } from 'src/app/models/user/user.model';
import { ChangePasswordModalComponent } from 'src/app/modules/shared/components/modal/change-password-modal/change-password-modal.component';
import { CommonService } from 'src/app/services/common/common.service';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { OfficeService } from 'src/app/services/office/office.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  userModel: UserModel = new UserModel();
  avatarPicture: PictureModel = new PictureModel();
  teamsList: any[] = [];
  statesList: any[] = [];
  officesList: any[] = [];
  phoneMask = createMask<string>('999-999-9999');
  editMyUserSettings: boolean = true;
  editingUserName: string = "";
  editingUserFullName: string = "";
  showDietitianModule: boolean = false;
  showCanSaveSettings: boolean = false;

  userAccountSettingsForm = new UntypedFormGroup({
    userAccountFirstName: new UntypedFormControl("", [Validators.required]),
    userAccountLastName: new UntypedFormControl("", [Validators.required]),
    userAccountAddress1: new UntypedFormControl("", [Validators.required]),
    userAccountCity: new UntypedFormControl("", [Validators.required]),
    userAccountState: new UntypedFormControl("", [Validators.required]),
    userAccountZip: new UntypedFormControl("", [Validators.required]),
    userAccountMiddleName: new UntypedFormControl(""),
    userAccountSalutation: new UntypedFormControl(""),
    userAccountTitle: new UntypedFormControl(""),
    userAccountPhone: new UntypedFormControl(""),
    userAccountPhoneExt: new UntypedFormControl(""),
    userAccountAfterHoursPhone: new UntypedFormControl(""),
    userAccountAfterHoursPhoneExt: new UntypedFormControl(""),
    userAccountCellPhone: new UntypedFormControl(""),
    userAccountFax: new UntypedFormControl(""),
    userAccountFaxExt: new UntypedFormControl(""),
    userAccountAddress2: new UntypedFormControl(""),
    userAccountCountry: new UntypedFormControl(""),
    userAccountEmail: new UntypedFormControl("", [Validators.email]),
    userAccountTeam: new UntypedFormControl(""),
    userAccountOffice: new UntypedFormControl(""),
    userAccountLandingPage: new UntypedFormControl(""),
    userAccountIsSurgeon: new UntypedFormControl(""),
    userAccountIsScheduled: new UntypedFormControl(""),
    userAccountCanAccessPatientFiles: new UntypedFormControl(""),
    userAccountCanPatientMessage: new UntypedFormControl(""),
    userAccountMarketingOnly: new UntypedFormControl(""),
    userAccountSecurityAccess: new UntypedFormControl(""),
    userAccountIsDietitian: new UntypedFormControl(""),
    userAccountCanSaveSettings: new UntypedFormControl(""),
  });

  get userAccountFirstName()
  {
    return this.userAccountSettingsForm.get("userAccountFirstName");
  }

  get userAccountLastName()
  {
    return this.userAccountSettingsForm.get("userAccountLastName");
  }

  get userAccountAddress1()
  {
    return this.userAccountSettingsForm.get("userAccountAddress1");
  }

  get userAccountCity()
  {
    return this.userAccountSettingsForm.get("userAccountCity");
  }

  get userAccountState()
  {
    return this.userAccountSettingsForm.get("userAccountState");
  }

  get userAccountZip()
  {
    return this.userAccountSettingsForm.get("userAccountZip");
  }

  get userAccountEmail()
  {
    return this.userAccountSettingsForm.get("userAccountEmail");
  }

  constructor(private userService: UserService, private insuranceCompanyService: InsuranceCompanyService, private officeService: OfficeService,
              private toastr: ToastrService, private modalService: NgbModal, private templateService: TemplateService, private route: ActivatedRoute,
              private commonService: CommonService
              ) { }

  async ngOnInit() {
    this.getTeams();
    this.getStates();
    await this.route.queryParams.subscribe(params => {
      this.editingUserName = params['user_name'] || "";
      this.editMyUserSettings = this.editingUserName.length === 0;
      this.getOffices(this.editingUserName);
      this.getUserAccountInformation(this.editingUserName);
      this.getSystemParams();
    });
  }

  async getSystemParams() {
    (await this.commonService.getSystemParams(accountSettingsSystemParams)).subscribe({
      next: (response: any) => {
        const dietitianModuleParam = response.find((x: any) => x.page === 'General' && x.name === 'showDietitianModule');
        const canSaveSettingsParam = response.find((x: any) => x.page === 'General' && x.name === 'RestrictSettingsSave');
        this.showDietitianModule = dietitianModuleParam.value === "yes" ? true : false;
        this.showCanSaveSettings = canSaveSettingsParam.value === "no" ? true : false;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getOffices(userName: string) {
    (await this.officeService.getOffices(userName)).subscribe({
      next: (response: any) => {
        this.officesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStates() {
    (await this.insuranceCompanyService.getStates()).subscribe({
      next: (response: any) => {
        this.statesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getTeams() {
    (await this.userService.getTeams()).subscribe({
      next: (response: any) => {
        this.teamsList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getUserAccountInformation(userName: string) {
    (await this.userService.getUserAccountInformation(userName)).subscribe({
      next: (response: any) => {
        if (response.object != null){
          this.userModel = response.object;
          this.editingUserFullName = response.object.firstName + " " + response.object.lastName;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateUserAccountInformation() {
    if(!this.userAccountSettingsForm.valid){
      this.userAccountSettingsForm.markAllAsTouched();
      this.toastr.error("Please check the entered information", 'Error');
      return;
    }
    this.userModel.userName = this.editingUserName;
    (await this.userService.updateUserAccountInformation(this.userModel)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        if (this.editMyUserSettings){
          if (response.token){
            this.userService.userFullName.next(this.userModel.firstName + " " + this.userModel.lastName);
            localStorage.setItem("userFullName", this.userModel.firstName + " " + this.userModel.lastName);
            this.userService.setLocalStorageAccountInfo(response);
            location.reload();
          }
        }
        this.toastr.success("Your account information has been successfully updated", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateAvatarPicture() {
    let selectedPicture: any = (<HTMLInputElement>document.getElementById('fUploadMyPicture'))?.files?.item(0);

    if (selectedPicture === null){
      this.toastr.error("Please select a File.", 'Error');
      return;
    }

    this.avatarPicture.file = new FormData();
    this.avatarPicture.file.append("user-avatar", selectedPicture, selectedPicture.name);

    (await this.templateService.addAvatarPicture(this.avatarPicture)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.toastr.success("Your avatar picture has been successfully uploaded", 'Success');
        (document.getElementById('fUploadMyPicture') as any).value = null;
        this.avatarPicture = new PictureModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  openChangePasswordModal() {
    const modalRef = this.modalService.open(ChangePasswordModalComponent, {size: 'lg'});
    modalRef.componentInstance.model.userName = this.editingUserName;
  }

}
