import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OfficeModel } from 'src/app/models/practice/office.model';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http: HttpClient) { }

  getOffices(userName: string = ""){
    return this.http.get(`${environment.API_URL}${'api/Office/GetOffices'}`, {
      params: {
        userName
      }
    });
  }

  async delete(officeId: string){
    return this.http.delete(`${environment.API_URL}${'api/Office/Delete'}`, {params: {officeId: officeId}});
  }

  async enable(officeId: string){
    return this.http.get(`${environment.API_URL}${'api/Office/Enable'}`, {params: {officeId: officeId}});
  }

  async addUpdateOffice(officeModel: OfficeModel){
    return this.http.post(`${environment.API_URL}${'api/Office/Save'}`, officeModel);
  }
}
