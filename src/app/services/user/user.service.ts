import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, firstValueFrom } from 'rxjs';
import { UserFilterModel } from 'src/app/models/user/user-filter.model';
import { UserModel } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFullName = new Subject<string>();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  async getUserAccounts(userFilters: UserFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/User/GetUserAccounts'}`, {
      params: {
        userId: userFilters.userId,
        fullName: userFilters.name,
        teamId: userFilters.teamId,
        status: userFilters.status,
        disabled: userFilters.disabled
      }
    });
  }

  async getTeams() {
    return this.http.get(`${environment.API_URL}${'api/User/GetTeams'}`);
  }

  getProfessionalProviders() {
    return this.http.get(`${environment.API_URL}${'api/User/GetProfessionalProviders'}`);
  }

  async getAllProfessionalProviders() {
    return firstValueFrom(this.http.get(`${environment.API_URL}${'api/User/GetAllProfessionals'}`));
  }

  async getUserAccountInformation(userName: string) {
    return this.http.get(`${environment.API_URL}${'api/User/GetUserAccountInformation'}`, {
      params: {
        userName
      }
    });
  }

  async addAccount(officeLoginModel: UserModel) {
    return this.http.post(`${environment.API_URL}${'api/User/AddAccount'}`, officeLoginModel);
  }

  async updateUserAccountInformation(userModel: UserModel) {
    return this.http.put(`${environment.API_URL}${'api/User/UpdateUserAccountInformation'}`, userModel);
  }

  async disableAccount(userName: string) {
    return this.http.delete(`${environment.API_URL}${'api/User/DisableUserAccount'}`, {
      params: {
        userName
      }
    });
  }

  async enableAccount(userModel: UserModel) {
    return this.http.put(`${environment.API_URL}${'api/User/EnableUserAccount'}`, userModel);
  }

  async activateAccount(userModel: UserModel) {
    return this.http.put(`${environment.API_URL}${'api/User/ActivateUserAccount'}`, userModel);
  }

  async resetPasswordRequest(model: any) {
    return this.http.post(`${environment.API_URL}${'api/User/ResetPasswordRequest'}`, model);
  }

  async changePassword(model: any) {
    return this.http.post(`${environment.API_URL}${'api/User/ChangePassword'}`, model);
  }

  async login(model: any) {
    return this.http.post(`${environment.API_URL}${'api/User/Login'}`, model);
  }

  getSecurityAccess(){
    return localStorage.getItem("securityAccess");
  }

  isUserAuthenticated() {
    const accessToken = localStorage.getItem('userToken');
    const require_password_change = localStorage.getItem("requirePasswordChange") === "true" ? true : false;

    if (require_password_change){
      localStorage.clear();
      return false;
    }
    if (accessToken && !this.jwtHelper.isTokenExpired(accessToken)) {
      return true;
    }
    return false;
  }

  setLocalStorageAccountInfo(response: any){
    if (response.object?.fullName){
      localStorage.setItem('userFullName', response.object.fullName);
    }
    localStorage.setItem('userToken', response.token);
    localStorage.setItem('canSaveSettings', JSON.parse((jwt_decode(response.token) as any).CanSaveSettings));
    localStorage.setItem('securityAccess', (jwt_decode(response.token) as any).SecurityAccess);
    localStorage.setItem('requirePasswordChange', JSON.parse((jwt_decode(response.token) as any).RequirePasswordChange));
  }

  getUserInfo(){
    const userToken = localStorage.getItem('userToken') ?? '';
    const userInfo = jwt_decode(userToken) as any;
    return userInfo;
  }

  loginRedirection(){
    const require_password_change = localStorage.getItem('requirePasswordChange') === "true" ? true : false;
    if (require_password_change === true){
      this.router.navigateByUrl('/change-password');
      return;
    }
    this.router.navigateByUrl('/prospects/search-prospect');
  }
}
