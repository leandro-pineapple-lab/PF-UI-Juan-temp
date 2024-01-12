import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InsuranceCompanyModel } from 'src/app/models/practice/insurance-company.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCompanyService {

  constructor(private http: HttpClient) { }

  getInsuranceCompanies(){
    return this.http.get(`${environment.API_URL}${'api/InsuranceCompany/GetInsuranceCompanies'}`);
  }

  async getProspectAndProvidersInsuranceCompanies(){
    return this.http.get(`${environment.API_URL}${'api/InsuranceCompany/GetProspectAndProvidersInsuranceCompanies'}`);
  }

  getStates(){
    return this.http.get(`${environment.API_URL}${'api/InsuranceCompany/GetStates'}`);
  }

  async addUpdateInsuranceCompany(insuranceCompanyModel: InsuranceCompanyModel){
    return this.http.post(`${environment.API_URL}${'api/InsuranceCompany/Save'}`, insuranceCompanyModel);
  }
}
