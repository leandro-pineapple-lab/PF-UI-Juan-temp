import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvocateModel } from 'src/app/models/practice/advocate.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvocateService {

  constructor(private http: HttpClient) { }

  async getAdvocates(){
    return this.http.get(`${environment.API_URL}${'api/Advocate/GetAdvocates'}`);
  }

  getProfessionalAdvocateNames(){
    return this.http.get(`${environment.API_URL}${'api/Advocate/GetProfessionalAdvocateNames'}`);
  }

  async getStaffUsers(){
    return this.http.get(`${environment.API_URL}${'api/Advocate/GetStaffUsers'}`);
  }

  async delete(advocate: any){
    return this.http.delete(`${environment.API_URL}${'api/Advocate/Delete'}`, {params: {advocateUserId: advocate.userId}});
  }

  async addUpdateAdvocate(advocate: AdvocateModel){
    return this.http.post(`${environment.API_URL}${'api/Advocate/Save'}`, advocate);
  }

}
